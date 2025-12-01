import type { OpenCVTypes } from "@geti/smart-tools/opencv";
import type {
  EncodingOutput,
  ExecutionProviders,
  SegmentAnythingModelWrapper,
} from "@geti/smart-tools/segment-anything";
import { buildSegmentAnythingInstance } from "@geti/smart-tools/segment-anything";
import { expose, proxy } from "comlink";
import type * as ort from "onnxruntime-common";

import { OpenCVLoader } from "../opencv-loader";
import type { Point } from "../types";
import { matToImageData } from "./../utils";

const approximateShape = (CV: OpenCVTypes.cv, contour: OpenCVTypes.Mat, isClose = true): OpenCVTypes.Mat => {
  const epsilon = 1.0;
  const newContour = new CV.Mat();

  CV.approxPolyDP(contour, newContour, epsilon, isClose);

  return newContour;
};

interface PostprocessStep {
  allMasksMat: Array<ImageData>;
  iouScores: Array<number>;
  polygonPoints: Array<Point>;
}

interface PostprocessDebugContext {
  masks: ort.Tensor & { cpuData: ort.Tensor["data"] };
  iouPredictions: ort.Tensor & { cpuData: ort.Tensor["data"] };
  sizes: {
    width: number;
    height: number;
    originalWidth: number;
    originalHeight: number;
  };
  encodingOutput: EncodingOutput;
}

function postprocessingDebugger(cv: OpenCVTypes.cv, context: PostprocessDebugContext): PostprocessStep {
  // Ugly fix due to proxying ort.Tensro via comlink
  const masks = context.masks;
  const iouPredictions = context.iouPredictions;

  const { sizes } = context;

  // Step 1: Show all decoder output masks
  const allMasksMat: OpenCVTypes.Mat[] = [];
  const iouScores: number[] = [];

  for (let maskIdx = 0; maskIdx < masks.dims[1]; maskIdx++) {
    const maskSize = masks.dims[2] * masks.dims[3];
    const maskOffset = maskIdx * maskSize;
    const pixels = new Uint8ClampedArray(new ArrayBuffer(maskSize));

    for (let i = 0; i < maskSize; i++) {
      const value = Number(masks.data[maskOffset + i]);
      pixels[i] = value > 0 ? 255 : 0;
    }

    const mat = cv.matFromArray(masks.dims[2], masks.dims[3], cv.CV_8U, pixels);
    allMasksMat.push(mat);

    // Get IoU score
    const iouScore = Number(iouPredictions.data[maskIdx]);
    iouScores.push(iouScore);
  }

  // Step 2: Select mask with highest confidence
  let bestMaskIdx = 0;
  let bestIoU = Number(iouPredictions.data[0]);

  for (let p = 1; p < iouPredictions.dims[1]; p++) {
    const iou = Number(iouPredictions.data[p]);
    if (iou > bestIoU) {
      bestIoU = iou;
      bestMaskIdx = p;
    }
  }

  const bestMask = allMasksMat[bestMaskIdx].clone();

  // Step 3: Find contours
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();

  cv.findContours(bestMask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE);

  const contourAreas: number[] = [];
  for (let i = 0; i < contours.size(); i++) {
    const contour = contours.get(i);
    const area = cv.contourArea(contour, false);
    contourAreas.push(area);
    contour.delete();
  }

  // Step 4: Find largest contour (excluding full image)
  let maxContourIdx = -1;
  let maxArea = -1;
  const imageArea = sizes.width * sizes.height;

  for (let idx = 0; idx < contours.size(); idx++) {
    const contour = contours.get(idx);
    const area = cv.contourArea(contour, false);

    // Only consider contours that don't take up too much of the image
    if (area > maxArea && area / imageArea < 0.9) {
      maxArea = area;
      maxContourIdx = idx;
    }

    contour.delete();
  }

  const largestContour = contours.get(maxContourIdx).clone();

  // Step 5: Optimize contour (polygon approximation)
  const optimizedContour = approximateShape(cv, largestContour);

  // Step 6: Convert to polygon coordinates
  const polygonPoints: Point[] = [];

  for (let row = 0; row < optimizedContour.rows; row++) {
    const x = optimizedContour.intAt(row, 0);
    const y = optimizedContour.intAt(row, 1);

    polygonPoints.push({ x, y });
  }

  const result = {
    allMasksMat: allMasksMat.map((mat) => matToImageData(cv, mat)),
    iouScores: iouScores.map((s) => s),
    polygonPoints,
  };

  // Cleanup
  allMasksMat.forEach((m) => m.delete());
  bestMask.delete();
  contours.delete();
  hierarchy.delete();
  largestContour.delete();
  optimizedContour.delete();

  return result;
}

class Debugger {
  private sam: SegmentAnythingModelWrapper | undefined;
  private embeddings: EncodingOutput | undefined;

  constructor(
    private cv: OpenCVTypes,
    private useWebGPU = false,
    private executionProviders?: ExecutionProviders
  ) {}

  async init(imageData: ImageData) {
    this.sam = await buildSegmentAnythingInstance(this.useWebGPU, this.executionProviders);
    await this.sam.init("SEGMENT_ANYTHING_ENCODER");
    await this.sam.init("SEGMENT_ANYTHING_DECODER");

    this.embeddings = await this.sam.processEncoder(imageData);
  }

  async run(points: Array<{ x: number; y: number }>) {
    if (this.sam === undefined || this.embeddings === undefined) {
      throw new Error("Tried running Post processor without initializing, please call init first");
    }

    const output = await this.sam.runDecoder(this.embeddings, {
      ouputConfig: { type: "polygon" },
      image: undefined,
      boxes: undefined,
      points: points.map((p) => ({ x: p.x, y: p.y, positive: true })),
    });

    return postprocessingDebugger(this.cv, {
      // @ts-expect-error TODO
      masks: output.masks,
      // @ts-expect-error TODO
      iouPredictions: output.iouPredictions,
      encodingOutput: this.embeddings,
      sizes: {
        width: this.embeddings.newWidth,
        height: this.embeddings.newHeight,
        originalWidth: this.embeddings.originalWidth,
        originalHeight: this.embeddings.originalHeight,
      },
    });
  }
}

const WorkerApi = {
  build: async (imageData: ImageData, useWebGPU = false, executionProviders?: ExecutionProviders) => {
    const cv = await OpenCVLoader();
    const debug = new Debugger(cv, useWebGPU, executionProviders);
    await debug.init(imageData);

    return proxy(debug);
  },
};

expose(WorkerApi);

export type SegmentAnythingDebuggerWorker = typeof WorkerApi;

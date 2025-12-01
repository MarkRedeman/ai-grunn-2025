import { OpenCVLoader } from "@geti/smart-tools";
import type { OpenCVTypes } from "@geti/smart-tools/opencv";
import { expose, proxy } from "comlink";

import { matToImageData } from "./../utils";

const TARGET_SIZE = 1024;

interface PreprocessStep {
  name: string;
  mat: ImageData;
}

export function preprocessingDebugger(cv: OpenCVTypes, imageData: ImageData): Array<PreprocessStep> {
  // Step 1: Original image
  const original = cv.matFromImageData(imageData);

  // Step 2: Remove alpha channel
  const noAlpha = original.clone();
  cv.cvtColor(noAlpha, noAlpha, cv.COLOR_RGBA2RGB);

  const data: Array<PreprocessStep> = [
    {
      name: "Original Image (RGB)",
      mat: matToImageData(cv, noAlpha),
    },
  ];

  // Step 3: Normalize colors
  const normalized = noAlpha.clone();
  const normalizedData = normalized.data;

  // ImageNet normalization constants
  const IMAGENET_MEAN = [0.485, 0.456, 0.406];
  const IMAGENET_STD = [0.229, 0.224, 0.225];
  const OTHER = 127.5;

  // Convert to [0,1], apply normalization, convert back to [0,255]
  for (let i = 0; i < normalizedData.length; i += 3) {
    const r = normalizedData[i] / 255.0;
    const g = normalizedData[i + 1] / 255.0;
    const b = normalizedData[i + 2] / 255.0;

    normalizedData[i] = Math.round(((r - IMAGENET_MEAN[0]) / IMAGENET_STD[0] + 1) * OTHER);
    normalizedData[i + 1] = Math.round(((g - IMAGENET_MEAN[1]) / IMAGENET_STD[1] + 1) * OTHER);
    normalizedData[i + 2] = Math.round(((b - IMAGENET_MEAN[2]) / IMAGENET_STD[2] + 1) * OTHER);
  }

  data.push({
    name: "Normalize Colors",
    mat: matToImageData(cv, normalized),
  });

  // Step 4: Resize
  const resized = normalized.clone();
  const scale = Math.min(TARGET_SIZE / resized.cols, TARGET_SIZE / resized.rows);
  const newWidth = Math.ceil(resized.cols * scale);
  const newHeight = Math.ceil(resized.rows * scale);

  cv.resize(resized, resized, new cv.Size(newWidth, newHeight), 0, 0, cv.INTER_LANCZOS4);

  data.push({
    name: "Resize",
    mat: matToImageData(cv, resized),
  });

  // Step 5: Pad to 1024×1024
  const padded = resized.clone();
  cv.copyMakeBorder(
    padded,
    padded,
    0,
    TARGET_SIZE - newHeight,
    0,
    TARGET_SIZE - newWidth,
    cv.BORDER_CONSTANT,
    new cv.Scalar(0, 0, 0)
  );

  data.push({
    name: "Add padding",
    mat: matToImageData(cv, padded),
  });

  // Cleanup
  original.delete();
  noAlpha.delete();
  normalized.delete();
  resized.delete();
  padded.delete();

  return data;
}

class PreProcessingDebugger {
  constructor(private cv: OpenCVTypes) {}

  run(imageData: ImageData) {
    return preprocessingDebugger(this.cv, imageData);
  }
}

const WorkerApi = {
  build: async () => {
    const cv = await OpenCVLoader();

    const instance = new PreProcessingDebugger(cv);

    return proxy(instance);
  },
};

export type PreProcessingDebuggerWorker = typeof WorkerApi;

expose(WorkerApi);

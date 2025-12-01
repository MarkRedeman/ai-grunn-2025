import type { OpenCVTypes } from "@geti/smart-tools/opencv";

import { matToImageData } from "../utils";

type Point = { x: number; y: number };
type Rect = { x: number; y: number; width: number; height: number };
type Polygon = Array<Point>;

export interface GrabCutStep {
  step: number;
  name: string;
  mat: ImageData; // The cv.Mat to display
  data: null | { polygons: Array<Polygon> } | { rect: Rect }; // Optional additional data
}

const approximateShape = (CV: OpenCVTypes.cv, contour: OpenCVTypes.Mat, isClose = true): OpenCVTypes.Mat => {
  // NOTE: normally we would put epsilon to about 1.0, but we set it
  // to 4.0 to emphasize its effect
  const epsilon = 4.0;
  const newContour = new CV.Mat();

  CV.approxPolyDP(contour, newContour, epsilon, isClose);

  return newContour;
};

// The generator function (same as before)
export function grabcutSimpleDebug(cv: OpenCVTypes, imageData: ImageData, rect: Rect): Array<GrabCutStep> {
  // Load image and remove alpha channel
  const img = cv.matFromImageData(imageData);
  cv.cvtColor(img, img, cv.COLOR_RGBA2RGB);

  const data: Array<GrabCutStep> = [
    {
      step: 1,
      name: "Select region of interest",
      mat: matToImageData(cv, img),
      data: { rect },
    },
  ];

  // Initialize models
  const mask = new cv.Mat();
  const bgdModel = new cv.Mat();
  const fgdModel = new cv.Mat();

  // Run GrabCut with rectangle initialization
  const cvRect = new cv.Rect(rect.x, rect.y, rect.width, rect.height);
  cv.grabCut(img, mask, cvRect, bgdModel, fgdModel, 2, cv.GC_INIT_WITH_RECT);

  // Colorize the mask for visualization
  const colorizedMask = new cv.Mat(mask.rows, mask.cols, cv.CV_8UC3);
  const maskData = mask.data;
  const colorData = colorizedMask.data;

  for (let i = 0; i < maskData.length; i++) {
    const value = maskData[i];
    const pixelIdx = i * 3;

    switch (value) {
      case 0: // GC_BGD - black
        colorData[pixelIdx] = 0;
        colorData[pixelIdx + 1] = 0;
        colorData[pixelIdx + 2] = 0;
        break;
      case 1: // GC_FGD - blue
        colorData[pixelIdx] = 255;
        colorData[pixelIdx + 1] = 0;
        colorData[pixelIdx + 2] = 0;
        break;
      case 2: // GC_PR_BGD - moss-tint-1
        colorData[pixelIdx] = 0;
        colorData[pixelIdx + 1] = 55;
        colorData[pixelIdx + 2] = 124;
        break;
      case 3: // GC_PR_FGD - brand daisy
        colorData[pixelIdx] = 233;
        colorData[pixelIdx + 1] = 97;
        colorData[pixelIdx + 2] = 21;
        break;
    }
  }

  // Blend overlay with original image using manual loop
  const blended = img.clone();
  const blendedData = blended.data;
  const alpha = 0.9; // 20% opacity
  for (let i = 0; i < blendedData.length; i++) {
    blendedData[i] = Math.round(blendedData[i] * (1 - alpha) + colorData[i] * alpha);
  }

  data.push({
    step: 2,
    name: "Call GrabCut",
    mat: matToImageData(cv, blended),
    data: null,
  });

  // Extract foreground (combine GC_FGD + GC_PR_FGD)
  const threshold = new cv.Mat();
  cv.threshold(mask, threshold, cv.GC_PR_BGD, 255, cv.THRESH_BINARY);

  data.push({
    step: 3,
    name: "Thresholded Mask",
    mat: matToImageData(cv, threshold),
    data: null,
  });

  // Find contours
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(threshold, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

  //  Draw all contours with colors
  const contoursAsPolygons = [];
  for (let contourIdx = 0; contourIdx < contours.size(); contourIdx++) {
    const maxContour = contours.get(contourIdx);
    // Convert contour to points
    const points: Point[] = [];
    for (let i = 0; i < maxContour.rows; i++) {
      const x = Math.round(maxContour.intAt(i, 0));
      const y = Math.round(maxContour.intAt(i, 1));
      points.push({ x, y });
    }
    contoursAsPolygons.push(points);
  }
  data.push({
    step: 4,
    name: "Mask to Contours",
    mat: matToImageData(cv, threshold),
    data: {
      polygons: contoursAsPolygons,
    },
  });

  // Get largest contour
  let maxContour = contours.get(0);
  let maxArea = cv.contourArea(maxContour);
  let maxIdx = 0;

  for (let i = 1; i < contours.size(); i++) {
    const area = cv.contourArea(contours.get(i));
    if (area > maxArea) {
      maxArea = area;
      maxContour = contours.get(i);
      maxIdx = i;
    }
  }

  console.log("contours", { maxArea, maxContour, maxIdx, size: contours.size() }, rect);

  data.push({
    step: 5,
    name: "Pick largest contour",
    mat: matToImageData(cv, img),
    data: {
      polygons: [contoursAsPolygons[maxIdx]],
    },
  });

  const maxAPproximateContour = approximateShape(cv, maxContour);
  // Convert contour to points
  const points: Point[] = [];
  for (let i = 0; i < maxAPproximateContour.rows; i++) {
    const x = Math.round(maxAPproximateContour.intAt(i, 0));
    const y = Math.round(maxAPproximateContour.intAt(i, 1));
    points.push({ x, y });
  }

  data.push({
    step: 6,
    name: "Optimize polygon",
    mat: matToImageData(cv, img),
    data: {
      polygons: [points],
    },
  });

  console.log("cleaning up");
  // Cleanup
  img.delete();
  mask.delete();
  bgdModel.delete();
  fgdModel.delete();
  threshold.delete();
  contours.delete();
  hierarchy.delete();
  colorizedMask.delete();
  maxContour.delete();
  console.log("cleaned up");

  return data;
}

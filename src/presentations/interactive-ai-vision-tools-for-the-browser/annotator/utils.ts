import type { OpenCVTypes } from "@geti/smart-tools/opencv";
import { useCallback, useRef } from "react";

type ElementType = SVGElement | HTMLDivElement;
export const getRelativePoint = (element: ElementType, point: Point, zoom: number): Point => {
  const rect = element.getBoundingClientRect();

  return {
    x: Math.round((point.x - rect.left) / zoom),
    y: Math.round((point.y - rect.top) / zoom),
  };
};

function clampBetween(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
type Point = { x: number; y: number };
export function clampPointBetweenImage(image: ImageData): (point: Point) => Point {
  const roi = { x: 0, y: 0, width: image.width, height: image.height };

  return ({ x, y }: Point): Point => {
    return {
      x: clampBetween(roi.x, x, roi.x + roi.width),
      y: clampBetween(roi.y, y, roi.y + roi.height),
    };
  };
}

// Wrap an async function that can be called multiple times, but only invokes the function
// if it is currently not processing a previous invokation
export function useSingleStackFn<
  Callback extends (...args: Parameters<Callback>) => Promise<Awaited<ReturnType<Callback>>>,
>(fn: Callback) {
  const resolveRef = useRef<() => void>(undefined);
  const rejectRef = useRef<() => void>(undefined);
  const isProcessing = useRef(false);

  const wrappedFn = useCallback(
    async (...args: Parameters<Callback>): Promise<Awaited<ReturnType<Callback>>> => {
      // Wait for the previous function call to be finished
      // eslint-disable-next-line no-async-promise-executor
      await new Promise<void>(async (resolve, reject) => {
        // Continue on if we are not waiting for the result of a previous invokation
        if (!isProcessing.current) {
          return resolve();
        }

        // If the function was invoked while waiting for the previous result then
        // we reject the previous invocation
        if (rejectRef.current) {
          rejectRef.current();
          rejectRef.current = undefined;
          resolveRef.current = undefined;
        }

        // Let the previous invocation resolve this call, or let any subsequent calls
        // cancel this call
        rejectRef.current = reject;
        resolveRef.current = resolve;
      });

      try {
        isProcessing.current = true;
        const result = await fn(...args);
        return result;
      } catch (error) {
        // Reject subsequent invocations as something unexpected made the current invocation fail
        if (rejectRef.current) {
          rejectRef.current();
          rejectRef.current = undefined;
          resolveRef.current = undefined;
        }
        throw error;
      } finally {
        isProcessing.current = false;

        // Resolve any subsequent invocations that were waiting for this function to complete
        if (resolveRef.current) {
          resolveRef.current();
          rejectRef.current = undefined;
          resolveRef.current = undefined;
        }
      }
    },
    [fn]
  );

  return wrappedFn;
}

// Convert any mat to RGBA ImageData for display
export function matToImageData(cv: OpenCVTypes.cv, mat: OpenCVTypes.Mat): ImageData {
  const rgbaImage = new cv.Mat();

  if (mat.channels() === 1) {
    cv.cvtColor(mat, rgbaImage, cv.COLOR_GRAY2RGBA);
  } else if (mat.channels() === 3) {
    cv.cvtColor(mat, rgbaImage, cv.COLOR_RGB2RGBA);
  }

  const imageData = new ImageData(new Uint8ClampedArray(rgbaImage.data), rgbaImage.cols, rgbaImage.rows);

  rgbaImage.delete();
  return imageData;
}

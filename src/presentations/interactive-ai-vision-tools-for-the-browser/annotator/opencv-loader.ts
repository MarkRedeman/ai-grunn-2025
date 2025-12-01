// Copyright (C) 2022-2025 Intel Corporation
// LIMITED EDGE SOFTWARE DISTRIBUTION LICENSE
import type { OpenCVTypes } from "@geti/smart-tools/opencv";

const READY_CHECK_INTERVAL = 100; // ms
const OPENCV_LOAD_TIMEOUT = 30000; // 30 seconds

let opencv: OpenCVTypes | null = null;
let loadingPromise: Promise<OpenCVTypes> | null = null;

/**
 * Simple delay utility
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wait for cv.ready to be available with polling
 * Some OpenCV builds delay initialization of cv.ready
 */
async function waitForOpenCVReady(cv: OpenCVTypes): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < OPENCV_LOAD_TIMEOUT) {
    // Check if cv.ready exists and is a Promise-like object
    if (cv && typeof cv.ready === "object" && "then" in cv.ready) {
      try {
        await cv.ready;
        return; // Success
      } catch (error) {
        console.error("Error waiting for cv.ready:", error);
        throw error;
      }
    }

    // Check if cv.ready is already resolved (some builds may have it pre-resolved)
    if (cv && cv.onload && typeof cv.onload === "function") {
      return;
    }

    // cv.ready not available yet, wait and retry
    await delay(READY_CHECK_INTERVAL);
  }

  throw new Error(
    `Timeout waiting for cv.ready (${OPENCV_LOAD_TIMEOUT}ms). ` +
      "OpenCV may not be properly built or the file is corrupted."
  );
}

export const OpenCVLoader = async (): Promise<OpenCVTypes> => {
  if (opencv) return opencv;
  if (loadingPromise) return loadingPromise;

  loadingPromise = Promise.race([
    (async () => {
      try {
        // @ts-expect-error Ignore this for now
        const cv: OpenCVTypes = await import("@open-cv");

        // Wait for cv.ready with polling and timeout
        await waitForOpenCVReady(cv);

        if (!cv.Mat) {
          throw new Error("OpenCV missing essential methods");
        }
        opencv = cv;
        return opencv;
      } catch (error) {
        loadingPromise = null;
        throw error;
      }
    })(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`OpenCV loading timeout (${OPENCV_LOAD_TIMEOUT}ms)`)), OPENCV_LOAD_TIMEOUT)
    ),
  ]);

  return loadingPromise;
};

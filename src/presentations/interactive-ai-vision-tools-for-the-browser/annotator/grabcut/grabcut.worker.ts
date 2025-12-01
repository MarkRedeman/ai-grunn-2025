import { OpenCVLoader } from "@geti/smart-tools";
import type { OpenCVTypes } from "@geti/smart-tools/opencv";
import { expose, proxy } from "comlink";
import { v4 as uuidv4 } from "uuid";

import type { Annotation } from "../types";
import { grabcutSimpleDebug } from "./grabcut";

type Rect = { x: number; y: number; width: number; height: number };

class GrabcutDebugger {
  constructor(private cv: OpenCVTypes) {}

  run(imageData: ImageData, rect: Rect) {
    const data = grabcutSimpleDebug(this.cv, imageData, rect);

    return data.map((d) => {
      const polygons = d.data && "polygons" in d.data ? d.data.polygons : [];

      const annotations: Array<Annotation> =
        d.step === 1
          ? [
              {
                id: uuidv4(),
                labels: [],
                shape: { type: "bounding-box", ...rect },
              },
            ]
          : polygons.map((points) => {
              return {
                id: uuidv4(),
                labels: [],
                shape: { type: "polygon", points },
              };
            });

      return {
        ...d,
        annotations,
      };
    });
  }
}

const WorkerApi = {
  build: async () => {
    const cv = await OpenCVLoader();

    const instance = new GrabcutDebugger(cv);

    return proxy(instance);
  },
};

export type GrabcutDebuggerWorker = typeof WorkerApi;

expose(WorkerApi);

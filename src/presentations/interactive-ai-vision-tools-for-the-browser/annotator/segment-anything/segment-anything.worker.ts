import type { ExecutionProviders } from "@geti/smart-tools/segment-anything";
import { buildSegmentAnythingInstance } from "@geti/smart-tools/segment-anything";
import { expose, proxy } from "comlink";

const WorkerApi = {
  build: async (useWebGPU = false, executionProviders?: ExecutionProviders) => {
    console.log("[SAM]", { useWebGPU, executionProviders });

    console.time("[SAM] Build instance");
    const sam = await buildSegmentAnythingInstance(useWebGPU, executionProviders);
    console.timeEnd("[SAM] Build instance");

    console.time("[SAM] Init encoder");
    await sam.init("SEGMENT_ANYTHING_ENCODER");
    console.timeEnd("[SAM] Init encoder");

    console.time("[SAM] Init decoder");
    await sam.init("SEGMENT_ANYTHING_DECODER");
    console.time("[SAM] Init decoder");

    return proxy(sam);
  },
};

expose(WorkerApi);

export type SegmentAnythingWorker = typeof WorkerApi;

import IntroEggs from "@/assets/aigrunn/geti-eggs/cropped-eggs.png";
import { IntelSlide as Slide } from "@/components/slides/slide";
import type { ExecutionProviders } from "@geti/smart-tools/segment-anything";
import { useQuery } from "@tanstack/react-query";
import { wrap } from "comlink";
import { invariant } from "outvariant";
import type { CSSProperties, Dispatch, SetStateAction} from "react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type { SegmentAnythingResult } from "../../../../../packages/smart-tools/src/segment-anything/interfaces";
import { Annotations } from "../../annotator/annotations/annotations";
import { HoveredProvider } from "../../annotator/annotations/hovered";
import { useImageDataQuery } from "../../annotator/load-media";
import type { SegmentAnythingWorker } from "../../annotator/segment-anything/segment-anything.worker";
import type { Annotation, Point } from "../../annotator/types";
import { clampPointBetweenImage, useSingleStackFn } from "../../annotator/utils";
import { getRelativePoint } from "../../annotator/utils";
import { HighlightPolygons } from "../../components/highlight-polygons";
import { WasmIcon, WebGPUIcon, WebNNNetworkIcon } from "../../components/icons";
import { ImageCanvas } from "../../components/image-canvas";
import { ToggleGroup, ToggleGroupItem } from "../../components/toggle-buttons";
import { UploadImageButton } from "../../components/upload-image-button";
import { ZoomProvider, useZoom } from "./../../annotator/zoom/zoom";
import { ZoomTransform } from "./../../annotator/zoom/zoom-transform";
import { Layout, TitleHeading } from "./../../layouts/default";

const hasWebGPU = await (async () => {
  try {
    // @ts-expect-error TODO
    const adapter = await navigator.gpu?.requestAdapter();
    return !!adapter;
  } catch {
    return false;
  }
})();

function useSegmentAnytingWorker(workerOptions: { webGpu: boolean; executionProviders: ExecutionProviders }) {
  return useQuery({
    queryKey: ["workers", "segment-anything", workerOptions],
    queryFn: async () => {
      const worker = wrap<SegmentAnythingWorker>(
        new Worker(new URL("./../../annotator/segment-anything/segment-anything.worker.ts", import.meta.url), {
          type: "module",
        })
      );

      const startTime = Date.now();
      const samWorker = await worker.build(workerOptions.webGpu, workerOptions.executionProviders);

      return {
        worker: samWorker,
        initializationTime: Date.now() - startTime,
      };
    },
    staleTime: Infinity,
  });
}

function useDecoderFn(executionProviders: DefinedExecutionProviders, imageId: string, imageData: ImageData) {
  const workerOptions = {
    webGpu: !executionProviders.some((ep) => (typeof ep === "string" ? ep === "cpu" : ep.name === "cpu")),
    executionProviders,
  };

  const workerQuery = useSegmentAnytingWorker(workerOptions);
  const encodingQuery = useQuery({
    queryKey: ["demo", "segment-anything", workerOptions, "process-encoding", imageId],
    queryFn: async () => {
      invariant(workerQuery.data, "worker should be loaded");

      console.time("[SAM-UI] Encoding");
      const result = await workerQuery.data.worker.processEncoder(imageData);
      console.timeEnd("[SAM-UI] Encoding");

      return result;
    },
    retry: 0,
    staleTime: Infinity,
    enabled: workerQuery.data !== undefined,
  });

  return {
    decoder: useSingleStackFn(async (point: Point | null): Promise<SegmentAnythingResult> => {
      if (workerQuery.data === undefined || encodingQuery.data === undefined) {
        return Promise.reject();
      }

      if (point === null) {
        return { areas: [], maxContourIdx: 0, shapes: [] };
      }

      console.time("[SAM-UI] Decoding");
      const result = await workerQuery.data.worker.processDecoder(encodingQuery.data, {
        image: undefined,
        points: [{ positive: true, x: point.x, y: point.y }],
        boxes: [],
        ouputConfig: { type: "polygon" },
      });
      console.timeEnd("[SAM-UI] Decoding");

      return result;
    }),
    loading: workerQuery.isLoading || encodingQuery.isLoading,
  };
}

function HoverPoint({ image, onHover }: { image: ImageData; onHover: (point: Point | null) => void }) {
  const ref = useRef<SVGRectElement>(null);
  const { scale } = useZoom();

  return (
    <rect
      ref={ref}
      fill="none"
      stroke="none"
      pointerEvents={"all"}
      width={image.width}
      height={image.height}
      onPointerLeave={() => {
        onHover(null);
      }}
      onPointerMove={(event) => {
        if (ref.current === null) {
          return;
        }

        const clampPoint = clampPointBetweenImage(image);
        const point = clampPoint(getRelativePoint(ref.current, { x: event.clientX, y: event.clientY }, scale));

        onHover({ x: Math.round(point.x), y: Math.round(point.y) });
      }}
    />
  );
}

function SegmentAnythingDemoCanvas({
  imageData,
  imageId,
  executionProviders,
  showPolygons,
}: {
  imageData: ImageData;
  imageId: string;

  executionProviders: DefinedExecutionProviders;
  showPolygons: boolean;
}) {
  const width = imageData.width;
  const height = imageData.height;

  const { loading, decoder: decoderFn } = useDecoderFn(executionProviders, imageId, imageData);
  const [previewAnnotations, setPreviewAnnotations] = useState<Array<Annotation>>([]);
  const [point, setPoint] = useState<Point | null>(null);
  const computePreview = (point: Point | null) => {
    async function compute(point: Point | null) {
      try {
        const result = await decoderFn(point);
        setPoint(point);
        setPreviewAnnotations(
          result.shapes.map((shape) => {
            return {
              id: uuidv4(),
              labels: [],
              shape:
                shape.shapeType === "polygon"
                  ? { type: "polygon", points: shape.points }
                  : { type: "circle", cx: 0, cy: 0, r: 0 },
            };
          })
        );
      } catch {
        // ... ignore
      }
    }
    compute(point);
  };

  return (
    <ZoomProvider>
      <ZoomTransform target={{ width, height }}>
        <HoveredProvider forceHover={new Set(previewAnnotations.map(({ id }) => id))}>
          <div className="grid [grid-template-areas:'innercanvas'] w-full h-full items-center justify-items-center">
            <div className={`[grid-area:innercanvas] ${loading ? "shimmer" : ""}`}>
              <ImageCanvas imageId={imageId} image={imageData} />
            </div>

            <div
              className="[grid-area:innercanvas]"
              style={
                {
                  "--mask-opacity": point === null ? 0 : 0.6,
                } as CSSProperties
              }
            >
              <Annotations annotations={previewAnnotations} width={width} height={height}>
                {showPolygons && (
                  <HighlightPolygons
                    highlightedPolygons={previewAnnotations
                      .map(({ shape }) => shape)
                      .filter((shape) => shape.type === "polygon")}
                  />
                )}
                {point && <circle cx={point.x} cy={point.y} r={10} />}
                <HoverPoint image={imageData} onHover={computePreview} />
              </Annotations>
            </div>
          </div>
        </HoveredProvider>
      </ZoomTransform>
    </ZoomProvider>
  );
}

type DefinedExecutionProviders = Exclude<ExecutionProviders, undefined>;
function SelectExecutionProvider({
  executionProviders,
  setExecutionProviders,
}: {
  executionProviders: DefinedExecutionProviders;
  setExecutionProviders: Dispatch<SetStateAction<DefinedExecutionProviders>>;
}) {
  const isWasm = executionProviders.some((ep) => (typeof ep === "string" ? ep === "cpu" : ep.name === "cpu"));
  const isWebGPU = executionProviders.some((ep) => (typeof ep === "string" ? ep === "webgpu" : ep.name === "webgpu"));
  const isWebNN = executionProviders.some((ep) => {
    if (typeof ep === "string") {
      return ep === "webnn";
    } else {
      return ep.name === "webnn";
    }
  });

  type DeviceType = "cpu" | "gpu" | "npu";
  const [deviceType, setDeviceType] = useState<DeviceType>("cpu");

  const selectedKeys = isWasm ? new Set(["wasm"]) : isWebGPU ? new Set(["webgpu"]) : new Set(["webnn"]);

  const isWebGPUEnabled = hasWebGPU;
  // @ts-expect-error TODO
  const isWebNNEnabled = typeof navigator.ml !== "undefined";

  return (
    <div className="flex gap-4">
      <ToggleGroup
        aria-label="Runtime"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          if (keys.has("wasm")) {
            setExecutionProviders([{ name: "cpu" }]);
          }
          if (keys.has("webgpu")) {
            setExecutionProviders([{ name: "webgpu" }]);
          }
          if (keys.has("webnn")) {
            setExecutionProviders([{ name: "webnn", deviceType }]);
          }
        }}
      >
        <ToggleGroupItem id="wasm">
          <WasmIcon className={"w-20 h-20 fill-[#654FF0]"} />
        </ToggleGroupItem>
        <ToggleGroupItem id="webgpu" isDisabled={isWebGPUEnabled === false}>
          <WebGPUIcon className={"w-20 h-20 fill-[#005A9C]"} />
        </ToggleGroupItem>
        <ToggleGroupItem id="webnn" isDisabled={isWebNNEnabled === false}>
          <WebNNNetworkIcon className={"w-20 h-20"} />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        orientation="vertical"
        className={isWebNN ? "" : "invisible"}
        selectedKeys={new Set([deviceType])}
        onSelectionChange={(keys) => {
          if (keys.has("cpu")) {
            setDeviceType("cpu");
            setExecutionProviders([{ name: "webnn", deviceType: "cpu" }]);
          }
          if (keys.has("gpu")) {
            setDeviceType("gpu");
            setExecutionProviders([{ name: "webnn", deviceType: "gpu" }]);
          }
          if (keys.has("npu")) {
            setDeviceType("npu");
            setExecutionProviders([{ name: "webnn", deviceType: "npu" }]);
          }
        }}
      >
        <ToggleGroupItem id="cpu">CPU</ToggleGroupItem>
        <ToggleGroupItem id="gpu">GPU</ToggleGroupItem>
        <ToggleGroupItem id="npu">NPU</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export function SAMDemo() {
  const src = IntroEggs;
  const { data: originalImageData } = useImageDataQuery(src);

  const [{ imageId, imageData }, setImage] = useState({ imageId: uuidv4(), imageData: originalImageData });
  const [showPolygons, setShowPolygons] = useState(false);
  const [executionProviders, setExecutionProviders] = useState<DefinedExecutionProviders>([{ name: "cpu" }]);

  return (
    <Slide>
      <Layout
        heading={<TitleHeading title="Demo" subtitle="Smart tools with Neural Networks" />}
        withoutBleed
        aside={
          <div className="row-start-0 flex items-center gap-8 p-4 w-full h-full pr-[5vh]">
            <div>
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  name="points"
                  checked={showPolygons}
                  onChange={() => {
                    setShowPolygons(!showPolygons);
                  }}
                />
                <span>Show polygons</span>
              </label>
            </div>

            <UploadImageButton
              onUpload={(newImageData) => {
                setImage({ imageData: newImageData, imageId: uuidv4() });
              }}
            />
            <SelectExecutionProvider
              executionProviders={executionProviders}
              setExecutionProviders={setExecutionProviders}
            />
          </div>
        }
      >
        <div className="grid grid-rows-subgrid grid-cols-[1fr_auto] gap-4 h-full min-h-0">
          <SegmentAnythingDemoCanvas
            imageId={imageId}
            imageData={imageData}
            executionProviders={executionProviders}
            showPolygons={showPolygons}
          />
        </div>
      </Layout>
    </Slide>
  );
}

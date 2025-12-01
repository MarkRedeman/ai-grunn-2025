import EggsThumbnail from "@/assets/aigrunn/geti-eggs/eggs-thumbnail.png";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { wrap } from "comlink";
import type { ReactNode } from "react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Stepper } from "spectacle";
import { v4 as uuidv4 } from "uuid";

import { Annotations, DEFAULT_ANNOTATION_STYLES } from "../../annotator/annotations/annotations";
import { EditBoundingBox } from "../../annotator/annotations/edit-annotation";
import { HoveredProvider } from "../../annotator/annotations/hovered";
import { MaskAnnotations } from "../../annotator/annotations/masked";
import type { GrabcutDebuggerWorker } from "../../annotator/grabcut/grabcut.worker";
import { useImageDataQuery } from "../../annotator/load-media";
import { ZoomProvider } from "../../annotator/zoom/zoom";
import { ZoomTransform } from "../../annotator/zoom/zoom-transform";
import { Card } from "../../components/cards";
import { HighlightPolygons } from "../../components/highlight-polygons";
import { UploadImageButton } from "../../components/upload-image-button";
import { Layout, TitleHeading } from "./../../layouts/default";

type Rect = { x: number; y: number; width: number; height: number };

function DemoProviders({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  return (
    <ZoomProvider>
      <ZoomTransform target={{ width, height }}>
        <HoveredProvider>
          <div className="grid [grid-template-areas:'innercanvas']  items-center justify-items-center">{children}</div>
        </HoveredProvider>
      </ZoomTransform>
    </ZoomProvider>
  );
}

function useGrabcutWorker() {
  return useSuspenseQuery({
    queryKey: ["workers", "grabcut", "debugger"],
    queryFn: async () => {
      const worker = wrap<GrabcutDebuggerWorker>(
        new Worker(new URL("./../../annotator/grabcut/grabcut.worker.ts", import.meta.url), {
          type: "module",
        })
      );

      return await worker.build();
    },
    staleTime: Infinity,
  });
}

function Internal({ rect, step, setRect }: { step: number; setRect: (rect: Rect) => void; rect: Rect }) {
  const src = EggsThumbnail;
  const { data: originalImageData } = useImageDataQuery(src);
  const [{ imageId, imageData }, setImage] = useState({ imageId: uuidv4(), imageData: originalImageData });

  const { data: worker } = useGrabcutWorker();
  const grabcutQuery = useQuery({
    queryKey: ["grabcut", "image", "result", imageId, rect],
    queryFn: async () => {
      console.time("[GRABCUT]");
      const result = await worker.run(imageData, rect);
      console.timeEnd("[GRABCUT]");
      return result;
    },
    retry: 0,
    gcTime: Infinity,
    staleTime: Infinity,
    placeholderData: (prev) => prev,
  });

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  useEffect(() => {
    grabcutQuery.data?.forEach((grabCutStep, idx) => {
      const canvas = canvasRefs.current[idx];
      if (canvas) {
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.putImageData(grabCutStep.mat, 0, 0);
        }
      }
    });
  }, [grabcutQuery.data, imageData.width, imageData.height]);

  return (
    <div className="grid grid-cols-3 gap-4 max-h-full h-full min-h-0  items-start justify-items-center justify-stretch ">
      {/* The naive Grabcut implementation inthese slides is slow on high res images
          so we hide the upload image button by default
        */}
      <div className="hidden absolute right-[7em] top-[2em]">
        <UploadImageButton
          onUpload={(newImageData) => {
            setImage({ imageData: newImageData, imageId: uuidv4() });

            const width = Math.min(200, newImageData.width / 2);
            const height = Math.min(200, newImageData.height / 2);

            // Reset rect to the middle of the image
            setRect({
              x: Math.round(newImageData.width / 2 - width / 2),
              y: Math.round(newImageData.height / 2 - height / 2),
              width,
              height,
            });
          }}
        />
      </div>
      {grabcutQuery.data?.map((grabCutStep, idx) => {
        const active = step > idx;
        const annotations = grabCutStep.annotations;

        return (
          <Card key={idx} className={active === false ? "grayscale" : ""} header={<span>{grabCutStep.name}</span>}>
            <div className={`w-[350px] h-[350px]`}>
              <DemoProviders width={imageData.width} height={imageData.height}>
                <div className="[grid-area:innercanvas]">
                  <canvas
                    ref={(el) => {
                      canvasRefs.current[idx] = el;
                    }}
                    width={imageData.width}
                    height={imageData.height}
                    className="max-w-full border border-gray-300 rounded"
                  />
                </div>
                <div className="[grid-area:innercanvas]">
                  {grabCutStep.step === 1 ? (
                    <svg
                      width={imageData.width}
                      height={imageData.height}
                      style={{
                        ...DEFAULT_ANNOTATION_STYLES,
                        strokeWidth: "calc(4px / var(--zoom-scale))",
                        stroke: "var(--color-energy-blue-shade-2)",
                      }}
                    >
                      <MaskAnnotations annotations={annotations} width={imageData.width} height={imageData.height}>
                        <EditBoundingBox
                          roi={{ x: 0, y: 0, width: imageData.width, height: imageData.height }}
                          annotation={{ id: uuidv4(), labels: [], shape: { type: "bounding-box", ...rect } }}
                          onComplete={setRect}
                        >
                          <></>
                        </EditBoundingBox>
                      </MaskAnnotations>
                    </svg>
                  ) : (
                    <Annotations
                      annotations={grabCutStep.step === 1 ? [] : annotations}
                      width={imageData.width}
                      height={imageData.height}
                      style={{
                        strokeWidth: "calc(2px / var(--zoom-scale))",
                        stroke: "var(--color-energy-blue-shade-2)",
                      }}
                    >
                      <HighlightPolygons
                        highlightedPolygons={
                          grabCutStep.step > 4
                            ? annotations.map(({ shape }) => shape).filter((shape) => shape.type === "polygon")
                            : []
                        }
                        style={{ pointerEvents: "none" }}
                      />
                    </Annotations>
                  )}
                </div>
              </DemoProviders>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export function UsingOpenCVToImplementGrabcut() {
  const [rect, setRect] = useState({ x: 61, y: 60, width: 184, height: 225 });

  return (
    <Slide>
      <Layout heading={<TitleHeading title="Using OpenCV to implement Grabcut" subtitle="Smart tools with OpenCV" />}>
        <Stepper alwaysVisible values={[0, 1, 2, 3, 4, 5]} activeStyle={{ height: "100%" }}>
          {(_, step) => {
            return (
              <Suspense fallback={<div>Loading</div>}>
                <Internal rect={rect} step={step + 1} setRect={setRect} />
              </Suspense>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

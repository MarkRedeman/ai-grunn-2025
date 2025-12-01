import EggsThumbnail from "@/assets/aigrunn/geti-eggs/eggs-thumbnail.png";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { useSuspenseQuery } from "@tanstack/react-query";
import { wrap } from "comlink";
import { Suspense, useEffect, useRef, useState } from "react";
import { Stepper } from "spectacle";
import { v4 } from "uuid";

import { AnnotationShape } from "../../annotator/annotations/annotation-shape";
import { AnnotationContext, DEFAULT_ANNOTATION_STYLES } from "../../annotator/annotations/annotations";
import { HoverableAnnotation, HoveredProvider } from "../../annotator/annotations/hovered";
import { MaskAnnotations } from "../../annotator/annotations/masked";
import { useImageDataQuery } from "../../annotator/load-media";
import type { SegmentAnythingDebuggerWorker } from "../../annotator/segment-anything/post-processing-debugger.worker";
import type { Annotation } from "../../annotator/types";
import { ZoomProvider } from "../../annotator/zoom/zoom";
import { ZoomTransform } from "../../annotator/zoom/zoom-transform";
import { Card } from "../../components/cards";
import { HighlightPolygons } from "../../components/highlight-polygons";
import { ImageCanvas } from "../../components/image-canvas";
import { Layout, TitleHeading } from "./../../layouts/default";

type Point = { x: number; y: number };

interface ImageDataGalleryProps {
  images: ImageData[];
  scores: number[];
  step: number;
  highestScoreIndex: number;
}

function LargestMaskToConour({
  imageData,
  step,
  polygonPoints,
}: {
  step: number;
  imageData: ImageData;
  polygonPoints: Point[];
}) {
  const width = imageData.width;
  const height = imageData.height;

  const annotations = [
    { id: v4(), labels: [], shape: { type: "polygon", points: polygonPoints } },
  ] satisfies Array<Annotation>;

  return (
    <Card
      className="max-w-[600px] max-h-[600px] place-self-center"
      header={<span className="text-white">Largest mask to contour</span>}
      active
      bordered
    >
      <div className={`bg-white w-full flex justify-center items-center h-[500px]`}>
        <ZoomProvider>
          <ZoomTransform target={{ width: imageData.width, height: imageData.height }}>
            <div className="grid [grid-template-areas:'innercanvas']  items-center justify-items-center">
              {step > 4 && (
                <div className="[grid-area:innercanvas]">
                  <img src={EggsThumbnail} width={1024} />
                </div>
              )}
              <div className="[grid-area:innercanvas]" style={{ opacity: step > 4 ? (step > 5 ? 0.0 : 0.8) : 1.0 }}>
                <ImageCanvas image={imageData} />
              </div>
              <div className="[grid-area:innercanvas]">
                <HoveredProvider>
                  <svg
                    width={width}
                    height={height}
                    style={{
                      ...DEFAULT_ANNOTATION_STYLES,
                      fillOpacity: 0.2,
                      fill: "var(--color-purple-800)",
                      strokeWidth: "calc(2px / var(--zoom-scale))",
                      stroke: "var(--color-cyan-900)",
                    }}
                  >
                    {step > 4 && (
                      <HighlightPolygons highlightedPolygons={[{ type: "polygon" as const, points: polygonPoints }]} />
                    )}
                    {step > 7 && (
                      <MaskAnnotations height={height} width={width} annotations={annotations}>
                        {annotations.map((annotation) => (
                          <AnnotationContext.Provider value={annotation}>
                            <HoverableAnnotation>
                              <AnnotationShape />
                            </HoverableAnnotation>
                          </AnnotationContext.Provider>
                        ))}
                      </MaskAnnotations>
                    )}
                  </svg>
                </HoveredProvider>
              </div>
            </div>
          </ZoomTransform>
        </ZoomProvider>
      </div>
    </Card>
  );
}

export function ImageDataGallery({ highestScoreIndex, images, scores, step }: ImageDataGalleryProps) {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    images.forEach((imageData, index) => {
      const canvas = canvasRefs.current[index];
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.putImageData(imageData, 0, 0);
        }
      }
    });
  }, [images]);

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-full min-h-0 w-full w-min-0 gap-4 place-items-center p-4">
      {images.map((_, index) => (
        <Card
          key={index}
          bordered
          active={highestScoreIndex === index && step > 2}
          className={`w-full max-w-[400px] max-h-[400px] h-full flex flex-col gap-3 pt-4 border-4`}
          header={
            <span className={highestScoreIndex === index && step > 2 ? "text-white" : "text-classical-blue-shade-2"}>
              Score: {scores[index].toFixed(2)}
            </span>
          }
        >
          <div className={`bg-white w-full flex justify-center items-center h-[200px]`}>
            <ZoomProvider>
              <ZoomTransform target={{ width: images[index].width, height: images[index].height }}>
                <ImageCanvas image={images[index]} />
              </ZoomTransform>
            </ZoomProvider>
          </div>
        </Card>
      ))}
    </div>
  );
}

function useSegmentAnytingWorker(imageData: ImageData) {
  return useSuspenseQuery({
    queryKey: ["workers", "post-processing", "debugger"],
    queryFn: async () => {
      const worker = wrap<SegmentAnythingDebuggerWorker>(
        new Worker(new URL("./../../annotator/segment-anything/post-processing-debugger.worker.ts", import.meta.url), {
          type: "module",
        })
      );

      return await worker.build(imageData, false, [{ name: "cpu" }]);
      //return await worker.build(imageData, true, [{ deviceType: "gpu", name: "webnn" }]);
    },
    staleTime: Infinity,
  });
}

function SelectPoint({ imageData, points }: { imageData: ImageData; points: Array<Point> }) {
  const width = imageData.width;
  const height = imageData.height;

  const pointAnnotations = points.map((p) => ({
    id: v4(),
    labels: [],
    shape: { type: "circle", cx: p.x, cy: p.y, r: 10 },
  })) satisfies Array<Annotation>;

  return (
    <Card header={<span>Select a point</span>} className="place-self-center border-4 border-gray-300" bordered>
      <div className={` max-w-[600px] max-h-[600px] `}>
        <ZoomProvider>
          <ZoomTransform target={{ width: imageData.width, height: imageData.height }}>
            <div className="grid [grid-template-areas:'innercanvas']  items-center justify-items-center">
              <div className="[grid-area:innercanvas]">
                <img src={EggsThumbnail} />
              </div>
              <div className="[grid-area:innercanvas]">
                <HoveredProvider>
                  <svg
                    width={width}
                    height={height}
                    style={{
                      ...DEFAULT_ANNOTATION_STYLES,
                      fillOpacity: 1.0,
                      fill: "var(--color-cyan-300)",
                      strokeWidth: "calc(2px / var(--zoom-scale))",
                      stroke: "var(--color-cyan-900)",
                    }}
                  >
                    <MaskAnnotations height={height} width={width} annotations={pointAnnotations}>
                      {points.map((point, idx) => (
                        <AnnotationContext.Provider value={pointAnnotations[idx]} key={idx}>
                          <HoverableAnnotation>
                            <circle key={idx} cx={point.x} cy={point.y} r={10} />
                          </HoverableAnnotation>
                        </AnnotationContext.Provider>
                      ))}
                    </MaskAnnotations>
                  </svg>
                </HoveredProvider>
              </div>
            </div>
          </ZoomTransform>
        </ZoomProvider>
      </div>
    </Card>
  );
}

function Internal({ step }: { step: number }) {
  const src = EggsThumbnail;

  const { data: imageData } = useImageDataQuery(src);
  const workerQuery = useSegmentAnytingWorker(imageData);

  // TODO: check if we can make it interactable
  const [points] = useState([{ x: 300, y: 200, positive: true }]);

  const postProcessQuery = useSuspenseQuery({
    queryKey: ["segment-anything", "post-process", "post-process", "decoding steps", points],
    queryFn: async () => {
      return workerQuery.data.run(points);
    },
    retry: 0,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const scores = postProcessQuery.data.iouScores;
  const images = postProcessQuery.data.allMasksMat;
  const highestScore = Math.max(...scores);
  const highestScoreIndex = scores.findIndex((value) => Number(value) === highestScore);

  return (
    <div className="grid grid-cols-2 gap-4 h-full max-h-full min-h-0  items-start justify-items-center">
      <SelectPoint imageData={imageData} points={points} />

      <div
        className={`w-min-0 w-full h-full min-h-0 ${step < 2 ? "invisible" : ""} place-items-center place-self-center place-content-center`}
      >
        {step > 3 ? (
          <LargestMaskToConour
            imageData={images[highestScoreIndex]}
            step={step}
            polygonPoints={postProcessQuery.data.polygonPoints ?? []}
          />
        ) : (
          postProcessQuery.data && (
            <ImageDataGallery step={step} images={images} scores={scores} highestScoreIndex={highestScoreIndex} />
          )
        )}
      </div>
    </div>
  );
}

export function PostProcessingForDecoder() {
  return (
    <Slide>
      <Layout
        heading={
          <TitleHeading
            title={
              <span>
                Post-processing steps for the <span className="text-emerald-800">decoder</span>
              </span>
            }
            subtitle="Smart tools with Neural Networks"
          />
        }
      >
        <Stepper alwaysVisible values={[0, 1, 2, 3, 4, 5]} activeStyle={{ height: "100%" }}>
          {(_, step) => {
            return (
              <div className="flex flex-col h-full min-h-0 gap-4">
                <Suspense fallback={<div>...</div>}>{step >= 0 && <Internal step={step + 1} />}</Suspense>
              </div>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

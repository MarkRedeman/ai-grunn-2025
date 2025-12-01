import IntroEggs from "@/assets/aigrunn/geti-eggs/cropped-eggs.png";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { useEffect } from "react";
import { Stepper } from "spectacle";

import { Annotations } from "../../annotator/annotations/annotations";
import { HoveredProvider, useSetHoveredAnnotation } from "../../annotator/annotations/hovered";
import type { Annotation } from "../../annotator/types";
import { ZoomProvider } from "../../annotator/zoom/zoom";
import { ZoomTransform } from "../../annotator/zoom/zoom-transform";
import { HighlightPolygons } from "../../components/highlight-polygons";
import { Layout, TitleHeading } from "./../../layouts/default";
import { detectionClassificationAnnotations, segmentationAnnotations } from "./data";

const DETECTION_ANNOTATIONS: Array<Annotation> = detectionClassificationAnnotations.map((annotation) => {
  return {
    id: annotation.id,
    labels: annotation.labels.map((label) => {
      return {
        id: label.id,
        name: "Egg",
        color: "#ff5662ff",
        isPrediction: false,
        score: undefined,
      };
    }),
    shape: {
      type: "bounding-box",
      x: annotation.shape.x,
      y: annotation.shape.y,
      width: annotation.shape.width,
      height: annotation.shape.height,
    },
  };
});

const SEGMENTATION_ANNOTATIONS = segmentationAnnotations.map((annotation) => {
  return {
    id: annotation.id,
    labels: annotation.labels.map((label) => {
      return {
        id: label.id,
        name: "Egg",
        color: "#ff5662ff",
        isPrediction: false,
        score: undefined,
      };
    }),
    shape: {
      type: "polygon",
      points: annotation.shape.points,
    },
  };
}) satisfies Array<Annotation>;

function Focus({ step }: { step: number }) {
  const setHovered = useSetHoveredAnnotation()!;

  useEffect(() => {
    if (step === 0) {
      setHovered(new Set());
    }

    if (step > 0) {
      setHovered(new Set(DETECTION_ANNOTATIONS.map(({ id }) => id)));
    }

    if (step > 1) {
      setHovered(
        new Set(
          DETECTION_ANNOTATIONS.filter((annotation) =>
            annotation.labels.some((label) => label.id === "690f358d4d0462fee98c8b6d")
          ).map(({ id }) => id)
        )
      );
    }

    if (step > 2) {
      setHovered(new Set());
    }
    if (step > 3) {
      setHovered(new Set(SEGMENTATION_ANNOTATIONS.map(({ id }) => id)));
    }

    if (step > 4) {
      setHovered(new Set(SEGMENTATION_ANNOTATIONS.filter((_, idx) => [7, 4, 22].includes(idx)).map(({ id }) => id)));
    }
  }, [step, setHovered]);

  return null;
}

function getAnnotations(step: number): Array<Annotation> {
  if (step < 0) {
    return [];
  }

  if (step === 3) {
    return [];
  }

  return step > 2 ? SEGMENTATION_ANNOTATIONS : DETECTION_ANNOTATIONS;
}

export function TrainingAnAiModel() {
  const width = 1566;
  const height = 880;
  const src = IntroEggs;

  return (
    <Slide>
      <Layout heading={<TitleHeading subtitle="Introduction" title="Training an 🥚 model" />} withoutBleed>
        <ZoomProvider>
          <ZoomTransform target={{ width, height }}>
            <Stepper alwaysVisible values={[0, 1, 2, 3, 4, 5]} activeStyle={{ height: "100%" }}>
              {(_, step) => {
                const annotations = getAnnotations(step);
                const highlightedPolygons = annotations.filter(
                  ({ shape }, idx) => [7, 4, 22].includes(idx) && shape.type === "polygon" && step === 5
                );

                return (
                  <HoveredProvider>
                    <Focus step={step} />
                    {/*
                     * TODO: make it so that for segmentation the hover effect shows individual points
                     * this emphasizes how difficult it can be to segment these object manually
                     */}
                    <div className="grid [grid-template-areas:'innercanvas'] w-full h-full items-center justify-items-center">
                      <div className="[grid-area:innercanvas]">
                        <img src={src} width={width} height={height} />
                      </div>

                      <div className="[grid-area:innercanvas]">
                        <Annotations annotations={annotations} width={width} height={height}>
                          {highlightedPolygons && (
                            <HighlightPolygons
                              highlightedPolygons={highlightedPolygons
                                .map(({ shape }) => shape)
                                .filter((s) => s.type === "polygon")}
                              style={{
                                strokeWidth: "calc(4px / var(--zoom-scale))",
                              }}
                            />
                          )}
                        </Annotations>
                        {/* <Tool /> */}
                      </div>
                    </div>
                  </HoveredProvider>
                );
              }}
            </Stepper>
          </ZoomTransform>
        </ZoomProvider>
      </Layout>
    </Slide>
  );
}

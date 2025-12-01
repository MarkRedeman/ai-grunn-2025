import CroppedEggs from "@/assets/aigrunn/geti-eggs/cropped-small.png";
import { IntelSlide as Slide } from "@/components/slides/slide";
import type { OpenCVTypes } from "@geti/smart-tools";
import { useSuspenseQuery } from "@tanstack/react-query";
import { wrap } from "comlink";
import { Suspense } from "react";
import { Stepper } from "spectacle";

import { useImageDataQuery } from "../../annotator/load-media";
import type { PreProcessingDebuggerWorker } from "../../annotator/segment-anything/pre-processing.worker";
import { ZoomProvider } from "../../annotator/zoom/zoom";
import { ZoomTransform } from "../../annotator/zoom/zoom-transform";
import { Card } from "../../components/cards";
import { ImageCanvas } from "../../components/image-canvas";
import { List, ListItem } from "../../components/lists";
import { Layout, TitleHeading } from "./../../layouts/default";

interface PreProcessStep {
  name: string;
  mat: OpenCVTypes.Mat;
}

function PreProcessStep({ grabCutStep, active }: { grabCutStep: PreProcessStep; active: boolean }) {
  const width = grabCutStep.mat.width;
  const height = grabCutStep.mat.height;
  return (
    <Card
      muted={!active}
      header={
        <span>
          {grabCutStep.name}
          <br />({width} x {height})
        </span>
      }
    >
      <div className={`w-[350px] h-[350px]`}>
        <ZoomProvider>
          <ZoomTransform target={{ width: 350, height: 350 }}>
            <ImageCanvas image={grabCutStep.mat} className="max-w-full border border-gray-300 rounded" />
          </ZoomTransform>
        </ZoomProvider>
      </div>
    </Card>
  );
}

function usePreProcessingWorker() {
  return useSuspenseQuery({
    queryKey: ["workers", "segment-anything", "preprocessing", "debugger"],
    queryFn: async () => {
      const worker = wrap<PreProcessingDebuggerWorker>(
        new Worker(new URL("./../../annotator/segment-anything/pre-processing.worker.ts", import.meta.url), {
          type: "module",
        })
      );

      return await worker.build();
    },
    staleTime: Infinity,
  });
}

function Internal({ step }: { step: number }) {
  const src = CroppedEggs;
  const { data: imageData } = useImageDataQuery(src);

  const { data: worker } = usePreProcessingWorker();
  const preProcessQuery = useSuspenseQuery({
    queryKey: ["segment-anything", "image", "pre-process", src],
    queryFn: async () => {
      return await worker.run(imageData);
    },
    retry: 0,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  if (step < 1) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 gap-4 h-full max-h-full min-h-0 place-items-center">
      {preProcessQuery.data.map((grabCutStep, idx) => {
        return <PreProcessStep key={grabCutStep.name} grabCutStep={grabCutStep} active={step > idx} />;
      })}
    </div>
  );
}

export function PreProcessingStepsForEndcoder() {
  return (
    <Slide>
      <Layout
        heading={
          <TitleHeading
            title={
              <span>
                Pre-processing steps for the <span className="text-purple-800">encoder</span>
              </span>
            }
            subtitle="Smart tools with Neural Networks"
          />
        }
      >
        <Stepper alwaysVisible values={[0, 1, 2, 3, 4, 5]} activeStyle={{ height: "100%" }}>
          {(_, step) => {
            return (
              <div className="flex flex-col h-full min-h-0">
                <List>
                  <ListItem>Remove alpha channels from image data</ListItem>
                  <ListItem muted={step < 0}>Color normalization</ListItem>
                  <ListItem muted={step < 1}>
                    Resizing to 1024x1024
                    <List subList>
                      <ListItem muted={step < 1} subItem>
                        Resize while preserving aspect ratio
                      </ListItem>
                      <ListItem muted={step < 1} subItem>
                        Fill in the rest with black padding
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
                <Suspense fallback={<div>...</div>}>
                  <Internal step={step - 1} />
                </Suspense>
              </div>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

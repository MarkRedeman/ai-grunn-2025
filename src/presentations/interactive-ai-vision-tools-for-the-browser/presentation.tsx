import { Deck } from "@/components/slides/deck";

import { GetiTitleSlide } from "./layouts/geti-title-slide";
// Conclusion
import { LookingAhead } from "./slides/conclusion/01-looking-ahead";
import { WebGPUAndWebNN } from "./slides/conclusion/02-webgpu-and-webnn";
import { OtherApplications } from "./slides/conclusion/03-other-applications";
import { AnomalibShoutout } from "./slides/conclusion/04-annomalib-shoutout";
// Introduction
import { TitleSlide } from "./slides/introduction/01-title-slide.tsx";
import { BuildAnAIModel } from "./slides/introduction/02-build-an-ai-model.tsx";
import { TrainingAnAiModel } from "./slides/introduction/03-training-an-ai-model";
import { AboutMe } from "./slides/introduction/04-about-me.tsx";
import { TableOfContents } from "./slides/introduction/05-table-of-contents.tsx";
import { ManualAnnotationTools } from "./slides/introduction/06-manual-annotation-tools.tsx";
// OpenCV
import { SmartToolsWithOpenCV } from "./slides/opencv/01-smart-tools-with-open-cv";
import { Requirements } from "./slides/opencv/02-requirements";
import { InteractiveForegroundExtractionUsingGrabcut } from "./slides/opencv/03-interactive-foreground-extraction-using-grabcut";
import { CompilingOpenCVToWebAssembly } from "./slides/opencv/04-compiling-open-cv-to-web-assembly";
import { NotesOnUsingOpenCVInTheBrowser } from "./slides/opencv/05-notes-on-using-opencv-in-the-browser";
import { UsingOpenCVToImplementGrabcut } from "./slides/opencv/06-using-open-cv-to-implement-grabcut.tsx";
import { MultithreadingWithWebWorkers } from "./slides/opencv/07-multithreading-with-web-workers.tsx";
import { OverviewOfOurOpenCVTools } from "./slides/opencv/08-overview-of-our-open-cv-tools.tsx";
// Segment Anything
import { SmartToolsWithNeuralNetworks } from "./slides/segment-antying/01-smart-tools-with-neural-networks";
import { ABriefHistory } from "./slides/segment-antying/02-a-brief-history";
import { SegmentAnythingModel } from "./slides/segment-antying/03-segment-anything-model";
import { ChoosingAnInferenceRuntime } from "./slides/segment-antying/04-choosing-an-inference-runtime";
import { OnnxInferenceExample } from "./slides/segment-antying/05-onnx-inference-example";
import { ChoosingASmallEncoder } from "./slides/segment-antying/06-choosing-a-small-encoder";
import { UserFlowRecapForEncoder } from "./slides/segment-antying/07-user-flow-recap-for-encoder";
import { PreProcessingStepsForEndcoder } from "./slides/segment-antying/08-pre-processing-steps-for-encoder";
import { UserFlowRecapForDecoder } from "./slides/segment-antying/09-user-flow-recap-for-decoder";
import { PostProcessingForDecoder } from "./slides/segment-antying/10-post-processing-for-decoder";
import { UserFlowRecap } from "./slides/segment-antying/11-user-flow-recap";
import { Optimizations } from "./slides/segment-antying/12-optimizations";
import { SAMDemo } from "./slides/segment-antying/13-sam-demo";

export const Presentation = () => {
  return (
    <Deck>
      {/* Introduction */}
      <TitleSlide />
      <BuildAnAIModel />
      <TrainingAnAiModel />
      <AboutMe />
      <TableOfContents />
      <ManualAnnotationTools />

      {/* OpenCV */}
      <SmartToolsWithOpenCV />
      <Requirements />
      <InteractiveForegroundExtractionUsingGrabcut />
      <CompilingOpenCVToWebAssembly />
      <NotesOnUsingOpenCVInTheBrowser />
      <UsingOpenCVToImplementGrabcut />
      <MultithreadingWithWebWorkers />
      <OverviewOfOurOpenCVTools />

      {/* Segment Anything */}
      <SmartToolsWithNeuralNetworks />
      <ABriefHistory />
      <SegmentAnythingModel />
      {/* TODO: consider adding an extra slide with more information about the encoder and decoder models */}
      <ChoosingAnInferenceRuntime />
      <OnnxInferenceExample />
      <ChoosingASmallEncoder />
      <UserFlowRecapForEncoder />
      <PreProcessingStepsForEndcoder />
      <UserFlowRecapForDecoder />

      <PostProcessingForDecoder />
      <UserFlowRecap />
      <Optimizations />
      <SAMDemo />

      {/* Conclusion */}
      <LookingAhead />
      <WebGPUAndWebNN />
      <OtherApplications />
      <AnomalibShoutout />
      <GetiTitleSlide id="title-concluding-remarks" number="Concluding remarks" title="Thank you for listening" />
      {/* TODO: add links and references */}
      <GetiTitleSlide id="title-questions" number="Concluding remarks" title="Questions?" />
    </Deck>
  );
};

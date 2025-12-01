import DetectionAssistantVideo from "@/assets/aigrunn/cropped-400-400/detection-assistant.mp4";
import ObjectColouringVideo from "@/assets/aigrunn/cropped-400-400/object-colouring.mp4";
import PolygonSnappingToolVideo from "@/assets/aigrunn/cropped-400-400/polygon-snapping-mode.mp4";
import QuickSelectionVideo from "@/assets/aigrunn/cropped-400-400/quick-selection.mp4";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { Stepper } from "spectacle";

import { Card } from "../../components/cards";
import { AutoplayVideo } from "./../../components/autoplay-video";
import { Heading } from "./../../components/heading";
import { Layout, TitleHeading } from "./../../layouts/default";

export function OverviewOfOurOpenCVTools() {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="Overview of our OpenCV tools" subtitle="Smart tools with OpenCV" />}>
        <div className="grid  max-h-full max-w-full h-full w-full">
          <Stepper alwaysVisible values={[0, 1, 2, 3, 4, 5]} activeStyle={{ height: "100%", minHeight: "0" }}>
            {(_, step) => {
              return (
                <div className={`flex flex-col justify-between h-full min-h-0`}>
                  <Heading
                    className={`text-center text-classical-blue-shade-2 font-light text-5xl my-10 flex flex-col gap-8 ${step < 4 ? "invisible" : ""}`}
                  >
                    <span>Classical methods work great...</span>
                    <span>if your data is already clean.</span>
                  </Heading>
                  <div className={step < 5 ? "invisible" : ""}>
                    <p className="text-center text-4xl text-purple-800">We need something better</p>
                  </div>
                  <div className="grid grid-cols-4 h-full min-h-0 w-full w-min-0 gap-4 place-items-center">
                    <Card
                      muted={step < 0}
                      header={
                        <div className="flex flex-col gap-4">
                          <span>Quick Selection</span>
                          <span className="text-lg text-gray-500">(GrabCut)</span>
                        </div>
                      }
                    >
                      <AutoplayVideo
                        autoPlay={step >= 0}
                        src={QuickSelectionVideo}
                        controls
                        preload="auto"
                        className="w-full max-h-full min-h-0"
                      />
                    </Card>

                    <Card
                      muted={step < 1}
                      header={
                        <div className="flex flex-col gap-4">
                          <span>Detection Assistant</span>
                          <span className="text-lg text-gray-500">(Structural Similarity)</span>
                        </div>
                      }
                    >
                      <AutoplayVideo
                        autoPlay={step >= 1}
                        src={DetectionAssistantVideo}
                        controls
                        preload="auto"
                        className="w-full max-h-full min-h-0"
                      />
                    </Card>

                    <Card
                      muted={step < 2}
                      header={
                        <div className="flex flex-col gap-4">
                          <span>Object Colouring</span>
                          <span className="text-lg text-gray-500">(Watershed)</span>
                        </div>
                      }
                    >
                      <AutoplayVideo
                        autoPlay={step >= 2}
                        src={ObjectColouringVideo}
                        controls
                        preload="auto"
                        className="w-full max-h-full min-h-0"
                      />
                    </Card>

                    <Card
                      muted={step < 3}
                      header={
                        <div className="flex flex-col gap-4">
                          <span>Polygon Snapping mode</span>
                          <span className="text-lg text-gray-500">(Intelligent Scissors)</span>
                        </div>
                      }
                    >
                      <AutoplayVideo
                        autoPlay={step >= 3}
                        src={PolygonSnappingToolVideo}
                        controls
                        preload="auto"
                        className="w-full max-h-full min-h-0"
                      />
                    </Card>
                  </div>
                </div>
              );
            }}
          </Stepper>
        </div>
      </Layout>
    </Slide>
  );
}

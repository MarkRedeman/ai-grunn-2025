import AutoSegmentationVideo from "@/assets/aigrunn/cropped-400-400/auto-segmentation.mp4";
import InteractiveSegmentationVideo from "@/assets/aigrunn/cropped-400-400/interactive-segmentation.mp4";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { Stepper } from "spectacle";

import { Card } from "../../components/cards";
import { List, ListItem } from "../../components/lists";
import { AutoplayVideo } from "./../../components/autoplay-video";
import { Layout, TitleHeading } from "./../../layouts/default";

export function ABriefHistory() {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="A brief history" subtitle="Smart tools with Neural Networks" />}>
        <Stepper alwaysVisible values={[0, 1, 2]} activeStyle={{ height: "100%", minHeight: "0" }}>
          {(_, step) => {
            return (
              <div className="grid grid-cols-2 max-h-full max-w-full h-full w-full mt-10">
                <List>
                  <ListItem>
                    <strong className="text-classical-blue-shade-1">Jun 2022</strong>: Reviving Iterative Training with
                    Mask Guidance for Interactive Segmentation (RITM)
                    <List subList>
                      <ListItem subItem>Significantly improved segmenation accuracy</ListItem>
                      <ListItem subItem>Gave us experience of using inference tools for the web</ListItem>
                    </List>
                  </ListItem>

                  <ListItem
                    className={`mt-4 mr-4 p-4 border-2 ${step > 1 ? "border-purple-500 bg-purple-50" : " border-transparent"}`}
                  >
                    <strong className="text-classical-blue-shade-1">Jul 2023</strong>: Segment Anything Model (SAM)
                    <List subList>
                      <ListItem subItem>Even better accuracy than RITM</ListItem>
                      <ListItem subItem>Refinement via on-hover interaction</ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    <strong className="text-classical-blue-shade-1">Jul 2024</strong>: Zero shot annotations with Visual
                    Prompting
                    <List subList>
                      <ListItem subItem>Learn from past annotations to predict masks on new images</ListItem>
                      <ListItem subItem>Requires access to more compute (GPU), no browser support</ListItem>
                    </List>
                  </ListItem>
                </List>

                <div className="grid grid-cols-2 h-full min-h-0 w-full w-min-0 gap-4 place-items-center">
                  <Card
                    header={
                      <div className="flex flex-col gap-4">
                        <span>Interactive Segmentation</span>
                        <span className="text-lg text-gray-500">(RITM)</span>
                      </div>
                    }
                    muted={step < 0}
                  >
                    <AutoplayVideo
                      src={InteractiveSegmentationVideo}
                      autoPlay={step >= 0}
                      preload="auto"
                      className="w-full max-h-full min-h-0"
                    />
                  </Card>

                  <Card
                    header={
                      <div className="flex flex-col gap-4">
                        <span>Auto segmentation</span>
                        <span className="text-lg text-gray-500">(Segment Anything Model)</span>
                      </div>
                    }
                    muted={step < 1}
                  >
                    <AutoplayVideo
                      src={AutoSegmentationVideo}
                      autoPlay={step >= 1}
                      preload="auto"
                      className="w-full max-h-full min-h-0"
                    />
                  </Card>
                </div>
              </div>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

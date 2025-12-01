import BoundingBoxToolVideo from "@/assets/aigrunn/cropped-400-400/bounding-box-tool.mp4";
import CircleToolVideo from "@/assets/aigrunn/cropped-400-400/circle-tool.mp4";
import PolygonToolVideo from "@/assets/aigrunn/cropped-400-400/polygon-tool.mp4";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { Stepper } from "spectacle";

import { Card } from "../../components/cards";
import { List, ListItem } from "../../components/lists";
import { AutoplayVideo } from "./../../components/autoplay-video";
import { Layout, TitleHeading } from "./../../layouts/default";

export function ManualAnnotationTools() {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="Manual annotation tools" subtitle="Introduction" />}>
        <Stepper alwaysVisible values={[0, 1, 2, 3]} activeStyle={{ height: "100%" }}>
          {(_, step) => {
            return (
              <div className="flex flex-col gap-20 justify-center">
                <List>
                  <ListItem muted={step < 3}>Collecting high quality data is important for your models</ListItem>
                  <ListItem muted={step < 3}>Annotating data can be time consuming for complex objects</ListItem>
                </List>

                <div className="grid grid-cols-3 gap-4 px-8">
                  <Card muted={step < 0} header={<span>Bounding box tool</span>}>
                    <AutoplayVideo
                      src={BoundingBoxToolVideo}
                      controls
                      preload="auto"
                      style={{ width: "100%" }}
                      autoPlay={step >= 0}
                    />
                  </Card>

                  <Card muted={step < 1} header={<span>Circle tool</span>}>
                    <AutoplayVideo
                      src={CircleToolVideo}
                      controls
                      preload="auto"
                      style={{ width: "100%" }}
                      autoPlay={step >= 1}
                    />
                  </Card>
                  <Card muted={step < 2} header={<span>Polygon tool</span>}>
                    <AutoplayVideo
                      src={PolygonToolVideo}
                      controls
                      preload="auto"
                      style={{ width: "100%" }}
                      autoPlay={step >= 2}
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

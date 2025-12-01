import GrabcutResult from "@/assets/aigrunn/geti-eggs/quick-selection/grabcut-result.png";
import GrabcutSelection from "@/assets/aigrunn/geti-eggs/quick-selection/grabcut-selection.png";
import GrabcutInitialResult from "@/assets/aigrunn/geti-eggs/quick-selection/gracut-bad-result.png";
import GrabcutRefine from "@/assets/aigrunn/geti-eggs/quick-selection/gracut-refine.png";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { Stepper } from "spectacle";

import { Card } from "../../components/cards";
import { List, ListItem } from "../../components/lists";
import { Layout, TitleHeading } from "./../../layouts/default";

export function InteractiveForegroundExtractionUsingGrabcut() {
  return (
    <Slide>
      <Layout
        heading={
          <TitleHeading title="Interactive foreground extraction using Grabcut" subtitle="Smart tools with OpenCV" />
        }
      >
        <div className="grid grid-cols-2 h-full min-h-0">
          <List>
            <ListItem>Grabcut pioneered interactive segmentation tasks</ListItem>
            <List subList>
              <ListItem subItem>Think of it as a background removal tool</ListItem>
            </List>
            <ListItem>Has first party support from OpenCV</ListItem>
            <ListItem>Iterative refinement</ListItem>
            <List className="list-decimal" subList>
              <ListItem subItem>Select region of interest</ListItem>
              <ListItem subItem>Analyze</ListItem>
              <ListItem subItem>Accept/reject/refine</ListItem>
              <ListItem subItem>Refine with positive/negative markers</ListItem>
              <ListItem subItem>Accept/reject/refine</ListItem>
            </List>
          </List>

          <Stepper alwaysVisible values={[0, 1, 2, 3]} activeStyle={{ height: "100%", minHeight: "0" }}>
            {(_, step) => {
              return (
                <div className="grid grid-cols-2 grid-rows-2 max-h-full min-h-0 w-full w-min-0 gap-4 place-items-center">
                  <Card muted={step < 0} header={<span>Select region of interest</span>}>
                    <img className="w-full max-h-full min-h-0 object-cover" src={GrabcutSelection} />
                  </Card>

                  <Card muted={step < 1} header={<span>Grabcut</span>}>
                    <img className="w-full max-h-full min-h-0 object-cover" src={GrabcutInitialResult} />
                  </Card>

                  <Card muted={step < 2} header={<span>Refine</span>}>
                    <img className="w-full max-h-full min-h-0 object-cover" src={GrabcutRefine} />
                  </Card>

                  <Card muted={step < 3} header={<span>Refined result</span>}>
                    <img className="w-full max-h-full min-h-0 object-cover" src={GrabcutResult} />
                  </Card>
                </div>
              );
            }}
          </Stepper>
        </div>
      </Layout>
    </Slide>
  );
}

import { IntelSlide as Slide } from "@/components/slides/slide";
import { Stepper } from "spectacle";

import { List, ListItem } from "../../components/lists";
import { Layout, TitleHeading } from "./../../layouts/default";
import { SegmentAnythingArchitecture } from "./sam-architecture";

export function SegmentAnythingModel() {
  return (
    <Slide>
      <Layout
        heading={<TitleHeading title="Segment Anything Model (SAM)" subtitle="Smart tools with Neural Networks" />}
      >
        <Stepper alwaysVisible values={[0, 1, 2, 3, 4, 5, 6]} activeStyle={{ height: "100%" }}>
          {(_, step) => {
            return (
              <div className="grid grid-cols-2 w-full h-full min-h-0 mt-4">
                <List>
                  <ListItem>Foundational model for segmentation tasks</ListItem>
                  <ListItem>
                    Trained on 11 million images with 1 billion masks{" "}
                    {step > 2 && <strong className="ml-4">(🎯 accurate)</strong>}
                  </ListItem>
                  <ListItem>
                    <strong className="text-purple-800">Encoder</strong> +{" "}
                    <strong className="text-emerald-800">decoder</strong> architecture{" "}
                    {step > 3 && <strong className="ml-4">(✏ refinable)</strong>}
                  </ListItem>
                  <ListItem className="pt-4" invisible={step < 0}>
                    <strong className="text-purple-800">Encoder</strong>:
                    <List subList>
                      <ListItem subItem>Uses a Vision Transformer backbone</ListItem>
                      <ListItem subItem>
                        Expensive: <strong className="text-classical-blue-shade-1 font-medium">400ms</strong> -{" "}
                        <strong className="text-classical-blue-shade-1 font-medium">1000ms</strong> per image, but runs
                        only once per image
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem className="pt-8" invisible={step < 2}>
                    <strong className="text-emerald-800">Decoder</strong>:
                    <List subList>
                      <ListItem subItem>Lightweight Mask Generator</ListItem>
                      <ListItem subItem>
                        Runs once per interaction roughly{" "}
                        <strong className="text-classical-blue-shade-1 font-medium">50ms</strong> -{" "}
                        <strong className="text-classical-blue-shade-1 font-medium">100ms</strong>.
                        {step > 4 && (
                          <strong className="ml-4 text-classical-blue-shade-2">
                            (<span className="text-2xl text-yellow-400">⚡</span> Low latency)
                          </strong>
                        )}
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem subItem invisible={step <= 5} className="pt-4">
                    A perfect fit?
                  </ListItem>
                </List>

                <SegmentAnythingArchitecture step={step} />
              </div>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

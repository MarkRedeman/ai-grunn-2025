import WebNNDiagram from "@/assets/aigrunn/webnn.png";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { Stepper } from "spectacle";

import { List, ListItem } from "../../components/lists";
import { Layout, TitleHeading } from "./../../layouts/default";

export function WebGPUAndWebNN() {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="WebGPU & WebNN" subtitle="Looking ahead: emerging tech" />}>
        <Stepper alwaysVisible values={[0, 1, 2, 3]} activeStyle={{ height: "100%" }}>
          {(_, step) => {
            return (
              <div className="grid grid-cols-2 gap-4">
                <List>
                  <ListItem className="mt-4">WebGPU</ListItem>
                  <ListItem muted={step < 0}>WebNN</ListItem>
                  <ListItem muted={step < 1}>
                    ONNXRuntime
                    <List subList>
                      <ListItem subItem muted={step < 1}>
                        <a href="https://onnxruntime.ai/docs/tutorials/web/ep-webgpu.html">Using WebGPU</a>
                      </ListItem>
                      <ListItem subItem muted={step < 1}>
                        <a href="https://onnxruntime.ai/docs/tutorials/web/ep-webnn.html">Using WebNN</a>
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem muted={step < 2}>
                    Transformers.js
                    <List subList>
                      <ListItem subItem muted={step < 2}>
                        <a href="https://huggingface.co/spaces/webml-community/dinov3-web">DINOv3 Web</a>
                      </ListItem>
                      <ListItem subItem muted={step < 2}>
                        <a href="https://huggingface.co/spaces/webml-community/DINOv3-video-tracking">
                          DINOv3 WebVideo Tracking
                        </a>
                      </ListItem>
                      <ListItem subItem muted={step < 2}>
                        <a href="https://huggingface.co/spaces/webml-community/nanochat-webgpu">NanoChat Web</a>
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem muted={step < 3}>This presentation used WebNN, but still experimental</ListItem>
                </List>
                <div className={` ${step < 0 ? "invisible" : ""}`}>
                  <img src={WebNNDiagram} className="mt-20 mx-auto" />
                </div>
              </div>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

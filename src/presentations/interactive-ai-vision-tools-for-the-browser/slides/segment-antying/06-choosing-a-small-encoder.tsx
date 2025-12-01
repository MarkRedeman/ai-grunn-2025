import { IntelSlide as Slide } from "@/components/slides/slide";
import { Stepper } from "spectacle";

import { List, ListItem } from "../../components/lists";
import { Layout, TitleHeading } from "./../../layouts/default";

export function ChoosingASmallEncoder() {
  return (
    <Slide>
      <Layout
        heading={
          <TitleHeading
            title={
              <span>
                Choosing a small <span className="text-purple-800">encoder</span>
              </span>
            }
            subtitle="Smart tools with Neural Networks"
          />
        }
      >
        {/*
          Check out https://github.com/czg1225/Awesome-Efficient-Segment-Anything for a good overview
         */}
        <Stepper alwaysVisible values={[0, 1]} activeStyle={{ height: "100%", minHeight: "0" }}>
          {(_, step) => {
            return (
              <div className="w-full flex justify-between">
                <List>
                  <ListItem>
                    SAM: Foundational model with <strong className="text-purple-800">encoder</strong> +{" "}
                    <strong className="text-emerald-800">decoder</strong> architecture
                  </ListItem>
                  <ListItem invisible={step < 0}>
                    We considered three options for the <span className="text-purple-800">encoder</span> architecture:
                    <List subList>
                      <ListItem subItem>
                        <span>
                          <a href="https://github.com/facebookresearch/segment-anything">Original</a>
                        </span>{" "}
                        models from the SAM paper (2000+ms)
                      </ListItem>
                      <ListItem>
                        <span>
                          <a href="https://github.com/CASIA-LMC-Lab/FastSAM">FastSAM</a>
                        </span>
                        : not accurate enough
                      </ListItem>
                      <ListItem className="text-classical-blue-shade-2">
                        <strong>
                          <a href="https://github.com/ChaoningZhang/MobileSAM">MobileSAM</a>
                        </strong>
                        : good balance between speed (500ms - 1000ms) and accuracy ⭐
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem invisible={step < 1}>
                    In 2025 there are could be better choices:
                    <List subList>
                      <ListItem subItem>
                        <a href="https://github.com/THU-MIG/RepViT">RepViT-SAM</a>
                      </ListItem>
                      <ListItem subItem>
                        <a href="https://github.com/mit-han-lab/efficientvit">EfficientViT-SAM</a>
                      </ListItem>
                      <ListItem subItem>
                        <a href="https://github.com/xinghaochen/TinySAM">TinySAM</a>
                      </ListItem>
                      <ListItem subItem>
                        <a href="https://github.com/chongzhou96/EdgeSAM">EdgeSAM</a>
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
              </div>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

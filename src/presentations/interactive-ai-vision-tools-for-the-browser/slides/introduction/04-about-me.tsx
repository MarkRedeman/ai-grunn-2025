import GetiAnnotatingEggsVideo from "@/assets/aigrunn/geti-annotating-eggs.mp4";
import IntelLogo from "@/assets/aigrunn/logos/intel-logo.svg?react";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { Stepper } from "spectacle";

import { List, ListItem } from "../../components/lists";
import { AutoplayVideo } from "./../../components/autoplay-video";
import { GithubIcon } from "./../../components/icons";
import { Layout, TitleHeading } from "./../../layouts/default";

export const AboutMe = () => {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="About me" subtitle="Introduction" />}>
        <Stepper alwaysVisible values={[0, 1, 2, 3, 4]} activeStyle={{ height: "100%" }}>
          {(_, step) => {
            return (
              <div className="columns-2 h-full">
                <div className="flex flex-col h-full">
                  <List>
                    <ListItem>Building Geti: an open ecosystem for AI vision models</ListItem>
                    <ListItem muted={step < 0}>Part of the Intel's Edge Client Computing group</ListItem>
                    <ListItem muted={step < 1}>Based in Groningen</ListItem>
                    <ListItem muted={step < 2}>
                      Our goal is to make it as easy as possible to build and use AI on Intel hardware
                    </ListItem>
                    <ListItem muted={step < 3} className="mt-8">
                      Free and source code available at Github
                      <List subList>
                        <ListItem subItem muted={step < 3}>
                          <a href="https://github.com/open-edge-platform/geti">
                            <GithubIcon
                              className={`w-6 h-6 inline mr-2 ${step < 3 ? "fill-gray-300" : "fill-classical-blue-shade-2"}`}
                            />
                            open-edge-platform/geti
                          </a>
                        </ListItem>

                        <ListItem subItem muted={step < 3}>
                          {/* TODO: add geti icon */}
                          <a href="https://docs.geti.intel.com">https://docs.geti.intel.com</a>
                        </ListItem>
                      </List>
                    </ListItem>
                  </List>
                  <div
                    className="flex flex-col h-full justify-content-end align-self-center items-center"
                    style={{ justifyContent: "end" }}
                  >
                    <div className="w-[300px]">
                      <IntelLogo />
                    </div>
                  </div>
                </div>
                <div className={`${step < 3 ? "invisible" : ""}`}>
                  <AutoplayVideo className="mt-10  h-[40vh] aspect-video" autoPlay src={GetiAnnotatingEggsVideo} />
                  <p className="mt-8 text-3xl text-gray-500 text-center">Annotating 500 eggs in about 3 minutes</p>
                </div>
              </div>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
};

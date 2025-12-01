import Meltdown from "@/assets/aigrunn/logos/meltdown.avif";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { CodeSpan, Stepper } from "spectacle";

import { List, ListItem } from "../../components/lists";
import { CodePane } from "./../../components/code";
import { Layout, TitleHeading } from "./../../layouts/default";

export function Optimizations() {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="Optimizations" subtitle="Smart tools with Neural Networks" />}>
        <Stepper alwaysVisible values={[0, 1, 2, 3]} activeStyle={{ height: "100%" }}>
          {(_, step) => {
            return (
              <List>
                <ListItem muted={step < 0}>
                  <strong className="text-purple-800">Encoder</strong>: Use a lightweight encoder,{" "}
                  <CodeSpan>MobileSAM</CodeSpan>
                </ListItem>
                <ListItem muted={step < 0}>
                  <strong className="text-purple-800">Encoder</strong>: Pre-compute embeddings for the next image
                </ListItem>
                <ListItem muted={step < 1}>
                  <strong className="text-emerald-800">Decoder</strong>: Resize points, not masks
                </ListItem>
                <ListItem muted={step < 2}>
                  Use <CodeSpan>SharedArrayBuffer</CodeSpan> to share raw memory between workers
                  <List subList>
                    {/* This is due to Spectre/Meltdown */}
                    <ListItem subItem>Requries setting security headers</ListItem>
                    <ListItem subItem>
                      <CodePane
                        language="bash"
                        children={`
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
`}
                      />
                    </ListItem>
                    <ListItem subItem invisible={step < 3} className={"flex justify-center w-full"}>
                      <img src={Meltdown} />
                    </ListItem>
                  </List>
                </ListItem>
              </List>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

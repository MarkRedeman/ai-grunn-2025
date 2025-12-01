import { IntelSlide as Slide } from "@/components/slides/slide";

import { Layout, TitleHeading } from "./../../layouts/default";
import { SegmentAnythingArchitecture } from "./sam-architecture";

export function UserFlowRecap() {
  return (
    <Slide>
      <Layout
        heading={
          <TitleHeading
            title={
              <span>
                User flow recap for <span className="text-purple-800">encoder</span>
              </span>
            }
            subtitle="Smart tools with Neural Networks"
          />
        }
      >
        <SegmentAnythingArchitecture step={2} />
      </Layout>
    </Slide>
  );
}

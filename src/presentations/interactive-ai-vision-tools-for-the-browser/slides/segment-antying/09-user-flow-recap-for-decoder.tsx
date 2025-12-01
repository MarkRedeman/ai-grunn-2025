import { IntelSlide as Slide } from "@/components/slides/slide";

import { Layout, TitleHeading } from "./../../layouts/default";
import { SegmentAnythingArchitecture } from "./sam-architecture";

export function UserFlowRecapForDecoder() {
  return (
    <Slide>
      <Layout
        heading={
          <TitleHeading
            title={
              <span>
                User flow recap for <span className="text-emerald-800">decoder</span>
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

import AnomalibLogo from "@/assets/aigrunn/logos/anomalib-wide-blue.png";
import { IntelSlide as Slide } from "@/components/slides/slide";

import { Layout, TitleHeading } from "./../../layouts/default";

export function AnomalibShoutout() {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="Anomalib shoutout" subtitle="Concluding remarks" />}>
        <div className="grid place-items-center h-full pb-[15vh]">
          <a href="https://github.com/open-edge-platform/anomalib">
            <img src={AnomalibLogo} />
            <h3 className="text-left text-4xl font-medium mt-20">Near-Zero Defects</h3>
            <p className="text-left text-3xl mt-10 text-gray-800">
              Visual Anomaly Detection on Edge Devices for Industrial Quality Control
            </p>
            <p className="text-left text-3xl mt-2 text-gray-600">After lunch break at Camera 2</p>
          </a>
        </div>
      </Layout>
    </Slide>
  );
}

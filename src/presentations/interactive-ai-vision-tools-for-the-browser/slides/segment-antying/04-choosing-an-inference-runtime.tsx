import HuggingFaceLogo from "@/assets/aigrunn/logos/huggingface.svg?react";
import LiteRTLogo from "@/assets/aigrunn/logos/litert-blank.png";
import OnnxRuntimeLogo from "@/assets/aigrunn/logos/onnxruntime.png";
import OpenVINOLogo from "@/assets/aigrunn/logos/openvino.svg?react";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { Stepper } from "spectacle";

import { Card } from "../../components/cards";
import { Layout, TitleHeading } from "./../../layouts/default";

export function ChoosingAnInferenceRuntime() {
  return (
    <Slide>
      <Layout
        heading={<TitleHeading title="Choosing an inference runtime" subtitle="Smart tools with Neural Networks" />}
      >
        <Stepper alwaysVisible values={[0, 1, 2]} activeStyle={{ height: "100%", minHeight: "0" }}>
          {(_, step) => {
            return (
              <div className="grid grid-cols-4 h-full min-h-0 w-full w-min-0 gap-4 place-items-center">
                <Card header={<span>Transformers.js</span>} muted={step >= 0} className="w-full max-w-[300px]" bordered>
                  <div
                    className={`${step >= 0 ? "bg-gray-200" : "bg-white"} w-full flex justify-center items-center h-[200px] p-8`}
                  >
                    <HuggingFaceLogo className="w-[100px]" />
                  </div>
                </Card>

                <Card
                  header={<span className={step > 1 ? "text-white" : "text-classical-blue-shade-2"}>ONNX Runtime</span>}
                  className={`w-full max-w-[300px]`}
                  active={step > 1}
                  bordered
                >
                  <div className={`bg-white w-full flex justify-center items-center h-[200px] p-8`}>
                    <img src={OnnxRuntimeLogo} className="w-full" />
                  </div>
                </Card>

                <Card header={<span>LiteRT</span>} muted={step >= 2} className="w-full max-w-[300px]" bordered>
                  <div
                    className={`${step >= 2 ? "bg-gray-200" : "bg-white"} w-full flex justify-center items-center h-[200px] p-8`}
                  >
                    <img src={LiteRTLogo} className="w-full" />
                  </div>
                </Card>

                <Card header={<span>OpenVINO</span>} muted={step >= 1} className="w-full max-w-[300px]" bordered>
                  <div
                    className={`${step >= 1 ? "bg-gray-200" : "bg-white"} w-full flex justify-center items-center h-[200px] p-8`}
                  >
                    <OpenVINOLogo className="w-full" />
                  </div>
                </Card>
              </div>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

import NetronLogo from "@/assets/aigrunn/logos/netron.svg?react";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { Stepper } from "spectacle";

import { List, ListItem } from "../../components/lists";
import { CodePane } from "./../../components/code";
import { Layout, TitleHeading } from "./../../layouts/default";

const code = `
import * as ort from 'onnxruntime-web';

async function fetchModel(url: string) {
  const response = await fetch(url);
  return await response.arrayBuffer(); // Note: Optionally cache the model
}

// Create session from ONNX model
const model = await fetchMyModel('./mat-mul.onnx');
const session = await ort.InferenceSession.create(model);

console.log('Input names:', session.inputNames);
console.log('Output names:', session.outputNames);

const result = await session.run({
  a: new ort.Tensor('float32', Float32Array.from([0, 1, 1, 0]), [2, 2]),
  b: new ort.Tensor('float32', Float32Array.from([1, 2, 3, 4]), [2, 2])
});

// new ort.Tensor('float32', Float32Array.from([3, 4, 1, 2], [2, 2])
console.log(result.c);
`;

function getCodeStep(step: number): string {
  if (step < 1) {
    return code
      .split("\n")
      .filter((_, idx) => idx < 10)
      .join("\n");
  }

  if (step < 2) {
    return code
      .split("\n")
      .filter((_, idx) => idx < 14)
      .join("\n");
  }

  if (step < 3) {
    return code
      .split("\n")
      .filter((_, idx) => idx < 19)
      .join("\n");
  }

  return code;
}

export function OnnxInferenceExample() {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="Inference with ONNXRuntime" subtitle="Smart tools with Neural Networks" />}>
        <Stepper alwaysVisible values={[0, 1, 2, 3, 4]} activeStyle={{ height: "100%", minHeight: "0" }}>
          {(_, step) => {
            return (
              <div className="grid grid-cols-2 gap-8">
                <List>
                  <ListItem>
                    <p>Install with npm</p>
                    <CodePane
                      language="typescript"
                      showLineNumbers={false}
                      children={`npm install onnxruntime-common onnxruntime-web`}
                    />
                  </ListItem>
                  <ListItem>A minimal example of using ONNX</ListItem>
                  {step > 0 && (
                    <ListItem>
                      <div className="flex flex-col gap-4 items-star justify-start">
                        <p className="mb-0 mt-0">
                          Tip: use{" "}
                          <a href="https://netron.app/" className="text-classical-blue-shade-1 underline">
                            netron.app
                          </a>{" "}
                          to analyze the model inputs and outputs
                        </p>
                        <a href="https://netron.app/" className="text-classical-blue-shade-1 underline">
                          <NetronLogo className="h-[80px] max-w-[200px] mr-10 p-4" />
                        </a>
                      </div>
                    </ListItem>
                  )}
                  {step > 3 && (
                    <ListItem>
                      More examples on github
                      <List subList>
                        <ListItem subItem className="text-lg">
                          <a
                            href="https://github.com/microsoft/onnxruntime-inference-examples/tree/main/js"
                            className="text-classical-blue-shade-1"
                          >
                            https://github.com/microsoft/onnxruntime-inference-examples/tree/main/js
                          </a>
                        </ListItem>
                        <ListItem subItem className="text-lg">
                          <a
                            href="https://github.com/microsoft/onnxruntime-web-demo"
                            className="text-classical-blue-shade-1 "
                          >
                            https://github.com/microsoft/onnxruntime-web-demo
                          </a>
                        </ListItem>
                      </List>
                    </ListItem>
                  )}
                </List>

                <div className={step >= 0 ? "" : "invisible"}>
                  <CodePane
                    filename="minimal-onnx.ts"
                    showLineNumbers={false}
                    language="typescript"
                    children={getCodeStep(step)}
                  />
                </div>
              </div>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

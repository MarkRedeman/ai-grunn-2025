import { IntelSlide as Slide } from "@/components/slides/slide";
import { CodeSpan, Stepper } from "spectacle";

import { List, ListItem } from "../../components/lists";
import { CodePane } from "./../../components/code";
import { Layout, TitleHeading } from "./../../layouts/default";

export function CompilingOpenCVToWebAssembly() {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="Compiling OpenCV to WebAssembly" subtitle="Smart tools with OpenCV" />}>
        <Stepper alwaysVisible values={[0, 1, 2]} activeStyle={{ height: "100%", minHeight: "0" }}>
          {(_, step) => {
            return (
              <div className="grid  max-h-full max-w-full h-full w-full grid-cols-2 gap-8">
                <List className="flex flex-col gap-4 list-disc prose-2xl   prose-li:font-medium text-classical-blue-shade-2">
                  <div>
                    <ListItem>
                      OpenCV releases include an <CodeSpan>opencv.js</CodeSpan> release, but it's big!
                    </ListItem>
                    <List subList>
                      <ListItem>
                        ❗ OpenCV v2.9: <span className="ml-1 text-red-500">9.8Mb</span>
                      </ListItem>
                      <ListItem>Contains many unused modules we don't need</ListItem>
                      <ListItem invisible={step < 2}>
                        ✅ Custom build: <span className="ml-1 text-green-600">2.1Mb</span>
                      </ListItem>
                    </List>
                  </div>
                  {step >= 0 && (
                    <div>
                      <ListItem className="mt-4">Manually Compile</ListItem>
                      <CodePane
                        language="bash"
                        showLineNumbers={true}
                        children={`
# Clone and configure OpenCV
git clone git@github.com:opencv/opencv.git
cd opencv
vim ./platforms/js/opencv_js.config.py

# outputs to ./build_js/bin/opencv.js
docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) emscripten/emsdk:2.0.10 \\
    emcmake python3 \\
    ./platforms/js/build_js.py build_js \\
    --build_wasm \\
    --config /src/opencv_js.config.py
        `}
                      />
                    </div>
                  )}
                </List>
                {step >= 1 && (
                  <CodePane filename="./platforms/js/opencv_js.config.py" language="python">{`
# Classes and methods whitelist

web_gui = {
    # Common utilities we use for pre- and post-processing
    '': [
        'rectangle', 'resize', 'findContours', 'contourArea',
        'approxPolyDP', 'cvtColor', 'polylines', 'threshold',
        'watershed', 'grabCut', 'bitwise_or', 'flip', 'circle',
        'add', 'subtract', 'divide', 'exp', 'split', 'boundingRect',
        'contourArea', 'normalize', 'matchTemplate', 'pointPolygonTest',
        'applyColorMap', 'copyMakeBorder', 'blobFromImage', 'minAreaRect'
    ],
    'DescriptorMatcher': ['clone']
    # Used to create intelligent scissors, aka, "Magic wand"
    'segmentation_IntelligentScissorsMB': [
        'IntelligentScissorsMB',
        'setGradientMagnitudeMaxLimit',
        'setEdgeFeatureCannyParameters',
        'applyImage', 'buildMap', 'getContour'
    ],
}

white_list = makeWhiteList([web_gui])
        `}</CodePane>
                )}
              </div>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

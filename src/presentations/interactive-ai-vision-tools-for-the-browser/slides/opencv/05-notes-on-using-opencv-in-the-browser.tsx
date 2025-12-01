import { IntelSlide as Slide } from "@/components/slides/slide";
import { CodeSpan, Stepper } from "spectacle";

import { List, ListItem } from "../../components/lists";
import { CodePane } from "./../../components/code";
import { Layout, TitleHeading } from "./../../layouts/default";

export function NotesOnUsingOpenCVInTheBrowser() {
  return (
    <Slide>
      <Layout
        heading={<TitleHeading title="Notes on using OpenCV in the browser" subtitle="Smart tools with OpenCV" />}
      >
        <Stepper alwaysVisible values={[0, 1, 2]} activeStyle={{ height: "100%", minHeight: "0" }}>
          {(_, step) => {
            return (
              <List className=" list-disc prose-2xl prose-li:font-medium text-classical-blue-shade-2">
                <ListItem>No typescript types</ListItem>
                <List subList invisible={step < 0}>
                  <ListItem subItem>
                    We ended up copying the interfaces from{" "}
                    <span className="ml-2 text-classical-blue-shade-1">
                      <CodeSpan>peteruhnak/opencv-ts</CodeSpan>
                    </span>
                  </ListItem>
                </List>
                <ListItem invisible={step < 1}>
                  <div className="flex flex-col gap-4">
                    <span>Memory needs to be freed manually to avoid memory leaks</span>

                    <div className={`mt-4 ${step < 2 ? "invisible" : ""}`}>
                      <CodePane
                        language="typescript"
                        showLineNumbers={false}
                        children={`
function processImage(cv: OpenCV, imageElement: HTMLImageElement) {
  const src = cv.imread(imageElement);
  const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8U);

  try {
    // Your processing here
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    cv.imshow('output', dst);
  } finally {
    src.delete();
    dst.delete();
  }
}
`}
                      />
                      <span className="text-xl text-gray-400">
                        Native <pre className="px-0 inline text-yellow-500 underline p-0 m-0">using</pre> support would
                        be great
                      </span>
                    </div>
                  </div>
                </ListItem>
              </List>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

import ChromeLabsLogo from "@/assets/aigrunn/chrome-labs-logo.png";
import { IntelSlide as Slide } from "@/components/slides/slide";
import { Stepper } from "spectacle";

import { List, ListItem } from "../../components/lists";
import { CodePane } from "./../../components/code";
import { Layout, TitleHeading } from "./../../layouts/default";

export function MultithreadingWithWebWorkers() {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="Multithreading with WebWorkers" subtitle="Smart tools with OpenCV" />}>
        <Stepper alwaysVisible values={[0, 1, 2, 3, 4]} activeStyle={{ height: "100%", minHeight: "0" }}>
          {(_, step) => {
            return (
              <div className="grid grid-cols-2 max-h-full max-w-full h-full w-full">
                {/* TODO Add stepper */}
                <List>
                  <ListItem>Browsers are single threaded</ListItem>
                  <ListItem muted={step < 0}>
                    Long running computations will block the UI thread
                    <List>
                      <ListItem subItem muted={step < 0}>
                        Block user interactions and animations
                      </ListItem>
                      <ListItem subItem muted={step < 0}>
                        Make tools feel less interactive
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem muted={step < 1}>
                    <div className="flex gap-4 mt-8 items-center h-[2em]">
                      Solution: Web Workers +
                      <img src={ChromeLabsLogo} width={"40px"} />
                      <span>Comlink</span>
                    </div>
                    <List subList>
                      <ListItem subItem muted={step < 1}>
                        Move heavy computations to web workers
                      </ListItem>
                      <ListItem subItem muted={step < 1}>
                        Load OpenCV and algorithm logic in a worker
                      </ListItem>
                      <ListItem subItem muted={step < 1}>
                        Communication via Chromelab's Comlink
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
                <div className={`flex flex-col gap-8 ${step < 2 ? "hidden" : ""}`}>
                  <CodePane
                    filename="main.ts"
                    language="typescript"
                    className={step < 3 ? "grayscale" : ""}
                    children={`
import * as Comlink from 'comlink';

// Import worker as class instance
const GrabcutWorker = Comlink.wrap<typeof GrabcutService>(
  new Worker('grabcut-worker.ts')
);

// Call methods like normal class!
const polygon = await GrabcutWorker.grabcut(imageData, rect);
`}
                  />
                  <CodePane
                    filename="grabcut.worker.ts"
                    language="typescript"
                    className={step < 4 ? "grayscale" : ""}
                    children={`
import * as Comlink from 'comlink';

class GrabcutService {
  async grabcut(imageData: ImageData, rect: Rect): Promise<Point[]> {
    const cv = await OpenCVLoader();
    return grabcutSimple(cv, imageData, rect);
  }
}

Comlink.expose(GrabcutService);
`}
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

import { IntelSlide as Slide } from "@/components/slides/slide";
import { Stepper } from "spectacle";

import { Heading } from "./../../components/heading";
import { Layout, TitleHeading } from "./../../layouts/default";

export function Requirements() {
  return (
    <Slide>
      <Layout heading={<TitleHeading title="Requirements" subtitle="Smart tools with OpenCV" />}>
        <Heading className="text-classical-blue-shade-1 font-normal sm:text-5xl  my-20 tracking-tighter text-center">
          Interactive Annotation Tools
        </Heading>
        <Stepper alwaysVisible values={[0, 1, 2]} activeStyle={{ height: "100%" }}>
          {(_, step) => {
            return (
              <ul className="prose-xl prose-li:my-1 prose-ol:my-1 columns-3 text-center gap-8">
                <li
                  className={`flex flex-col bg-gray-100 p-8 ${step < 0 ? "grayscale" : ""} ${step === 0 ? "border-classical-blue-tint-1" : "border-gray-300"} border-2 `}
                >
                  <span className="text-4xl text-yellow-400">⚡</span>
                  <span className="font-bold my-4">Low latency</span>
                  <span className="font-light">Instant feedback during annotation</span>
                  <span className="font-light">Sub 200ms per interaction</span>
                </li>

                <li
                  className={`flex flex-col bg-gray-100 p-8 ${step < 1 ? "grayscale" : ""} ${step === 1 ? "border-classical-blue-tint-1" : "border-gray-300"} border-2 `}
                >
                  <span className="text-4xl">🎯</span>
                  <span className="font-bold my-4">Accurate</span>
                  <span className="font-light">Handle complex cases accurately</span>
                  <span className="font-light">Novel objects, edge cases</span>
                </li>
                <li
                  className={`flex flex-col bg-gray-100 p-8 ${step < 2 ? "grayscale" : ""} ${step === 2 ? "border-classical-blue-tint-1" : "border-gray-300"} border-2 `}
                >
                  <span className="text-4xl">✏</span>
                  <span className="font-bold my-4">Refinable</span>
                  <span className="font-light">Results should be correctable</span>
                  <span className="font-light">Click to refine, iterate quickly</span>
                </li>
              </ul>
            );
          }}
        </Stepper>
      </Layout>
    </Slide>
  );
}

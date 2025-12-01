import { GetiSlide } from "@/components/slides/slide";

import { Heading } from "./../../components/heading";
import { EmailIcon, GithubIcon } from "./../../components/icons";

export function TitleSlide() {
  return (
    <GetiSlide id={"title-title"}>
      <div className="flex flex-col h-full   p-[10vh]">
        <Heading level={1} className="text-white font-medium sm:text-[6vw] leading-none">
          Building interactive AI vision tools for the browser
        </Heading>
        <Heading level={3} className="text-white font-normal sm:text-4xl my-5">
          Mark Redeman - Interactive AI @ Intel
        </Heading>
        <ul className="text-white  text-4xl mt-[15vh]">
          <li className="flex gap-4 items-center my-2">
            <GithubIcon className="w-10 h-10 fill-emerald-50" />{" "}
            <span className="font-mono">MarkRedeman/ai-grunn-2025</span>
          </li>

          <li className="flex gap-4 items-center my-2">
            <EmailIcon className="w-10 h-10 text-white fill-emerald-50" />
            <span className="font-mono">mark.s.redeman@intel.com</span>
          </li>
        </ul>
      </div>
    </GetiSlide>
  );
}

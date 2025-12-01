import { GetiSlide } from "@/components/slides/slide";
import type { ReactNode } from "react";

import { Heading } from "./../components/heading";

export function GetiTitleSlide({
  number,
  title,
  id,
}: {
  number: string;
  title: string;
  id?: string;
  notes?: ReactNode;
}) {
  return (
    <GetiSlide id={id}>
      <div className="flex flex-col h-full content-center p-[10vh]">
        <Heading level={3} className="text-white font-normal sm:text-4xl">
          {number}
        </Heading>
        <Heading level={1} className="text-white font-medium sm:text-[6vw] leading-none">
          {title}
        </Heading>
      </div>
    </GetiSlide>
  );
}

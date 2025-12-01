import type { ReactNode } from "react";

import { Heading } from "./../components/heading";

export function TitleHeading({ subtitle, title }: { subtitle: ReactNode; title: ReactNode }) {
  return (
    <>
      <Heading level={3} className="text-classical-blue-shade-1 font-medium sm:text-2xl ">
        {subtitle}
      </Heading>

      <Heading level={1} className="text-classical-blue-shade-1 font-normal sm:text-5xl my-4 mb-8 ">
        {title}
      </Heading>
    </>
  );
}

export function Layout({
  children,
  heading,
  withoutBleed = false,
  background,
  aside,
}: {
  children: ReactNode;
  heading: ReactNode;
  withoutBleed?: boolean;
  background?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <>
      <div
        className={`grid
      [grid-template-areas:'heading_heading_aside''content_content_content']
      grid-cols-[minmax(60ch,_2fr)_1fr_auto] grid-rows-[minmax(auto,_16vh)_2fr] h-full`}
      >
        {background && <div className="col-span-full row-span-full">{background}</div>}

        <div className="[grid-area:heading] p-[5vh]">{heading}</div>

        {/* move vertical bleed */}
        <div className={`[grid-area:content] min-h-0 min-w-0 ${withoutBleed ? "" : "px-[5vh]"}`}>{children}</div>

        {aside && <div className={`[grid-area:aside] min-h-0 min-w-0`}>{aside}</div>}
      </div>
    </>
  );
}

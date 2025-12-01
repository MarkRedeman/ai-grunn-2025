import type { ComponentProps, ReactNode} from "react";
import { useContext } from "react";
import { DeckContext, Slide as SpectacleSlide } from "spectacle";

const noTransition = { from: 0, enter: 0, leave: 0 };

const transition = noTransition;

function Footer() {
  return <div className="flex justify-between items-center p-5 h-full">{/* Here was a pacman */}</div>;
}

function SlideNumber() {
  const ctx = useContext(DeckContext);
  const slideNumber = ctx.activeView.slideIndex + 1;

  return <span>{slideNumber}</span>;
}

export function GetiSlide({ children, ...rest }: SlideProps) {
  return (
    <SpectacleSlide {...rest} transition={transition} backgroundColor="var(--color-slate-950)">
      <div
        className={`grid [grid-template-areas:'main_aside''footer_count'] grid-cols-[1fr_var(--footer-height)] grid-rows-[1fr_var(--footer-height)] h-full `}
        style={{
          background:
            "linear-gradient(45deg, var(--color-energy-blue), 25%, var(--color-classical-blue-tint-1), var(--color-classical-blue-tint-1) 75%, var(--color-moss))",
        }}
      >
        <div className="[grid-area:main] h-full grid content-center overflow-hidden">{children}</div>
        <div className="[grid-area:footer] bg-carbon-tint-2/40 ">
          <Footer />
        </div>

        <div className="[grid-area:aside] bg-carbon-tint-2/40" />

        <div className="[grid-area:count] bg-white/40 p-4 flex items-center justify-center text-white">
          <SlideNumber />
        </div>
      </div>
    </SpectacleSlide>
  );
}

// TODO: Split into slide layout
function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`grid [grid-template-areas:'main_aside''footer_count'] grid-cols-[1fr_5rem] grid-rows-[1fr_5rem] h-screen max-h-screen max-w-screen w-screen`}
    >
      <div className="[grid-area:main]  min-h-0 min-w-0 bg-white">{children}</div>

      <div className="[grid-area:footer] bg-carbon-tint-2/40">
        <Footer
        // color="var(--color-carbon-tint-1)"
        />
      </div>

      <div className="[grid-area:aside] bg-carbon-tint-2/40" />

      <div className="[grid-area:count] bg-white/40 p-4 flex items-center justify-center">
        <SlideNumber />
      </div>
    </div>
  );
}

// energy/classic blue
// moss
type SlideProps = ComponentProps<typeof SpectacleSlide>;
export function IntelSlide({ children, ...rest }: SlideProps) {
  return (
    <SpectacleSlide {...rest} transition={transition} backgroundColor="var(--color-white)">
      <Layout>{children}</Layout>
    </SpectacleSlide>
  );
}

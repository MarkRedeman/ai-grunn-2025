import { motion } from "motion/react";
import { useContext, useMemo, useRef, useState } from "react";
import type { DeckProps } from "spectacle";
import { DeckContext } from "spectacle";
import { twMerge } from "tailwind-merge";

import "./pacman.css";

interface PacmanProps {
  isMoving: boolean;
  size: { width: number; height: number };
}

const Pacman = ({ isMoving, size = { width: 100, height: 100 } }: PacmanProps) => {
  return (
    <div className="">
      <div
        className={twMerge("pacman", isMoving && "pacman-moving-mouth")}
        style={{
          width: size.width,
          height: size.height,
        }}
      ></div>
    </div>
  );
};

type Template = DeckProps["template"];

const SIZE = 20;

// TODO
// Add dots with an onHover effect
// for all transitions add a transition delay
const PacmanViewProgress = ({
  id,
  currentStep,
  totalSteps,
}: {
  id?: number;
  totalSteps: number;
  currentStep: number;
}) => {
  const ctx = useContext(DeckContext);

  const [layoutId] = useState(() => id ?? Math.ceil(Math.random() * 100000));

  const steps = useMemo(() => new Array(totalSteps).fill(0), [totalSteps]);
  const pos = currentStep - 1;
  const [isMoving, setIsMoving] = useState(false);
  const targetPosition = useRef(0);

  return (
    <div>
      <ul className="text-white flex gap-1">
        {steps.map((_step, idx) => {
          const previousIsTitle = idx > 0 && ctx.slideIds[idx - 1]?.toString()?.includes("title");
          const dot = previousIsTitle === false && ctx.slideIds[idx].toString().includes("title") ? "🥚" : "•";

          return (
            <motion.li
              key={idx}
              layout
              className={twMerge(
                "flex items-center justify-center",
                // idx === pos ? "bg-red-300" : "bg-cyan-300"
                `w-[${SIZE}px] h-[${SIZE}px]`
              )}
            >
              <div
                className="grid [grid-template-areas:'pacman'] content-center hover:cursor-pointer"
                onClick={() => {
                  ctx.skipTo({ slideIndex: idx, stepIndex: 0 });
                }}
              >
                <div
                  className="[grid-area:pacman] justify-center content-center text-gray-300 hover:cursor-pointer text-center "
                  style={{ width: SIZE, height: SIZE }}
                >
                  {dot}
                </div>
                <div className="[grid-area:pacman] justify-center content-center">
                  {idx === pos ? (
                    <motion.div
                      layoutId={`pacman-${layoutId}`}
                      onLayoutAnimationStart={() => {
                        setIsMoving(true);
                        targetPosition.current = pos;
                      }}
                      onLayoutAnimationComplete={() => {
                        // There is a race condition here
                        if (pos === targetPosition.current) {
                          setIsMoving(false);
                        }
                      }}
                      // Add a small delay so that pacman will start chomping before it moves
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Pacman isMoving={isMoving} size={{ width: SIZE, height: SIZE }} />
                    </motion.div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export const PacmanTemplate: Template = function ({ slideNumber, numberOfSlides }) {
  return (
    <div className="absolute bottom-0 z-100 overflow-none p-5 grid content-center [grid-area:footer] h-(--footer-height)">
      <PacmanViewProgress id={1234} currentStep={slideNumber} totalSteps={numberOfSlides} />
    </div>
  );
};

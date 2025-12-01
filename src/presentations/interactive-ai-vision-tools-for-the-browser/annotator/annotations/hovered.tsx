import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import { useAnnotation } from "./annotations";

const HoveredAnnotation = createContext<Set<string>>(new Set());
const SetHoveredAnnotation = createContext<null | Dispatch<SetStateAction<Set<string>>>>(null);

export function useSetHoveredAnnotation() {
  return useContext(SetHoveredAnnotation);
}

export function useIsHovered() {
  return useContext(HoveredAnnotation).size > 0;
}

export function useHoveredAnnotation() {
  return useContext(HoveredAnnotation);
}

export function HoverableAnnotation({ children }: { children: ReactNode }) {
  const annotation = useAnnotation();
  const isHovered = useHoveredAnnotation().has(annotation.id);
  const setHoveredAnnotation = useSetHoveredAnnotation();

  // Make rendering hovered optional
  if (setHoveredAnnotation === null) {
    return children;
  }

  return (
    <g
      onPointerEnter={() => setHoveredAnnotation(new Set([annotation.id]))}
      onPointerLeave={() => isHovered && setHoveredAnnotation(new Set(null))}
      style={{
        ...(isHovered ? { transitionDelay: "0" } : {}),
        transitionProperty: "fill-opacity",
        transitionTimingFunction: "ease-in-out",
        transitionDuration: "0.1s",
        transitionDelay: isHovered ? "0s" : "0.25s",

        strokeWidth: isHovered ? "calc(2px / var(--zoom-scale))" : undefined,
      }}
    >
      {children}
    </g>
  );
}

export function HoveredProvider({ children, forceHover }: { children: ReactNode; forceHover?: Set<string> }) {
  const [hoveredAnnotation, setHoveredAnnotation] = useState<Set<string>>(new Set());

  return (
    <HoveredAnnotation.Provider value={forceHover ?? hoveredAnnotation}>
      <SetHoveredAnnotation.Provider value={setHoveredAnnotation}>{children}</SetHoveredAnnotation.Provider>
    </HoveredAnnotation.Provider>
  );
}

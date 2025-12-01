import { type ReactNode, useId } from "react";

import type { Annotation } from "./../types";
import { AnnotationShape } from "./annotation-shape";
import { AnnotationContext } from "./annotations";
import { useHoveredAnnotation as useHoveredAnnotationIds } from "./hovered";

export function MaskAnnotations({
  annotations,
  children,
  width,
  height,
}: {
  annotations: Array<Annotation>;
  children: ReactNode;
  width: number;
  height: number;
}) {
  const hoveredAnnotationIds = useHoveredAnnotationIds();
  const isHovered = hoveredAnnotationIds.size > 0;
  const maskOpacity = isHovered ? 0.8 : 0.0;
  const maskId = useId();

  return (
    <>
      <mask id={`mask-${maskId}`}>
        <rect x="0" y="0" width={width} height={height} style={{ fill: "white", fillOpacity: 1.0 }} />
        {annotations.map((annotation) => {
          const hovered = hoveredAnnotationIds.has(annotation.id);

          if (!hovered) {
            return null;
          }

          return (
            <g
              key={annotation.id}
              style={{
                fill: "black",
                fillOpacity: hovered ? 1.0 : 0.0,
                transitionProperty: "fill-opacity",
                transitionTimingFunction: "ease-in-out",
                transitionDuration: hovered ? "0.2s" : "0.1s",
                transitionDelay: hovered ? "0s" : ".25s",
              }}
            >
              <AnnotationContext.Provider value={annotation}>
                <AnnotationShape />
              </AnnotationContext.Provider>
            </g>
          );
        })}
      </mask>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        mask={`url(#mask-${maskId})`}
        style={{
          fillOpacity: `var(--mask-opacity, ${maskOpacity})`,
          fill: "black",
          strokeWidth: 0,
          transition: "fill-opacity 0.1s ease-in-out",
          transitionDelay: isHovered ? "0s" : ".25s",
          transitionDuration: isHovered ? "0.2s" : "0.1s",
        }}
      />
      <g>{children}</g>
    </>
  );
}

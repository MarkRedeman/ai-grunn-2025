import type { CSSProperties, ReactNode } from "react";
import { createContext, useContext } from "react";

import type { Annotation as AnnotationType } from "./../types";
import { AnnotationShape } from "./annotation-shape";
import { HoverableAnnotation } from "./hovered";
import { MaskAnnotations } from "./masked";

export const AnnotationContext = createContext<AnnotationType | null>(null);
export function useAnnotation() {
  const ctx = useContext(AnnotationContext);
  return ctx!;
}

function Annotation({ annotation }: { annotation: AnnotationType }) {
  return (
    <AnnotationContext.Provider value={annotation}>
      <HoverableAnnotation>
        <AnnotationShape />
      </HoverableAnnotation>
    </AnnotationContext.Provider>
  );
}

export const DEFAULT_ANNOTATION_STYLES = {
  fillOpacity: "var(--annotation-fill-opacity, 0.1)",
  fill: "var(--annotation-fill)",
  stroke: "var(--annotation-stroke)",
  strokeLinecap: "round",
  strokeWidth: "calc(2px / var(--zoom-scale))",
  strokeDashoffset: 0,
  strokeDasharray: 0,
  strokeOpacity: "var(--annotation-border-opacity, 1)",
} satisfies CSSProperties;

export function Annotations({
  annotations,
  width,
  height,
  style,
  children,
}: {
  annotations: Array<AnnotationType>;
  width: number;
  height: number;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <svg width={width} height={height} style={{ ...DEFAULT_ANNOTATION_STYLES, ...style }}>
      <MaskAnnotations annotations={annotations} width={width} height={height}>
        {annotations.map((annotation) => (
          <Annotation annotation={annotation} key={annotation.id} />
        ))}
      </MaskAnnotations>
      {children}
    </svg>
  );
}

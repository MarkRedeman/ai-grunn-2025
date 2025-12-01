import type { CSSProperties } from "react";
import { Fragment } from "react";

import { Polygon } from "../annotator/annotations/annotation-shape";
import type { Polygon as PolygonType } from "../annotator/types";

export function HighlightPolygons({
  highlightedPolygons,
  style,
}: {
  highlightedPolygons: Array<PolygonType>;
  style?: CSSProperties;
}) {
  return (
    <g
      style={{
        stroke: "var(--color-purple-800)",
        strokeLinecap: "round",
        strokeWidth: "calc(2px / var(--zoom-scale))",
        ...style,
      }}
    >
      {highlightedPolygons.map((highlightedPolygon, idx) => {
        return (
          <Fragment key={idx}>
            <Polygon shape={highlightedPolygon} />
            {highlightedPolygon.points.map((point, idx) => {
              return (
                <rect key={idx} x={point.x - 4} y={point.y - 4} width={8} height={8} fill={"white"} fillOpacity={1} />
              );
            })}
          </Fragment>
        );
      })}
    </g>
  );
}

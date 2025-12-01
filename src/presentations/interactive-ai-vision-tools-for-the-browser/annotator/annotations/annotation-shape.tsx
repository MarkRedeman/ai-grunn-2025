import type { OrientedBoundingBox as OrientedBoundingBoxType, Polygon as PolygonType } from "../types";
import { useAnnotation } from "./annotations";

function OrientedBoundingBox({ shape }: { shape: OrientedBoundingBoxType }) {
  const { cx, cy, width, height, angle } = shape;

  return (
    <rect
      x={cx - width / 2}
      y={cy - height / 2}
      width={width}
      height={height}
      transform={`rotate(${angle})`}
      transform-origin={`${cx}px ${cy}px`}
    />
  );
}

export function Polygon({ shape }: { shape: PolygonType }) {
  const getFormattedPoints = (points: Array<{ x: number; y: number }>): string =>
    points.map(({ x, y }) => `${x},${y}`).join(" ");

  const points = getFormattedPoints(shape.points);

  return <polygon points={points} />;
}

export function AnnotationShape() {
  const annotation = useAnnotation();

  const shape = annotation.shape;

  if (shape.type === "bounding-box") {
    return <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} />;
  }

  if (shape.type === "polygon") {
    return <Polygon shape={shape} />;
  }

  if (shape.type === "circle") {
    return <circle cx={shape.cx} cy={shape.cy} r={shape.r} />;
  }

  if (shape.type === "oriented-bounding-box") {
    return <OrientedBoundingBox shape={shape} />;
  }
}

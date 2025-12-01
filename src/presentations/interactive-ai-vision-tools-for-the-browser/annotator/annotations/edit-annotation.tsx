import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

import type { Annotation, BoundingBox } from "../types";
import { useZoom } from "../zoom/zoom";
import { AnnotationShape } from "./annotation-shape";
import { AnnotationContext } from "./annotations";

enum PointerType {
  Mouse = "mouse",
  Pen = "pen",
  Touch = "touch",
}
const BUTTON_LEFT = {
  button: 0,
  buttons: 1,
};

interface MouseButton {
  button: number;
  buttons: number;
}

const isButton = (button: MouseButton, buttonToCompare: MouseButton): boolean =>
  button.button === buttonToCompare.button || button.buttons === buttonToCompare.buttons;

const isLeftButton = (button: MouseButton): boolean => {
  return isButton(button, BUTTON_LEFT);
};

type Point = { x: number; y: number };

export const ANCHOR_SIZE = 8;

export enum ResizeAnchorType {
  SQUARE,
  CIRCLE,
  CUSTOM,
}

interface ResizeAnchorProps {
  zoom: number;
  x: number;
  y: number;
  moveAnchorTo: (x: number, y: number) => void;
  cursor?: CSSProperties["cursor"];
  label: string;
  onStart?: () => void;
  onComplete: () => void;
  type?: ResizeAnchorType;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  AnchorShape?: ReactNode;
  roi: { x: number; y: number; width: number; height: number };
}

interface DefaultCircleProps {
  zoom: number;
  x: number;
  y: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

const DefaultCircle = ({ x, y, zoom, fill, stroke, strokeWidth = 1 }: DefaultCircleProps) => {
  return <circle cx={x} cy={y} r={ANCHOR_SIZE / zoom / 2} {...{ fill, stroke, strokeWidth: strokeWidth / zoom }} />;
};

export const ResizeAnchor = ({
  x,
  y,
  zoom,
  onStart,
  onComplete,
  moveAnchorTo,
  label,
  fill = "white",
  type = ResizeAnchorType.SQUARE,
  cursor = "all-scroll",
  stroke = "var(--energy-blue)",
  strokeWidth = 1,
  AnchorShape = <DefaultCircle x={x} y={y} zoom={zoom} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />,
  roi,
}: ResizeAnchorProps) => {
  const size = ANCHOR_SIZE / zoom;

  // We render both a visual anchor and an invisible anchor that has a larger
  // clicking area than the visible one
  const visualAnchorProps = {
    fill,
    stroke,
    strokeWidth: strokeWidth / zoom,
  };

  return (
    <Anchor
      roi={roi}
      size={size}
      label={label}
      x={x}
      y={y}
      zoom={zoom}
      fill={fill}
      cursor={cursor ? cursor : "default"}
      onStart={onStart}
      onComplete={onComplete}
      moveAnchorTo={moveAnchorTo}
    >
      {type === ResizeAnchorType.SQUARE ? (
        <g fillOpacity={1.0}>
          <rect x={x - size / 2} y={y - size / 2} width={size} height={size} {...visualAnchorProps} />
        </g>
      ) : (
        AnchorShape
      )}
    </Anchor>
  );
};

interface AnchorProps {
  children: ReactNode;
  x: number;
  y: number;
  size: number;
  zoom: number;
  label: string;
  fill?: string;
  cursor?: CSSProperties["cursor"];
  onStart?: () => void;
  onComplete: () => void;
  moveAnchorTo: (x: number, y: number) => void;
  roi: { x: number; y: number; width: number; height: number };
}

export const Anchor = ({
  x,
  y,
  fill = "white",
  size,
  zoom,
  label,
  cursor,
  children,
  onStart,
  moveAnchorTo,
  onComplete,
  roi,
}: AnchorProps) => {
  const [dragFrom, setDragFrom] = useState<Point | null>(null);

  const onPointerDown = (event: PointerEvent) => {
    event.preventDefault();

    if (event.pointerType === PointerType.Touch || !isLeftButton(event)) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);

    const mouse = { x: Math.round(event.clientX / zoom), y: Math.round(event.clientY / zoom) };

    if (onStart) {
      onStart();
    }
    setDragFrom({ x: mouse.x - x, y: mouse.y - y });
  };

  const onPointerMove = (event: PointerEvent) => {
    event.preventDefault();

    if (dragFrom === null) {
      return;
    }

    const mouse = { x: Math.round(event.clientX / zoom), y: Math.round(event.clientY / zoom) };

    const clampX = (x: number) => Math.max(roi.x, Math.min(roi.width, x));
    const clampY = (y: number) => Math.max(roi.y, Math.min(roi.height, y));

    moveAnchorTo(clampX(mouse.x - dragFrom.x), clampY(mouse.y - dragFrom.y));
  };

  const onPointerUp = (event: PointerEvent) => {
    if (event.pointerType === PointerType.Touch || !isLeftButton(event)) {
      return;
    }

    event.preventDefault();
    event.currentTarget.releasePointerCapture(event.pointerId);

    setDragFrom(null);
    onComplete();
  };

  // We render both a visual anchor and an invisible anchor that has a larger
  // clicking area than the visible one
  const interactiveAnchorProps = {
    style: { cursor },
    fill: dragFrom === null ? fill : "var(--energy-blue)",
    "aria-label": label,
    onPointerUp,
    onPointerMove,
    onPointerDown,
  };

  return (
    <g>
      {children}
      <rect
        x={x - size}
        y={y - size}
        cx={x}
        cy={y}
        width={size * 2}
        height={size * 2}
        fillOpacity={0}
        strokeOpacity={0}
        {...interactiveAnchorProps}
      />
    </g>
  );
};

const STROKE_WIDTH = 2;

interface TranslateShapeProps {
  zoom: number;
  annotation: Annotation;
  translateShape: ({ x, y }: { x: number; y: number }) => void;
  onComplete: () => void;
  children?: ReactNode;
}

export const TranslateShape = ({ zoom, annotation, onComplete, translateShape, children }: TranslateShapeProps) => {
  const [dragFromPoint, setDragFromPoint] = useState<null | Point>(null);

  const onPointerDown = (event: PointerEvent<SVGSVGElement>): void => {
    if (dragFromPoint !== null) {
      return;
    }

    if (!isLeftButton(event)) {
      return;
    }

    const mouse = { x: Math.round(event.clientX / zoom), y: Math.round(event.clientY / zoom) };

    event.currentTarget.setPointerCapture(event.pointerId);

    setDragFromPoint(mouse);
  };

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    event.preventDefault();

    if (dragFromPoint === null) {
      return;
    }

    const mouse = { x: Math.round(event.clientX / zoom), y: Math.round(event.clientY / zoom) };

    translateShape({
      x: mouse.x - dragFromPoint.x,
      y: mouse.y - dragFromPoint.y,
    });
    setDragFromPoint(mouse);
  };

  const onPointerUp = (event: PointerEvent<SVGSVGElement>) => {
    if (dragFromPoint === null) {
      return;
    }
    event.preventDefault();
    setDragFromPoint(null);
    event.currentTarget.releasePointerCapture(event.pointerId);
    onComplete();
  };

  return (
    <g
      id={`translate-annotation-${annotation.id}`}
      stroke="var(--energy-blue)"
      strokeWidth={STROKE_WIDTH / zoom}
      aria-label="Drag to move shape"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{ pointerEvents: "auto", cursor: "move" }}
    >
      {children}
    </g>
  );
};

export const getBoundingBoxResizePoints = ({
  boundingBox,
  gap,
  onResized,
}: {
  gap: number;
  boundingBox: BoundingBox;
  onResized: (boundingBox: BoundingBox) => void;
}) => {
  return [
    {
      x: boundingBox.x,
      y: boundingBox.y,
      moveAnchorTo: (x: number, y: number) => {
        const x1 = Math.max(0, Math.min(x, boundingBox.x + boundingBox.width - gap));
        const y1 = Math.max(0, Math.min(y, boundingBox.y + boundingBox.height - gap));

        onResized({
          type: "bounding-box",
          x: x1,
          width: Math.max(gap, boundingBox.width + boundingBox.x - x1),
          y: y1,
          height: Math.max(gap, boundingBox.height + boundingBox.y - y1),
        });
      },
      cursor: "nw-resize",
      label: "North west resize anchor",
    },
    {
      x: boundingBox.x + boundingBox.width / 2,
      y: boundingBox.y,
      moveAnchorTo: (_x: number, y: number) => {
        const y1 = Math.max(0, Math.min(y, boundingBox.y + boundingBox.height - gap));

        onResized({
          ...boundingBox,
          y: y1,
          height: Math.max(gap, boundingBox.height + boundingBox.y - y1),
        });
      },
      cursor: "n-resize",
      label: "North resize anchor",
    },
    {
      x: boundingBox.x + boundingBox.width,
      y: boundingBox.y,
      moveAnchorTo: (x: number, y: number) => {
        const y1 = Math.max(0, Math.min(y, boundingBox.y + boundingBox.height - gap));

        onResized({
          ...boundingBox,
          width: Math.max(gap, x - boundingBox.x),
          y: y1,
          height: Math.max(gap, boundingBox.height + boundingBox.y - y1),
        });
      },
      cursor: "ne-resize",
      label: "North east resize anchor",
    },
    {
      x: boundingBox.x + boundingBox.width,
      y: boundingBox.y + boundingBox.height / 2,
      moveAnchorTo: (x: number) => {
        onResized({ ...boundingBox, width: Math.max(gap, x - boundingBox.x) });
      },
      cursor: "e-resize",
      label: "East resize anchor",
    },
    {
      x: boundingBox.x + boundingBox.width,
      y: boundingBox.y + boundingBox.height,
      moveAnchorTo: (x: number, y: number) => {
        onResized({
          type: "bounding-box",
          x: boundingBox.x,
          width: Math.max(gap, x - boundingBox.x),

          y: boundingBox.y,
          height: Math.max(gap, y - boundingBox.y),
        });
      },
      cursor: "se-resize",
      label: "South east resize anchor",
    },
    {
      x: boundingBox.x + boundingBox.width / 2,
      y: boundingBox.y + boundingBox.height,
      moveAnchorTo: (_x: number, y: number) => {
        onResized({
          ...boundingBox,
          y: boundingBox.y,
          height: Math.max(gap, y - boundingBox.y),
        });
      },
      cursor: "s-resize",
      label: "South resize anchor",
    },
    {
      x: boundingBox.x,
      y: boundingBox.y + boundingBox.height,
      moveAnchorTo: (x: number, y: number) => {
        const x1 = Math.max(0, Math.min(x, boundingBox.x + boundingBox.width - gap));

        onResized({
          type: "bounding-box",
          x: x1,
          width: Math.max(gap, boundingBox.width + boundingBox.x - x1),

          y: boundingBox.y,
          height: Math.max(gap, y - boundingBox.y),
        });
      },
      cursor: "sw-resize",
      label: "South west resize anchor",
    },
    {
      x: boundingBox.x,
      y: boundingBox.y + boundingBox.height / 2,
      moveAnchorTo: (x: number) => {
        const x1 = Math.max(0, Math.min(x, boundingBox.x + boundingBox.width - gap));

        onResized({
          ...boundingBox,
          x: x1,
          width: Math.max(gap, boundingBox.width + boundingBox.x - x1),
        });
      },
      cursor: "w-resize",
      label: "West resize anchor",
    },
  ];
};

interface EditBoundingBoxProps {
  children: ReactNode;
  annotation: Annotation & { shape: { type: "bounding-box" } };
  onComplete: (shape: BoundingBox) => void;
  roi: { x: number; y: number; width: number; height: number };
}

export const EditBoundingBox = ({ annotation, children, onComplete, roi }: EditBoundingBoxProps) => {
  const [shape, setShape] = useState(annotation.shape);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setShape(annotation.shape), [annotation.shape]);

  const { scale } = useZoom();
  const onCompleteAnchor = () => {
    setShape({ ...annotation.shape });
    onComplete(shape);
  };

  const anchorPoints = getBoundingBoxResizePoints({
    gap: 2 * ANCHOR_SIZE,
    boundingBox: shape,
    onResized: (boundingBox) => {
      setShape({ ...shape, ...boundingBox });
    },
  });

  const onTranslate = (deltaPoint: Point) => {
    setShape({
      ...shape,
      x: shape.x + deltaPoint.x,
      y: shape.y + deltaPoint.y,
    });
  };

  return (
    <>
      <AnnotationContext.Provider value={{ ...annotation, shape }}>
        <TranslateShape zoom={scale} onComplete={onCompleteAnchor} annotation={annotation} translateShape={onTranslate}>
          <AnnotationShape />

          {children}
        </TranslateShape>
      </AnnotationContext.Provider>
      <g style={{ pointerEvents: "auto" }}>
        {anchorPoints.map((anchor) => {
          return <ResizeAnchor key={anchor.label} roi={roi} zoom={scale} onComplete={onCompleteAnchor} {...anchor} />;
        })}
      </g>
    </>
  );
};

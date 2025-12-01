import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef } from "react";

import { useResizeObserver } from "./use-resize-observer";
import { useSetZoom, useZoom } from "./zoom";

type Size = { width: number; height: number };

const DEFAULT_SCREEN_ZOOM = 1.0;
function getCenterCoordinates(container: Size, target: Size) {
  // Scale image so that it fits perfectly in the container
  const scale = DEFAULT_SCREEN_ZOOM * Math.min(container.width / target.width, container.height / target.height);

  return {
    scale,
    // Center image
    translate: {
      x: container.width / 2 - target.width / 2,
      y: container.height / 2 - target.height / 2,
    },
  };
}

const INITIAL_ZOOM = { scale: 1.0, translate: { x: 0, y: 0 } };
function SyncZoom({ container, target }: { container: Size; target: Size }) {
  const setZoom = useSetZoom();

  const targetZoom = useMemo(() => {
    if (container.width === undefined || container.height === undefined) {
      return INITIAL_ZOOM;
    }

    return getCenterCoordinates({ width: container.width, height: container.height }, target);
  }, [container, target]);

  useEffect(() => {
    if (targetZoom.scale === 0) {
      return;
    }

    setZoom({
      scale: Number(targetZoom.scale.toFixed(3)),
      translate: {
        x: Number(targetZoom.translate.x.toFixed(3)),
        y: Number(targetZoom.translate.y.toFixed(3)),
      },
    });
  }, [targetZoom.scale, targetZoom.translate.x, targetZoom.translate.y, setZoom]);

  return null;
}

export function ZoomTransform({ children, target }: { children: ReactNode; target: Size }) {
  const zoom = useZoom();
  const ref = useRef<HTMLDivElement>(null);
  const container = useResizeObserver({ ref });

  return (
    <div
      ref={ref}
      className="h-full w-full relative overflow-hidden m-0 p-0 select-none"
      // Enable hardware acceleration
      style={
        {
          transform: "translate3d(0, 0, 0)",
          "--zoom-scale": zoom.scale,
        } as CSSProperties
      }
    >
      <div
        className="flex flex-wrap origin-center w-fit h-fit"
        style={{
          transform: `translate(${zoom.translate.x}px, ${zoom.translate.y}px) scale(${zoom.scale})`,
          // TODO: enable this if we can figure out how to change it to origin-center
          // transition: 'transform ease-in-out 0.1s',
        }}
      >
        <SyncZoom container={container} target={target} />
        {children}
      </div>
    </div>
  );
}

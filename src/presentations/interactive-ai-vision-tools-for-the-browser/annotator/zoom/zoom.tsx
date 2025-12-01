import type { Dispatch, ReactNode, SetStateAction} from "react";
import { createContext, useContext, useState } from "react";

const noop = () => {};
export type ZoomState = { scale: number; translate: { x: number; y: number } };
export const Zoom = createContext<ZoomState>({
  scale: 1.0,
  translate: { x: 0, y: 0 },
});
export const SetZoom = createContext<Dispatch<SetStateAction<ZoomState>>>(noop);

export function useZoom() {
  return useContext(Zoom);
}

export function useSetZoom() {
  return useContext(SetZoom);
}

export function ZoomProvider({ children }: { children: ReactNode }) {
  const [zoom, setZoom] = useState<ZoomState>({
    scale: 1.0,
    translate: { x: 0, y: 0 },
  });

  return (
    <Zoom.Provider value={zoom}>
      <SetZoom.Provider value={setZoom}>{children}</SetZoom.Provider>
    </Zoom.Provider>
  );
}

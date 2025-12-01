import type { RefObject} from "react";
import { useEffect, useRef, useState } from "react";

type Size = { width: number; height: number };

const initialSize: Size = { width: 0, height: 0 };

export function useResizeObserver<T extends null | HTMLElement = HTMLElement>(options: { ref: RefObject<T> }): Size {
  const { ref } = options;
  const [{ width, height }, setSize] = useState<Size>(initialSize);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const previousSize = useRef<Size>({ ...initialSize });

  useEffect(() => {
    if (!ref.current) return;

    if (typeof window === "undefined" || !("ResizeObserver" in window)) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry["borderBoxSize"]) {
        return;
      }

      const boxSize = Array.isArray(entry["borderBoxSize"]) ? entry["borderBoxSize"][0] : entry["borderBoxSize"];
      const newWidth = boxSize["inlineSize"];
      const newHeight = boxSize["blockSize"];

      const hasChanged = previousSize.current.width !== newWidth || previousSize.current.height !== newHeight;

      if (hasChanged) {
        const newSize: Size = { width: newWidth, height: newHeight };
        previousSize.current.width = newWidth;
        previousSize.current.height = newHeight;

        if (isMounted.current) {
          setSize(newSize);
        }
      }
    });

    observer.observe(ref.current, { box: "border-box" });

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { width, height };
}

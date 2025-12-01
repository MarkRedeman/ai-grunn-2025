import type { ActivityProps, VideoHTMLAttributes} from "react";
import { useEffect, useRef, useState } from "react";
import { Activity } from "react";

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  mode?: ActivityProps["mode"];
  autoPlay?: boolean;
}

export function AutoplayVideo({ mode, autoPlay, onPointerEnter, onPointerLeave, ...props }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = useState(false);
  const prevAutoPlayRef = useRef(autoPlay ?? false);

  useEffect(() => {
    if (autoPlay && !prevAutoPlayRef.current) {
      videoRef.current?.play().catch(() => {
        // Handle autoplay policy restrictions
      });
    }
    prevAutoPlayRef.current = autoPlay ?? false;
  }, [autoPlay]);

  return (
    <Activity mode={mode}>
      <video
        ref={videoRef}
        preload="auto"
        controls={showControls}
        autoPlay={autoPlay}
        muted
        loop
        onPointerEnter={(e) => {
          setShowControls(true);
          onPointerEnter?.(e);
        }}
        onPointerLeave={(e) => {
          setShowControls(false);
          onPointerLeave?.(e);
        }}
        {...props}
      />
    </Activity>
  );
}

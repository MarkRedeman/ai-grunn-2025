import { useEffect, useRef } from "react";

export function ImageCanvas({
  image,
  imageId = undefined,
  className = "",
}: {
  image: ImageData;
  className?: string;
  imageId?: string | undefined;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // if an id is passed then we assume use it as it will be faster to compare
  const deps = [imageId !== undefined ? imageId : image];

  useEffect(
    () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.putImageData(image, 0, 0);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  return <canvas ref={canvasRef} width={image.width} height={image.height} className={className} />;
}

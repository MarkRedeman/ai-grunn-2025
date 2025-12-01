import { useSuspenseQuery } from "@tanstack/react-query";

function drawImageOnCanvas(img: HTMLImageElement, filter = ""): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = document.createElement("canvas");

  canvas.width = img.naturalWidth ? img.naturalWidth : img.width;
  canvas.height = img.naturalHeight ? img.naturalHeight : img.height;

  const ctx = canvas.getContext("2d");

  if (ctx) {
    const width = img.naturalWidth ? img.naturalWidth : img.width;
    const height = img.naturalHeight ? img.naturalHeight : img.height;

    ctx.filter = filter;
    ctx.drawImage(img, 0, 0, width, height);
  }

  return canvas;
}

export function getImageData(img: HTMLImageElement): ImageData {
  // Always return valid imageData, even if the image isn't loaded yet.
  if (img.width === 0 && img.height === 0) {
    return new ImageData(1, 1);
  }

  const canvas = drawImageOnCanvas(img);
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const width = img.naturalWidth ? img.naturalWidth : img.width;
  const height = img.naturalHeight ? img.naturalHeight : img.height;

  return ctx.getImageData(0, 0, width, height);
}

export function loadImage(link: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "use-credentials";

    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);

    image.fetchPriority = "high";
    image.src = link;
  });
}

export function useImageDataQuery(src: string) {
  return useSuspenseQuery({
    queryKey: ["image-data", src],
    queryFn: async () => {
      const image = await loadImage(src);

      const imageData = getImageData(image);

      return imageData;
    },
    gcTime: Infinity,
    staleTime: Infinity,
  });
}

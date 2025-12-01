import { HardDriveUploadIcon } from "lucide-react";
import { Button, FileTrigger } from "react-aria-components";

export function UploadImageButton({ onUpload }: { onUpload: (image: ImageData) => void }) {
  return (
    <>
      <FileTrigger
        onSelect={(e) => {
          const files = e ? Array.from(e) : [];

          const imageFile = files.at(0);

          if (imageFile === undefined) {
            return;
          }

          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                onUpload(imageData);
              }
            };
            img.src = event.target?.result as string;
          };
          reader.readAsDataURL(imageFile);
        }}
      >
        <Button
          className={`flex items-center transition rounded-sm
          border border-black/10
          bg-gray-300 text-primary-foreground hover:bg-classical-blue-shade-1 pressed:bg-classical-blue-shade-2 hover:text-white
          px-4 py-2 gap-2`}
        >
          <span>
            <HardDriveUploadIcon height={20} />
          </span>
          <span className="text-primary-foreground text-lg">Custom file</span>
        </Button>
      </FileTrigger>
    </>
  );
}

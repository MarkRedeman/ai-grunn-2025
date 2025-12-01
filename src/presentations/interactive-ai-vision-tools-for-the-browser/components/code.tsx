import type { ComponentProps } from "react";
import { CodeSpan, CodePane as SpectacleCodePane, codePaneThemes } from "spectacle";

const CODE_PANE_THEME = codePaneThemes.prism;

export function CodePane({
  filename,
  className = "",
  ...props
}: {
  filename?: string;
  className?: string;
} & ComponentProps<typeof SpectacleCodePane>) {
  return (
    <div className={`code-block flex flex-col h-min-0 ${className}`}>
      {filename && (
        <div className="text-white bg-gray-800 px-4 py-2">
          <CodeSpan>{filename}</CodeSpan>
        </div>
      )}
      <div className="overflow-y-auto h-min-0">
        <SpectacleCodePane theme={CODE_PANE_THEME} {...props} />
      </div>
    </div>
  );
}

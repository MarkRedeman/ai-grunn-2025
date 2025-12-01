import type { ComponentProps } from "react";
import { Deck as SpectacleDeck } from "spectacle";

import { PacmanTemplate } from "./pacman/pacman-template";

type DeckProps = ComponentProps<typeof SpectacleDeck>;
export function Deck(props: DeckProps) {
  return (
    <SpectacleDeck
      template={PacmanTemplate}
      theme={{
        colors: {
          primary: "var(--color-carbon-shade-2)",
        },
        backdropStyle: {
          background: "var(--color-white)",
        },
        Backdrop: ({ children, ...rest }) => {
          return (
            <main id="deck" {...rest}>
              {children}
            </main>
          );
        },
        space: [0, 0, 0],
      }}
      {...props}
    />
  );
}

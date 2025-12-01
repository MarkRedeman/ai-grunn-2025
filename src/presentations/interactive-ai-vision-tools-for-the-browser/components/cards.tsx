import type { ReactNode } from "react";
import type { VariantProps} from "tailwind-variants";
import { tv } from "tailwind-variants";

const cardStyles = tv({
  base: "flex flex-col gap-3 max-h-full min-h-0  pt-4 bg-gray-300 ",
  variants: {
    muted: {
      true: "grayscale",
    },
    bordered: {
      true: "border-4 border-gray-300",
    },
    active: {
      true: "border-4 border-purple-500 bg-purple-400",
    },
  },
  defaultVariants: {
    active: false,
    muted: false,
  },
});

type CardProps = VariantProps<typeof cardStyles> & {
  header: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Card({ header, children, className, muted = false, active = false, bordered = false }: CardProps) {
  return (
    <div
      className={cardStyles({
        muted,
        active,
        bordered,
        className,
      })}
    >
      <div className="text-xl text-classical-blue-shade-2 font-medium p-2 text-center">{header}</div>

      <div className={``}>{children}</div>
    </div>
  );
}

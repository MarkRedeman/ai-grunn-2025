import type { ComponentProps } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const listStyles = tv({
  base: "list-disc prose-2xl prose-li:font-medium text-classical-blue-shade-2",
  variants: {
    subList: {
      true: "list-disc prose-li:font-light text-gray-500",
    },
    invisible: {
      true: "invisible",
    },
  },
});

type ListVariants = VariantProps<typeof listStyles>;
type ListProps = ListVariants & Omit<ComponentProps<"ul">, keyof ListVariants>;

export const List = ({ subList, invisible, ...props }: ListProps) => {
  return <ul {...props} className={listStyles({ subList, invisible, className: props.className })} />;
};

const listItemStyles = tv({
  base: "mt-4",
  variants: {
    subItem: {
      true: "text-gray-500",
    },
    muted: {
      true: "text-gray-300 grayscale",
    },
    invisible: {
      true: "invisible",
    },
  },
});

type ListItemVariants = VariantProps<typeof listItemStyles>;
type ListItemProps = ListItemVariants & Omit<ComponentProps<"li">, keyof ListItemVariants>;

export const ListItem = ({ subItem, muted, invisible, ...props }: ListItemProps) => {
  return (
    <li
      {...props}
      className={listItemStyles({
        subItem,
        muted,
        invisible,
        className: props.className,
      })}
    />
  );
};

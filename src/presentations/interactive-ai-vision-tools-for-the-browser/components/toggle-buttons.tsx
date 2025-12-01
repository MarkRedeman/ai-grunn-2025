import { createContext, useContext } from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
  composeRenderProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { VariantProps} from "tailwind-variants";
import { tv } from "tailwind-variants";

type ToggleGroupContextValue = Pick<ToggleButtonGroupProps, "orientation">;

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  orientation: "horizontal",
});

const useToggleGroupContext = () => useContext(ToggleGroupContext);

type ToggleGroupProps = ToggleButtonGroupProps & VariantProps<typeof toggleGroupStyles>;

const toggleGroupStyles = tv({
  base: "inline-flex overflow-hidden",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const ToggleGroup = ({ orientation = "horizontal", className, ...props }: ToggleGroupProps) => {
  return (
    <ToggleGroupContext.Provider value={{ orientation }}>
      <ToggleButtonGroup
        data-slot="control"
        selectionMode={"single"}
        className={composeRenderProps(className, (className, renderProps) =>
          twMerge(toggleGroupStyles({ ...renderProps, className, orientation }))
        )}
        {...props}
      />
    </ToggleGroupContext.Provider>
  );
};

type ToggleGroupItemProps = ToggleButtonProps;

const toggleGroupItemStyles = tv({
  base: [
    "relative isolate",
    "inline-flex flex-row items-center text-sm/6 font-medium outline-hidden",
    "gap-2 px-4 py-2 ",
  ],
  variants: {
    orientation: {
      horizontal: "justify-center",
      vertical: "justify-start",
    },
    isSelected: {
      true: "bg-energy-blue/10",
      false: "grayscale",
    },
    isHovered: {
      true: "enabled:not-selected:bg-energy-blue/20 grayscale-0 ",
    },
    isDisabled: {
      true: "opacity-50",
    },
  },
});

const ToggleGroupItem = ({ className, ...props }: ToggleGroupItemProps) => {
  const { orientation } = useToggleGroupContext();

  return (
    <ToggleButton
      data-slot="toggle-group-item"
      className={composeRenderProps(className, (className, renderProps) =>
        twMerge(toggleGroupItemStyles({ ...renderProps, orientation, className }))
      )}
      {...props}
    />
  );
};

export type { ToggleGroupProps, ToggleGroupItemProps };
export { ToggleGroup, ToggleGroupItem };

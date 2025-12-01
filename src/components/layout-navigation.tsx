import { IconAlignmentJustify, IconDashboard, IconEye, IconX } from "justd-icons";
import { useState } from "react";
import { NavLink } from "react-router";
import { tv } from "tailwind-variants";

const navLinkStyles = tv({
  base: "flex gap-3 px-5 py-3 items-center hover:bg-blue-200/20 text-blue-100",
  variants: {
    isActive: {
      true: "text-bue-100 bg-blue-100/10",
    },
    isTransitioning: {
      true: "text-bue-100 bg-blue-200/20",
    },
    isPending: {
      true: "text-bue-100 bg-blue-200/20",
    },
    isLast: {
      true: "mt-auto ",
    },
  },
});

const LINKS = [
  { to: "/", label: "Home", icon: <IconDashboard /> },
  {
    to: "/building-interactive-ai-vision-tools-for-the-browser",
    label: "AI Vision Tools",
    icon: <IconEye />,
  },
];

export function LayoutNaviation() {
  const [isHidden, setIsHidden] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ul
      className={`print:hidden fullscreen:hidden flex flex-col h-full  bg-blue-950 text-blue-200 [grid-area:appaside] ${isHidden ? "hidden" : ""}`}
    >
      <li className={navLinkStyles()}>
        <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? <IconX /> : <IconAlignmentJustify />}</button>
      </li>
      {LINKS.map(({ to, label, icon }) => {
        return (
          <NavLink
            className={(props) => {
              return navLinkStyles(props);
            }}
            to={to}
            key={label}
          >
            {isExpanded ? (
              <>
                <div className="h-[16px] w-[16px]">{icon}</div> {label}
              </>
            ) : (
              <>{icon}</>
            )}
          </NavLink>
        );
      })}

      <li className={navLinkStyles({ isLast: true })}>
        <button
          onClick={() => {
            setIsHidden(true);
          }}
        >
          <IconX />
        </button>
      </li>
    </ul>
  );
}

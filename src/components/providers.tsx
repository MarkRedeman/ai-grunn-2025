import React from "react";
import { RouterProvider as ReactAriaRouterProvider } from "react-aria-components";
import type { createBrowserRouter} from "react-router";
import { useHref } from "react-router";

import { ThemeProvider } from "./theme-provider";

type Router = ReturnType<typeof createBrowserRouter>;

export function Providers({ children, router }: { children: React.ReactNode; router: Router }) {
  return (
    <ReactAriaRouterProvider
      navigate={(to) => {
        router.navigate(to, { viewTransition: true });
      }}
      useHref={useHref}
    >
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        {children}
      </ThemeProvider>
    </ReactAriaRouterProvider>
  );
}

import { Outlet, RouterProvider, createBrowserRouter, redirect } from "react-router";

import { LayoutNaviation } from "./components/layout-navigation";
import { Providers } from "./components/providers";
import { Presentation as BuildingInteractiveAIVisionToolsForTheBrowserTalk } from "./presentations/interactive-ai-vision-tools-for-the-browser/presentation";

function RootLayout() {
  return (
    <div className="selection:bg-fuchsia-300 selection:text-fuchsia-900 grid [grid-template-areas:'appaside_appmain'] grid-cols-[auto_1fr] h-screen w-screen">
      <LayoutNaviation />
      <div className="[grid-area:appmain] h-full overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export function App() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      errorElement: <div>An error occured, please try refreshing or check the console</div>,
      children: [
        {
          path: "/building-interactive-ai-vision-tools-for-the-browser",
          element: <BuildingInteractiveAIVisionToolsForTheBrowserTalk />,
        },
        {
          path: "/building-interactive-ai-vision-tools-for-the-browser/interactive-grabcut-demo",
          loader: () => {
            return redirect("/building-interactive-ai-vision-tools-for-the-browser?slideIndex=11&stepIndex=6");
          },
        },
        {
          path: "/building-interactive-ai-vision-tools-for-the-browser/interactive-sam-demo",
          loader: () => {
            return redirect("/building-interactive-ai-vision-tools-for-the-browser?slideIndex=26");
          },
        },
        {
          path: "*",
          loader: () => {
            return redirect("/building-interactive-ai-vision-tools-for-the-browser");
          },
        },
      ],
    },
  ]);

  return (
    <Providers router={router}>
      <RouterProvider router={router} />
    </Providers>
  );
}

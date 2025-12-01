import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import tailwindcss from "@tailwindcss/postcss";

const { publicVars } = loadEnv({ prefixes: ["PUBLIC_"] });

export default defineConfig({
  plugins: [
    pluginReact(),

    pluginSvgr({
      svgrOptions: {
        exportType: "named",
      },
    }),
  ],
  source: {
    define: {
      ...publicVars,
      "import.meta.env.PUBLIC_API_BASE_URL":
        publicVars["import.meta.env.PUBLIC_API_BASE_URL"] ?? '"http://localhost:7860"',
      "process.env.PUBLIC_API_BASE_URL": publicVars["process.env.PUBLIC_API_BASE_URL"] ?? '"http://localhost:7860"',
      "process.env": {},
    },
  },
  html: {
    title: "Building interactive AI vision tools for the browser",
  },

  tools: {
    postcss: (_, { addPlugins }) => {
      const viewportPlugin = tailwindcss();
      addPlugins(viewportPlugin);
    },
  },
  server: {
    // Add COEP and COOP to enable SharedArrayBuffer
    headers: {
      "Cross-Origin-embedder-Policy": "require-corp",
      "Cross-Origin-opener-Policy": "same-origin",
    },
  },
});

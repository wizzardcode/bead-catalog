import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/01_pages"),
      "@widgets": path.resolve(__dirname, "src/02_widgets"),
      "@entities": path.resolve(__dirname, "src/04_entities"),
      "@features": path.resolve(__dirname, "src/03_features"),
      "@uiKit": path.resolve(__dirname, "src/05_shared/ui"),
      "@models": path.resolve(__dirname, "src/05_shared/models"),
      "@config": path.resolve(__dirname, "src/05_shared/config"),
      "@styles": path.resolve(__dirname, "src/00_app/assets/styles"),
      "@hooks": path.resolve(__dirname, "src/05_shared/hooks"),
      "@utils": path.resolve(__dirname, "src/05_shared/utils"),
    },
  },
  base: "https://wizzardcode.github.io/bead-catalog/",
})

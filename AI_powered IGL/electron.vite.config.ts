import { defineConfig } from "electron-vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  main: {
    entry: "src/main/index.ts"
  },

  preload: {
    entry: "src/preload/index.ts"
  },

  renderer: {
    root: "src/renderer",
    plugins: [react()],
    server: {
      port: 5173,
      strictPort: true
    },
    build: {
      outDir: "../../out/renderer"
    }
  }
})

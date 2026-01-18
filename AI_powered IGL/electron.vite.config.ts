import { defineConfig } from "electron-vite"
import react from "@vitejs/plugin-react"
import path from "path"

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
    build: {
      outDir: "../../out/renderer"
    },
    server: {
      port: 5173,
      strictPort: true
    }
  }
})

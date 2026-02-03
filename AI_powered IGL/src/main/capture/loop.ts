import { BrowserWindow } from "electron"
import { captureScreen } from "./screen"
import { cropMinimap } from "./crop"

let interval: NodeJS.Timeout | null = null

export function startMinimapLoop(win: BrowserWindow, ms = 3000) {
  if (interval) return // prevent double-start

  interval = setInterval(async () => {
    try {
      const screen = await captureScreen()
      const minimap = await cropMinimap(screen)

      win.webContents.send(
        "minimap-update",
        minimap.toString("base64")
      )
    } catch (err) {
      console.error("Minimap loop error:", err)
    }
  }, ms)
}

export function stopMinimapLoop() {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

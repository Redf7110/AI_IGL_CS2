import { ipcMain } from "electron"
import { captureScreen } from "./capture/screen"
import { cropMinimap } from "./capture/crop"

ipcMain.handle("get-minimap", async () => {
  const screen = await captureScreen()
  const minimap = await cropMinimap(screen)
  return minimap.toString("base64")
})

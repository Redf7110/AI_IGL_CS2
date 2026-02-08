import { app, ipcMain } from "electron"
import { captureScreen } from "./capture/screen"
import { cropMinimap } from "./capture/crop"
import { promises as fs } from "fs"
import path from "path"

ipcMain.handle("get-minimap", async () => {
  const screen = await captureScreen()
  const minimap = await cropMinimap(screen)
  return minimap.toString("base64")
})

ipcMain.handle(
  "save-audio-clip",
  async (_event, payload: { data: ArrayBuffer; mimeType?: string }) => {
    const { data, mimeType } = payload
    const ext = mimeType?.includes("webm")
      ? "webm"
      : mimeType?.includes("ogg")
      ? "ogg"
      : "webm"

    const filename = `system-audio-${Date.now()}.${ext}`
    const outputPath = path.join(app.getPath("desktop"), filename)
    const buffer = Buffer.from(new Uint8Array(data))

    await fs.writeFile(outputPath, buffer)
    return outputPath
  }
)
import { ipcMain } from "electron"

ipcMain.handle("ping", async () => {
  console.log("PING from renderer")
  return "PONG from main process"
})

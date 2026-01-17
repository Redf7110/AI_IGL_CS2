console.log('MAIN PROCESS STARTED')
import { app, BrowserWindow, globalShortcut } from "electron"
import path from "path"
import { captureScreen, getLatestImages } from "./capture"

let win: BrowserWindow | null = null

app.whenReady().then(() => {
  console.log('APP READY')
  win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js")
    }
  })

  //✅Load React (Vite in dev)
  //if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
   // win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  //} else {
  //  win.loadFile("dist/index.html")
  //}
  win.loadFile(path.join(__dirname, "../renderer/index.html"))
  // ✅ Screenshot loop
  setInterval(() => {
    console.log('INTERNAL TICK')
    captureScreen()
  }, 3000)

  // ✅ Keybind
  globalShortcut.register("CommandOrControl+V", () => {
    const imgs = getLatestImages(3)
    console.log("Triggered with images:", imgs)
    win?.webContents.send("replay-triggered", imgs)
  })
})

app.on("will-quit", () => {
  globalShortcut.unregisterAll()
})

import { app, BrowserWindow } from "electron"
import path from "path"
import { fileURLToPath } from "url"
import "./ipc"
import { startMinimapLoop } from "./capture/loop"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let win: BrowserWindow | null = null

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js")
    }
  })

  // 🔥 FORCE DEV SERVER (electron-vite v5 safe)
  if (!app.isPackaged) {
    console.log("Loading DEV server http://localhost:5173")
    win.loadURL("http://localhost:5173")
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"))
  }
}

app.whenReady().then(() => {
  createWindow()

  //start auto minimap capture loop (every 3s)
  if (win) {
    startMinimapLoop(win,3000)
  }

})



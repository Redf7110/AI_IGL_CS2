import { app, BrowserWindow, desktopCapturer, dialog, session } from "electron"
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
  session.defaultSession.setDisplayMediaRequestHandler(
    async (_request, callback) => {
      const sources = await desktopCapturer.getSources({
        types: ["screen"]
      })

      if (!sources.length) {
        callback({})
        return
      }

      const { response } = await dialog.showMessageBox({
        type: "question",
        title: "Select a screen or window",
        message: "Choose what to share",
        buttons: sources.map((source) => source.name),
        cancelId: -1,
        noLink: true
      })

      const source = sources[response]
      if (!source) {
        callback({})
        return
      }

      callback({
        video: source,
        audio: "loopback"
      })
    }
  )

  createWindow()

  //start auto minimap capture loop (every 3s)
  if (win) {
    startMinimapLoop(win,3000)
  }

})



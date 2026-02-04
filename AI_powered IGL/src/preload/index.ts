import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("api", {
  ping: () => ipcRenderer.invoke("ping"),

  onMinimapUpdate: (cb: (img: string) => void) => {
    ipcRenderer.on("minimap-update", (_, img) => cb(img))
  },
  getDesktopSourceId: () => 
    ipcRenderer.invoke("get-desktop-source-id")

})



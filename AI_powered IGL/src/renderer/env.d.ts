export {}

declare global{
  interface Window {
    api: {
      ping: () => Promise<string>
      onMinimapUpdate: (cb: (img: string) => void) => void
      getDesktopSourceId: () => Promise<string>
    }
  }
}

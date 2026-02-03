interface Window {
  api: {
    ping: () => Promise<string>
    onMinimapUpdate: (cb: (img: string) => void) => void
  }
}

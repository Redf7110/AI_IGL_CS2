export {}

declare global {
  interface Window {
    api: {
      ping: () => Promise<string>
      onMinimapUpdate: (cb: (img: string) => void) => void
      saveAudioClip: (data: ArrayBuffer, mimeType?: string) => Promise<string>
    }
  }
}

import { desktopCapturer, screen } from "electron"

export async function captureScreen(): Promise<Buffer> {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  const sources = await desktopCapturer.getSources({
    types: ["screen"],
    thumbnailSize: { width, height }
  })

  const screenSource = sources[0]
  return screenSource.thumbnail.toPNG()
}

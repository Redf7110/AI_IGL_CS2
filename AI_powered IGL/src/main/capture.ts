import { desktopCapturer } from "electron"
import fs from "fs"
import path from "path"

const CAPTURE_DIR = path.join(process.cwd(), "captures")
const MAX_IMAGES = 20

let imageBuffer: string[] = []

export async function captureScreen(){
    const sources = await desktopCapturer.getSources({
        types: ["screen"],
        thumbnailSize: {width: 1920, height: 1080}
    })

    const img = sources[0].thumbnail.toPNG()
    fs.mkdirSync(CAPTURE_DIR, { recursive: true })
    const filePath = path.join(CAPTURE_DIR, '${Date.now()}.png')
    fs.writeFileSync(filePath, img)

    imageBuffer.push(filePath)
    if (imageBuffer.length > MAX_IMAGES) imageBuffer.shift()
}

export function getLatestImages(count: number){
    return imageBuffer.slice(-count)
}

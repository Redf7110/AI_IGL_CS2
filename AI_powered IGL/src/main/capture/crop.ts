import sharp from "sharp"

export async function cropMinimap(image: Buffer): Promise<Buffer> {
  // 🔧 ADJUST THESE FOR YOUR RESOLUTION
  const MINIMAP_X = 20
  const MINIMAP_Y = 20
  const MINIMAP_SIZE = 250

  return sharp(image)
    .extract({
      left: MINIMAP_X,
      top: MINIMAP_Y,
      width: MINIMAP_SIZE,
      height: MINIMAP_SIZE
    })
    .png()
    .toBuffer()
}
//make sure to do npm install sharp
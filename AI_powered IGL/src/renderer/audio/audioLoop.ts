let buffer: Float32Array[] = []

export function startAudioLoop(onChunk: (buf: Float32Array) => void) {
  setInterval(() => {
    if (!buffer.length) return

    const merged = Float32Array.from(buffer.flatMap(b => Array.from(b)))
    buffer = []
    onChunk(merged)
  }, 3000)
}

export function pushAudio(data: Float32Array) {
  buffer.push(data)
}

let buffer: Float32Array[] = []
let timer: number | null = null

export function pushAudio(data: Float32Array) {
  buffer.push(data)
}

export function startAudioLoop(
  onChunk: (chunk: Float32Array) => void,
  ms = 3000
) {
  if (timer !== null) return

  timer = window.setInterval(() => {
    if (!buffer.length) return

    const merged = Float32Array.from(
      buffer.flatMap(b => Array.from(b))
    )

    buffer = []
    onChunk(merged)
  }, ms)
}

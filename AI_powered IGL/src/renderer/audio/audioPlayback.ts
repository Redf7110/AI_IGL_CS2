let audioCtx: AudioContext | null = null

function getContext() {
  if (!audioCtx) {
    audioCtx = new AudioContext({ sampleRate: 16000 })
  }
  return audioCtx
}

export function playPCM(chunk: Float32Array) {
  if (!chunk.length) return

  const ctx = getContext()

  const buffer = ctx.createBuffer(
    1,                 // mono
    chunk.length,
    ctx.sampleRate
  )

  buffer.copyToChannel(chunk, 0)

  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.connect(ctx.destination)
  source.start()
}

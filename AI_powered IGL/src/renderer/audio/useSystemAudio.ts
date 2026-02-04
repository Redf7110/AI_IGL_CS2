export async function startSystemAudio(
  onChunk: (chunk: Float32Array) => void
) {
  console.log("Requesting desktop source ID...")
  const sourceId = await window.api.getDesktopSourceId()

  console.log("Got source ID:", sourceId)

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: sourceId,
      },
    } as any,
    video: false,
  })

  const audioCtx = new AudioContext({ sampleRate: 16000 })
  const source = audioCtx.createMediaStreamSource(stream)
  const processor = audioCtx.createScriptProcessor(4096, 1, 1)

  processor.onaudioprocess = (e) => {
    const input = e.inputBuffer.getChannelData(0)
    onChunk(new Float32Array(input))
  }

  source.connect(processor)
  processor.connect(audioCtx.destination)

  console.log("System audio capture started")
}

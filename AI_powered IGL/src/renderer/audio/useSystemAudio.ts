export async function startSystemAudio(
  onData: (data: Float32Array) => void
) {
  const sourceId = await window.api.getAudioSource()

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: sourceId
      }
    },
    video: false
  } as any)

  const audioCtx = new AudioContext({ sampleRate: 16000 })
  const source = audioCtx.createMediaStreamSource(stream)

  const processor = audioCtx.createScriptProcessor(4096, 1, 1)

  processor.onaudioprocess = (event) => {
    const input = event.inputBuffer.getChannelData(0)
    onData(new Float32Array(input))
  }

  source.connect(processor)
  processor.connect(audioCtx.destination)
}

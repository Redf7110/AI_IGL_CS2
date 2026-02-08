/// <reference path="../env.d.ts" />

export async function startSystemAudio(
  onChunk: (chunk: Float32Array) => void
) {
  let stream: MediaStream
  console.log("Requesting display media (system audio)...")
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: 30 },
      audio: true
    })

    const [videoTrack] = stream.getVideoTracks()
    if (videoTrack) {
      videoTrack.stop()
    }
  } catch (err) {
    const error = err as Error
    if (error?.name === "NotSupportedError") {
      throw new Error(
        "getDisplayMedia audio is not supported in this build. " +
          "The picker will not appear without support."
      )
    }

    throw err
  }

  if (!stream.getAudioTracks().length) {
    throw new Error("No audio track available from capture stream")
  }

  recordFiveSecondClip(stream).catch((err) => {
    console.error("Failed to record 5s clip:", err)
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

async function recordFiveSecondClip(stream: MediaStream) {
  const audioOnlyStream = new MediaStream(stream.getAudioTracks())
  const recorder = new MediaRecorder(audioOnlyStream, {
    mimeType: "audio/webm; codecs=opus"
  })
  const chunks: BlobPart[] = []

  recorder.ondataavailable = (event) => {
    if (event.data.size) {
      chunks.push(event.data)
    }
  }

  const stopped = new Promise<void>((resolve) => {
    recorder.onstop = () => resolve()
  })

  recorder.start()
  setTimeout(() => recorder.stop(), 5000)
  await stopped

  const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" })
  const data = await blob.arrayBuffer()
  const savedPath = await window.api.saveAudioClip(data, blob.type)
  console.log("Saved 5s audio clip:", savedPath)
}

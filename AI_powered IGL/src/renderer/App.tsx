import { useEffect, useRef, useState } from "react"
import MinimapView from "./components/MinimapView"
import { startSystemAudio } from "./audio/useSystemAudio"
import { pushAudio, startAudioLoop } from "./audio/audioLoop"
import { playPCM } from "./audio/audioPlayback"

export default function App() {
  console.log('App.tsx rendered')
  const [minimap, setMinimap] = useState<string>()
  const audioStartedRef = useRef(false)

  const startAudio = async () => {
    if (audioStartedRef.current) {
      return
    }
    audioStartedRef.current = true

    try {
      await startSystemAudio(pushAudio)
      console.log("System audio capture started")

      startAudioLoop((chunk) => {
        console.log("Playing audio chunk:", chunk.length)
        playPCM(chunk)
      })
    } catch (err) {
      audioStartedRef.current = false
      throw err
    }
  }

  useEffect(() => {
    // minimap stream (already working)
    window.api.onMinimapUpdate(setMinimap)

    const handleClick = async () => {
      console.log("User clicked — starting system audio")

      try {
        await startAudio()
      } catch (err) {
        console.error("Failed to start system audio:", err)
      }
    }

    // IMPORTANT: body click is more reliable than document
    document.body.addEventListener("click", handleClick, { once: true })

    return () => {
      document.body.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>AI IGL – Phase 3</h1>
      <MinimapView image={minimap} />

    <button
      onClick={async () => {
        console.log("BUTTON CLICKED")

        try {
          await startAudio()
        } catch (err) {
          console.error("Failed to start system audio:", err)
        }
      }}
    >
      Start System Audio
    </button>

    </div>
  )

}

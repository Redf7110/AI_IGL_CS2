import { useEffect, useState } from "react"
import MinimapView from "./components/MinimapView"
import { startSystemAudio } from "./audio/useSystemAudio"
import { pushAudio, startAudioLoop } from "./audio/audioLoop"

export default function App() {
  const [minimap, setMinimap] = useState<string>()

  useEffect(() => {
    window.api.onMinimapUpdate(setMinimap)
    startAudioLoop((chunk) =>{
      console.log("Audio chunk size:", chunk.length)
    })
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>AI IGL – Phase 3</h1>
      <MinimapView image={minimap} />
    </div>
  )
}

import { useEffect, useState } from "react"
import MinimapView from "./components/MinimapView"

export default function App() {
  const [minimap, setMinimap] = useState<string>()

  useEffect(() => {
    window.api.onMinimapUpdate((img) => {
      setMinimap(img)
    })
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>AI IGL – Phase 2</h1>
      <p>Auto-capturing minimap…</p>
      <MinimapView image={minimap} />
    </div>
  )
}

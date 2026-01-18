import { useState } from "react"
import { useIPC } from "./hooks/useIPC"

export default function App() {
  const { ping } = useIPC()
  const [response, setResponse] = useState("")

  async function handleClick() {
    const res = await ping()
    setResponse(res)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>AI IGL – Phase 1</h1>
      <button onClick={handleClick}>Ping Main Process</button>
      <p>{response}</p>
    </div>
  )
}

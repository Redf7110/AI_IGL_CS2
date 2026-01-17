import { useEffect, useState } from "react"

declare global {
  interface Window {
    api: {
      onReplay: (cb: (images: string[]) => void) => void
    }
  }
}

export default function App() {
  const [replays, setReplays] = useState<string[][]>([])

  useEffect(() => {
    window.api.onReplay((images) => {
      setReplays((prev) => [...prev, images])
    })
  }, [])

  return (
    <div className="p-4 text-white bg-black h-screen">
      <h1 className="text-xl mb-4">AI IGL Replays</h1>

      {replays.map((r, i) => (
        <div key={i} className="mb-4 border p-2">
          {r.map((img) => (
            <img key={img} src={`file://${img}`} width={200} />
          ))}
        </div>
      ))}
    </div>
  )
}

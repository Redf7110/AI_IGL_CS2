import { useEffect, useRef } from "react"

type Props = {
  audio?: string
}

export default function AudioPlayer({ audio }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audio && audioRef.current) {
      audioRef.current.src = `data:audio/wav;base64,${audio}`
      audioRef.current.play()
    }
  }, [audio])

  return <audio ref={audioRef} controls />
}

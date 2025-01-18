import { useState, useEffect } from 'react'

interface PlaceholderVideoProps {
  src: string
}

export default function PlaceholderVideo({ src }: PlaceholderVideoProps) {
  const [videoSrc, setVideoSrc] = useState(src)

  useEffect(() => {
    setVideoSrc(src)
  }, [src])

  return (
    <video 
      width="640" 
      height="360" 
      autoPlay 
      muted 
      loop
      className="max-w-full h-auto rounded-lg shadow-lg mt-4"
    >
      <source src={`/videos/${videoSrc}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}


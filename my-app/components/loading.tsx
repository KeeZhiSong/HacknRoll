'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import PlaceholderVideo from './videos/placeholder'

export default function Loading() {
  const [position, setPosition] = useState({ x: '50%', y: 'calc(100% - 100px)' })
  const [showButton, setShowButton] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentVideo, setCurrentVideo] = useState('video1.mp4')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 19000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 0
        }
        return prevProgress + 0.5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const handleContinue = useCallback(() => {
    const x = `${Math.random() * 80 + 10}%`
    const y = `${Math.random() * 70 + 20}%`
    setPosition({ x, y })
    // Randomly select a new video when continuing
    const videos = ['your-video1.mp4', 'your-video2.mp4', 'your-video3.mp4'];
    setCurrentVideo(videos[Math.floor(Math.random() * videos.length)])
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const teleportAcrossScreen = (x: number, y: number) => {
    const screenPadding = 20; // Minimum distance from screen edges
    const maxX = window.innerWidth - screenPadding;
    const maxY = window.innerHeight - screenPadding;
    return {
      x: x < screenPadding ? maxX : (x > maxX ? screenPadding : x),
      y: y < screenPadding ? maxY : (y > maxY ? screenPadding : y)
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 overflow-hidden">
      <div className="text-center flex flex-col items-center mb-8">
        <Loader2 className="w-16 h-16 animate-spin text-blue-500 mb-2" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h1>
        <p className="text-gray-600 mb-8">Please wait while we prepare your content.</p>
        <div className="w-64 h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="mb-8">
        <PlaceholderVideo src={currentVideo} />
      </div>
      {showButton && (
        <Button
          ref={buttonRef}
          onClick={handleContinue}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, 0)',
            transition: 'all 0.3s ease-out',
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onMouseEnter={() => {
            if (buttonRef.current) {
              const rect = buttonRef.current.getBoundingClientRect();
              const buttonCenter = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
              };
              const angle = Math.atan2(mousePosition.y - buttonCenter.y, mousePosition.x - buttonCenter.x);
              const distance = 300;
              const newPos = teleportAcrossScreen(
                buttonCenter.x - Math.cos(angle) * distance,
                buttonCenter.y - Math.sin(angle) * distance
              );
              setPosition({ x: `${newPos.x}px`, y: `${newPos.y}px` });
            }
          }}
        >
          Continue
        </Button>
      )}
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
// @ts-expect-error
import confetti from "canvas-confetti"
import { Volume2, VolumeX } from 'lucide-react'
import CustomTooltip from "@/components/custom-tooltip"

// Fun messages to display
const surpriseMessages = [
  "🎉 Woohoo! You found a party!",
  "🌈 Life is full of colorful surprises!",
  "🚀 To infinity and beyond!",
  "🦄 Magic happens when you least expect it!",
  "🎨 Time to add some color to your day!",
]

// Different background colors
const bgColors = [
  "bg-rose-100",
  "bg-sky-100",
  "bg-violet-100",
  "bg-emerald-100",
  "bg-amber-100",
]

export default function Home() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("")
  const [bgColor, setBgColor] = useState("bg-white")
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Load count from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem("surpriseCount")
    if (savedCount) {
      setCount(parseInt(savedCount))
    }
  }, [])

  // Save count to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("surpriseCount", count.toString())
  }, [count])

  const playSound = () => {
    if (isSoundEnabled) {
      const audio = new Audio("/suprise.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio playback failed:", e))
    }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const handleSurprise = () => {
    if (isAnimating) return

    setIsAnimating(true)
    playSound()
    triggerConfetti()

    // Update count
    setCount((prev) => prev + 1)

    // Set random message
    const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)]
    setMessage(randomMessage)

    // Set random background color
    const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)]
    setBgColor(randomColor)

    // Reset after animation
    setTimeout(() => {
      setIsAnimating(false)
      setBgColor("bg-white")
    }, 2000)
  }

  return (
    <main className={`min-h-screen ${bgColor} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8">
        {/* Sound Toggle Button */}
        <div className="fixed top-4 right-4">
          <button
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isSoundEnabled ? "Disable sound" : "Enable sound"}
          >
            {isSoundEnabled ? (
              <Volume2 className="h-6 w-6" />
            ) : (
              <VolumeX className="h-6 w-6" />
            )}
          </button>
        </div>

        <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
              Ready for a Surprise?
            </h1>
            <p className="text-gray-600">
              {"You've been surprised"} {count} {count === 1 ? "time" : "times"}!
            </p>
          </div>

          <CustomTooltip
            content="Click for a delightful surprise!"
            show={showTooltip}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSurprise}
              disabled={isAnimating}
              className={`
                relative px-8 py-4 text-lg font-medium
                bg-gradient-to-r from-violet-500 to-indigo-500
                text-white rounded-full shadow-lg
                transition-opacity
                focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
                hover:opacity-90
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              Surprise Me!
            </motion.button>
          </CustomTooltip>

          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-2xl font-medium text-center"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}

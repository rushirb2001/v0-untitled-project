"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface LoadingAnimationProps {
  onComplete: () => void
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0)
  const [lettersFilled, setLettersFilled] = useState<boolean[]>([])
  const [isTyping, setIsTyping] = useState(true)
  const [initialText, setInitialText] = useState("")
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const fullText = "Rushir's Portfolio"

  useEffect(() => {
    // Set up typing animation
    let currentLength = 0
    const typingInterval = setInterval(() => {
      if (currentLength <= fullText.length) {
        setInitialText(fullText.substring(0, currentLength))
        currentLength++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)

        // Initialize letters array for filling animation
        setLettersFilled(Array(fullText.length).fill(false))

        // Start the progress animation
        startProgressAnimation()
      }
    }, 80)

    return () => clearInterval(typingInterval)
  }, [])

  const startProgressAnimation = () => {
    // Fill letters one by one with a delay
    let counter = 0
    const letterInterval = setInterval(() => {
      if (counter < fullText.length) {
        setLettersFilled((prev) => {
          const newState = [...prev]
          newState[counter] = true
          return newState
        })
        counter++
      } else {
        clearInterval(letterInterval)

        // Start the progress bar animation
        const progressInterval = setInterval(() => {
          setProgress((prevProgress) => {
            const newProgress = prevProgress + 2
            if (newProgress >= 100) {
              clearInterval(progressInterval)

              // Complete animation after a short delay
              setTimeout(() => {
                onComplete()
              }, 500)
              return 100
            }
            return newProgress
          })
        }, 20)
      }
    }, 100)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 dark:from-navy-dark dark:to-[#081b36]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative text-4xl md:text-5xl font-bold mb-8">
        {fullText.split("").map((letter, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-500 ease-out ${
              lettersFilled[index]
                ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200"
                : isTyping
                  ? (index < initialText.length ? "text-gray-900 dark:text-white" : "opacity-0")
                  : "text-gray-900 dark:text-white"
            }`}
            style={{
              transitionDelay: `${index * 0.05}s`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
        {isTyping && <span className="inline-block w-1 h-8 ml-1 bg-blue-500 dark:bg-blue-400 animate-blink"></span>}
      </div>

      <div className="w-64 md:w-80 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="mt-4 text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 50 ? 1 : 0 }}
      >
        Loading your experience...
      </motion.div>

      {/* Animated elements in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Circles */}
        <motion.div
          className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/10 to-blue-500/10 dark:from-blue-400/5 dark:to-blue-500/5 blur-3xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] w-40 h-40 rounded-full bg-gradient-to-r from-indigo-400/10 to-blue-300/10 dark:from-indigo-400/5 dark:to-blue-300/5 blur-3xl"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 7,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
        />
      </div>
    </motion.div>
  )
}

"use client"

import { useState, useEffect } from "react"

interface TypewriterEffectProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseTime?: number
}

export default function TypewriterEffect({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1500,
}: TypewriterEffectProps) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const timer = setTimeout(
      () => {
        if (isDeleting) {
          setText(currentWord.substring(0, text.length - 1))

          if (text.length === 0) {
            setIsDeleting(false)
            setWordIndex((prev) => (prev + 1) % words.length)
          }
        } else {
          setText(currentWord.substring(0, text.length + 1))

          if (text.length === currentWord.length) {
            setTimeout(() => {
              setIsDeleting(true)
            }, pauseTime)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timer)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return (
    <div className="text-lg md:text-2xl font-medium">
      I am a <span className="text-blue-300 font-bold">{text}</span>
      <span className="animate-blink">|</span>
    </div>
  )
}

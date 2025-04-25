"use client"

import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset animation state after a timeout
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 1000) // Ensure this is longer than the animation duration
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  if (!mounted) {
    return <div className="w-9 h-9"></div> // Placeholder to avoid layout shift
  }

  const handleClick = () => {
    // Prevent rapid clicking during animation
    if (isAnimating) return

    setIsAnimating(true)
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"

    // Get button position for animation origin
    let buttonRect = null
    if (buttonRef.current) {
      buttonRect = buttonRef.current.getBoundingClientRect()
    }

    // Trigger overlay animation with button position
    window.dispatchEvent(
      new CustomEvent("theme:fade", {
        detail: {
          theme: nextTheme,
          buttonRect,
        },
      }),
    )
  }

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={isAnimating}
      className={`w-9 h-9 rounded-full hover:bg-gray-200 dark:hover:bg-navy-blue/50 transition-colors relative overflow-hidden ${
        isAnimating ? "opacity-70" : ""
      }`}
      aria-label="Toggle theme"
    >
      {/* Icon with subtle animation */}
      <div className="relative">
        {resolvedTheme === "dark" ? (
          <Sun className="h-5 w-5 text-columbia-blue animate-pulse-subtle" />
        ) : (
          <Moon className="h-5 w-5 text-navy-blue animate-pulse-subtle" />
        )}
      </div>
    </Button>
  )
}

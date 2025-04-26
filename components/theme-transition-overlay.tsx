"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"

export default function ThemeTransitionOverlay() {
  const { resolvedTheme, theme } = useTheme()
  const [showOverlay, setShowOverlay] = useState(false)
  const [overlayTheme, setOverlayTheme] = useState<string | undefined>(undefined)
  const [buttonPosition, setButtonPosition] = useState<DOMRect | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Listen for theme change events from the theme toggle button
    const handleThemeFade = (e: CustomEvent) => {
      const { theme, buttonRect } = e.detail
      setOverlayTheme(theme)
      setButtonPosition(buttonRect)
      setShowOverlay(true)

      // Hide overlay after animation completes - increased duration
      const timer = setTimeout(() => {
        setShowOverlay(false)
      }, 650) // Increased from 450ms to 800ms for slower animation

      return () => clearTimeout(timer)
    }

    window.addEventListener("theme:fade", handleThemeFade as EventListener)
    return () => window.removeEventListener("theme:fade", handleThemeFade as EventListener)
  }, [])

  // Set initial position and scale for the overlay
  useEffect(() => {
    if (showOverlay && overlayRef.current && buttonPosition) {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Calculate the distance to the farthest corner
      const distanceToTopLeft = Math.sqrt(
        Math.pow(buttonPosition.left + buttonPosition.width / 2, 2) +
          Math.pow(buttonPosition.top + buttonPosition.height / 2, 2),
      )
      const distanceToTopRight = Math.sqrt(
        Math.pow(windowWidth - (buttonPosition.left + buttonPosition.width / 2), 2) +
          Math.pow(buttonPosition.top + buttonPosition.height / 2, 2),
      )
      const distanceToBottomLeft = Math.sqrt(
        Math.pow(buttonPosition.left + buttonPosition.width / 2, 2) +
          Math.pow(windowHeight - (buttonPosition.top + buttonPosition.height / 2), 2),
      )
      const distanceToBottomRight = Math.sqrt(
        Math.pow(windowWidth - (buttonPosition.left + buttonPosition.width / 2), 2) +
          Math.pow(windowHeight - (buttonPosition.top + buttonPosition.height / 2), 2),
      )

      const maxDistance = Math.max(distanceToTopLeft, distanceToTopRight, distanceToBottomLeft, distanceToBottomRight)

      // Set the initial position to the button's center
      overlayRef.current.style.left = `${buttonPosition.left}px`
      overlayRef.current.style.top = `${buttonPosition.top}px`

      // Set the initial scale to 0 (will be animated to cover the screen)
      overlayRef.current.style.transform = "scale(0)"

      // Force a reflow to ensure the initial state is applied
      overlayRef.current.offsetHeight

      // Set the final scale to cover the entire screen
      overlayRef.current.style.transform = `scale(${(maxDistance * 2.2) / buttonPosition.width})`
    }
  }, [showOverlay, buttonPosition])

  if (!showOverlay) return null

  return (
    <div
      ref={overlayRef}
      className="fixed z-[9999] pointer-events-none transition-transform duration-700 ease-out rounded-full"
      style={{
        width: buttonPosition ? buttonPosition.width : 0,
        height: buttonPosition ? buttonPosition.height : 0,
        backgroundColor: overlayTheme === "dark" ? "rgba(6, 15, 32, 0.65)" : "rgba(255, 255, 255, 0.65)", // Made translucent
        transformOrigin: "center center",
      }}
    />
  )
}

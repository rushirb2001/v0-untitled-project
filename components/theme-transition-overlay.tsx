"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function ThemeTransitionOverlay() {
  const { resolvedTheme, theme } = useTheme()
  const [showOverlay, setShowOverlay] = useState(false)
  const [overlayTheme, setOverlayTheme] = useState<string | undefined>(undefined)

  useEffect(() => {
    // Only show overlay when theme changes and not on initial load
    if (resolvedTheme && theme !== "system") {
      setOverlayTheme(resolvedTheme)
      setShowOverlay(true)

      // Hide overlay after animation completes
      const timer = setTimeout(() => {
        setShowOverlay(false)
      }, 450)

      return () => clearTimeout(timer)
    }
  }, [resolvedTheme, theme])

  if (!showOverlay) return null

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none transition-transform-opacity will-change-transform-opacity origin-center-top"
      style={{
        opacity: showOverlay ? 1 : 0,
        transform: showOverlay ? "scale(1)" : "scale(0)",
        backgroundColor: overlayTheme === "dark" ? "#060F20" : "#ffffff",
      }}
    />
  )
}

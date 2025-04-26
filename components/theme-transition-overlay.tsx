"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function ThemeTransitionOverlay() {
  const [show, setShow] = useState(false)
  const [overlayColor, setOverlayColor] = useState<string>("transparent")
  const { resolvedTheme, setTheme } = useTheme()
  const pendingTheme = useRef<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Only these two values: match your palette
  const LIGHT_BG = "rgba(6,15,32,0.42)" // Updated to Rich black
  const DARK_BG = "rgba(255,255,255,0.42)"

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      pendingTheme.current = e.detail.theme
      setOverlayColor(e.detail.theme === "dark" ? LIGHT_BG : DARK_BG)

      // Position the overlay at the navbar's center
      if (overlayRef.current) {
        // The navbar is typically at the top, so we set transformOrigin to top center
        overlayRef.current.style.transformOrigin = "center top"
      }

      setShow(true)
    }
    window.addEventListener("theme:fade", handler as EventListener)
    return () => window.removeEventListener("theme:fade", handler as EventListener)
  }, [isMobile])

  useEffect(() => {
    if (!show || !pendingTheme.current) return

    // The overlay will stay up long enough for the theme to swap, then fade away
    const OVERLAY_DURATION = 300 // ms
    setTimeout(() => {
      setTheme(pendingTheme.current!)
      pendingTheme.current = null
      setTimeout(() => setShow(false), 200)
    }, OVERLAY_DURATION)
  }, [show, setTheme])

  useEffect(() => {
    if (show) {
      document.body.classList.add("theme-fading")
    } else {
      document.body.classList.remove("theme-fading")
    }
  }, [show])

  return (
    <div className="pointer-events-none fixed inset-0 z-80 flex items-start justify-center" aria-hidden="true">
      <div
        ref={overlayRef}
        style={{
          background: overlayColor,
          transform: show ? "scale(1)" : "scale(0.08)",
          opacity: show ? 1 : 0,
          top: isMobile ? "0" : "-5vh",
        }}
        className={`theme-overlay pointer-events-none absolute rounded-full ${
          isMobile
            ? "w-[200vw] h-[200vw] max-w-[300vh] max-h-[300vh]"
            : "w-[250vw] h-[250vw] max-w-[400vh] max-h-[400vh]"
        } transition-transform-opacity will-change-transform-opacity origin-center-top`}
      />
    </div>
  )
}

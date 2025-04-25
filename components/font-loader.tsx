"use client"

import { useEffect } from "react"

export default function FontLoader() {
  useEffect(() => {
    // Load Funnel Display font
    const link = document.createElement("link")
    link.href = "https://fonts.cdnfonts.com/css/funnel-display"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      // Clean up
      const fontLink = document.head.querySelector('link[href="https://fonts.cdnfonts.com/css/funnel-display"]')
      if (fontLink) {
        document.head.removeChild(fontLink)
      }
    }
  }, [])

  return null
}

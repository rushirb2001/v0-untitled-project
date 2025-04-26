"use client"

import { useEffect } from "react"

export default function FontLoader() {
  useEffect(() => {
    // This component is now only responsible for any additional font loading
    // that can't be handled by the link tags in the layout
    // We can keep this component for any dynamic font loading needs
    // but the main Funnel Display font is now loaded via link tags in layout.tsx
  }, [])

  return null
}

"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"

interface UseInViewOptions {
  threshold?: number
  ref?: React.RefObject<HTMLElement>
}

export function useInView(options: UseInViewOptions = { threshold: 0.3 }) {
  const localRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  // Use the provided ref or the local ref
  const ref = options.ref || localRef

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: options.threshold,
    })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, options.threshold])

  return [ref, inView] as const
}

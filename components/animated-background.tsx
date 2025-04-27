"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export default function AnimatedBackground() {
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Force immediate initialization on mount
  useEffect(() => {
    // Get system preference for initial render
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = resolvedTheme === "dark" || (resolvedTheme === undefined && prefersDark)

    // Initialize canvas immediately
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set dimensions
    const updateDimensions = () => {
      if (canvas.parentElement) {
        const { width, height } = canvas.parentElement.getBoundingClientRect()
        canvas.width = width
        canvas.height = height
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Create particles and shapes
    const particles = []
    const shapes = []
    const particleCount = 80
    const connectThreshold = 120

    // Colors based on theme
    const baseColor = isDark
      ? { r: 185, g: 217, b: 235 } // Light blue for dark mode
      : { r: 0, g: 35, b: 102 } // Dark blue for light mode

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: baseColor,
        alpha: Math.random() * 0.6 + 0.2,
        shape: Math.floor(Math.random() * 3),
      })
    }

    // Create shapes
    for (let i = 0; i < 6; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 80 + 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        color: baseColor,
        alpha: 0.05,
        type: Math.floor(Math.random() * 3),
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      })
    }

    // Animation loop
    let animationFrameId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw central gradient
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 2)
      gradient.addColorStop(0, isDark ? "rgba(185, 217, 235, 0.1)" : "rgba(0, 35, 102, 0.1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, canvas.width / 2, 0, Math.PI * 2)
      ctx.fill()

      // Draw shapes
      shapes.forEach((shape) => {
        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)

        // Update shape
        shape.rotation += shape.rotationSpeed
        if (shape.x < 0 || shape.x > canvas.width) shape.vx *= -1
        if (shape.y < 0 || shape.y > canvas.height) shape.vy *= -1
        shape.x += shape.vx
        shape.y += shape.vy

        // Draw shape
        const colorStr = `rgba(${shape.color.r}, ${shape.color.g}, ${shape.color.b}, ${shape.alpha})`
        ctx.fillStyle = colorStr
        ctx.strokeStyle = colorStr
        ctx.lineWidth = 1

        switch (shape.type) {
          case 0: // Square
            ctx.beginPath()
            ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
            ctx.fill()
            ctx.stroke()
            break
          case 1: // Circle
            ctx.beginPath()
            ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            break
          case 2: // Triangle
            ctx.beginPath()
            ctx.moveTo(0, -shape.size / 2)
            ctx.lineTo(shape.size / 2, shape.size / 2)
            ctx.lineTo(-shape.size / 2, shape.size / 2)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
            break
        }

        ctx.restore()
      })

      // Draw particles
      particles.forEach((particle, i) => {
        // Update particle
        particle.x += particle.vx
        particle.y += particle.vy
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Random movement
        if (Math.random() > 0.99) {
          particle.vx += (Math.random() - 0.5) * 0.1
          particle.vy += (Math.random() - 0.5) * 0.1
        }

        // Limit velocity
        const maxVel = 1
        const vel = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (vel > maxVel) {
          particle.vx = (particle.vx / vel) * maxVel
          particle.vy = (particle.vy / vel) * maxVel
        }

        // Draw particle
        const colorStr = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.alpha})`
        ctx.fillStyle = colorStr

        switch (particle.shape) {
          case 0: // Circle
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
            break
          case 1: // Square
            ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size)
            break
          case 2: // Triangle
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y - particle.size)
            ctx.lineTo(particle.x + particle.size, particle.y + particle.size)
            ctx.lineTo(particle.x - particle.size, particle.y + particle.size)
            ctx.closePath()
            ctx.fill()
            break
        }

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const otherParticle = particles[j]
          const dx = otherParticle.x - particle.x
          const dy = otherParticle.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectThreshold) {
            const alpha = 1 - distance / connectThreshold
            ctx.strokeStyle = isDark ? `rgba(185, 217, 235, ${alpha * 0.15})` : `rgba(0, 35, 102, ${alpha * 0.15})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        }
      })

      // Draw grid
      const gridSize = 30
      const gridOpacity = isDark ? 0.07 : 0.05
      ctx.strokeStyle = isDark ? `rgba(185, 217, 235, ${gridOpacity})` : `rgba(0, 35, 102, ${gridOpacity})`
      ctx.lineWidth = 0.5

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    // Start animation immediately
    draw()

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, []) // Empty dependency array - only run once on mount

  // Update when theme changes
  useEffect(() => {
    if (resolvedTheme === undefined) return

    // Just force a re-render when theme changes
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas to trigger redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [resolvedTheme])

  return (
    <div
      className={`absolute inset-0 overflow-hidden z-0 ${resolvedTheme === "dark" ? "bg-navy-dark" : "bg-slate-50"}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: dimensions.width, height: dimensions.height }}
      />

      {/* Decorative elements */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-10 dark:opacity-15 blur-[80px]"
        style={{
          background:
            resolvedTheme === "dark"
              ? "radial-gradient(circle, rgba(185, 217, 235, 0.3), rgba(31, 48, 94, 0.1))"
              : "radial-gradient(circle, rgba(0, 35, 102, 0.2), rgba(185, 217, 235, 0.1))",
          top: "20%",
          left: "30%",
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-10 dark:opacity-15 blur-[60px]"
        style={{
          background:
            resolvedTheme === "dark"
              ? "radial-gradient(circle, rgba(31, 48, 94, 0.3), rgba(185, 217, 235, 0.1))"
              : "radial-gradient(circle, rgba(185, 217, 235, 0.2), rgba(0, 35, 102, 0.1))",
          bottom: "15%",
          right: "25%",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />
    </div>
  )
}

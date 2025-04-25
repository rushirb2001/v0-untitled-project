"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"
import { ChevronUp, ChevronDown } from "lucide-react"

interface Skill {
  name: string
  icon: string
  proficiency?: number // 1-10 scale
}

interface SkillGroup {
  title: string
  icon: string
  skills: Skill[]
  position?: {
    x: string
    y: string
  }
  childrenPosition?: "right" | "left" | "bottom" | "top"
}

// Enhanced skill data with more specific technical details and positioning
const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    icon: "/icons/python.svg",
    skills: [
      { name: "Python", icon: "/icons/python.svg", proficiency: 9 },
      { name: "C++", icon: "/icons/cplusplus.svg", proficiency: 7 },
      { name: "Java", icon: "/icons/java.svg", proficiency: 6 },
      { name: "MATLAB", icon: "/icons/matlab.svg", proficiency: 7 },
    ],
    position: { x: "40%", y: "-5%" },
    childrenPosition: "right",
  },
  {
    title: "Frameworks and Libraries",
    icon: "/icons/pytorch.svg",
    skills: [
      { name: "PyTorch", icon: "/icons/pytorch.svg", proficiency: 9 },
      { name: "OpenCV", icon: "/icons/opencv.svg", proficiency: 8 },
      { name: "TensorFlow", icon: "/icons/tensorflow.svg", proficiency: 8 },
      { name: "Scikit-learn", icon: "/icons/scikitlearn.svg", proficiency: 8 },
    ],
    position: { x: "60%", y: "-35%" },
    childrenPosition: "right",
  },
  {
    title: "Dev & MLOps",
    icon: "/icons/git.svg",
    skills: [
      { name: "Git", icon: "/icons/git.svg", proficiency: 8 },
      { name: "FastAPI", icon: "/icons/fastapi.svg", proficiency: 8 },
      { name: "Streamlit", icon: "/icons/streamlit.svg", proficiency: 7 },
    ],
    position: { x: "45%", y: "-70%" },
    childrenPosition: "right",
  },
  {
    title: "NLP",
    icon: "/icons/openai.svg",
    skills: [
      { name: "LLMs", icon: "/icons/openai.svg", proficiency: 8 },
      { name: "Langchain", icon: "/icons/langchain.svg", proficiency: 7 },
    ],
    position: { x: "-50%", y: "-5%" },
    childrenPosition: "left",
  },
  {
    title: "Databases",
    icon: "/icons/sqlite.svg",
    skills: [
      { name: "SQL", icon: "/icons/sqlite.svg", proficiency: 7 },
      { name: "Snowflake", icon: "/icons/snowflake.svg", proficiency: 6 },
      { name: "FAISS", icon: "/icons/faiss.svg", proficiency: 8 },
    ],
    position: { x: "-75%", y: "-35%" },
    childrenPosition: "left",
  },
  {
    title: "Cloud",
    icon: "/icons/docker.svg",
    skills: [
      { name: "AWS", icon: "/icons/amazonwebservices.svg", proficiency: 7 },
      { name: "GCP", icon: "/icons/googlecloud.svg", proficiency: 6 },
      { name: "Docker", icon: "/icons/docker.svg", proficiency: 8 },
      { name: "Kubernetes", icon: "/icons/kubernetes.svg", proficiency: 7 },
    ],
    position: { x: "-75%", y: "-70%" },
    childrenPosition: "left",
  },
]

const CENTER_SIZE = 200
const NODE_SIZE = 70
const CONTAINER_SIZE = 600

const getSvgStyle = (theme: string | undefined) => ({
  filter: theme === "dark" ? "invert(1) brightness(2)" : "none",
})

export default function SkillsSection() {
  const [active, setActive] = useState<number | null>(null)
  const { resolvedTheme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<number>(0)
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true)
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<number>(0)
  const [energyFlowOffset, setEnergyFlowOffset] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Check if mobile and add resize listener
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Setup intersection observer for scroll animations
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.3 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Scroll animation trigger
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    } else if (!isInView) {
      setHasAnimated(false)
    }
  }, [isInView, hasAnimated])

  // Energy flow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyFlowOffset((prev) => (prev + 1) % 16)
    }, 40) // Slightly faster animation
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate timer for mobile
  useEffect(() => {
    // Clear any existing timer
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current)
      autoRotateTimerRef.current = null
    }

    // Only set up auto-rotation if enabled and on mobile
    if (isMobile && autoRotateEnabled && !isTransitioning) {
      autoRotateTimerRef.current = setInterval(() => {
        setSelectedCategory((prev) => (prev + 1) % skillGroups.length)
      }, 5000)
    }

    // Clean up on unmount
    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current)
        autoRotateTimerRef.current = null
      }
    }
  }, [isMobile, autoRotateEnabled, isTransitioning, skillGroups.length])

  // Reset auto-rotate when user interacts
  const resetAutoRotate = () => {
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current)
      autoRotateTimerRef.current = null
    }

    if (autoRotateEnabled && !isTransitioning) {
      autoRotateTimerRef.current = setInterval(() => {
        setSelectedCategory((prev) => (prev + 1) % skillGroups.length)
      }, 5000)
    }
  }

  const getNodePos = (group: SkillGroup) => {
    if (isMobile) {
      const index = skillGroups.findIndex((g) => g.title === group.title)
      return { left: "50%", top: `${120 + index * 80}px` }
    }

    // For desktop, use the position from the group
    return {
      left: `calc(50% + ${group.position?.x || "0%"})`,
      top: `calc(50% + ${group.position?.y || "0%"})`,
    }
  }

  const getChildrenContainerPosition = (group: SkillGroup, index: number) => {
    const position = group.childrenPosition || "right"

    switch (position) {
      case "left":
        return { right: "calc(100% + 15px)", top: "50%", transform: "translateY(-50%)" }
      case "right":
        return { left: "calc(100% + 15px)", top: "50%", transform: "translateY(-50%)" }
      case "bottom":
        return { top: "calc(100% + 15px)", left: "50%", transform: "translateX(-50%)" }
      case "top":
        return { bottom: "calc(100% + 15px)", left: "50%", transform: "translateX(-50%)" }
      default:
        return { left: "calc(100% + 15px)", top: "50%", transform: "translateY(-50%)" }
    }
  }

  const handleNodeInteraction = (index: number) => {
    if (isMobile) {
      setActive(active === index ? null : index)
    } else {
      setActive(index)
    }
  }

  // Add these touch handler functions inside the component
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY
    setAutoRotateEnabled(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isTransitioning) return

    const touchY = e.touches[0].clientY
    const diff = touchY - touchStartRef.current

    // Only process if we've moved at least 10px (more responsive)
    if (Math.abs(diff) > 10) {
      setIsTransitioning(true)

      if (diff > 0) {
        // Swiped down, go to previous category
        setSelectedCategory((prev) => (prev === 0 ? skillGroups.length - 1 : prev - 1))
      } else {
        // Swiped up, go to next category
        setSelectedCategory((prev) => (prev + 1) % skillGroups.length)
      }

      // Reset touch start position
      touchStartRef.current = touchY

      // Reset transitioning state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    }
  }

  const handleTouchEnd = () => {
    // Re-enable auto-rotate after a delay
    setTimeout(() => setAutoRotateEnabled(true), 5000)
  }

  const handleWheelClick = (index: number) => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setSelectedCategory(index)
    setAutoRotateEnabled(false)

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
      setTimeout(() => setAutoRotateEnabled(true), 10000) // Re-enable auto-rotate after 10 seconds of inactivity
    }, 300)

    resetAutoRotate()
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#060F20] relative overflow-hidden py-0 px-4 transition-opacity duration-500 ${
        isInView ? "opacity-100" : "opacity-0"
      }`}
    >
      <motion.div
        className="max-w-4xl w-full mx-auto text-center mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-[#002366] dark:text-white">Skills</h2>
        {!isMobile && (
          <p className="text-gray-600 dark:text-gray-300 text-center text-lg mb-6">
            Hover or tap a skill node to explore!
          </p>
        )}
      </motion.div>

      {/* Desktop Skills Visualization */}
      {!isMobile && (
        <motion.div
          ref={containerRef}
          className="relative w-full max-w-[600px] h-[600px] mx-auto flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Center Avatar */}
          <motion.div
            className="absolute z-30"
            style={{
              width: CENTER_SIZE,
              height: CENTER_SIZE,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              border: `3px solid ${resolvedTheme === "dark" ? "#1F305E" : "#C6E2E9"}`,
              borderRadius: "50%",
              boxShadow: resolvedTheme === "dark" ? "0 0 20px rgba(0, 35, 102, 0.3)" : "0 0 20px rgba(0, 35, 102, 0.2)",
            }}
          >
            <Image
              src="/images/avatar.png"
              alt="Profile Avatar"
              width={CENTER_SIZE}
              height={CENTER_SIZE}
              className="rounded-full object-cover"
              priority
            />
          </motion.div>

          {/* SVG connection lines with energy flow animation - Moved before nodes for proper z-index */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={resolvedTheme === "dark" ? "#002366" : "#002366"} stopOpacity="0.3" />
                <stop offset="50%" stopColor={resolvedTheme === "dark" ? "#B9D9EB" : "#002366"} stopOpacity="0.8" />
                <stop offset="100%" stopColor={resolvedTheme === "dark" ? "#002366" : "#002366"} stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {skillGroups.map((group, i) => {
              const isActive = active === i

              // Calculate exact positions for center and node
              const centerX = CONTAINER_SIZE / 2
              const centerY = CONTAINER_SIZE / 2

              // Parse position percentages
              const xPercent = Number.parseFloat(group.position?.x?.replace("%", "") || "0") / 100
              const yPercent = Number.parseFloat(group.position?.y?.replace("%", "") || "0") / 100

              // Calculate node position
              const nodeX = centerX + (CONTAINER_SIZE / 2) * xPercent
              const nodeY = centerY + (CONTAINER_SIZE / 2) * yPercent

              // Calculate the direction vector from center to node
              const dirX = nodeX - centerX
              const dirY = nodeY - centerY

              // Calculate the length of the vector
              const length = Math.sqrt(dirX * dirX + dirY * dirY)

              // Normalize the vector
              const normX = dirX / length
              const normY = dirY / length

              // Calculate the exact edge points with proper offsets - FIXED CONNECTION POINTS
              // Subtract 6px from the radius to ensure the line extends into the node
              const centerRadiusFixed = CENTER_SIZE / 2 - 6
              const nodeRadiusFixed = NODE_SIZE / 2 - 6

              // Calculate the exact start and end points
              const startX = centerX + normX * centerRadiusFixed
              const startY = centerY + normY * centerRadiusFixed
              const endX = nodeX - normX * nodeRadiusFixed
              const endY = nodeY - normY * nodeRadiusFixed

              // Create unique key for each connection
              const connectionKey = `connection-${i}`

              return (
                <g key={connectionKey}>
                  {/* Base connection line */}
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={resolvedTheme === "dark" ? "#1F305E" : "#C6E2E9"}
                    strokeWidth={isActive ? 3 : 1.5}
                    strokeDasharray="5,4"
                    strokeLinecap="butt" // Changed to butt for precise connections
                    opacity={isActive ? 0.8 : 0.4}
                  />

                  {/* Energy flow animation */}
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="url(#energyGradient)"
                    strokeWidth={isActive ? 4 : 2}
                    strokeDasharray="2,14"
                    strokeDashoffset={energyFlowOffset}
                    strokeLinecap="butt" // Changed to butt for precise connections
                    opacity={isActive ? 1 : 0.6}
                    className="energy-flow"
                  />
                </g>
              )
            })}
          </svg>

          {/* Skill Nodes */}
          {skillGroups.map((group, i) => {
            const isActive = active === i
            const isOther = active !== null && active !== i
            const nodePos = getNodePos(group)

            return (
              <motion.div
                key={group.title}
                className="absolute flex flex-col items-center cursor-pointer"
                style={{
                  ...nodePos,
                  zIndex: isActive ? 50 : 10,
                }}
                initial={false}
                animate={{
                  scale: isActive ? 1.15 : isOther ? 0.85 : 1,
                  filter: isOther ? "blur(1px) grayscale(30%)" : "none",
                }}
                transition={{ type: "spring", stiffness: 320, damping: 17 }}
                onMouseEnter={() => !isMobile && setActive(i)}
                onMouseLeave={() => !isMobile && setActive(null)}
                onClick={() => handleNodeInteraction(i)}
                tabIndex={0}
                aria-label={`${group.title} skills`}
              >
                <motion.div
                  className={`w-[${NODE_SIZE}px] h-[${NODE_SIZE}px] rounded-full flex items-center justify-center bg-white/90 dark:bg-[#1F305E] shadow-lg border-2 ${
                    isActive ? "border-[#002366] dark:border-[#B9D9EB]" : "border-[#C6E2E9] dark:border-[#1F305E]"
                  }`}
                  whileHover={{ scale: !isMobile ? 1.12 : 1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: isActive ? "0 0 30px 0 rgba(0, 35, 102, 0.4)" : "0 4px 12px 0 rgba(0, 35, 102, 0.15)",
                    scale: isActive ? 1.17 : [1, 1.05, 0.98, 1],
                  }}
                  transition={
                    isActive
                      ? { type: "spring", stiffness: 250, damping: 16 }
                      : {
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          ease: "easeInOut",
                        }
                  }
                >
                  <img
                    src={group.icon || "/placeholder.svg"}
                    alt=""
                    className="h-10 w-10"
                    style={getSvgStyle(resolvedTheme)}
                    draggable={false}
                    aria-hidden="true"
                  />
                </motion.div>

                <motion.div
                  className="mt-2 text-center font-semibold text-sm text-[#002366] dark:text-white select-none"
                  animate={{
                    color: isActive
                      ? resolvedTheme === "dark"
                        ? "#B9D9EB"
                        : "#002366"
                      : resolvedTheme === "dark"
                        ? "#ffffff"
                        : "#002366",
                  }}
                >
                  {group.title}
                </motion.div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute bg-white/95 dark:bg-[#1F305E]/95 rounded-lg shadow-lg border border-[#C6E2E9] dark:border-[#002366] p-2 z-50"
                      style={getChildrenContainerPosition(group, i)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="flex flex-col gap-1.5 min-w-[140px] max-w-[180px]">
                        {group.skills.map((skill, j) => (
                          <motion.div
                            key={skill.name}
                            className="flex items-center gap-1.5 px-2 py-1.5 bg-[#F8FAFC] dark:bg-[#060F20]/80 rounded-full border border-[#C6E2E9] dark:border-[#002366]"
                            initial={{
                              opacity: 0,
                              x: group.childrenPosition === "left" ? 20 : group.childrenPosition === "right" ? -20 : 0,
                              y: group.childrenPosition === "top" ? 20 : group.childrenPosition === "bottom" ? -20 : 0,
                            }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.05 * j, duration: 0.2 }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: resolvedTheme === "dark" ? "#1F305E" : "#EFF6FF",
                            }}
                          >
                            <img
                              src={skill.icon || "/placeholder.svg"}
                              alt=""
                              className="h-4 w-4"
                              style={getSvgStyle(resolvedTheme)}
                              draggable={false}
                              aria-hidden="true"
                            />
                            <span className="text-[#002366] dark:text-[#B9D9EB] text-xs font-medium">{skill.name}</span>

                            {skill.proficiency && (
                              <div className="ml-auto w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-[#002366] dark:bg-[#B9D9EB] rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(skill.proficiency / 10) * 100}%` }}
                                  transition={{ duration: 0.8, delay: 0.2 + j * 0.1 }}
                                />
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {/* Zoom-like design element */}
                      <motion.div
                        className="absolute inset-0 border-2 border-[#002366]/30 dark:border-[#B9D9EB]/30 rounded-lg -z-10"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1.05 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.1 }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      {/* Mobile Skills - iOS-style Wheel Interface */}
      {isMobile && (
        <motion.div
          className="w-full max-w-md mx-auto mt-0 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Wheel Navigation Indicators */}
          <div className="flex justify-center items-center mb-2 text-[#002366] dark:text-[#B9D9EB]">
            <ChevronUp className="h-6 w-6 animate-bounce" />
          </div>

          {/* iOS-style Wheel - Simplified and Fixed */}
          <div
            ref={wheelRef}
            className="relative w-full max-w-xs h-48 overflow-hidden rounded-xl bg-white/80 dark:bg-[#1F305E]/30 shadow-lg mb-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Selection Highlight */}
            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-14 bg-gray-100 dark:bg-[#1F305E]/50 z-10 border-y border-gray-200 dark:border-[#002366]"></div>

            {/* Wheel Items - Fixed positioning */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {skillGroups.map((group, idx) => {
                // Calculate position relative to selected category
                const relativePosition = (idx - selectedCategory + skillGroups.length) % skillGroups.length
                // Adjust position to be between -3 and 3
                const position =
                  relativePosition > skillGroups.length / 2 ? relativePosition - skillGroups.length : relativePosition

                // Only render items that are visible in the wheel (-2 to 2)
                if (Math.abs(position) > 2) return null

                const isSelected = position === 0
                const yOffset = position * 50 // 50px spacing between items
                const opacity = isSelected ? 1 : Math.max(0.4, 1 - Math.abs(position) * 0.3)
                const scale = isSelected ? 1 : Math.max(0.8, 1 - Math.abs(position) * 0.1)

                return (
                  <div
                    key={group.title}
                    className="absolute flex items-center justify-center w-full px-4 h-14 cursor-pointer"
                    style={{
                      transform: `translateY(${yOffset}px) scale(${scale})`,
                      opacity,
                      zIndex: isSelected ? 20 : 5,
                      transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                    onClick={() => handleWheelClick(idx)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full ${isSelected ? "bg-[#C6E2E9] dark:bg-[#002366]/40" : "bg-gray-100 dark:bg-[#1F305E]/40"} flex items-center justify-center mr-3 flex-shrink-0`}
                      >
                        <img
                          src={group.icon || "/placeholder.svg"}
                          alt=""
                          className="h-5 w-5"
                          style={getSvgStyle(resolvedTheme)}
                        />
                      </div>
                      <span
                        className={`font-semibold whitespace-nowrap ${
                          isSelected
                            ? "text-[#002366] dark:text-[#B9D9EB] text-lg"
                            : "text-gray-600 dark:text-gray-400 text-base"
                        }`}
                      >
                        {group.title}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Gradient Overlays for Fade Effect */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white dark:from-[#060F20]/90 to-transparent z-30 pointer-events-none"></div>
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white dark:from-[#060F20]/90 to-transparent z-30 pointer-events-none"></div>
          </div>

          {/* Wheel Navigation Indicators */}
          <div className="flex justify-center items-center mb-6 text-[#002366] dark:text-[#B9D9EB]">
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </div>

          {/* Skills Display - Redesigned with Pills */}
          <div className="w-full bg-white dark:bg-[#1F305E]/30 rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-center text-[#002366] dark:text-white mb-4 flex items-center justify-center">
              <img
                src={skillGroups[selectedCategory].icon || "/placeholder.svg"}
                alt=""
                className="h-5 w-5 mr-2"
                style={getSvgStyle(resolvedTheme)}
              />
              {skillGroups[selectedCategory].title} Skills
            </h3>

            <div className="flex flex-col space-y-3">
              <AnimatePresence mode="wait">
                {skillGroups[selectedCategory].skills.map((skill, index) => (
                  <motion.div
                    key={`${selectedCategory}-${skill.name}`}
                    className="flex items-center w-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.05,
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-[#1F305E]/40 flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
                      <img
                        src={skill.icon || "/placeholder.svg"}
                        alt=""
                        className="h-5 w-5"
                        style={getSvgStyle(resolvedTheme)}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[#002366] dark:text-white text-sm font-medium">{skill.name}</span>
                        {skill.proficiency && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">{skill.proficiency}/10</span>
                        )}
                      </div>
                      {/* Proficiency Bar */}
                      {skill.proficiency && (
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#002366] dark:bg-[#B9D9EB] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(skill.proficiency / 10) * 100}%` }}
                            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Instruction Text */}
          <div className="text-center mt-4">
            <p className="text-gray-500 dark:text-gray-400 text-xs">Swipe up/down to explore skills</p>
          </div>
        </motion.div>
      )}
    </section>
  )
}

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, BookOpen, ChevronUp, ChevronDown, Calendar, MapPin } from "lucide-react"

interface Education {
  university: string
  degree: string
  period: string
  location: string
  logo: string
  coursework: string[]
}

export default function EducationSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef(null)
  const { resolvedTheme } = useTheme()
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const educationData: Education[] = [
    {
      university: "Arizona State University",
      degree: "MS, Data Science",
      period: "Aug 2023 - Jun 2025",
      location: "Arizona, USA",
      logo: "/logos/asu.png",
      coursework: ["Artificial Intelligence", "Data Mining", "Convex Optimisation", "Statistical Machine Learning"],
    },
    {
      university: "Institute of Technology, Nirma University",
      degree: "B.Tech, Computer Science",
      period: "Jul 2019 - Jun 2023",
      location: "Ahmedabad, GJ, India",
      logo: "/logos/nu.png",
      coursework: ["Deep Learning", "Machine Learning", "Natural Language Processing", "Scientific Computing"],
    },
  ]

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Set active index to the most recent education (first in the array) on mobile
  useEffect(() => {
    if (isMobile) {
      setActiveIndex(0)
    }
  }, [isMobile])

  // Handle navigation
  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : educationData.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < educationData.length - 1 ? prev + 1 : 0))
  }

  // Toggle expanded card
  const toggleExpand = (idx: number) => {
    setExpandedCard(expandedCard === idx ? null : idx)
  }

  // Improved intersection observer for section visibility
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        // When section enters viewport
        if (entry.isIntersecting) {
          // Clear any pending exit animations
          if (exitTimeoutRef.current) {
            clearTimeout(exitTimeoutRef.current)
            exitTimeoutRef.current = null
          }

          setIsVisible(true)
          setIsExiting(false)

          // Add entrance animation classes
          if (sectionRef.current) {
            sectionRef.current.classList.add("section-entered")
            sectionRef.current.classList.remove("section-exited")
            sectionRef.current.classList.remove("exiting-right")
          }
        }
        // When section exits viewport
        else if (!entry.isIntersecting && isVisible) {
          setIsExiting(true)

          // Add exit animation classes
          if (sectionRef.current) {
            sectionRef.current.classList.add("section-exited")
            sectionRef.current.classList.add("exiting-right") // Education exits to the right
            sectionRef.current.classList.remove("section-entered")
          }

          // Set a timeout to clean up after animation completes
          exitTimeoutRef.current = setTimeout(() => {
            setIsVisible(false)
            setIsExiting(false)
            if (sectionRef.current) {
              sectionRef.current.classList.remove("section-exited")
              sectionRef.current.classList.remove("exiting-right")
            }
          }, 800)
        }
      },
      { threshold: 0.1 }, // Trigger when 10% of the section is visible/invisible
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current)
      }
    }
  }, [isVisible])

  // Handle direct navigation to section
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#education") {
        setIsVisible(true)
        setIsExiting(false)
        if (sectionRef.current) {
          sectionRef.current.classList.add("section-entered")
          sectionRef.current.classList.remove("section-exited")
          sectionRef.current.classList.remove("exiting-right")
        }
      }
    }

    window.addEventListener("hashchange", handleHashChange)

    // Check if we're loading directly to the education section
    if (window.location.hash === "#education") {
      handleHashChange()
    }

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <section
      id="education"
      ref={sectionRef}
      className={`${
        isMobile ? "h-[100vh]" : "min-h-screen"
      } flex flex-col items-center justify-center bg-white dark:bg-navy-dark relative overflow-hidden`}
    >
      {/* Minimal background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#002366] to-[#B9D9EB]"></div>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-navy-dark dark:via-delft-blue/20 dark:to-navy-dark opacity-70"></div>

        {/* Animated mesh grid pattern */}
        <div className="absolute inset-0 opacity-25 dark:opacity-25">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                resolvedTheme === "dark"
                  ? `linear-gradient(to right, rgba(185, 217, 235, 0.2) 1px, transparent 1px), 
                 linear-gradient(to bottom, rgba(185, 217, 235, 0.2) 1px, transparent 1px)`
                  : `linear-gradient(to right, rgba(0, 35, 102, 0.2) 1px, transparent 1px), 
                 linear-gradient(to bottom, rgba(0, 35, 102, 0.2) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-royal-blue/5 dark:bg-columbia-blue/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-royal-blue/5 dark:bg-columbia-blue/5 blur-3xl"></div>

        {/* Floating elements */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-royal-blue/5 dark:bg-columbia-blue/5"
            style={{
              width: `${Math.random() * 8 + 3}rem`,
              height: `${Math.random() * 8 + 3}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.3 + 0.1,
              filter: `blur(${Math.random() * 30 + 20}px)`,
            }}
          ></div>
        ))}

        {/* Academic-themed decorative elements */}
        <div className="absolute top-20 left-20 opacity-5 dark:opacity-8">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            className="text-royal-blue dark:text-columbia-blue"
          >
            <path
              d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="absolute bottom-20 right-20 opacity-5 dark:opacity-8">
          <svg
            width="140"
            height="140"
            viewBox="0 0 24 24"
            fill="none"
            className="text-royal-blue dark:text-columbia-blue"
          >
            <path
              d="M2 10l10-5 10 5-10 5z"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M22 10v6" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Subtle flowing lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-full"
              style={{
                top: `${20 + i * 30}%`,
                background:
                  resolvedTheme === "dark"
                    ? "linear-gradient(90deg, transparent, rgba(185, 217, 235, 0.3) 50%, transparent)"
                    : "linear-gradient(90deg, transparent, rgba(0, 35, 102, 0.3) 50%, transparent)",
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? "0" : "-100%"})`,
                transition: `transform 1.5s ease-out ${i * 0.2}s, opacity 1s ease-in-out ${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Desktop Timeline */}
      {!isMobile && (
        <>
          <h2 className="text-3xl font-bold text-center mb-8 text-navy-blue dark:text-white animate-fadeIn pt-5 relative z-10">
            Education
          </h2>
          <div className="education-timeline relative w-full max-w-4xl mx-auto px-4 md:px-0 z-10">
            {/* Enhanced Timeline Line with Experience-style Flowing Light */}
            <div className="education-timeline-line" ref={timelineRef}>
              {/* Timeline Line Glow Animation - Similar to Experience Section */}
              <div className="timeline-line-glow"></div>
            </div>

            {educationData.map((edu, idx) => {
              const isRight = idx % 2 === 1
              const match = edu.period.match(/([A-Za-z]+ \d{4})/)
              const periodLabel = match ? match[1] : edu.period

              // Determine animation class based on visibility and section state
              let animationClass = ""

              if (isVisible && !isExiting) {
                animationClass = isRight ? "animate-slide-in-right" : "animate-slide-in-left"
              } else if (isExiting) {
                animationClass = "animate-slide-out-right" // Education always exits to the right
              } else {
                animationClass = "opacity-0"
              }

              return (
                <div
                  key={edu.university}
                  className={`education-event${isRight ? " right" : ""} ${animationClass}`}
                  style={{
                    animationDelay: `${idx * 0.3}s`,
                    top: `${idx * 33 + 5}%`, // Ensure proper vertical positioning
                  }}
                >
                  {/* Enhanced Education Dot with Glow Effect */}
                  <div className="education-dot-container">
                    <div className="education-dot-glow"></div>
                    <div className="education-dot">
                      <GraduationCap className="h-3 w-3 text-royal-blue dark:text-columbia-blue" />
                    </div>
                  </div>

                  <div className="education-date">{periodLabel}</div>

                  {/* Enhanced Flip Card with Improved Animation */}
                  <div className="flip-card group w-full animate-hop">
                    <div className="flip-card-inner">
                      {/* Front */}
                      <div className="flip-card-front bg-white dark:bg-navy-blue/90 rounded-xl shadow-lg px-8 py-6 flex flex-col md:flex-row items-center gap-6 h-full border border-royal-blue/10 dark:border-columbia-blue/20">
                        <div className="w-20 h-20 relative shrink-0 bg-white dark:bg-navy-blue/20 rounded-full p-2 flex items-center justify-center shadow-inner">
                          <Image
                            src={edu.logo || "/placeholder.svg"}
                            alt={`${edu.university} logo`}
                            fill
                            className="object-contain p-1"
                          />
                          <div className="absolute inset-0 rounded-full education-logo-glow"></div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-xl md:text-2xl font-bold text-navy-blue dark:text-white mb-1">
                            {edu.university}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 text-base mb-1">{edu.degree}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{edu.period}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">{edu.location}</p>
                        </div>
                      </div>

                      {/* Back */}
                      <div className="flip-card-back bg-blue-50 dark:bg-blue-900/80 rounded-xl shadow-lg px-8 py-6 flex flex-col items-center justify-center h-full border border-royal-blue/20 dark:border-columbia-blue/30">
                        <h4 className="text-blue-700 dark:text-blue-300 text-lg font-semibold mb-4 flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Key Coursework
                        </h4>
                        <div className="flex flex-wrap justify-center gap-3 w-full">
                          {edu.coursework.map((course, idx) => (
                            <motion.span
                              key={idx}
                              className="bubble px-4 py-2 rounded-full bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-white text-xs font-medium shadow transition"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor:
                                  resolvedTheme === "dark" ? "rgba(37, 99, 235, 0.7)" : "rgba(219, 234, 254, 0.9)",
                              }}
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Minimal Mobile Timeline */}
      {isMobile && (
        <div className="min-h-screen flex flex-col justify-center pb-30 px-4 relative overflow-hidden">
          <h2 className="text-2xl font-bold text-center mb-8 text-navy-blue dark:text-white">Education</h2>

          {/* Minimal Timeline */}
          <div className="relative w-full max-w-md mx-auto">
            {/* Simple vertical line */}
            <div className="absolute left-0 top-2 bottom-0 w-[2px] bg-gradient-to-b from-royal-blue/80 to-columbia-blue/80 dark:from-columbia-blue/80 dark:to-royal-blue/80"></div>

            {/* Education Items */}
            <div className="space-y-8">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.university}
                  className="relative pl-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.2 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[-4px] top-1 w-[10px] h-[10px] rounded-full bg-royal-blue dark:bg-columbia-blue"></div>

                  {/* Education card */}
                  <motion.div
                    className="bg-white dark:bg-navy-blue/90 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-800"
                    whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => toggleExpand(idx)}
                  >
                    {/* Logo and basic info */}
                    <div className="flex items-start mb-3">
                      <div className="w-10 h-10 relative rounded-md overflow-hidden mr-3 flex-shrink-0 border border-gray-100 dark:border-gray-700">
                        <Image
                          src={edu.logo || "/placeholder.svg"}
                          alt={`${edu.university} logo`}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-blue dark:text-white text-base leading-tight">
                          {edu.university}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{edu.degree}</p>
                      </div>
                    </div>

                    {/* Period and location */}
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    {/* Coursework */}
                    <AnimatePresence>
                      {expandedCard === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2"
                        >
                          <div className="flex items-center text-xs text-blue-600 dark:text-blue-400 mb-2">
                            <BookOpen className="h-3 w-3 mr-1" />
                            <span>Key Coursework</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {edu.coursework.map((course, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle indicator */}
                    <div className="mt-2 flex justify-center">
                      <motion.button
                        className="text-xs text-blue-600 dark:text-blue-400 flex items-center"
                        whileHover={{ scale: 1.05 }}
                        animate={{ y: expandedCard === idx ? 0 : [0, 2, 0] }}
                        transition={{
                          y: {
                            duration: 1.5,
                            repeat: expandedCard === idx ? 0 : Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          },
                        }}
                      >
                        {expandedCard === idx ? (
                          <>
                            <ChevronUp className="h-3 w-3 mr-1" />
                            <span>Hide coursework</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3 mr-1" />
                            <span>Show coursework</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

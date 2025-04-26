"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, BookOpen, ChevronUp, ChevronDown } from "lucide-react"

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
  const [isScrollingDown, setIsScrollingDown] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const { resolvedTheme } = useTheme()

  const educationData: Education[] = [
    {
      university: "Arizona State University",
      degree: "Master's, Data Science, Analytics and Engineering",
      period: "Aug 2023 - Jun 2025",
      location: "Arizona, USA",
      logo: "/logos/asu.png",
      coursework: ["Artificial Intelligence", "Data Mining", "Convex Optimisation", "Statistical Machine Learning"],
    },
    {
      university: "Institute of Technology, Nirma University",
      degree: "Bachelor's, Computer Science",
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

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrollingDown(currentScrollY > lastScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Use Intersection Observer to detect when section enters and exits viewport
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2 }, // Trigger when 20% of the section is visible
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
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

  // First, let's enhance the scroll animation when clicking the education link in navbar
  // Add this function after the toggleExpand function

  const scrollToEducation = () => {
    // Add entrance animation class when scrolled to via navbar
    setIsVisible(true)

    // Add a small delay to ensure animations trigger after scrolling completes
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.classList.add("section-entered")
      }
    }, 300)
  }

  // Update the useEffect that handles scroll direction to also handle navbar clicks
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrollingDown(currentScrollY > lastScrollY)
      setLastScrollY(currentScrollY)

      // Check if we're scrolling to this section
      const sectionTop = sectionRef.current?.offsetTop || 0
      const sectionHeight = sectionRef.current?.offsetHeight || 0

      if (currentScrollY >= sectionTop - 100 && currentScrollY <= sectionTop + sectionHeight) {
        if (!isVisible) {
          setIsVisible(true)
          if (sectionRef.current) {
            sectionRef.current.classList.add("section-entered")
          }
        }
      } else {
        if (isVisible) {
          setIsVisible(false)
          if (sectionRef.current) {
            sectionRef.current.classList.remove("section-entered")
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Listen for hash changes to trigger animations when clicking navbar links
    const handleHashChange = () => {
      if (window.location.hash === "#education") {
        scrollToEducation()
      }
    }

    window.addEventListener("hashchange", handleHashChange)

    // Check if we're loading directly to the education section
    if (window.location.hash === "#education") {
      scrollToEducation()
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [lastScrollY, isVisible])

  return (
    <section
      id="education"
      ref={sectionRef}
      className={`${
        isMobile ? "h-[100vh]" : "min-h-screen"
      } flex flex-col items-center justify-center bg-white dark:bg-navy-dark relative overflow-hidden`}
    >
      {/* Desktop Timeline */}
      {!isMobile && (
        <>
          <h2 className="text-3xl font-bold text-center mb-8 text-navy-blue dark:text-white animate-fadeIn pt-20">
            Education
          </h2>
          <div className="education-timeline relative w-full max-w-4xl mx-auto px-4 md:px-0">
            {/* Timeline line */}
            <div className="education-timeline-line" />

            {educationData.map((edu, idx) => {
              const isRight = idx % 2 === 1
              const match = edu.period.match(/([A-Za-z]+ \d{4})/)
              const periodLabel = match ? match[1] : edu.period

              // Determine animation class based on visibility and scroll direction
              let animationClass = "opacity-0"

              if (isVisible) {
                // When scrolling into view
                if (isScrollingDown) {
                  animationClass = isRight ? "animate-slide-up" : "animate-slide-down"
                } else {
                  // When scrolling back up into view
                  animationClass = isRight ? "animate-slide-up" : "animate-slide-down"
                }
              } else if (!isVisible && !isScrollingDown) {
                // When scrolling away (up) from the section
                animationClass = isRight ? "animate-slide-down-reverse" : "animate-slide-up-reverse"
              } else if (!isVisible && isScrollingDown) {
                // When scrolling away (down) from the section
                animationClass = isRight ? "animate-slide-down-reverse" : "animate-slide-up-reverse"
              }

              return (
                <div
                  key={edu.university}
                  className={`education-event${isRight ? " right" : ""} ${animationClass}`}
                  style={{
                    animationDelay: `${idx * 0.3}s`,
                  }}
                >
                  <div className="education-dot" />
                  <div className="education-date">{periodLabel}</div>

                  {/* Flip card with hopping animation */}
                  <div className="flip-card group w-full animate-hop">
                    <div className="flip-card-inner">
                      {/* Front */}
                      <div className="flip-card-front bg-white dark:bg-navy-blue/30 rounded-xl shadow-lg px-8 py-6 flex flex-col md:flex-row items-center gap-6 h-full">
                        <div className="w-20 h-20 relative shrink-0 bg-white dark:bg-navy-blue/20 rounded-full p-2 flex items-center justify-center">
                          <Image
                            src={edu.logo || "/placeholder.svg"}
                            alt={`${edu.university} logo`}
                            fill
                            className="object-contain p-1"
                          />
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
                      <div className="flip-card-back bg-blue-50 dark:bg-blue-900 rounded-xl shadow-lg px-8 py-6 flex flex-col items-center justify-center h-full">
                        <h4 className="text-blue-700 dark:text-blue-300 text-lg font-semibold mb-4">Key Coursework</h4>
                        <div className="flex flex-wrap justify-center gap-3 w-full">
                          {edu.coursework.map((course, idx) => (
                            <span
                              key={idx}
                              className="bubble px-4 py-2 rounded-full bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-white text-xs font-medium shadow transition"
                            >
                              {course}
                            </span>
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

      {/* Enhanced Mobile Timeline */}
      {isMobile && (
        <div className="flex flex-col h-full w-full px-8 pt-16 pb-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-navy-blue dark:text-white">Education</h2>

          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-royal-blue/10 dark:bg-columbia-blue/10"></div>
          </div>

          <div className="relative flex-1 flex flex-col items-center justify-center">
            {/* Wavy Timeline SVG - Now with better z-index control */}
            <div className="timeline-container absolute h-full w-full left-0 top-0 z-0 flex justify-center pointer-events-none">
              <svg className="h-full timeline-svg" width="20" viewBox="0 0 20 100" preserveAspectRatio="none">
                <path
                  d="M10,0 Q15,25 5,50 Q-5,75 10,100"
                  className="wavy-timeline"
                  stroke="url(#timeline-gradient)"
                  strokeWidth="3"
                  fill="none"
                />
                <defs>
                  <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#002366" />
                    <stop offset="50%" stopColor="#1f305e" />
                    <stop offset="100%" stopColor="#002366" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Education Items - Fixed height container */}
            <div className="w-full max-h-[calc(100vh-200px)] overflow-y-auto pr-2 flex flex-col items-center">
              {educationData.map((edu, idx) => {
                const isLeft = idx % 2 === 0
                const alignmentClasses = isLeft ? "pr-14 items-end text-right" : "pl-14 items-start text-left"
                const isExpanded = expandedCard === idx

                return (
                  <motion.div
                    key={edu.university}
                    className={`relative w-full mb-8 flex ${alignmentClasses}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                  >
                    {/* Timeline Dot with Icon - Repositioned to avoid overlap */}
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 z-30 education-icon-container"
                      style={{
                        top: "0",
                        // Offset the icon position to follow the wavy line
                        marginLeft: isLeft ? "-5px" : "5px",
                      }}
                    >
                      <motion.div
                        className="w-6 h-6 rounded-full bg-white dark:bg-navy-dark border-2 border-royal-blue dark:border-columbia-blue flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                        animate={{
                          y: [0, -3, 0],
                          boxShadow: [
                            "0 0 0 rgba(0, 35, 102, 0.4)",
                            "0 0 8px rgba(0, 35, 102, 0.6)",
                            "0 0 0 rgba(0, 35, 102, 0.4)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: idx * 0.5,
                        }}
                      >
                        <GraduationCap className="h-3 w-3 text-royal-blue dark:text-columbia-blue" />
                      </motion.div>
                    </div>

                    {/* Connector Line */}
                    <div
                      className={`absolute h-8 w-[2px] z-20 ${isLeft ? "left-[calc(50%-1px)]" : "left-[calc(50%-1px)]"}`}
                      style={{
                        top: "6px", // Start from the bottom of the icon
                        height: "14px", // Length of connector line
                        background: "linear-gradient(to bottom, #002366, #1f305e)",
                      }}
                    />

                    {/* Content Card - Moved down to avoid overlap and improved for dark mode */}
                    <motion.div
                      className={`w-full max-w-[85%] bg-white dark:bg-navy-blue rounded-lg shadow-lg p-4 mt-5 ${
                        isLeft ? "rounded-tr-none" : "rounded-tl-none"
                      } border border-gray-100 dark:border-blue-900/50 relative overflow-hidden z-10 education-card`}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleExpand(idx)}
                      layout
                      whileHover={{
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                        y: -2,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Decorative accent */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-blue to-delft-blue"></div>

                      {/* Degree and University */}
                      <div className={`mb-1 ${isLeft ? "text-right" : "text-left"}`}>
                        <h3 className="font-bold text-lg text-navy-blue dark:text-white leading-tight">{edu.degree}</h3>
                        <p className="text-blue-600 dark:text-blue-300 text-sm font-medium">{edu.university}</p>
                      </div>

                      {/* Period and Location */}
                      <div className={`mb-3 ${isLeft ? "text-right" : "text-left"}`}>
                        <p className="text-gray-600 dark:text-gray-200 text-xs">{edu.period}</p>
                        <p className="text-gray-500 dark:text-gray-300 text-xs">{edu.location}</p>
                      </div>

                      {/* Coursework Pills */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            className={`flex flex-wrap gap-1.5 ${isLeft ? "justify-end" : "justify-start"}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="w-full mb-1">
                              <div
                                className={`flex items-center text-xs text-blue-700 dark:text-blue-200 mb-1 ${
                                  isLeft ? "justify-end" : "justify-start"
                                }`}
                              >
                                <BookOpen className="h-3 w-3 mr-1" />
                                <span>Key Coursework:</span>
                              </div>
                            </div>
                            {edu.coursework.map((course, i) => (
                              <motion.span
                                key={i}
                                className="text-xs px-2 py-1 bg-blue-100 dark:bg-navy-blue/60 text-royal-blue dark:text-columbia-blue rounded-full shadow-sm"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{
                                  scale: 1.05,
                                  backgroundColor:
                                    resolvedTheme === "dark" ? "rgba(31, 48, 94, 0.6)" : "rgba(198, 226, 233, 1)",
                                }}
                              >
                                {course}
                              </motion.span>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Toggle indicator with animation */}
                      <motion.div
                        className={`mt-2 flex items-center text-xs text-royal-blue dark:text-columbia-blue ${
                          isLeft ? "justify-end" : "justify-start"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        animate={{ y: isExpanded ? 0 : [0, 3, 0] }}
                        transition={{
                          y: {
                            duration: 1.5,
                            repeat: isExpanded ? 0 : Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          },
                        }}
                      >
                        {isExpanded ? (
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
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Subtle instruction text with animation */}
          <motion.div
            className="text-center mt-4 text-xs text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Tap cards to see coursework
          </motion.div>
        </div>
      )}
    </section>
  )
}

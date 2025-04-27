"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, X, MapPin, Layers, Code, CheckCircle, Calendar } from "lucide-react"
import { useTheme } from "next-themes"

interface Experience {
  company: string
  position: string
  period: string
  location: string
  logo: string
  techUsed: string[]
  description: string[]
  metrics?: string[]
  takeaways?: string[]
}

export default function ExperienceSection() {
  const [activeExp, setActiveExp] = useState<number>(0)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [expandedDetail, setExpandedDetail] = useState<string | null>(null)
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const { resolvedTheme } = useTheme()
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const blobRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [expandedResponsibilities, setExpandedResponsibilities] = useState<number[]>([])
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const experienceData: Experience[] = [
    {
      company: "Talin Labs Inc",
      position: "GenAI Engineering Intern",
      period: "May 2024 - Sep 2024",
      location: "Los Angeles, CA, USA",
      logo: "/logos/talin_labs_logo.png",
      techUsed: [
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "Kubeflow",
        "Luigi",
        "Spark",
        "OpenAI API",
        "LangChain",
        "Sentence-BERT",
        "Scikit-learn",
      ],
      description: [
        "Increased system reliability by 42% and data accessibility by 63% by deploying AI pipelines on AWS & Azure using Docker containers orchestrated by Kubernetes, leveraging Kubeflow for end-to-end ML workflows, and scheduling batch jobs with Luigi. Built a scalable Python backend with real-time data streaming, and integrated Hadoop & Spark for advanced data orchestration.",
        "Enhanced Custom AI Chatbot deployment efficiency by implementing Transformer-based models with OpenAI API and Mistral Big within the LangChain framework using Python and 8-bit quantization, incorporating fine-tuning with Hugging Face Transformers and agentic workflows to boost response accuracy by 37% while reducing model size by 29%.",
        "Accelerated supply-chain query handling by 12%, achieving sub-second latencies and an 86% increase in data throughput by applying Retrieval-Augmented Generation (RAG) techniques, leveraging Sentence-BERT for advanced model development, and integrating Scikit-learn for statistical modeling.",
      ],
      metrics: [
        "42% Reliability",
        "63% Accessibility",
        "37% Accuracy",
        "29% Size Reduction",
        "12% Speed",
        "86% Throughput",
      ],
      takeaways: [
        "Mastered containerization and orchestration with Docker and Kubernetes",
        "Developed expertise in LLM fine-tuning and optimization techniques",
        "Gained hands-on experience with RAG systems and vector databases",
        "Improved data pipeline efficiency through distributed computing",
      ],
    },
    {
      company: "GIOSTAR.AI",
      position: "AI Research Intern",
      period: "Nov 2023 - May 2024",
      location: "San Francisco, CA, USA",
      logo: "/logos/giostarai.png",
      techUsed: [
        "PyData Stack",
        "PyTorch",
        "TFT",
        "RCNN",
        "Jenkins CI/CD",
        "Vision Transformer",
        "U-Net",
        "ExecuTorch",
        "MONAI",
        "AWS EC2",
      ],
      description: [
        "Optimized EEG processing in the PyData Stack by applying time-frequency analysis, reducing latency by 25% and enabling real-time thought-controlled smartphone usage via EEG/ECG signals.",
        "Incorporated artifact detection algorithms in PyTorch TFT & RCNN models and automated it via Jenkins CI/CD for Epilepsy Detection, exceeding 90% detection accuracy, boosting diagnostic speed by 33%, and reducing false positives by 18%.",
        "Built Vision Transformer & U-Net models in ExecuTorch with MONAI for AWS EC2 deployment, improving detection/classification accuracy by 20% and cutting inference latency by 30%.",
      ],
      metrics: ["25% Latency", "90% Accuracy", "33% Speed", "18% Error Reduction", "20% Accuracy", "30% Latency"],
      takeaways: [
        "Developed expertise in medical signal processing and analysis",
        "Implemented and optimized deep learning models for healthcare applications",
        "Established CI/CD pipelines for ML model deployment",
        "Gained experience with edge deployment of computer vision models",
      ],
    },
    {
      company: "Nirma University",
      position: "AI/SoW Engineer",
      period: "Aug 2022 - Aug 2023",
      location: "Ahmedabad, Gujarat, India",
      logo: "/logos/nu.png",
      techUsed: [
        "TensorFlow Object Detection API",
        "OCR",
        "Deep Learning",
        "Ensemble Learning",
        "YOLOv5",
        "Localized Object Tracking (LOT)",
      ],
      description: [
        "Aggregated and annotated 10,000+ license plate images using custom scripting and the TensorFlow Object Detection API, boosting OCR model accuracy by 18%.",
        "Engineered an OCR Deep Learning Model and an Ensemble Learning Model for 480p and noisy 1080p images, achieving 86% letter detection efficacy and a 95% IoU, enhancing License Plate Detection and Number Recognition.",
        "Optimized YOLOv5 and Localized Object Tracking (LOT) for edge devices, cutting detection latency by 13% and raising detection accuracy by 22%, culminating in academic dissemination.",
      ],
      metrics: ["18% Accuracy", "86% Detection", "95% IoU", "13% Latency", "22% Accuracy"],
      takeaways: [
        "Mastered data annotation and preparation for computer vision tasks",
        "Developed expertise in OCR and object detection systems",
        "Gained experience optimizing models for edge deployment",
        "Published research findings in academic journals",
      ],
    },
  ]

  // Initialize refs arrays
  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, experienceData.length)
  }, [experienceData.length])

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Set active index to the most recent experience (first in the array) on mobile
  useEffect(() => {
    if (isMobile) {
      setActiveExp(0)
    }
  }, [isMobile])

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
            sectionRef.current.classList.remove("exiting-left")
          }
        }
        // When section exits viewport
        else if (!entry.isIntersecting && isVisible) {
          setIsExiting(true)

          // Add exit animation classes
          if (sectionRef.current) {
            sectionRef.current.classList.add("section-exited")
            sectionRef.current.classList.add("exiting-left") // Experience exits to the left
            sectionRef.current.classList.remove("section-entered")
          }

          // Set a timeout to clean up after animation completes
          exitTimeoutRef.current = setTimeout(() => {
            setIsVisible(false)
            setIsExiting(false)
            if (sectionRef.current) {
              sectionRef.current.classList.remove("section-exited")
              sectionRef.current.classList.remove("exiting-left")
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

  // Handle mouse movement for cursor tracking effect - imported from contact section
  useEffect(() => {
    const container = containerRef.current
    const blob = blobRef.current

    if (!container || !blob || isMobile) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Update state for mouse position
      setMousePosition({ x, y })

      // Update blob position
      blob.style.left = `${x}px`
      blob.style.top = `${y}px`
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

  // Handle direct navigation to section
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#experience" && sectionRef.current) {
        setIsVisible(true)
        setIsExiting(false)
        if (sectionRef.current) {
          sectionRef.current.classList.add("section-entered")
          sectionRef.current.classList.remove("section-exited")
          sectionRef.current.classList.remove("exiting-left")
        }
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }

    handleHashChange() // Check on initial load
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const openModal = (index) => {
    if (experienceData[index].takeaways) {
      setActiveExp(index)
      setModalContent("takeaways")
      setShowModal(true)
      document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
    }
  }

  const closeModal = () => {
    setShowModal(false)
    document.body.style.overflow = "" // Re-enable scrolling
  }

  // Handle navigation for mobile
  const handlePrev = () => {
    setSwipeDirection("right")
    setTimeout(() => {
      setActiveExp((prev) => (prev > 0 ? prev - 1 : experienceData.length - 1))
      setSwipeDirection(null)
    }, 200)
  }

  const handleNext = () => {
    setSwipeDirection("left")
    setTimeout(() => {
      setActiveExp((prev) => (prev < experienceData.length - 1 ? prev + 1 : 0))
      setSwipeDirection(null)
    }, 200)
  }

  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY

    const deltaX = touchEndX - touchStartX.current
    const deltaY = touchEndY - touchStartY.current

    // Only register horizontal swipes if they're more significant than vertical movement
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handlePrev()
      } else {
        handleNext()
      }
    }
  }

  // Toggle expanded detail sections
  const toggleDetail = (detail: string) => {
    setExpandedDetail(expandedDetail === detail ? null : detail)
  }

  // Add this function to toggle expanded state for responsibilities
  const toggleResponsibility = (index: number, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent triggering the card click
    setExpandedResponsibilities((prev) => (prev.includes(index) ? [] : [index]))
  }

  // Render the modal content based on which modal is open
  const renderModalContent = () => {
    if (modalContent === "takeaways") {
      return (
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4 text-navy-blue dark:text-white">
            Key Takeaways: {experienceData[activeExp].company}
          </h3>
          <ul className="space-y-3">
            {experienceData[activeExp].takeaways?.map((takeaway, i) => (
              <li key={i} className="flex">
                <div className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400 mr-2 mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">{takeaway}</p>
              </li>
            ))}
          </ul>
        </div>
      )
    }
    return null
  }

  // Extract month and year from period
  const getStartDate = (period: string) => {
    const startDate = period.split(" - ")[0]
    return startDate
  }

  // Extract a key metric from the description
  const extractMetric = (description: string, index: number) => {
    const metrics = experienceData[activeExp].metrics || []
    return metrics[index] || ""
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`${
        isMobile ? "h-[100vh]" : "min-h-screen"
      } flex flex-col items-center justify-center bg-gray-50 dark:bg-navy-dark/90 relative overflow-hidden`}
    >
      {/* Minimal background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#002366] to-[#B9D9EB]"></div>

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-gray-50 dark:from-navy-dark dark:via-delft-blue/10 dark:to-navy-dark/95 opacity-80"></div>

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
        <div className="absolute top-1/3 right-1/5 w-72 h-72 rounded-full bg-royal-blue/5 dark:bg-columbia-blue/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/5 w-96 h-96 rounded-full bg-royal-blue/5 dark:bg-columbia-blue/5 blur-3xl"></div>

        {/* Floating elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-royal-blue/5 dark:bg-columbia-blue/5"
            style={{
              width: `${Math.random() * 10 + 4}rem`,
              height: `${Math.random() * 10 + 4}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.3 + 0.1,
              filter: `blur(${Math.random() * 30 + 20}px)`,
            }}
          ></div>
        ))}

        {/* Professional-themed decorative elements */}
        <div className="absolute top-20 right-20 opacity-5 dark:opacity-8">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            className="text-royal-blue dark:text-columbia-blue"
          >
            <path
              d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 4h6v3H9V4zm11 16H4V9h16v11z"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="absolute bottom-20 left-20 opacity-5 dark:opacity-8">
          <svg
            width="140"
            height="140"
            viewBox="0 0 24 24"
            fill="none"
            className="text-royal-blue dark:text-columbia-blue"
          >
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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

      {/* Desktop Experience Section */}
      {!isMobile && (
        <>
          <h2 className="text-3xl font-bold text-center text-navy-blue dark:text-white animate-fadeIn mb-16 relative z-10">
            Experience
          </h2>
          <div className="container mx-auto flex flex-col md:flex-row gap-12 max-w-6xl mx-auto mb-16">
            {/* Left Side: Timeline - Fixed height and structure */}
            <div className="md:w-1/3 w-full">
              <div
                className="experience-timeline-modern h-full relative"
                style={{ minHeight: "500px" }}
                ref={timelineRef}
              >
                {/* Timeline Line with Moving Color Animation */}
                <div className="timeline-line-modern">
                  <div className="timeline-line-glow"></div>
                </div>

                {experienceData.map((exp, index) => {
                  // Calculate animation delay based on index
                  const animDelay = index * 0.15
                  const cssDelay = `${animDelay}s`
                  const isRight = index % 2 === 1
                  const startDate = getStartDate(exp.period)

                  // Calculate vertical position based on index
                  // This will spread items evenly along the timeline
                  const topPosition = `${index * 33 + 5}%`

                  // Determine animation class based on visibility and section state
                  let animationClass = ""

                  if (isVisible && !isExiting) {
                    animationClass = isRight ? "animate-slide-in-right" : "animate-slide-in-left"
                  } else if (isExiting) {
                    animationClass = "animate-slide-out-left" // Experience always exits to the left
                  } else {
                    animationClass = "opacity-0"
                  }

                  return (
                    <motion.div
                      key={`timeline-${index}`}
                      className={`timeline-item-modern ${isRight ? "right" : "left"} ${
                        activeExp === index ? "active" : ""
                      } ${animationClass}`}
                      onClick={() => setActiveExp(index)}
                      style={{
                        top: topPosition,
                        animationDelay: cssDelay,
                        cursor: "pointer",
                      }}
                      initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isRight ? 50 : -50 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.2,
                        ease: [0.25, 0.1, 0.25, 1.0],
                      }}
                    >
                      <div
                        className={`timeline-card-modern relative overflow-hidden group ${
                          activeExp === index ? "active-card" : "inactive-card"
                        }`}
                      >
                        <div className="timeline-date-modern">{startDate}</div>
                        <div className="timeline-company-modern">{exp.company}</div>
                        <div className="timeline-position-modern">{exp.position}</div>
                      </div>

                      <div className={`timeline-dot-modern ${activeExp === index ? "active" : ""}`}>
                        <Briefcase className="w-4 h-4 text-white dark:text-white" />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Right Side: Content Tiles with improved transitions */}
            <div className="md:w-2/3 w-full">
              {/* Container with cursor-following blob effect from contact section */}
              <div
                ref={containerRef}
                className="relative h-[calc(500px)] bg-white dark:bg-navy-blue rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                {/* Floating glowing blob accent - using the contact section styling */}
                <div
                  ref={blobRef}
                  className="absolute z-0 w-40 h-40 rounded-full bg-gradient-to-tr from-blue-400 via-fuchsia-500 to-pink-400 opacity-60 blur-3xl pointer-events-none transition-all duration-100"
                  style={{ transform: "translate(-50%, -50%)" }}
                  aria-hidden="true"
                />

                {/* Interactive radial gradient that follows mouse */}
                <div
                  className="absolute inset-0 opacity-40 dark:opacity-50 pointer-events-none transition-opacity duration-1000"
                  style={{
                    background:
                      resolvedTheme === "dark"
                        ? `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(31, 48, 94, 0.4), transparent 70%)`
                        : `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 35, 102, 0.15), transparent 70%)`,
                    opacity: isVisible ? (isMobile ? 0.3 : 0.6) : 0,
                    transition: "opacity 1s ease-in-out, background 1s ease-in-out",
                  }}
                />

                {experienceData.map((exp, index) => (
                  <motion.div
                    key={`content-${index}`}
                    ref={(el) => (contentRefs.current[index] = el)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: activeExp === index ? 1 : 0,
                      y: activeExp === index ? 0 : 20,
                      display: activeExp === index ? "block" : "none",
                    }}
                    transition={{
                      opacity: { duration: 0.4 },
                      y: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
                      display: { delay: activeExp === index ? 0 : 0.4 },
                    }}
                    className="absolute inset-0 z-10 cursor-pointer"
                    onClick={() => exp.takeaways && openModal(index)}
                  >
                    {/* Header Section: Company/Role Block */}
                    <div className="p-4 bg-royal-blue dark:bg-delft-blue text-white relative flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="relative w-12 h-12 bg-white rounded-full p-1 mr-4 flex-shrink-0">
                          <Image
                            src={exp.logo || "/placeholder.svg"}
                            alt={`${exp.company} logo`}
                            fill
                            className="object-contain rounded-full"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{exp.company}</h3>
                          <p className="text-sm text-blue-200">{exp.position}</p>
                        </div>
                      </div>

                      {/* Right side with duration and location */}
                      <div className="flex flex-col items-end text-right">
                        <div className="text-sm text-blue-100 flex items-center mb-1">
                          <span className="mr-1">{exp.period}</span>
                          <Calendar className="h-4 w-4 ml-1.5" />
                        </div>
                        <div className="text-sm text-blue-100 flex items-center">
                          <span className="mr-1">{exp.location}</span>
                          <MapPin className="h-4 w-4 ml-1.5" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 overflow-y-auto h-[calc(500px-100px)] relative">
                      <div className="flex flex-col md:flex-row gap-6 relative">
                        {/* Tech Used Section - Left Column - Redesigned */}
                        <div className="md:w-2/5">
                          <motion.div
                            className="bg-gray-50 dark:bg-navy-blue/30 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <h4 className="text-sm font-semibold text-navy-blue dark:text-white mb-3 flex items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                              <Code className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                              <span>Technologies Used</span>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.techUsed.map((tech, techIndex) => (
                                <motion.span
                                  key={techIndex}
                                  className="bg-white dark:bg-navy-blue/50 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-md text-xs font-medium border border-blue-100 dark:border-blue-900/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay: 0.1 + techIndex * 0.03,
                                    duration: 0.3,
                                  }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>
                        </div>

                        {/* Decorative vertical divider */}
                        <div className="hidden md:block absolute left-[40%] top-8 bottom-8 w-px">
                          <div className="w-full h-full bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent opacity-50"></div>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 left-1/2 transform -translate-x-1/2"
                              style={{
                                top: `${20 + i * 20}%`,
                                opacity: 0.6,
                              }}
                            />
                          ))}
                        </div>

                        {/* Responsibilities Section - Right Column */}
                        <div className="md:w-3/5">
                          <motion.h4
                            className="text-base font-semibold text-navy-blue dark:text-white mb-3 flex items-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            <Layers className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                            <span>Responsibilities</span>
                          </motion.h4>
                          <div className="space-y-3">
                            {exp.description.map((desc, descIndex) => (
                              <motion.div
                                key={descIndex}
                                className="responsibility-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 0.2 + descIndex * 0.1,
                                  duration: 0.4,
                                }}
                                onClick={(e) => toggleResponsibility(descIndex, e)}
                              >
                                <div className="flex">
                                  <div className="flex-shrink-0 mr-2">
                                    <CheckCircle className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                  </div>
                                  <p
                                    className={`text-gray-700 dark:text-gray-200 text-sm responsibility-text ${
                                      expandedResponsibilities.includes(descIndex) ? "expanded" : ""
                                    }`}
                                  >
                                    {desc}
                                    {!expandedResponsibilities.includes(descIndex) && desc.length > 150 && (
                                      <span className="text-blue-500 dark:text-blue-400 ml-1 text-xs font-medium">
                                        ... read more
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Experience Section - Static Timeline List */}
      {isMobile && (
        <div className="w-full flex-col justify-center px-4 max-w-md mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center pb-16">Experience</h2>

          {/* Static Timeline List */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-royal-blue via-blue-400 to-columbia-blue dark:from-columbia-blue dark:via-blue-400 dark:to-royal-blue"></div>

            {/* Experience Items */}
            <div className="space-y-4">
              {experienceData.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex"
                >
                  {/* Timeline Node */}
                  <div className="relative z-10 mt-1">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-navy-blue border-2 border-royal-blue dark:border-columbia-blue flex items-center justify-center shadow-md">
                      <Briefcase className="w-4 h-4 text-royal-blue dark:text-columbia-blue" />
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div className="flex-1 ml-4">
                    <div className="bg-white dark:bg-navy-blue/50 rounded-lg shadow-sm p-3 border border-gray-100 dark:border-gray-800">
                      {/* Company and Position */}
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border border-gray-200 dark:border-gray-700">
                          <Image
                            src={exp.logo || "/placeholder.svg"}
                            alt={exp.company}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-navy-blue dark:text-white text-base leading-tight">
                            {exp.company}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{exp.position}</p>
                        </div>
                      </div>

                      {/* Period and Location */}
                      <div className="flex flex-wrap gap-2 text-xs">
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal for expanded content */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-navy-blue/90 rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-navy-blue dark:text-white">
                  {experienceData[activeExp].company}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {renderModalContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase,
  X,
  MousePointerClick,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Clock,
  MapPin,
  Layers,
  Code,
} from "lucide-react"
import { useInView } from "@/hooks/use-inview"
import { useTheme } from "next-themes"

interface Experience {
  company: string
  position: string
  period: string
  location: string
  logo: string
  techUsed: string[]
  description: string[]
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
  const [ref, inView] = useInView({ threshold: 0.1 })
  const { resolvedTheme } = useTheme()
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const blobRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)

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
        "Python",
        "Hadoop",
        "Spark",
        "OpenAI API",
        "Mistral Big",
        "LangChain",
        "Hugging Face",
        "Sentence-BERT",
        "Scikit-learn",
      ],
      description: [
        "Increased system reliability by 42% and data accessibility by 63% by deploying AI pipelines on AWS & Azure using Docker containers orchestrated by Kubernetes, leveraging Kubeflow for end-to-end ML workflows, and scheduling batch jobs with Luigi. Built a scalable Python backend with real-time data streaming, and integrated Hadoop & Spark for advanced data orchestration.",
        "Enhanced Custom AI Chatbot deployment efficiency by implementing Transformer-based models with OpenAI API and Mistral Big within the LangChain framework using Python and 8-bit quantization, incorporating fine-tuning with Hugging Face Transformers and agentic workflows to boost response accuracy by 37% while reducing model size by 29%.",
        "Accelerated supply-chain query handling by 12%, achieving sub-second latencies and an 86% increase in data throughput by applying Retrieval-Augmented Generation (RAG) techniques, leveraging Sentence-BERT for advanced model development, and integrating Scikit-learn for statistical modeling.",
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

  // Scroll to section when clicked from navbar
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#experience" && sectionRef.current) {
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }

    handleHashChange() // Check on initial load
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Handle mouse movement for cursor tracking effect - imported from contact section
  useEffect(() => {
    const container = containerRef.current
    const blob = blobRef.current

    if (!container || !blob) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      blob.style.left = `${x}px`
      blob.style.top = `${y}px`
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
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

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`${
        isMobile ? "h-[100vh]" : "min-h-screen"
      } flex flex-col justify-center bg-gray-50 dark:bg-navy-dark/90 relative overflow-hidden`}
    >
      {/* Desktop Experience Section */}
      {!isMobile && (
        <>
          <h2 className="text-3xl font-bold text-center mb-8 text-navy-blue dark:text-white animate-fadeIn">
            Experience
          </h2>

          <div className="container mx-auto flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
            {/* Left Side: Timeline - Fixed height and structure */}
            <div className="md:w-1/3 w-full">
              <div className="experience-timeline-modern h-full relative" style={{ minHeight: "500px" }}>
                <div className="timeline-line-modern"></div>

                {experienceData.map((exp, index) => {
                  // Calculate animation delay based on index
                  const animDelay = index * 0.15
                  const cssDelay = `${animDelay}s`
                  const isRight = index % 2 === 1
                  const startDate = getStartDate(exp.period)

                  // Calculate vertical position based on index
                  // This will spread items evenly along the timeline
                  const topPosition = `${index * 33 + 5}%`

                  return (
                    <div
                      key={`timeline-${index}`}
                      className={`timeline-item-modern ${isRight ? "right" : "left"} ${
                        activeExp === index ? "active" : ""
                      }`}
                      onClick={() => setActiveExp(index)}
                      style={{
                        top: topPosition,
                        animationDelay: cssDelay,
                        opacity: 0,
                        transform: "translateY(20px)",
                        animation: inView
                          ? `${isRight ? "slideInRight" : "slideInLeft"} 0.6s ${cssDelay} forwards`
                          : "none",
                        cursor: "pointer",
                      }}
                    >
                      <div className="timeline-card-modern relative overflow-hidden group">
                        <div className="timeline-date-modern">{startDate}</div>
                        <div className="timeline-company-modern">{exp.company}</div>
                        <div className="timeline-position-modern">{exp.position}</div>
                      </div>

                      <div className={`timeline-dot-modern ${activeExp === index ? "active" : ""}`}>
                        <Briefcase className="w-4 h-4 text-white dark:text-white" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Side: Content Tiles with improved transitions */}
            <div className="md:w-2/3 w-full" ref={ref}>
              {/* Container with cursor-following blob effect from contact section */}
              <div
                ref={containerRef}
                className="relative h-[calc(500px)] bg-navy-blue dark:bg-blue-900 rounded-lg shadow-lg overflow-hidden"
              >
                {/* Floating glowing blob accent - using the contact section styling */}
                <div
                  ref={blobRef}
                  className="absolute z-0 w-40 h-40 rounded-full bg-gradient-to-tr from-blue-400 via-fuchsia-500 to-pink-400 opacity-60 blur-3xl pointer-events-none transition-all duration-100"
                  style={{ transform: "translate(-50%, -50%)" }}
                  aria-hidden="true"
                />

                {experienceData.map((exp, index) => (
                  <motion.div
                    key={`content-${index}`}
                    ref={(el) => (contentRefs.current[index] = el)}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeExp === index ? 1 : 0,
                      display: activeExp === index ? "block" : "none",
                    }}
                    transition={{
                      opacity: { duration: 0.4 },
                      display: { delay: activeExp === index ? 0 : 0.4 },
                    }}
                    className="absolute inset-0 cursor-pointer z-10"
                    onClick={() => openModal(index)}
                  >
                    {/* Header */}
                    <div className="p-4 text-white relative">
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
                          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-blue-200">
                            <p className="mr-3">{exp.position}</p>
                            <p className="hidden sm:block">•</p>
                            <p className="mr-3">{exp.period}</p>
                            <p className="hidden sm:block">•</p>
                            <p>{exp.location}</p>
                          </div>
                        </div>
                      </div>

                      {/* Takeaways Icon in top-right (non-clickable) */}
                      {exp.takeaways && (
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center z-20 pointer-events-none">
                          <div className="relative w-5 h-5 animate-pulse-border rounded-full border border-blue-300 flex items-center justify-center">
                            <MousePointerClick className="h-3 w-3 text-blue-300" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 overflow-y-auto h-[calc(500px-64px)] relative">
                      {/* Tech Used Section */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                          <span className="mr-2">Technologies Used</span>
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.techUsed.map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              className="bg-blue-100/20 text-blue-100 px-1.5 py-0.5 rounded-full text-xs transition-all duration-300 hover:bg-blue-100/30"
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
                      </div>

                      {/* Responsibilities Section */}
                      <div className="mb-4">
                        <h4 className="text-base font-semibold text-white mb-3 flex items-center">
                          <span className="mr-2">Responsibilities</span>
                        </h4>
                        <ul className="space-y-3">
                          {exp.description.map((desc, descIndex) => (
                            <motion.li
                              key={descIndex}
                              className="flex"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.2 + descIndex * 0.1,
                                duration: 0.4,
                              }}
                            >
                              <div className="h-2 w-2 rounded-full bg-blue-400 mr-2 mt-2 flex-shrink-0"></div>
                              <p className="text-blue-50/90 text-xs leading-relaxed">{desc}</p>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Experience Section - Redesigned with interactive journey concept */}
      {isMobile && (
        <div className="flex flex-col h-full w-full items-center justify-center px-4">
          {/* Title above the experience journey */}
          <h2 className="text-2xl font-bold text-center mb-4 text-navy-blue dark:text-white">Experience</h2>

          {/* Journey Map Container */}
          <div className="relative w-full max-w-sm" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {/* Experience Journey Map */}
            <div className="relative w-full bg-navy-blue dark:bg-blue-900 rounded-xl shadow-lg overflow-hidden">
              {/* Journey Path - Animated Line */}
              <div className="absolute top-0 left-0 w-full h-full">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M10,10 C30,20 70,10 90,25 C70,40 30,35 10,50 C30,65 70,60 90,75 C70,90 30,80 10,90"
                    stroke="url(#journey-gradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,3"
                    className="journey-path"
                  />
                  <defs>
                    <linearGradient id="journey-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#002366" />
                      <stop offset="50%" stopColor="#1f305e" />
                      <stop offset="100%" stopColor="#002366" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Experience Cards */}
              <div className="relative py-6 px-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`exp-${activeExp}`}
                    initial={{
                      opacity: 0,
                      x: swipeDirection === "left" ? 100 : swipeDirection === "right" ? -100 : 0,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: swipeDirection === "left" ? -100 : swipeDirection === "right" ? 100 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-white dark:bg-navy-blue rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-md"
                  >
                    {/* Company and Position Header */}
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 bg-white rounded-full p-1 mr-3 flex-shrink-0">
                        <Image
                          src={experienceData[activeExp].logo || "/placeholder.svg"}
                          alt={`${experienceData[activeExp].company} logo`}
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-navy-blue dark:text-white">
                          {experienceData[activeExp].company}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-blue-200">{experienceData[activeExp].position}</p>
                      </div>
                    </div>

                    {/* Interactive Detail Sections */}
                    <div className="space-y-3">
                      {/* Timeline Section */}
                      <div
                        className={`bg-gray-100 dark:bg-navy-blue/80 rounded-lg p-3 border ${
                          expandedDetail === "timeline"
                            ? "border-blue-400 dark:border-blue-400"
                            : "border-gray-200 dark:border-gray-700"
                        } transition-all duration-300`}
                        onClick={() => toggleDetail("timeline")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-300 mr-2" />
                            <h4 className="text-sm font-medium text-navy-blue dark:text-white">Timeline</h4>
                          </div>
                          <ArrowRight
                            className={`h-4 w-4 text-blue-600 dark:text-blue-300 transition-transform duration-300 ${expandedDetail === "timeline" ? "rotate-90" : ""}`}
                          />
                        </div>

                        {expandedDetail === "timeline" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-2 pl-6 text-sm text-gray-700 dark:text-gray-200"
                          >
                            <p className="flex items-center">
                              <span className="inline-block w-16 text-gray-600 dark:text-blue-300">Period:</span>
                              {experienceData[activeExp].period}
                            </p>
                            <p className="flex items-center mt-1">
                              <span className="inline-block w-16 text-gray-600 dark:text-blue-300">Location:</span>
                              <MapPin className="h-3 w-3 mr-1 text-gray-600 dark:text-blue-300" />
                              {experienceData[activeExp].location}
                            </p>
                          </motion.div>
                        )}
                      </div>

                      {/* Technologies Section */}
                      <div
                        className={`bg-gray-100 dark:bg-navy-blue/80 rounded-lg p-3 border ${
                          expandedDetail === "tech"
                            ? "border-blue-400 dark:border-blue-400"
                            : "border-gray-200 dark:border-gray-700"
                        } transition-all duration-300`}
                        onClick={() => toggleDetail("tech")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Code className="h-4 w-4 text-blue-600 dark:text-blue-300 mr-2" />
                            <h4 className="text-sm font-medium text-navy-blue dark:text-white">Technologies</h4>
                          </div>
                          <ArrowRight
                            className={`h-4 w-4 text-blue-600 dark:text-blue-300 transition-transform duration-300 ${expandedDetail === "tech" ? "rotate-90" : ""}`}
                          />
                        </div>

                        {expandedDetail === "tech" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-2 flex flex-wrap gap-1.5"
                          >
                            {experienceData[activeExp].techUsed.map((tech, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-2 py-0.5 rounded-full text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      {/* Responsibilities Section */}
                      <div
                        className={`bg-gray-100 dark:bg-navy-blue/80 rounded-lg p-3 border ${
                          expandedDetail === "responsibilities"
                            ? "border-blue-400 dark:border-blue-400"
                            : "border-gray-200 dark:border-gray-700"
                        } transition-all duration-300`}
                        onClick={() => toggleDetail("responsibilities")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Layers className="h-4 w-4 text-blue-600 dark:text-blue-300 mr-2" />
                            <h4 className="text-sm font-medium text-navy-blue dark:text-white">Responsibilities</h4>
                          </div>
                          <ArrowRight
                            className={`h-4 w-4 text-blue-600 dark:text-blue-300 transition-transform duration-300 ${expandedDetail === "responsibilities" ? "rotate-90" : ""}`}
                          />
                        </div>

                        {expandedDetail === "responsibilities" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-2 space-y-2"
                          >
                            {experienceData[activeExp].description.map((desc, idx) => (
                              <div key={idx} className="flex">
                                <div className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400 mr-2 mt-1.5 flex-shrink-0"></div>
                                <p className="text-gray-700 dark:text-gray-200 text-xs">{desc}</p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      {/* Key Takeaways Section - Only if available */}
                      {experienceData[activeExp].takeaways && (
                        <div
                          className={`bg-gray-100 dark:bg-navy-blue/80 rounded-lg p-3 border ${
                            expandedDetail === "takeaways"
                              ? "border-blue-400 dark:border-blue-400"
                              : "border-gray-200 dark:border-gray-700"
                          } transition-all duration-300`}
                          onClick={() => toggleDetail("takeaways")}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <MousePointerClick className="h-4 w-4 text-blue-600 dark:text-blue-300 mr-2" />
                              <h4 className="text-sm font-medium text-navy-blue dark:text-white">Key Takeaways</h4>
                            </div>
                            <ArrowRight
                              className={`h-4 w-4 text-blue-600 dark:text-blue-300 transition-transform duration-300 ${expandedDetail === "takeaways" ? "rotate-90" : ""}`}
                            />
                          </div>

                          {expandedDetail === "takeaways" && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-2 space-y-2"
                            >
                              {experienceData[activeExp].takeaways?.map((takeaway, idx) => (
                                <div key={idx} className="flex">
                                  <div className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400 mr-2 mt-1.5 flex-shrink-0"></div>
                                  <p className="text-gray-700 dark:text-gray-200 text-xs">{takeaway}</p>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Journey Progress Indicator */}

                    <div className="mt-4 flex justify-center">
                      <div className="flex space-x-1">
                        {experienceData.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              idx === activeExp
                                ? "w-6 bg-royal-blue dark:bg-columbia-blue"
                                : "w-1.5 bg-gray-300 dark:bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-2 pointer-events-none">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg pointer-events-auto"
                  aria-label="Previous experience"
                >
                  <ChevronLeft className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg pointer-events-auto"
                  aria-label="Next experience"
                >
                  <ChevronRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Swipe instruction */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Swipe or tap arrows to navigate • Tap sections to expand
            </p>
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

// Add this to your globals.css
const style = document.createElement("style")
style.textContent = `
  /* Journey path animation */
  .journey-path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: journey-dash 3s ease-in-out forwards;
  }
  
  @keyframes journey-dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`
if (typeof document !== "undefined") {
  document.head.appendChild(style)
}

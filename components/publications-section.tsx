"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Calendar,
  MapPin,
  Maximize2,
  X,
  ArrowRight,
  FileText,
  ExternalLink,
  Users,
  Tag,
  Quote,
  Download,
  Mouse,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface Publication {
  id: string
  title: string
  venue: string
  period: string
  location: string
  image: string
  abstract: string
  link: string
  keywords: string[]
  authors?: string[]
  citations?: number
  doi?: string
}

export default function PublicationsSection() {
  const [activePublication, setActivePublication] = useState<number>(0)
  const [showFullAbstract, setShowFullAbstract] = useState<boolean>(false)
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const { resolvedTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState<boolean>(true)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)

  // Sample publications data
  const publicationsData: Publication[] = [
    {
      id: "pub-1",
      title: "Classification of potentially hazardous asteroids using supervised quantum machine learning",
      venue: "IEEE Access",
      period: "Jan 2023 - May 2023",
      location: "Ahmedabad, GJ, India",
      image: "https://v9fl0vq2qbxv8yrh.public.blob.vercel-storage.com/pub3-Rc4gfBhxP0D51k6bhuOETalkvCU7dN.png",
      abstract:
        "Quantum computing (QC) and quantum machine learning (QML) are emerging technologies with the potential to revolutionize the way we approach complex problems in mathematics, physics, and other fields. The increasing availability of data and computing power has led to a rise in using Artificial Intelligence (AI) to solve real-time problems. In space science, employing AI-based approaches to address various challenges, including the potential risks posed by asteroids, is becoming increasingly necessary. Potentially Hazardous Asteroids (PHAs) can cause significant harm to humans and biodiversity through wind blasts, overpressure shock, thermal radiation, cratering, seismic shaking, ejecta deposition, and even tsunamis. Machine Learning (ML) algorithms have been employed to detect hazardous asteroids based on their parameters. Still, there are limitations to the current techniques, and the results have reached a saturation point. To address this issue, we propose a Quantum Machine Learning (QML)-based approach for asteroid hazard prediction, employing Variational Quantum Circuits (VQC) and PegasosQSVC algorithms. The proposed work aims to leverage the quantum properties of the data to improve the accuracy and precision of asteroid classification. Our study focuses on the impact of PHAs, and the proposed supervised QML-based method aims to detect whether an asteroid with specific parameters is hazardous or not. We compared several classification algorithms and found that the proposed QML-based approach employing VQC and PegasosQSVC outperformed the other methods, with an accuracy of 98.11% and an average F1-score of 92.69%.",
      link: "#",
      doi: "10.1109/ACCESS.2023.3276543",
      keywords: ["QML", "Asteroid Classification", "IBM Quantum", "SVM", "Feature Mapping"],
      authors: [
        "Rushir Bhavsar",
        "Nilesh Kumar Jadav",
        "Umesh Bodkhe",
        "Rajesh Gupta",
        "Sudeep Tanwar",
        "Gulshan Sharma",
        "Pitshou N Bokoro",
        "Ravi Sharma",
      ],
      citations: 14,
    },
    {
      id: "pub-2",
      title: "MetaHate: AI‐based hate speech detection for secured online gaming in metaverse using blockchain",
      venue: "Security and Privacy, WILEY",
      period: "Jul 2022 - Dec 2022",
      location: "Ahmedabad, GJ, India",
      image: "https://v9fl0vq2qbxv8yrh.public.blob.vercel-storage.com/pub2-Wxgxu2bpXZ8jBIQoqCq5gNjbF0GQpE.png",
      abstract:
        "The emergence of Web 3.0, blockchain technology (BC), and artificial intelligence (AI) are transforming multiplayer online gaming in the metaverse. This development has its concerns about safety and inclusivity. Hate speech, in particular, poses a significant threat to the harmony of these online communities. Traditional moderation methods struggle to cope with the immense volume of user-generated content, necessitating innovative solutions. This article proposes a novel framework, MetaHate, that employs AI and BC to detect and combat hate speech in online gaming environments within the metaverse. Various machine learning (ML) models are applied to analyze Hindi–English code mixed datasets, with gradient boosting proving the most effective, achieving 86.01% accuracy. AI algorithms are instrumental in identifying harmful language patterns, while BC technology ensures transparency and user accountability. Moreover, a BC-based smart contract is proposed to support the moderation of hate speech in the game chat. Integrating AI and BC can significantly enhance the safety and inclusivity of the metaverse, underscoring the importance of these technologies in the ongoing battle against hate speech and in bolstering user engagement. This research emphasizes the potential of AI and BC synergy in creating a safer metaverse, highlighting the need for continuous refinement and deployment of these technologies.",
      link: "#",
      doi: "10.1002/spy2.254",
      keywords: ["Deep Learning", "Natural Language Processing", "Blockchain", "Metaverse", "Hate Speech"],
      authors: [
        "Harshil Sanghvi",
        "Rushir Bhavsar",
        "Vini Hundlani",
        "Lata Gohil",
        "Tarjni Vyas",
        "Anuja Nair",
        "Shivani Desai",
        "Nilesh Kumar Jadav",
        "Sudeep Tanwar",
        "Ravi Sharma",
        "Nagendar Yamsani",
      ],
      citations: 12,
    },
    {
      id: "pub-3",
      title: "MACE-PINNs: Multi-Network Driven Decoupling of Interdependent Physics in Coupled PDE Systems",
      venue: "ETD/ProQUEST ASU",
      period: "Aug 2024 - April 2025",
      location: "Tempe, AZ",
      image: "https://v9fl0vq2qbxv8yrh.public.blob.vercel-storage.com/pub1-eWp8SfNDQzbpSQDfWcHbx3k5AKR8hD.png",
      abstract:
        'Physics-Informed Neural Networks (PINNs) provide an innovative framework for solving complex nonlinear Partial Differential Equations (PDEs) by embedding the governing equations directly into neural networks. Recent advancements have sought to improve their performance, yet standard ("vanilla") PINNs frequently encounter instabilities and inaccuracies, particularly for PDEs with coupled variables or dynamic constraints. These limitations stem from stiff gradient dynamics and multi-scale non-linear interactions. Traditional strategies, such as time marching and curriculum training, have been employed to mitigate these issues but often yield error magnitudes higher than anticipated, reducing their effectiveness for certain PDE classes. To address these challenges, the Multi-network Architecture for Coupled Equations Physics-Informed Neural Networks (MACE-PINNs) is introduced. This approach employs parallel subnetworks to independently approximate coupled variables, inter-connected via iterative residual constraints. Inspired by classical numerical solvers, this decoupled training enhances stability and learning efficiency, particularly for PDEs with sensitive initial conditions and strong parameter dependencies. MACE-PINNs is evaluated on the Gray-Scott-2D reaction-diffusion system (RDS) and the Ginzburg-Landau-2D equation—canonical examples of spatiotemporal pattern formation and intrinsic instabilities. This method integrates Fourier feature embeddings to enhance diffusion dynamics representation and adaptive gradient-norm weighting to balance residual loss with data-driven soft temporal regularization. Experimental results demonstrate robust pattern reproduction spanning 5 parametric variations for each RDS, with L2 errors ranging from 0.001 to 0.01. This approach, inspired by classical numerical solvers, employs structured decoupling to achieve stable and physically meaningful neural approximations of complex PDE systems.',
      link: "#",
      doi: "10.2139/ssrn.4532781",
      keywords: ["Edge Computing", "Computer Vision", "Model Optimization", "IoT", "Knowledge Distillation"],
      authors: ["Rushir Manojkumar Bhavsar"],
      citations: 5,
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

  // Setup intersection observer for scroll animations
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Handle scroll indicator visibility
  useEffect(() => {
    const handleScroll = () => {
      // Hide the scroll indicator when user scrolls down a bit
      if (window.scrollY > 150) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle carousel navigation
  const navigatePublication = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActivePublication((prev) => (prev < publicationsData.length - 1 ? prev + 1 : 0))
    } else {
      setActivePublication((prev) => (prev > 0 ? prev - 1 : publicationsData.length - 1))
    }
  }

  // Function to open publication link
  const openPublication = (link: string) => {
    window.open(link, "_blank")
  }

  // Toggle full abstract view
  const toggleFullAbstract = () => {
    setShowFullAbstract(!showFullAbstract)
  }

  // Toggle preview modal
  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  // Toggle detail sections - simplified
  const toggleDetail = (detail: string) => {
    // Simplified - only used for future expandable sections if needed
  }

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return

    const touchEndX = e.changedTouches[0].clientX
    const touchDiff = touchStartX - touchEndX

    if (touchDiff > 50) {
      // Swipe Left
      setSwipeDirection("left")
      navigatePublication("next")
    } else if (touchDiff < -50) {
      // Swipe Right
      setSwipeDirection("right")
      navigatePublication("prev")
    } else {
      setSwipeDirection(null)
    }

    setTouchStartX(null)
  }

  return (
    <section
      id="publications"
      ref={sectionRef}
      className={`${
        isMobile ? "h-[100vh]" : "min-h-screen"
      } flex flex-col items-center justify-center bg-gray-50 dark:bg-navy-dark/90 relative overflow-hidden py-12`}
    >
      {/* Minimal background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#002366] to-[#B9D9EB]"></div>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated mesh grid pattern - added for consistency */}
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
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>

      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-navy-blue dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        Publications & Research
      </motion.h2>
      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-navy-blue dark:text-columbia-blue text-sm font-medium mb-2">Scroll to explore</div>
            <div className="w-6 h-10 border-2 border-navy-blue dark:border-columbia-blue rounded-full flex justify-center items-start p-1">
              <motion.div
                className="w-1.5 h-3 bg-navy-blue dark:bg-columbia-blue rounded-full"
                animate={{
                  y: [0, 6, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              />
            </div>
            <motion.div
              className="mt-1"
              animate={{ y: [0, 3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              <Mouse className="h-4 w-4 text-navy-blue dark:text-columbia-blue" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Publications View */}
      {!isMobile && (
        <motion.div
          className="relative max-w-6xl mx-auto px-4"
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Academic Journal Inspired Layout */}
          <div className="bg-white dark:bg-navy-blue/80 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Journal Header */}
            <div className="bg-gradient-to-r from-royal-blue to-delft-blue dark:from-navy-dark dark:to-royal-blue p-5 flex justify-between items-center">
              <div className="text-white">
                <h3 className="text-xl font-bold flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Research Publications
                </h3>
                <p className="text-columbia-blue text-sm">
                  Volume {new Date().getFullYear()}, Issue {new Date().getMonth() + 1}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  onClick={() => navigatePublication("prev")}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  onClick={() => navigatePublication("next")}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Publication Navigation Tabs */}
            <div className="bg-gray-50 dark:bg-navy-blue/60 border-b border-gray-200 dark:border-gray-700 px-5 py-2 flex overflow-x-auto">
              {publicationsData.map((pub, idx) => (
                <button
                  key={pub.id}
                  onClick={() => setActivePublication(idx)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    activePublication === idx
                      ? "text-royal-blue dark:text-columbia-blue border-b-2 border-royal-blue dark:border-columbia-blue"
                      : "text-gray-600 dark:text-gray-300 hover:text-royal-blue dark:hover:text-columbia-blue"
                  }`}
                >
                  {pub.title.length > 30 ? pub.title.substring(0, 30) + "..." : pub.title}
                </button>
              ))}
            </div>

            {/* Journal Content */}
            <div className="p-6 overflow-y-auto flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`pub-${activePublication}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column: Publication Image and Metadata */}
                    <div className="lg:w-2/5">
                      {/* Publication Image */}
                      <div className="relative h-56 lg:h-64 w-full rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 group">
                        <Image
                          src={publicationsData[activePublication].image || "/placeholder.svg"}
                          alt={publicationsData[activePublication].title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <div className="p-4 w-full">
                            <div className="flex justify-between items-center">
                              <span className="text-white text-xs bg-blue-600 px-2 py-1 rounded">Figure 1</span>
                              <button
                                onClick={togglePreview}
                                className="text-white bg-black/30 p-1 rounded-full hover:bg-black/50 transition-colors"
                              >
                                <Maximize2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Publication Metadata */}
                      <div className="mt-4 bg-gray-50 dark:bg-navy-blue/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                          <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                          Publication Details
                        </h4>

                        <div className="space-y-2">
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-400 block">Published</span>
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {publicationsData[activePublication].period}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-400 block">Journal</span>
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {publicationsData[activePublication].venue}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-400 block">Location</span>
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {publicationsData[activePublication].location}
                              </span>
                            </div>
                          </div>

                          {publicationsData[activePublication].doi && (
                            <div className="flex items-start">
                              <Tag className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 block">DOI</span>
                                <a
                                  href={`https://doi.org/${publicationsData[activePublication].doi}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                                >
                                  {publicationsData[activePublication].doi}
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              </div>
                            </div>
                          )}

                          {publicationsData[activePublication].citations && (
                            <div className="flex items-start">
                              <Quote className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Citations</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {publicationsData[activePublication].citations}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Download/View Button */}
                        <button
                          onClick={() => openPublication(publicationsData[activePublication].link)}
                          className="mt-4 w-full py-2 px-3 bg-royal-blue text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center text-sm"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          View Full Paper
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Publication Content */}
                    <div className="lg:w-3/5">
                      {/* Title and Authors */}
                      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                        <a
                          href={publicationsData[activePublication].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block group"
                        >
                          <h3 className="text-2xl font-bold text-navy-blue dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center">
                            {publicationsData[activePublication].title}
                            <ExternalLink className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                        </a>

                        {publicationsData[activePublication].authors && (
                          <div className="mb-2">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                              <Users className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                              <span className="font-medium">Authors</span>
                            </div>
                            <div className="flex flex-wrap gap-1 text-sm">
                              {publicationsData[activePublication].authors.map((author, idx) => (
                                <span
                                  key={idx}
                                  className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${
                                    author === "Rushir Bhavsar" || author === "Rushir Manojkumar Bhavsar"
                                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-medium"
                                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                  }`}
                                >
                                  {author}
                                  {idx < publicationsData[activePublication].authors!.length - 1 && ", "}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Keywords */}
                      <div className="mb-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <Tag className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                          <span className="font-medium">Keywords</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {publicationsData[activePublication].keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md border border-blue-200 dark:border-blue-800/50"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Abstract */}
                      <div className="mb-6 bg-white dark:bg-navy-blue/40 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-lg font-semibold text-navy-blue dark:text-white flex items-center">
                            <Quote className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                            Abstract
                          </h4>
                          <button
                            onClick={toggleFullAbstract}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                          >
                            View Full Abstract
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </button>
                        </div>
                        <div className="relative">
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-6">
                            {publicationsData[activePublication].abstract}
                          </p>
                          <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white dark:from-navy-blue/40 to-transparent"></div>
                        </div>
                      </div>

                      {/* Citation Box */}
                      <div className="bg-gray-50 dark:bg-navy-blue/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <Quote className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                          How to Cite
                        </h4>
                        <div className="bg-white dark:bg-navy-blue/60 rounded p-3 text-xs text-gray-700 dark:text-gray-300 font-mono border border-gray-200 dark:border-gray-700">
                          {publicationsData[activePublication].authors &&
                          publicationsData[activePublication].authors.length > 0
                            ? `${publicationsData[activePublication].authors[0]}${publicationsData[activePublication].authors.length > 1 ? " et al." : ""}, "${publicationsData[activePublication].title}", ${publicationsData[activePublication].venue}, ${publicationsData[activePublication].period.split(" - ")[0].split(" ")[1]}.`
                            : `"${publicationsData[activePublication].title}", ${publicationsData[activePublication].venue}, ${publicationsData[activePublication].period.split(" - ")[0].split(" ")[1]}.`}
                        </div>
                        <button className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          Copy Citation
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Journal Footer with Navigation */}
            <div className="bg-gray-100 dark:bg-navy-blue/70 p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Publication {activePublication + 1} of {publicationsData.length}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {publicationsData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePublication(idx)}
                      className={`w-8 h-1.5 rounded-full transition-all ${
                        activePublication === idx
                          ? "bg-royal-blue dark:bg-columbia-blue"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                      aria-label={`Go to publication ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Publications View - Refined and Minimal */}
      {isMobile && (
        <motion.div
          className="w-full px-4 pt-2 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Publication Cards Carousel */}
          <div
            className="relative w-full max-w-[90%] mx-auto"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`pub-mobile-${activePublication}`}
                initial={{ opacity: 0, x: swipeDirection === "left" ? 100 : swipeDirection === "right" ? -100 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: swipeDirection === "left" ? -100 : swipeDirection === "right" ? 100 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full"
              >
                {/* Minimal Publication Card */}
                <div className="bg-white/90 dark:bg-navy-blue/90 rounded-xl shadow-md overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                  {/* Publication Image with Overlay */}
                  <div className="relative h-36 w-full">
                    <Image
                      src={publicationsData[activePublication].image || "/placeholder.svg"}
                      alt={publicationsData[activePublication].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                      <div className="absolute bottom-0 left-0 w-full p-3">
                        <div className="flex justify-between items-end">
                          <div>
                            <span className="text-xs bg-blue-600/90 text-white px-2 py-0.5 rounded-full">
                              {publicationsData[activePublication].venue.split(",")[0]}
                            </span>
                            <h3 className="text-white text-sm font-bold mt-1 line-clamp-2 pr-2">
                              {publicationsData[activePublication].title}
                            </h3>
                          </div>
                          <button
                            onClick={togglePreview}
                            className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/30 transition-colors flex-shrink-0"
                          >
                            <Maximize2 className="h-3.5 w-3.5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section - Simplified */}
                  <div className="p-3">
                    {/* Publication Details - Minimal */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                        <Calendar className="h-3 w-3 text-blue-600 dark:text-blue-400 mr-1" />
                        <span>{publicationsData[activePublication].period.split(" - ")[0]}</span>
                      </div>
                      {publicationsData[activePublication].citations && (
                        <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 ml-auto">
                          <Quote className="h-3 w-3 text-blue-600 dark:text-blue-400 mr-1" />
                          <span>{publicationsData[activePublication].citations} citations</span>
                        </div>
                      )}
                    </div>

                    {/* Keywords - Minimal */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {publicationsData[activePublication].keywords.slice(0, 2).map((keyword, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                      {publicationsData[activePublication].keywords.length > 2 && (
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                          +{publicationsData[activePublication].keywords.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Action Button - Single */}
                    <button
                      onClick={() => openPublication(publicationsData[activePublication].link)}
                      className="w-full py-1.5 bg-royal-blue text-white text-xs rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      View Full Paper
                    </button>
                  </div>

                  {/* Navigation Dots */}
                  <div className="bg-gray-50 dark:bg-navy-blue/50 py-2 border-t border-gray-200/50 dark:border-gray-700/50 flex justify-center">
                    <div className="flex space-x-1.5">
                      {publicationsData.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePublication(idx)}
                          className={`w-5 h-1 rounded-full transition-all duration-300 ${
                            activePublication === idx ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-600"
                          }`}
                          aria-label={`Go to publication ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation Controls - Subtle Buttons */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={() => navigatePublication("prev")}
                className="bg-white/80 dark:bg-navy-blue/80 backdrop-blur-sm rounded-full p-1.5 shadow-md -ml-1.5 border border-gray-200/50 dark:border-gray-700/50"
                aria-label="Previous publication"
              >
                <ChevronLeft className="h-3.5 w-3.5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={() => navigatePublication("next")}
                className="bg-white/80 dark:bg-navy-blue/80 backdrop-blur-sm rounded-full p-1.5 shadow-md -mr-1.5 border border-gray-200/50 dark:border-gray-700/50"
                aria-label="Next publication"
              >
                <ChevronRight className="h-3.5 w-3.5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Swipe Instructions */}
          <div className="text-center mt-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Swipe or tap arrows to navigate</p>
          </div>
        </motion.div>
      )}

      {/* Full Abstract Modal */}
      {showFullAbstract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-navy-blue rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-navy-blue dark:text-white mb-4">
                {publicationsData[activePublication].title} - Abstract
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {publicationsData[activePublication].abstract}
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <Button variant="ghost" onClick={toggleFullAbstract}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="max-w-4xl max-h-screen w-full h-full flex items-center justify-center relative">
            <Image
              src={publicationsData[activePublication].image || "/placeholder.svg"}
              alt={publicationsData[activePublication].title}
              width={1024}
              height={768}
              className="object-contain"
            />
            <button
              onClick={togglePreview}
              className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

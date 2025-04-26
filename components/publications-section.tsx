"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, BookOpen, Calendar, MapPin, Maximize2, X, ArrowRight, FileText } from "lucide-react"
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
}

export default function PublicationsSection() {
  const [activePublication, setActivePublication] = useState<number>(0)
  const [showFullAbstract, setShowFullAbstract] = useState<boolean>(false)
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const { resolvedTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

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
      keywords: ["Quantum Machine Learning", "Asteroid Classification", "IBM Quantum", "SVM", "Feature Mapping"],
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
        "Physics-Informed Neural Networks (PINNs) provide an innovative framework for solving complex nonlinear Partial Differential Equations (PDEs) by embedding the governing equations directly into neural networks. Recent advancements have sought to improve their performance, yet standard (”vanilla”) PINNs frequently encounter instabilities and inaccuracies, particularly for PDEs with coupled variables or dynamic constraints. These limitations stem from stiff gradient dynamics and multi-scale non-linear interactions. Traditional strategies, such as time marching and curriculum training, have been employed to mitigate these issues but often yield error magnitudes higher than anticipated, reducing their effectiveness for certain PDE classes. To address these challenges, the Multi-network Architecture for Coupled Equations Physics-Informed Neural Networks (MACE-PINNs) is introduced. This approach employs parallel subnetworks to independently approximate coupled variables, inter-connected via iterative residual constraints. Inspired by classical numerical solvers, this decoupled training enhances stability and learning efficiency, particularly for PDEs with sensitive initial conditions and strong parameter dependencies. MACE-PINNs is evaluated on the Gray-Scott-2D reaction-diffusion system (RDS) and the Ginzburg-Landau-2D equation—canonical examples of spatiotemporal pattern formation and intrinsic instabilities. This method integrates Fourier feature embeddings to enhance diffusion dynamics representation and adaptive gradient-norm weighting to balance residual loss with data-driven soft temporal regularization. Experimental results demonstrate robust pattern reproduction spanning 5 parametric variations for each RDS, with L2 errors ranging from 0.001 to 0.01. This approach, inspired by classical numerical solvers, employs structured decoupling to achieve stable and physically meaningful neural approximations of complex PDE systems.",
      link: "#",
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

  return (
    <section
      id="publications"
      className="min-h-screen flex items-center justify-center py-12 bg-gray-50 dark:bg-navy-dark/90"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-navy-blue dark:text-white animate-fadeIn">
          Publications & Research
        </h2>

        {/* Desktop Publications View */}
        {!isMobile && (
          <div className="hidden md:block">
            <div className="relative max-w-6xl mx-auto" ref={containerRef}>
              {/* Academic Journal Inspired Layout */}
              <div className="bg-white dark:bg-navy-blue rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 max-h-[calc(100vh-200px)] flex flex-col">
                {/* Journal Header */}
                <div className="bg-gradient-to-r from-royal-blue to-delft-blue dark:from-navy-dark dark:to-royal-blue p-4 flex justify-between items-center">
                  <div className="text-white">
                    <h3 className="text-xl font-bold">Research Publications</h3>
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

                {/* Journal Content */}
                <div className="p-6 overflow-y-auto flex-grow">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column: Publication Image */}
                    <div className="lg:w-2/5">
                      <div className="relative h-56 lg:h-64 w-full rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 group">
                        <Image
                          src={publicationsData[activePublication].image || "/placeholder.svg"}
                          alt={publicationsData[activePublication].title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
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

                      {/* Publication Metadata - More Modular with Icons */}
                      <div className="mt-4 bg-gray-50 dark:bg-navy-blue/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center bg-white dark:bg-navy-blue/40 rounded-md p-2">
                            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 text-xs">
                              {publicationsData[activePublication].period.split(" - ")[0]}
                            </span>
                          </div>
                          <div className="flex items-center bg-white dark:bg-navy-blue/40 rounded-md p-2">
                            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 text-xs truncate">
                              {publicationsData[activePublication].venue.split(" ")[0]}
                            </span>
                          </div>
                          <div className="flex items-center bg-white dark:bg-navy-blue/40 rounded-md p-2">
                            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 text-xs truncate">
                              {publicationsData[activePublication].location.split(",")[0]}
                            </span>
                          </div>
                          {publicationsData[activePublication].citations && (
                            <div className="flex items-center bg-white dark:bg-navy-blue/40 rounded-md p-2">
                              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300 text-xs">
                                {publicationsData[activePublication].citations} citations
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {publicationsData[activePublication].keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Publication Content */}
                    <div className="lg:w-3/5">
                      {/* Title and Authors - Title now clickable */}
                      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                        <a
                          href={publicationsData[activePublication].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block group"
                        >
                          <h3 className="text-2xl font-bold text-navy-blue dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center">
                            {publicationsData[activePublication].title}
                            <svg
                              className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </h3>
                        </a>
                        {publicationsData[activePublication].authors && (
                          <div className="flex flex-wrap gap-1 text-sm text-gray-600 dark:text-gray-400">
                            {publicationsData[activePublication].authors.map((author, idx) => (
                              <span key={idx}>
                                {author}
                                {idx < publicationsData[activePublication].authors!.length - 1 && ", "}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Abstract - Limited to 3 lines */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-lg font-semibold text-navy-blue dark:text-white">Abstract</h4>
                          <button
                            onClick={toggleFullAbstract}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                          >
                            Show More
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </button>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                          {publicationsData[activePublication].abstract}
                        </p>
                      </div>

                      {/* Academic Paper Styling */}
                      <div className="bg-gray-50 dark:bg-navy-blue/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700 mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Research Highlights
                        </h4>
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <li>Novel approach combining ensemble methods with one-shot learning</li>
                          <li>27% improvement in data processing efficiency</li>
                          <li>23% increase in classification accuracy over baseline</li>
                          <li>Successful application in medical imaging domain</li>
                          <li>Potential for transfer to other diagnostic imaging contexts</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Journal Footer with Navigation */}
                <div className="bg-gray-100 dark:bg-navy-blue/70 p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Publication {activePublication + 1} of {publicationsData.length}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      {publicationsData.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePublication(idx)}
                          className={`w-2 h-2 rounded-full ${
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
            </div>
          </div>
        )}

        {/* Mobile Publications View */}
        {isMobile && (
          <div className="md:hidden">
            <div className="relative" ref={carouselRef}>
              {/* Publication Cards Carousel */}
              <div className="overflow-hidden">
                <div className="flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`pub-mobile-${activePublication}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      {/* Mobile Publication Card */}
                      <div className="bg-white dark:bg-navy-blue rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        {/* Publication Image */}
                        <div className="relative h-48 w-full">
                          <Image
                            src={publicationsData[activePublication].image || "/placeholder.svg"}
                            alt={publicationsData[activePublication].title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <div className="p-4 w-full">
                              <div className="flex justify-between items-center">
                                <span className="text-white text-xs bg-blue-600 px-2 py-1 rounded">Research</span>
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

                        {/* Publication Content */}
                        <div className="p-4">
                          {/* Title - Now clickable */}
                          <a
                            href={publicationsData[activePublication].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block group"
                          >
                            <h3 className="text-lg font-bold text-navy-blue dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center">
                              {publicationsData[activePublication].title}
                              <svg
                                className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </h3>
                          </a>

                          {/* Publication Details - More Compact */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            <div className="flex items-center bg-gray-100 dark:bg-navy-blue/40 rounded-full px-2 py-1">
                              <Calendar className="h-3 w-3 text-blue-600 dark:text-blue-400 mr-1" />
                              <span className="text-gray-700 dark:text-gray-300 text-xs">
                                {publicationsData[activePublication].period.split(" - ")[0]}
                              </span>
                            </div>
                            <div className="flex items-center bg-gray-100 dark:bg-navy-blue/40 rounded-full px-2 py-1">
                              <BookOpen className="h-3 w-3 text-blue-600 dark:text-blue-400 mr-1" />
                              <span className="text-gray-700 dark:text-gray-300 text-xs">
                                {publicationsData[activePublication].venue.split(" ")[0]}
                              </span>
                            </div>
                            {publicationsData[activePublication].citations && (
                              <div className="flex items-center bg-gray-100 dark:bg-navy-blue/40 rounded-full px-2 py-1">
                                <FileText className="h-3 w-3 text-blue-600 dark:text-blue-400 mr-1" />
                                <span className="text-gray-700 dark:text-gray-300 text-xs">
                                  {publicationsData[activePublication].citations}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Abstract - Limited to 3 lines */}
                          <div className="mb-4">
                            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                              {publicationsData[activePublication].abstract}
                            </p>
                            <button
                              onClick={toggleFullAbstract}
                              className="text-xs text-blue-600 dark:text-blue-400 mt-1 hover:underline flex items-center"
                            >
                              Read more
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </button>
                          </div>

                          {/* Keywords */}
                          <div className="mb-2">
                            <div className="flex flex-wrap gap-1.5">
                              {publicationsData[activePublication].keywords.slice(0, 3).map((keyword, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full"
                                >
                                  {keyword}
                                </span>
                              ))}
                              {publicationsData[activePublication].keywords.length > 3 && (
                                <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                                  +{publicationsData[activePublication].keywords.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Navigation Dots */}
                        <div className="bg-gray-100 dark:bg-navy-blue/70 p-3 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                          <div className="flex space-x-2">
                            {publicationsData.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActivePublication(idx)}
                                className={`w-2 h-2 rounded-full ${
                                  activePublication === idx
                                    ? "bg-blue-600 dark:bg-blue-400"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                                aria-label={`Go to publication ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile Navigation Controls */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  onClick={() => navigatePublication("prev")}
                  className="bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md -ml-3 border border-gray-200 dark:border-gray-700"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={() => navigatePublication("next")}
                  className="bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md -mr-3 border border-gray-200 dark:border-gray-700"
                >
                  <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Swipe Instructions */}
            <div className="text-center mt-4 text-xs text-gray-500 dark:text-gray-400">
              Swipe or tap arrows to navigate publications
            </div>
          </div>
        )}

        {/* Full Abstract Modal */}
        <AnimatePresence>
          {showFullAbstract && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setShowFullAbstract(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-navy-blue rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-navy-blue dark:text-white">Abstract</h2>
                  <button
                    onClick={() => setShowFullAbstract(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy-blue dark:text-white mb-4">
                    {publicationsData[activePublication].title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {publicationsData[activePublication].abstract}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Preview Modal */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              onClick={() => setShowPreview(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowPreview(false)}
                  className="absolute top-2 right-2 z-10 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="relative w-full h-full">
                  <Image
                    src={publicationsData[activePublication].image || "/placeholder.svg"}
                    alt={publicationsData[activePublication].title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{publicationsData[activePublication].title}</h3>
                  <p className="text-sm text-gray-300">Figure 1: Research visualization from the publication</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

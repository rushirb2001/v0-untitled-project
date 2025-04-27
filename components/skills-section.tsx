"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Skill {
  name: string
  icon: string
  proficiency: number
}

interface SkillCategory {
  id: string
  name: string
  icon: string
  color: string
  skills: Skill[]
}

// Skill data
const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming",
    icon: "/icons/python.svg",
    color: "#3776AB",
    skills: [
      {
        name: "Python",
        icon: "/icons/python.svg",
        proficiency: 9,
      },
      {
        name: "C++",
        icon: "/icons/cplusplus.svg",
        proficiency: 7,
      },
      {
        name: "Java",
        icon: "/icons/java-icon.svg",
        proficiency: 6,
      },
      {
        name: "MATLAB",
        icon: "https://v9fl0vq2qbxv8yrh.public.blob.vercel-storage.com/matlab-svgrepo-com-NmWt8xWwLlQftLElAkJYwolqdJNuPI.svg",
        proficiency: 7,
      },
    ],
  },
  {
    id: "ml-frameworks",
    name: "ML Frameworks",
    icon: "/icons/pytorch.svg",
    color: "#EE4C2C",
    skills: [
      {
        name: "PyTorch",
        icon: "/icons/pytorch.svg",
        proficiency: 9,
      },
      {
        name: "TensorFlow",
        icon: "/icons/tensorflow.svg",
        proficiency: 8,
      },
      {
        name: "Scikit-learn",
        icon: "/icons/scikitlearn.svg",
        proficiency: 8,
      },
      {
        name: "Keras",
        icon: "/icons/keras.svg",
        proficiency: 7,
      },
    ],
  },
  {
    id: "computer-vision",
    name: "Computer Vision",
    icon: "/icons/opencv.svg",
    color: "#5C3EE8",
    skills: [
      {
        name: "OpenCV",
        icon: "/icons/opencv.svg",
        proficiency: 8,
      },
      {
        name: "YOLO",
        icon: "/yolo-detection-example.png",
        proficiency: 7,
      },
      {
        name: "Image Segmentation",
        icon: "/segmented-streetscape.png",
        proficiency: 7,
      },
    ],
  },
  {
    id: "nlp",
    name: "NLP",
    icon: "/icons/openai.svg",
    color: "#10a37f",
    skills: [
      {
        name: "LLMs",
        icon: "/icons/openai.svg",
        proficiency: 8,
      },
      {
        name: "Langchain",
        icon: "/icons/langchain.svg",
        proficiency: 7,
      },
      {
        name: "Transformers",
        icon: "/huggingface-transformers-flow.png",
        proficiency: 8,
      },
    ],
  },
  {
    id: "databases",
    name: "Databases",
    icon: "/icons/sqlite.svg",
    color: "#0F80CC",
    skills: [
      {
        name: "SQL",
        icon: "/icons/sqlite.svg",
        proficiency: 7,
      },
      {
        name: "Snowflake",
        icon: "/icons/snowflake.svg",
        proficiency: 6,
      },
      {
        name: "FAISS",
        icon: "/icons/faiss.svg",
        proficiency: 8,
      },
      {
        name: "MongoDB",
        icon: "/mongodb-data-flow.png",
        proficiency: 6,
      },
    ],
  },
  {
    id: "devops",
    name: "DevOps",
    icon: "/icons/docker.svg",
    color: "#2496ED",
    skills: [
      {
        name: "Docker",
        icon: "/icons/docker.svg",
        proficiency: 8,
      },
      {
        name: "Kubernetes",
        icon: "/icons/kubernetes.svg",
        proficiency: 7,
      },
      {
        name: "AWS",
        icon: "/icons/amazonwebservices.svg",
        proficiency: 7,
      },
      {
        name: "Git",
        icon: "/icons/git.svg",
        proficiency: 8,
      },
      {
        name: "CI/CD",
        icon: "/software-delivery-cycle.png",
        proficiency: 7,
      },
    ],
  },
  {
    id: "api-development",
    name: "API Development",
    icon: "/icons/fastapi.svg",
    color: "#009688",
    skills: [
      {
        name: "FastAPI",
        icon: "/icons/fastapi.svg",
        proficiency: 8,
      },
      {
        name: "Streamlit",
        icon: "/icons/streamlit.svg",
        proficiency: 7,
      },
      {
        name: "GraphQL",
        icon: "/graphql-data-flow.png",
        proficiency: 6,
      },
    ],
  },
]

export default function SkillsSection() {
  const { resolvedTheme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const skillsPerPage = 6
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const backgroundRef = useRef<HTMLDivElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(0)
  }, [activeCategory])

  // Intersection observer to detect when section is visible
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Handle mouse movement for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current || !isVisible) return

      const rect = backgroundRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      setMousePosition({ x, y })

      // Update gradient position based on mouse
      if (backgroundRef.current) {
        backgroundRef.current.style.setProperty("--mouse-x", `${x}%`)
        backgroundRef.current.style.setProperty("--mouse-y", `${y}%`)
      }
    }

    if (isVisible && !isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isVisible, isMobile])

  const currentSkills = skillCategories[activeCategory].skills
  const totalPages = Math.ceil(currentSkills.length / skillsPerPage)
  const paginatedSkills = currentSkills.slice(currentPage * skillsPerPage, (currentPage + 1) * skillsPerPage)

  const goToNextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages)
  const goToPrevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)

  const getSkillBarColor = (proficiency: number, isDark: boolean) => {
    if (proficiency >= 8) return isDark ? "#4ade80" : "#22c55e"
    if (proficiency >= 6) return isDark ? "#60a5fa" : "#3b82f6"
    return isDark ? "#a78bfa" : "#8b5cf6"
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-12 px-4 relative overflow-hidden"
    >
      {/* Minimal background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#002366] to-[#B9D9EB] z-[9999]"></div>

      {/* New animated background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={
          {
            "--mouse-x": "50%",
            "--mouse-y": "50%",
          } as React.CSSProperties
        }
      >
        {/* Main gradient background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-navy-dark dark:to-[#081b36] transition-opacity duration-1000"
          style={{ opacity: isVisible ? 1 : 0 }}
        ></div>

        {/* Interactive gradient that follows mouse */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-50 transition-opacity duration-1000"
          style={{
            background:
              resolvedTheme === "dark"
                ? `radial-gradient(circle 800px at var(--mouse-x) var(--mouse-y), rgba(31, 48, 94, 0.4), transparent 70%)`
                : `radial-gradient(circle 800px at var(--mouse-x) var(--mouse-y), rgba(0, 35, 102, 0.15), transparent 70%)`,
            opacity: isVisible ? (isMobile ? 0.3 : 0.6) : 0,
            transition: "opacity 1s ease-in-out, background 1s ease-in-out",
          }}
        ></div>

        {/* Animated mesh grid pattern */}
        <div
          className="absolute inset-0 opacity-10 dark:opacity-15 transition-opacity duration-1000"
          style={{
            backgroundImage:
              resolvedTheme === "dark"
                ? `linear-gradient(to right, rgba(185, 217, 235, 0.2) 1px, transparent 1px), 
           linear-gradient(to bottom, rgba(185, 217, 235, 0.2) 1px, transparent 1px)`
                : `linear-gradient(to right, rgba(0, 35, 102, 0.2) 1px, transparent 1px), 
           linear-gradient(to bottom, rgba(0, 35, 102, 0.2) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity: isVisible ? 0.25 : 0,
          }}
        ></div>

        {/* Floating orbs */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full transition-all duration-1000"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                resolvedTheme === "dark"
                  ? `radial-gradient(circle, rgba(185, 217, 235, 0.1) 0%, rgba(185, 217, 235, 0) 70%)`
                  : `radial-gradient(circle, rgba(0, 35, 102, 0.1) 0%, rgba(0, 35, 102, 0) 70%)`,
              animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: isVisible ? 0.7 : 0,
              transform: `scale(${isVisible ? 1 : 0.5})`,
              filter: `blur(${Math.random() * 30 + 20}px)`,
            }}
          ></div>
        ))}

        {/* Accent lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-full transition-all duration-1000"
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

          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full transition-all duration-1000"
              style={{
                left: `${20 + i * 30}%`,
                background:
                  resolvedTheme === "dark"
                    ? "linear-gradient(0deg, transparent, rgba(185, 217, 235, 0.3) 50%, transparent)"
                    : "linear-gradient(0deg, transparent, rgba(0, 35, 102, 0.3) 50%, transparent)",
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? "0" : "-100%"})`,
                transition: `transform 1.5s ease-out ${i * 0.2}s, opacity 1s ease-in-out ${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-navy-blue dark:text-white inline-block relative"
          >
            Technical Skills
          </motion.h2>
        </div>

        {/* Conditional rendering based on device type */}
        {isMobile ? (
          // Apple iPhone style UI for mobile
          <div className="max-w-sm mx-auto">
            {/* iOS-style segmented control for categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 overflow-hidden"
            >
              <div className="flex overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory">
                {skillCategories.map((category, index) => (
                  <div key={category.id} className="snap-center flex-shrink-0 px-1 first:pl-0 last:pr-0">
                    <button
                      onClick={() => setActiveCategory(index)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeCategory === index
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-100/80 dark:bg-navy-blue/40 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {category.name}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* iOS-style skill cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {currentSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white/90 dark:bg-navy-blue/40 rounded-xl p-4 shadow-sm backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                          style={{
                            background: `linear-gradient(135deg, ${skillCategories[activeCategory].color}40, ${skillCategories[activeCategory].color}20)`,
                          }}
                        >
                          <img
                            src={skill.icon || "/placeholder.svg"}
                            alt=""
                            className="w-4 h-4"
                            style={{ filter: resolvedTheme === "dark" ? "brightness(0) invert(1)" : "brightness(0)" }}
                          />
                        </div>
                        <span className="font-medium text-navy-blue dark:text-white">{skill.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-blue-500 dark:text-blue-400">
                        {skill.proficiency}/10
                      </span>
                    </div>

                    {/* iOS-style progress bar */}
                    <div className="h-1.5 bg-gray-100 dark:bg-navy-blue/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency * 10}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${skillCategories[activeCategory].color}80, ${skillCategories[activeCategory].color})`,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* iOS-style pagination dots */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-1.5">
                {skillCategories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeCategory === index ? "bg-blue-500 scale-125" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    aria-label={`Go to ${skillCategories[index].name} category`}
                  />
                ))}
              </div>
            </div>

            {/* iOS-style navigation buttons */}
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() =>
                  setActiveCategory((prev) => (prev - 1 + skillCategories.length) % skillCategories.length)
                }
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-navy-blue/50 shadow-md backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </button>
              <button
                onClick={() => setActiveCategory((prev) => (prev + 1) % skillCategories.length)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-navy-blue/50 shadow-md backdrop-blur-sm"
              >
                <ChevronRight className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </button>
            </div>
          </div>
        ) : (
          // Desktop view remains unchanged
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex mb-6 bg-gray-100/80 dark:bg-navy-blue/40 p-1 rounded-lg shadow-inner overflow-x-auto"
            >
              {skillCategories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(index)}
                  style={{ borderBottom: activeCategory === index ? `3px solid ${category.color}` : "none" }}
                  className={`flex-1 min-w-[100px] py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                    activeCategory === index
                      ? "bg-white/90 dark:bg-navy-blue/80 shadow-md text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300"
                  }`}
                >
                  <img
                    src={category.icon || "/placeholder.svg"}
                    alt=""
                    className="w-4 h-4 mr-2"
                    style={{ filter: resolvedTheme === "dark" ? "brightness(0) invert(1)" : "brightness(0)" }}
                  />
                  {category.name}
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white/80 dark:bg-navy-blue/30 rounded-xl p-6 shadow-lg backdrop-blur-sm"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap justify-between">
                    {paginatedSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white/90 dark:bg-navy-blue/40 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow mb-4 skill-card-hover"
                        style={{ width: `calc(${100 / Math.min(paginatedSkills.length, 3)}% - 12px)` }}
                      >
                        <div className="flex items-center mb-2">
                          <div
                            className="p-2 rounded-md mr-3"
                            style={{
                              backgroundColor:
                                resolvedTheme === "dark" ? "rgba(31, 48, 94, 0.7)" : "rgba(241, 245, 249, 0.9)",
                              borderLeft: `3px solid ${skillCategories[activeCategory].color}`,
                            }}
                          >
                            <img
                              src={skill.icon || "/placeholder.svg"}
                              alt=""
                              className="w-5 h-5"
                              style={{ filter: resolvedTheme === "dark" ? "brightness(0) invert(1)" : "brightness(0)" }}
                            />
                          </div>
                          <span className="font-medium text-navy-blue dark:text-white text-sm">{skill.name}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-1 h-1.5 bg-gray-200 dark:bg-navy-blue/50 rounded-full overflow-hidden mr-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency * 10}%` }}
                              transition={{ duration: 0.5, delay: index * 0.05 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: getSkillBarColor(skill.proficiency, resolvedTheme === "dark") }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 min-w-[24px] text-right">
                            {skill.proficiency}/10
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-2">
                  <button
                    onClick={goToPrevPage}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-navy-blue/50 shadow hover:bg-gray-100 dark:hover:bg-navy-blue/70 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 text-navy-blue dark:text-white" />
                  </button>
                  <div className="text-xs text-gray-600 dark:text-gray-300 px-2">
                    {currentPage + 1}/{totalPages}
                  </div>
                  <button
                    onClick={goToNextPage}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-navy-blue/50 shadow hover:bg-gray-100 dark:hover:bg-navy-blue/70 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 text-navy-blue dark:text-white" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>

      {/* Add custom styles for iOS-like UI */}
      <style jsx global>{`
        /* Hide scrollbar for iOS-style UI */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* iOS-style animations */
        @keyframes ios-spring {
          0% { transform: scale(0.9); }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  )
}

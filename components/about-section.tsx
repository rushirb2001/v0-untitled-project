"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "@/hooks/use-inview"
import { Brain, Code, Database, Cpu, Network, Sparkles, ChevronRight, MessageCircle } from "lucide-react"

export default function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("mindset")
  const controls = useAnimation()
  const particlesRef = useRef(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Animate when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  // Function to scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Particle animation effect
  useEffect(() => {
    if (!particlesRef.current || !inView) return

    const canvas = particlesRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth
        canvas.height = canvas.parentElement.offsetHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `rgba(0, 35, 102, ${Math.random() * 0.5 + 0.1})`
        this.isDark = document.documentElement.classList.contains("dark")
        if (this.isDark) {
          this.color = `rgba(185, 217, 235, ${Math.random() * 0.5 + 0.1})`
        }
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particlesArray = []
    const numberOfParticles = Math.min(canvas.width, canvas.height) / 10

    for (let i = 0; i < numberOfParticles; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particlesArray.push(new Particle(x, y))
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()

        // Connect particles with lines
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = particlesArray[i].isDark
              ? `rgba(185, 217, 235, ${0.1 * (1 - distance / 100)})`
              : `rgba(0, 35, 102, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [inView])

  const tabContent = {
    mindset: {
      icon: <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Analytical Mindset",
      content:
        "I approach problems systematically, breaking complexity into solvable parts. My machine learning background helps me spot patterns in apparent chaos.",
    },
    skills: {
      icon: <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Technical Toolkit",
      content:
        "My technical arsenal—from Python to TensorFlow—is tailored for intelligent system design. I build scalable models that convert raw data into actionable insights.",
    },
    vision: {
      icon: <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Future Vision",
      content:
        "I build AI systems that enhance human capabilities—not replace them—augmenting decisions, automating routine tasks, and unlocking new opportunities through practical machine learning.",
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen relative flex flex-col justify-center overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-navy-dark dark:to-[#081b36] -pt-10"
    >
      {/* Minimal background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#002366] to-[#B9D9EB]"></div>
      {/* Particle background */}
      <div className="absolute inset-0 pointer-events-none">
        <canvas ref={particlesRef} className="w-full h-full" />
      </div>

      <div className="container mx-auto px-5 md:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-blue dark:text-white inline-block relative">
            About Me
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Machine Learning Engineer with a passion for transforming complex data into intelligent solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Left side: Profile and 3D elements */}
          <motion.div variants={cardVariants} initial="hidden" animate={controls} className="relative">
            <div className="relative mx-auto md:mx-0 max-w-md">
              {/* Main profile image with 3D effect */}
              <div className="relative h-[100px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl transform perspective-1000 hover:rotate-y-5 transition-transform duration-700">
                <Image
                  src="/images/avatar.png"
                  alt="Rushir Bhavsar"
                  fill
                  className="object-cover object-center"
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-blue/80 via-navy-blue/40 to-transparent"></div>

                {/* Floating tech icons */}
                <motion.div
                  className="absolute top-6 right-6"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }}
                >
                  <div className="bg-white dark:bg-navy-blue/80 p-2 rounded-full shadow-lg">
                    <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-20 left-6"
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="bg-white dark:bg-navy-blue/80 p-2 rounded-full shadow-lg">
                    <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-1/3 left-6"
                  animate={{ y: [0, 8, 0], rotate: [0, 3, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4.5, ease: "easeInOut", delay: 1 }}
                >
                  <div className="bg-white dark:bg-navy-blue/80 p-2 rounded-full shadow-lg">
                    <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </motion.div>

                {/* Name and title overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                  <h3 className="text-white text-2xl font-bold">Rushir Bhavsar</h3>
                  <p className="text-blue-200 text-sm">Machine Learning Engineer</p>
                </div>
              </div>

              {/* Stats cards with 3D effect */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <motion.div
                  className="bg-white dark:bg-navy-blue/80 rounded-xl p-3 shadow-lg transform hover:scale-105 transition-transform"
                  variants={cardVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-blue-600 dark:text-blue-400 text-xl font-bold">1+</div>
                  <div className="text-navy-blue dark:text-white text-xs font-medium">Years Exp</div>
                </motion.div>

                <motion.div
                  className="bg-white dark:bg-navy-blue/80 rounded-xl p-3 shadow-lg transform hover:scale-105 transition-transform"
                  variants={cardVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-blue-600 dark:text-blue-400 text-xl font-bold">5+</div>
                  <div className="text-navy-blue dark:text-white text-xs font-medium">Projects</div>
                </motion.div>

                <motion.div
                  className="bg-white dark:bg-navy-blue/80 rounded-xl p-3 shadow-lg transform hover:scale-105 transition-transform"
                  variants={cardVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-blue-600 dark:text-blue-400 text-xl font-bold">3</div>
                  <div className="text-navy-blue dark:text-white text-xs font-medium">Publications</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right side: Content tabs */}
          <motion.div variants={containerVariants} initial="hidden" animate={controls} className="flex flex-col">
            {/* Tab navigation */}
            <div className="flex mb-6 bg-gray-100 dark:bg-navy-blue/40 p-1 rounded-lg shadow-inner">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-white dark:bg-navy-blue shadow-md text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab content with animations */}
            <div className="bg-white dark:bg-navy-blue/30 rounded-2xl p-4 shadow-xl min-h-[180px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <div className="flex items-start mb-2">
                    <div className="p-3 bg-blue-50 dark:bg-navy-blue/50 rounded-xl mr-4">
                      {tabContent[activeTab].icon}
                    </div>
                    <h3 className="text-xl font-bold text-navy-blue dark:text-white mt-2">
                      {tabContent[activeTab].title}
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{tabContent[activeTab].content}</p>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-2xl"></div>
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-xl"></div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Skills highlights */}
            <motion.div variants={cardVariants} className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-navy-blue/30 p-3 rounded-xl shadow-md">
                <div className="flex items-center mb-2">
                  <Network className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h4 className="font-small text-navy-blue dark:text-white">Neural Networks</h4>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-navy-blue/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[85%] rounded-full"></div>
                </div>
              </div>

              <div className="bg-white dark:bg-navy-blue/30 p-3 rounded-xl shadow-md">
                <div className="flex items-center mb-2">
                  <Database className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h4 className="font-small text-navy-blue dark:text-white">Data Engineering</h4>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-navy-blue/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[75%] rounded-full"></div>
                </div>
              </div>
            </motion.div>

            {/* Contact button */}
            <motion.div variants={cardVariants} className="mt-8">
              <button
                onClick={scrollToContact}
                className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-6 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                <span>Let's Connect</span>
                <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

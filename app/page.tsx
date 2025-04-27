"use client"

import { useState, useEffect, useRef } from "react"
import { Github, Linkedin, Mail, Menu, X, ChevronDown, ArrowUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import TypewriterEffect from "@/components/typewriter-effect"
import { Button } from "@/components/ui/button"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import EducationSection from "@/components/education-section"
import ExperienceSection from "@/components/experience-section"
import PublicationsSection from "@/components/publications-section"
import ContactSection from "@/components/contact-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedBackground from "@/components/animated-background"
import LoadingAnimation from "@/components/loading-animation"
import { useTheme } from "next-themes"

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const roles = ["ML Engineer", "DL Engineer", "Data Scientist", "Data Analyst", "Data Engineer"]
  const navSections = ["about", "skills", "education", "experience", "publications", "contact"]
  const sectionRefs = useRef({})
  const [loaded, setLoaded] = useState(false)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const { resolvedTheme } = useTheme()

  // Track mouse position for interactive background effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Animation loading sequence
  useEffect(() => {
    // Skip animation if already loaded before (e.g. during development hot reload)
    if (sessionStorage.getItem("initialLoadComplete") === "true") {
      setLoaded(true)
      setInitialLoadComplete(true)
    }
  }, [])

  // Function to handle completion of loading animation
  const handleLoadingComplete = () => {
    // Set loaded state first to remove the loading screen
    setLoaded(true)

    // Use requestAnimationFrame to ensure the next render cycle
    requestAnimationFrame(() => {
      // Then set initialLoadComplete to trigger the background render
      setInitialLoadComplete(true)
      // Store in session storage so we don't show the animation on page refresh
      sessionStorage.setItem("initialLoadComplete", "true")
    })
  }

  // Register section refs
  useEffect(() => {
    navSections.forEach((section) => {
      sectionRefs.current[section] = document.getElementById(section)
    })
    // Add home section
    sectionRefs.current["home"] = document.getElementById("home")
  }, [navSections])

  // Completely revised scroll function to ensure reliable navigation
  const scrollToSection = (sectionId) => {
    // Get the section element
    const section = document.getElementById(sectionId)

    if (!section) return

    // Calculate position with offset for navbar
    const navbarHeight = 56 // Adjust this value based on your navbar height
    const elementPosition = section.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

    // Use scrollIntoView with a specific offset
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })

    // Update active section
    setActiveSection(sectionId)
  }

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Add offset to account for header

      // Find which section is currently in view
      for (const section of [...navSections, "home"].reverse()) {
        const element = document.getElementById(section)
        if (!element) continue

        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navSections])

  // Handle hash changes for direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash && navSections.includes(hash)) {
        // Use setTimeout to ensure DOM is fully loaded
        setTimeout(() => {
          scrollToSection(hash)
        }, 100)
      }
    }

    // Check on initial load
    if (window.location.hash) {
      handleHashChange()
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [navSections])

  // Function to open resume PDF in a new tab
  const openResume = () => {
    window.open(
      "https://v9fl0vq2qbxv8yrh.public.blob.vercel-storage.com/resume-ZpPZh22hfStdIegCtsD7DORRyDEFN7.pdf",
      "_blank",
      "noopener,noreferrer",
    )
  }

  // Get the next section based on the current active section
  const getNextSection = () => {
    const currentIndex = navSections.indexOf(activeSection)
    if (currentIndex === -1 || currentIndex === navSections.length - 1) return null
    return navSections[currentIndex + 1]
  }

  // Format section name for display
  const formatSectionName = (section) => {
    return section.charAt(0).toUpperCase() + section.slice(1)
  }

  // Determine if the next section button should be shown
  const shouldShowNextButton = () => {
    // Show button starting from about section
    return activeSection !== "home" && activeSection !== "contact" && navSections.indexOf(activeSection) !== -1
  }

  const nextSection = getNextSection()

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-navy-dark dark:text-white">
      {/* Initial Page Loading Animation */}
      <AnimatePresence>
        {!initialLoadComplete && <LoadingAnimation onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Navigation */}
      <header className="sticky top-0 z-50 px-4 lg:px-6 h-14 flex items-center bg-white/80 dark:bg-navy-dark/80 backdrop-blur-md shadow-sm">
        {/* Logo + Theme Toggle */}
        <div className="flex items-center">
          <Link
            className="flex items-center justify-center"
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("home")
            }}
          >
            <motion.span
              className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Rushir's Portfolio
            </motion.span>
          </Link>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          {navSections.map((section, index) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`text-lg font-medium transition-colors relative overflow-hidden group ${
                activeSection === section
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-navy-blue dark:hover:text-blue-300"
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-300/20 dark:via-blue-400/20 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none"></span>
            </motion.button>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <motion.button
          className="ml-auto md:hidden p-2 rounded focus:outline-none"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Open Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>

        {/* Mobile Menu Overlay */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setMobileNavOpen(false)}>
            <nav
              className="absolute top-14 right-4 bg-white dark:bg-navy-dark shadow-lg rounded-lg flex flex-col gap-4 p-6 min-w-[60vw] transition"
              onClick={(e) => e.stopPropagation()}
            >
              {navSections.map((section) => (
                <button
                  key={section}
                  className={`text-base font-medium transition-colors text-left ${
                    activeSection === section
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-navy-blue dark:hover:text-blue-300"
                  }`}
                  onClick={() => {
                    setMobileNavOpen(false)
                    scrollToSection(section)
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="relative flex flex-col md:flex-row h-screen text-gray-900 dark:text-white overflow-hidden"
        id="home"
        ref={heroRef}
      >
        {/* Creative Background with Interactive Elements - Only render after loading is complete */}
        {initialLoadComplete && <AnimatedBackground mousePosition={mousePosition} />}

        {/* Add a static background color that's visible immediately */}
        <div className={`absolute inset-0 z-0 ${resolvedTheme === "dark" ? "bg-navy-dark" : "bg-slate-50"}`}></div>

        {/* Hero Content */}
        <div className="container relative z-10 px-4 mx-auto flex flex-1 flex-col md:flex-row items-center justify-center h-full py-12 md:py-12 pb-20 md:pb-12">
          {/* Left Side: Text */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center md:pr-8 pl-0 md:pl-40 order-2 md:order-1">
            {/* Name */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 text-center md:text-left bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-blue-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Rushir Bhavsar
            </motion.h1>
            {/* "I am a" and Typewriter */}
            <motion.div
              className="flex flex-col items-center md:items-start w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-10 sm:h-12 mb-3 flex justify-center md:justify-start w-full">
                <TypewriterEffect words={roles} />
              </div>
            </motion.div>
            {/* Social Links */}
            <motion.div
              className="flex justify-center md:justify-start space-x-6 mb-3 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors transform hover:scale-110 duration-300"
              >
                <Github className="h-7 w-7 sm:h-8 sm:w-8" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/rushir-bhavsar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors transform hover:scale-110 duration-300"
              >
                <Linkedin className="h-7 w-7 sm:h-8 sm:w-8" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:bhavsarrushir@gmail.com"
                className="hover:text-blue-300 transition-colors transform hover:scale-110 duration-300"
              >
                <Mail className="h-7 w-7 sm:h-8 sm:w-8" />
                <span className="sr-only">Email</span>
              </Link>
            </motion.div>
            {/* Resume Button - Updated to open PDF */}
            <motion.div
              className="w-full flex justify-center md:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white dark:from-blue-500 dark:to-blue-400 dark:hover:from-blue-600 dark:hover:to-blue-500 font-medium px-5 sm:px-6 md:px-8 py-2 w-fit mt-2 transform hover:scale-105 duration-300 flex items-center text-base sm:text-lg shadow-lg hover:shadow-xl"
                onClick={openResume}
              >
                View Resume
              </Button>
            </motion.div>
          </div>

          {/* Right Side: Profile Photo with Wobbly Bubble Effect */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center justify-center order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Wobbling Blob Container */}
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 mb-3 mx-auto md:mx-0 z-[10]">
              {/* Blob SVG Filter - for the distortion effect */}
              <svg className="hidden">
                <defs>
                  <filter id="blob-filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                      result="goo"
                    />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                  </filter>
                </defs>
              </svg>

              {/* Animated Blob Shapes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="absolute w-[105%] h-[105%] bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-full opacity-70 blur-lg"
                  animate={{
                    scale: [1, 1.05, 1],
                    borderRadius: [
                      "70% 30% 30% 70% / 60% 40% 60% 40%",
                      "30% 60% 70% 40% / 50% 60% 30% 60%",
                      "70% 30% 30% 70% / 60% 40% 60% 40%",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />
                <motion.div
                  className="absolute w-[100%] h-[100%] bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 rounded-full opacity-80 blur-md"
                  animate={{
                    scale: [1, 1.03, 1],
                    borderRadius: [
                      "60% 40% 40% 60% / 50% 50% 50% 50%",
                      "40% 60% 60% 40% / 60% 40% 60% 40%",
                      "60% 40% 40% 60% / 50% 50% 50% 50%",
                    ],
                  }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
                />
              </div>

              {/* Actual Profile Image - Masked with the Filter */}
              <div className="relative w-full h-full overflow-hidden rounded-full shadow-2xl border-4 border-white/30 dark:border-white/10">
                <Image
                  src="https://v9fl0vq2qbxv8yrh.public.blob.vercel-storage.com/minprofile-de9qIv9r5L2DFt4EnmhmZGPY9lchb1.png"
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
                />

                {/* Inner Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/30 to-blue-300/30 dark:from-blue-400/20 dark:to-blue-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scrolling indicator - Updated for mobile */}
        <motion.div
          className="absolute bottom-12 md:bottom-24 left-0 right-0 mx-auto w-full flex flex-col justify-center items-center z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          {/* Text label - different for mobile and desktop */}
          <div className="text-center mb-1 md:mb-2">
            <span className="text-xs md:text-sm text-gray-700 dark:text-blue-100">
              <span className="hidden md:inline">Scroll to explore</span>
              <pre className="inline md:hidden">  Swipe up      to explore</pre>
            </span>
          </div>

          {/* Desktop scroll indicator */}
          <motion.div
            className="hidden md:flex w-6 h-10 border-2 border-gray-700/70 dark:border-blue-100/70 rounded-full justify-center p-1 mt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-gray-700 dark:bg-blue-100 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Mobile swipe-up indicator */}
          <motion.div
            className="flex md:hidden absolute flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="w-8 h-12 flex flex-col items-center justify-center"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 6L12 30M12 6L6 12M12 6L18 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700 dark:text-blue-100"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Back to Top Button */}
        <div
          className={`fixed right-4 bottom-4 transition-opacity duration-300 z-50 ${
            activeSection !== "home" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => scrollToSection("home")}
            className="bg-navy-blue dark:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none transform hover:scale-105 transition-transform"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        </div>

        {/* Next Section Button */}
        <AnimatePresence>
          {shouldShowNextButton() && nextSection && (
            <motion.div
              className="fixed left-4 bottom-4 z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => scrollToSection(nextSection)}
                className="bg-navy-blue dark:bg-blue-700 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none transform hover:scale-105 transition-transform flex items-center"
                aria-label={`Go to ${formatSectionName(nextSection)} section`}
              >
                <span className="mr-1">Next Up:</span>
                <span className="font-medium">{formatSectionName(nextSection)}</span>
                <ChevronDown className="h-4 w-4 ml-1 rotate-270 transform -rotate-90" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Main Content Sections */}
      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <ExperienceSection />
      <PublicationsSection />
      <ContactSection />

      {/* Footer */}
      <footer className="bg-navy-blue dark:bg-navy-dark text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Rushir Bhavsar. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-2">
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://linkedin.com/in/rushir-bhavsar/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link href="mailto:bhavsarrushir@gmail.com" className="hover:text-blue-300 transition-colors">
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

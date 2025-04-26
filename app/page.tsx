"use client"

import { useState, useEffect, useRef } from "react"
import { Github, Linkedin, Mail, ChevronDown, Menu, X } from "lucide-react"
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

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const roles = ["ML Engineer", "DL Engineer", "Data Scientist", "Data Analyst", "Data Engineer"]
  const navSections = ["about", "skills", "education", "experience", "publications", "contact"]
  const sectionRefs = useRef({})

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

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-navy-dark dark:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 px-4 lg:px-6 h-14 flex items-center bg-white dark:bg-navy-dark shadow-sm">
        {/* Logo + Theme Toggle */}
        <div className="flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <span className="font-bold">RB</span>
          </Link>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          {navSections.map((section) => (
            <button
              key={section}
              className={`text-lg font-medium transition-colors ${
                activeSection === section
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-navy-blue dark:hover:text-blue-300"
              }`}
              onClick={() => scrollToSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="ml-auto md:hidden p-2 rounded focus:outline-none"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Open Menu"
        >
          {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

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
      <section className="relative flex flex-col md:flex-row h-screen text-white overflow-hidden" id="home">
        {/* Background */}
        <div className="absolute inset-0 bg-navy-blue dark:bg-navy-dark z-0">
          <div className="absolute inset-0 bg-cover bg-center">
            <Image
              src="/images/banner.png"
              alt="Banner background"
              fill
              className="banner-image object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-navy-blue/70 dark:bg-navy-dark/80"></div>
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 px-4 mx-auto flex flex-1 flex-col md:flex-row items-center justify-center h-full py-12">
          {/* Left Side: Text */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center md:pr-8 pl-0 md:pl-40 animate-fadeIn order-2 md:order-1">
            {/* Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 text-center md:text-left">Rushir Bhavsar</h1>
            {/* "I am a" and Typewriter */}
            <div className="flex flex-col items-center md:items-start w-full">
              <div className="h-10 sm:h-12 mb-3 flex justify-center md:justify-start w-full">
                <TypewriterEffect words={roles} />
              </div>
            </div>
            {/* Social Links */}
            <div className="flex justify-center md:justify-start space-x-6 mb-3 w-full">
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
            </div>
            {/* Resume Button - Updated to open PDF */}
            <div className="w-full flex justify-center md:justify-start">
              <Button
                className="bg-white text-navy-blue hover:bg-blue-100 dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700 font-medium px-5 sm:px-6 md:px-8 py-2 w-fit mt-2 transform hover:scale-105 duration-300 flex items-center text-base sm:text-lg"
                onClick={openResume}
              >
                View Resume
              </Button>
            </div>
          </div>

          {/* Right Side: Profile Photo */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center order-1 md:order-2">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 mb-3 rounded-full overflow-hidden mx-auto md:mx-0 z-[10000]">
              <Image
                src="https://v9fl0vq2qbxv8yrh.public.blob.vercel-storage.com/minprofile-de9qIv9r5L2DFt4EnmhmZGPY9lchb1.png"
                alt="Profile Picture"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bouncing Arrow */}
        <div className="fixed left-1/2 bottom-2 transform -translate-x-1/2 animate-bounce z-50">
          <button
            onClick={() => scrollToSection("about")}
            className="focus:outline-none"
            aria-label="Scroll to About section"
          >
            <ChevronDown className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
        </div>
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

"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-inview"
import { MessageCircle } from "lucide-react"

export default function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.2 })
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Function to scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center pt-0 pb-8 md:py-16 bg-white dark:bg-navy-dark"
    >
      <div className="container mx-auto px-5 md:px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-12 text-navy-blue dark:text-white animate-fadeIn">
          About Me
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Image - Optimized for mobile */}
            <motion.div
              className="relative mx-auto md:mx-0"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-[220px] w-[220px] sm:h-[260px] sm:w-[260px] md:h-[300px] md:w-[300px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/avatar.png"
                  alt="Rushir Bhavsar"
                  fill
                  className="object-cover object-center"
                  priority
                />

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-navy-blue/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
                  <div className="text-white text-lg md:text-xl font-bold">Rushir Bhavsar</div>
                  <div className="text-blue-300 text-xs md:text-sm">Machine Learning Engineer</div>
                </div>
              </div>
            </motion.div>

            {/* Content - Optimized for mobile */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Introduction */}
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-bold text-navy-blue dark:text-white mb-3">Introduction</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                  Salutations, fellow innovator! I'm an AI engineer driven by the pursuit of enhancing lives through
                  intelligent systems. I strive to design solutions that transform complex data into meaningful
                  insights.
                </p>
              </div>

              {/* Stats Grid - Responsive for all screen sizes */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6">
                {/* Experience */}
                <div className="bg-white dark:bg-navy-blue/30 rounded-lg p-3 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-blue-600 dark:text-blue-400 text-xl md:text-2xl font-bold mb-0.5">1+</div>
                  <div className="text-navy-blue dark:text-white text-xs md:text-sm font-medium">Years Exp</div>
                </div>

                {/* Projects */}
                <div className="bg-white dark:bg-navy-blue/30 rounded-lg p-3 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-blue-600 dark:text-blue-400 text-xl md:text-2xl font-bold mb-0.5">5+</div>
                  <div className="text-navy-blue dark:text-white text-xs md:text-sm font-medium">Projects</div>
                </div>

                {/* Publications */}
                <div className="bg-white dark:bg-navy-blue/30 rounded-lg p-3 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-blue-600 dark:text-blue-400 text-xl md:text-2xl font-bold mb-0.5">3</div>
                  <div className="text-navy-blue dark:text-white text-xs md:text-sm font-medium">Publications</div>
                </div>
              </div>

              {/* Contact Me Button - Replaced Download CV */}
              <button
                onClick={scrollToContact}
                className={`${
                  isMobile ? "self-center" : "self-start"
                } bg-navy-blue dark:bg-blue-700 text-white py-2.5 md:py-3 px-5 md:px-6 rounded-lg flex items-center hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors shadow-md text-sm md:text-base`}
              >
                <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Contact Me!
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

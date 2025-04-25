"use client"

import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useEffect } from "react"
import Image from "next/image"

export default function ContactSection() {
  const blobRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const blob = blobRef.current

    if (!container || !blob) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      blob.style.left = `${x - 20}px`
      blob.style.top = `${y - 20}px`
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="contact" className="h-screen flex items-center justify-center py-16 bg-gray-50 dark:bg-navy-dark/90">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 text-navy-blue dark:text-white animate-fadeIn">
          Contact Me
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Left Side: Contact Info - Optimized for mobile */}
          <div className="bg-white dark:bg-navy-blue/30 rounded-lg shadow-lg p-4 md:p-6 transform transition-all duration-500 hover:shadow-xl animate-slideInLeft">
            {/* Mobile-optimized avatar + info layout */}
            <div className="flex flex-row md:flex-col items-center mb-4">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden mr-4 md:mr-0 md:mb-2 flex-shrink-0">
                <Image
                  src="/images/avatar.png"
                  alt="Rushir Bhavsar Avatar"
                  width={96}
                  height={96}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="md:text-center">
                <h3 className="text-lg font-bold text-navy-blue dark:text-white">Rushir Bhavsar</h3>
                <span className="text-xs text-gray-500 dark:text-gray-300">Machine Learning Engineer</span>
              </div>
            </div>

            {/* Contact Info - Horizontal cards on mobile, vertical on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
              <div className="flex items-center bg-gray-50 dark:bg-navy-blue/40 p-3 rounded-lg">
                <Mail className="h-5 w-5 text-navy-blue dark:text-blue-300 mr-3" />
                <div>
                  <h4 className="font-semibold text-navy-blue dark:text-white text-sm">Email</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">bhavsarrushir@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 dark:bg-navy-blue/40 p-3 rounded-lg">
                <Phone className="h-5 w-5 text-navy-blue dark:text-blue-300 mr-3" />
                <div>
                  <h4 className="font-semibold text-navy-blue dark:text-white text-sm">Phone</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">+1-480-875-6417</p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 dark:bg-navy-blue/40 p-3 rounded-lg">
                <MapPin className="h-5 w-5 text-navy-blue dark:text-blue-300 mr-3" />
                <div>
                  <h4 className="font-semibold text-navy-blue dark:text-white text-sm">Location</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Arizona, USA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form - Minimalistic for mobile */}
          <div
            ref={containerRef}
            className="relative bg-navy-blue dark:bg-blue-900 rounded-lg shadow-lg p-4 md:p-6 text-white animate-slideInRight overflow-hidden"
          >
            {/* Floating glowing blob accent */}
            <div
              ref={blobRef}
              className="absolute z-0 w-40 h-40 rounded-full bg-gradient-to-tr from-royal-blue via-delft-blue to-columbia-blue opacity-60 blur-3xl pointer-events-none transition-all duration-100"
              style={{ transform: "translate(-50%, -50%)" }}
              aria-hidden="true"
            />

            {/* Minimalistic form header */}
            <div className="relative z-10 flex items-center mb-4">
              <Send className="h-5 w-5 mr-2" />
              <h3 className="text-lg font-bold">Message Me</h3>
            </div>

            {/* Simplified form for mobile */}
            <form className="space-y-3 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md bg-navy-blue dark:bg-blue-800 border border-blue-300 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-sm"
                  placeholder="Your name"
                />
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-md bg-navy-blue dark:bg-blue-800 border border-blue-300 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-sm"
                  placeholder="Your email"
                />
              </div>
              <textarea
                rows={3}
                className="w-full px-3 py-2 rounded-md bg-navy-blue dark:bg-blue-800 border border-blue-300 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-sm"
                placeholder="Your message"
              ></textarea>
              <Button className="w-full bg-white text-navy-blue hover:bg-blue-100 dark:hover:bg-gray-200 transform transition-all duration-300 hover:scale-105 text-sm py-1 h-8">
                <Send className="h-3 w-3 mr-1" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

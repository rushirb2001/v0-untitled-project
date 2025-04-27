"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Github, Linkedin } from "lucide-react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

export default function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      setName("")
      setEmail("")
      setMessage("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center py-16 px-4 bg-gray-50 dark:bg-[#060F20] relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute z-0 w-40 h-40 rounded-full bg-gradient-to-tr from-[#002366] to-[#B9D9EB] opacity-20 blur-3xl top-1/4 -left-20 animate-blob-float"></div>
      <div
        className="absolute z-0 w-60 h-60 rounded-full bg-gradient-to-tr from-[#B9D9EB] to-[#002366] opacity-10 blur-3xl bottom-1/4 -right-20 animate-blob-float"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Minimal background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#002366] to-[#B9D9EB]"></div>

      <motion.div
        className="max-w-3xl w-full mx-auto mb-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-[#002366] dark:text-white">Contact</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-xl mx-auto">
          Have a question or want to work together? Feel free to reach out.
        </p>
      </motion.div>

      {/* Desktop vs Mobile Layout */}
      {!isMobile ? (
        // Desktop Layout - Original grid layout
        <div className="w-full max-w-3xl grid md:grid-cols-5 gap-8 relative z-10 h-full">
          {/* Contact Info Column */}
          <motion.div
            className="md:col-span-2 space-y-6 flex flex-col h-full"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-[#1F305E] rounded-lg p-6 shadow-sm border border-gray-100 dark:border-[#002366]/30 flex-1 flex flex-col">
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#002366] dark:border-[#B9D9EB]">
                  <Image src="/images/avatar.png" alt="Profile Avatar" fill className="object-cover" priority />
                </div>
              </div>

              <h3 className="text-lg font-medium mb-4 text-[#002366] dark:text-white">Get in touch</h3>

              <div className="space-y-4">
                <a
                  href="mailto:bhavsarrushir@gmail.com"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-[#002366] dark:hover:text-[#B9D9EB] transition-colors"
                >
                  <Mail className="h-5 w-5 mr-3 text-[#002366] dark:text-[#B9D9EB]" />
                  <span>bhavsarrushir@gmail.com</span>
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium mb-3 text-gray-500 dark:text-gray-400">Connect</h4>
                <div className="flex space-x-3">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 dark:bg-[#002366]/30 hover:bg-gray-200 dark:hover:bg-[#002366]/50 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4 text-[#002366] dark:text-[#B9D9EB]" />
                  </a>
                  <a
                    href="https://linkedin.com/in/rushir-bhavsar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 dark:bg-[#002366]/30 hover:bg-gray-200 dark:hover:bg-[#002366]/50 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4 text-[#002366] dark:text-[#B9D9EB]" />
                  </a>
                  <a
                    href="mailto:bhavsarrushir@gmail.com"
                    className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 dark:bg-[#002366]/30 hover:bg-gray-200 dark:hover:bg-[#002366]/50 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4 text-[#002366] dark:text-[#B9D9EB]" />
                  </a>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Currently available for freelance work and collaborations.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            className="md:col-span-3 flex flex-col h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white dark:bg-[#1F305E] rounded-lg p-6 shadow-sm border border-gray-100 dark:border-[#002366]/30 h-full flex flex-col">
              {isSubmitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Message Sent</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-[#002366]/20 dark:hover:bg-[#002366]/30 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#002366] dark:focus:ring-[#B9D9EB] bg-white dark:bg-[#060F20]/50 text-gray-900 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#002366] dark:focus:ring-[#B9D9EB] bg-white dark:bg-[#060F20]/50 text-gray-900 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#002366] dark:focus:ring-[#B9D9EB] bg-white dark:bg-[#060F20]/50 text-gray-900 dark:text-white resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-md bg-[#002366] hover:bg-[#002366]/90 text-white font-medium flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        // Mobile Layout - New streamlined design
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Simplified Contact Card */}
          <div className="bg-white dark:bg-[#1F305E] rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-[#002366]/30">
            {/* Header with Avatar and Social Links */}
            <div className="bg-gradient-to-r from-[#002366] to-[#1F305E] p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/70">
                  <Image src="/images/avatar.png" alt="Profile Avatar" fill className="object-cover" priority />
                </div>
                <div className="ml-3">
                  <h3 className="text-white text-sm font-medium">Rushir Bhavsar</h3>
                  <a href="mailto:bhavsarrushir@gmail.com" className="text-blue-200 text-xs hover:underline">
                    bhavsarrushir@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex space-x-2">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4 text-white" />
                </a>
                <a
                  href="https://linkedin.com/in/rushir-bhavsar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 text-white" />
                </a>
              </div>
            </div>

            {/* Contact Form - Simplified */}
            <div className="p-4">
              {isSubmitted ? (
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">Message Sent</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-[#002366]/20 dark:hover:bg-[#002366]/30 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#002366] dark:focus:ring-[#B9D9EB] bg-white dark:bg-[#060F20]/50 text-gray-900 dark:text-white text-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#002366] dark:focus:ring-[#B9D9EB] bg-white dark:bg-[#060F20]/50 text-gray-900 dark:text-white text-sm"
                      placeholder="Your email address"
                    />
                  </div>

                  <div>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={3}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#002366] dark:focus:ring-[#B9D9EB] bg-white dark:bg-[#060F20]/50 text-gray-900 dark:text-white resize-none text-sm"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-2 rounded-md text-xs">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 rounded-md bg-[#002366] hover:bg-[#002366]/90 text-white text-sm font-medium flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-3 w-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-3 w-3" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}

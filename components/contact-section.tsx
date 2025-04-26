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
  const blobRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle mouse movement for cursor tracking effect
  useEffect(() => {
    const container = containerRef.current
    const blob = blobRef.current

    if (!container || !blob || isMobile) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      blob.style.left = `${x}px`
      blob.style.top = `${y}px`
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

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
      className="min-h-screen flex flex-col justify-center items-center py-4 md:py-20 pt-0 md:pt-20 px-4 bg-gray-50 dark:bg-[#060F20] relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute z-0 w-40 h-40 rounded-full bg-gradient-to-tr from-[#002366] to-[#B9D9EB] opacity-20 blur-3xl top-1/4 -left-20 animate-blob-float"></div>
      <div
        className="absolute z-0 w-60 h-60 rounded-full bg-gradient-to-tr from-[#B9D9EB] to-[#002366] opacity-10 blur-3xl bottom-1/4 -right-20 animate-blob-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <motion.div
        className="max-w-4xl w-full mx-auto text-center mb-4 md:mb-12 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-center mb-2 md:mb-4 text-[#002366] dark:text-white">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Have a question or want to work together? Feel free to reach out using the form below or through my social
          media.
        </p>
      </motion.div>

      {/* MOBILE VIEW - Unified Contact Card */}
      {isMobile && (
        <motion.div
          className="w-full max-w-md mx-auto bg-white dark:bg-[#1F305E] rounded-xl shadow-lg overflow-hidden relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Profile Photo Header */}
          <div className="relative bg-gradient-to-r from-royal-blue to-delft-blue dark:from-navy-dark dark:to-royal-blue p-6 flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-[#B9D9EB] mb-3">
              <Image
                src="https://v9fl0vq2qbxv8yrh.public.blob.vercel-storage.com/minprofile-de9qIv9r5L2DFt4EnmhmZGPY9lchb1.png"
                alt="Rushir Bhavsar"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Rushir Bhavsar</h3>
            <p className="text-columbia-blue text-sm mb-4">Machine Learning Engineer</p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://linkedin.com/in/rushir-bhavsar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
              <a
                href="mailto:bhavsarrushir@gmail.com"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#C6E2E9] dark:bg-[#002366]/40 flex items-center justify-center">
                <Mail className="h-4 w-4 text-[#002366] dark:text-[#B9D9EB]" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                <a
                  href="mailto:bhavsarrushir@gmail.com"
                  className="text-[#002366] dark:text-[#B9D9EB] hover:underline text-sm"
                >
                  bhavsarrushir@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6">
            {isSubmitted ? (
              <motion.div
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">Message Sent!</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-green-100 hover:bg-green-200 dark:bg-green-800/30 dark:hover:bg-green-800/50 text-green-700 dark:text-green-300 rounded-lg transition-colors text-sm"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <>
                <h4 className="text-lg font-semibold text-[#002366] dark:text-white mb-4">Send Me a Message</h4>
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
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#002366] focus:ring-2 focus:ring-[#002366] dark:focus:ring-[#B9D9EB] focus:border-transparent bg-white dark:bg-[#060F20]/50 text-gray-900 dark:text-white text-sm"
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
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#002366] focus:ring-2 focus:ring-[#002366] dark:focus:ring-[#B9D9EB] focus:border-transparent bg-white dark:bg-[#060F20]/50 text-gray-900 dark:text-white text-sm"
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
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#002366] focus:ring-2 focus:ring-[#002366] dark:focus:ring-[#B9D9EB] focus:border-transparent bg-white dark:bg-[#060F20]/50 text-gray-900 dark:text-white resize-none text-sm"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2.5 px-4 rounded-lg bg-[#002366] hover:bg-[#002366]/90 text-white font-medium flex items-center justify-center transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
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
              </>
            )}

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                I'm currently available for freelance work and collaborations. Let's build something amazing together!
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* DESKTOP VIEW - Original Two-Column Layout */}
      {!isMobile && (
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-4 relative z-10" ref={containerRef}>
          {/* Floating glowing blob accent */}
          <div
            ref={blobRef}
            className="absolute z-0 w-40 h-40 rounded-full bg-gradient-to-tr from-blue-400 via-fuchsia-500 to-pink-400 opacity-60 blur-3xl pointer-events-none transition-all duration-100"
            style={{ transform: "translate(-50%, -50%)" }}
            aria-hidden="true"
          />

          <motion.div
            className="bg-white dark:bg-[#1F305E] rounded-xl shadow-lg p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6E2E9] dark:bg-[#002366] opacity-10 rounded-bl-full"></div>

            <h3 className="text-2xl font-bold mb-6 text-[#002366] dark:text-white">Send Me a Message</h3>

            {isSubmitted ? (
              <motion.div
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2">Message Sent!</h4>
                <p className="text-green-700 dark:text-green-300">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-4 py-2 bg-green-100 hover:bg-green-200 dark:bg-green-800/30 dark:hover:bg-green-800/50 text-green-700 dark:text-green-300 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#002366] focus:ring-2 focus:ring-[#002366] dark:focus:ring-[#B9D9EB] focus:border-transparent bg-white dark:bg-[#060F20]/50 text-gray-900 dark:text-white"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#002366] focus:ring-2 focus:ring-[#002366] dark:focus:ring-[#B9D9EB] focus:border-transparent bg-white dark:bg-[#060F20]/50 text-gray-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#002366] focus:ring-2 focus:ring-[#002366] dark:focus:ring-[#B9D9EB] focus:border-transparent bg-white dark:bg-[#060F20]/50 text-gray-900 dark:text-white resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg bg-[#002366] hover:bg-[#002366]/90 text-white font-medium flex items-center justify-center transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
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
          </motion.div>

          <motion.div
            className="flex flex-col justify-between"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-[#1F305E] rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-[#002366] dark:text-white">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#C6E2E9] dark:bg-[#002366]/40 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-[#002366] dark:text-[#B9D9EB]" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                    <a
                      href="mailto:bhavsarrushir@gmail.com"
                      className="text-[#002366] dark:text-[#B9D9EB] hover:underline"
                    >
                      bhavsarrushir@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1F305E] rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://v9fl0vq2qbxv8yrh.public.blob.vercel-storage.com/minprofile-de9qIv9r5L2DFt4EnmhmZGPY9lchb1.png"
                    alt="Rushir Bhavsar"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#002366] dark:text-white">Connect With Me</h3>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-[#C6E2E9] dark:bg-[#002366]/40 hover:bg-[#002366] dark:hover:bg-[#002366] group transition-colors"
                >
                  <Github className="h-6 w-6 text-[#002366] dark:text-[#B9D9EB] group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://linkedin.com/in/rushir-bhavsar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-[#C6E2E9] dark:bg-[#002366]/40 hover:bg-[#002366] dark:hover:bg-[#002366] group transition-colors"
                >
                  <Linkedin className="h-6 w-6 text-[#002366] dark:text-[#B9D9EB] group-hover:text-white transition-colors" />
                </a>

                <a
                  href="mailto:bhavsarrushir@gmail.com"
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-[#C6E2E9] dark:bg-[#002366]/40 hover:bg-[#002366] dark:hover:bg-[#002366] group transition-colors"
                >
                  <Mail className="h-6 w-6 text-[#002366] dark:text-[#B9D9EB] group-hover:text-white transition-colors" />
                </a>
              </div>

              <div className="mt-8">
                <p className="text-gray-600 dark:text-gray-300">
                  I'm currently available for freelance work and collaborations. Let's build something amazing together!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollObserver from "@/components/scroll-observer"
import FontLoader from "@/components/font-loader"
import ThemeTransitionOverlay from "@/components/theme-transition-overlay"

export const metadata: Metadata = {
  title: "Rushir Bhavsar - Portfolio",
  description: "Personal portfolio of Rushir Bhavsar, Machine Learning Engineer and Data Scientist",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <FontLoader />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <ScrollObserver />
          <ThemeTransitionOverlay />
        </ThemeProvider>
      </body>
    </html>
  )
}

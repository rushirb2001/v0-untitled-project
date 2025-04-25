"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BackgroundUploader() {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = () => {
    // This is a placeholder for actual upload functionality
    // In a real implementation, you would handle file selection and upload
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      alert("Background upload feature would be implemented with server actions in a real application")
    }, 1500)
  }

  return (
    <div className="absolute top-4 right-4">
      <Button
        variant="outline"
        size="sm"
        className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30"
        onClick={handleUpload}
        disabled={isUploading}
      >
        <Upload className="h-4 w-4 mr-2" />
        {isUploading ? "Uploading..." : "Upload Background"}
      </Button>
    </div>
  )
}

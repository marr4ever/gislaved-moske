"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { mosqueImages } from "@/lib/mosque-images"

export function RotatingMosqueBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Change image every 15 minutes (900000 ms)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mosqueImages.length)
    }, 900000)

    // For development/testing purposes, you can use a shorter interval
    // const interval = setInterval(() => {
    //   setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mosqueImages.length)
    // }, 5000) // 5 seconds for testing

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      {mosqueImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full transition-opacity duration-2000"
          style={{
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? 1 : 0,
          }}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image
            src={image.url || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
}

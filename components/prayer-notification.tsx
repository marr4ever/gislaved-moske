"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type PrayerNotificationProps = {
  prayerName: string
  prayerTime: string
  nextPrayer: boolean
}

// Define Iqama times (in minutes after Athan)
const IQAMA_TIMES = {
  Fajr: 10,
  Sunrise: 0, // No Iqama for Sunrise
  Dhuhr: 10,
  Jomoa: 10, // Same as Dhuhr
  Asr: 7,
  Maghrib: 5,
  Isha: 7,
}

export function PrayerNotification({ prayerName, prayerTime, nextPrayer }: PrayerNotificationProps) {
  const [showAthan, setShowAthan] = useState(false)
  const [showIqama, setShowIqama] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Get Iqama time in minutes
  const iqamaDelay = IQAMA_TIMES[prayerName as keyof typeof IQAMA_TIMES] || 0

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!nextPrayer || !prayerTime) return

    // Parse prayer time
    const [hours, minutes] = prayerTime.split(":").map(Number)
    const prayerDateTime = new Date(currentTime)
    prayerDateTime.setHours(hours, minutes, 0, 0)

    // Calculate time difference in seconds
    const diffInSeconds = Math.floor((prayerDateTime.getTime() - currentTime.getTime()) / 1000)

    // If prayer time is now (within 2 minutes after)
    if (diffInSeconds >= -120 && diffInSeconds <= 0) {
      setShowAthan(true)
      // Hide Athan after 2 minutes
      setTimeout(() => {
        setShowAthan(false)
      }, 120000)
    } else {
      setShowAthan(false)
    }

    // Calculate Iqama time
    const iqamaDateTime = new Date(prayerDateTime)
    iqamaDateTime.setMinutes(iqamaDateTime.getMinutes() + iqamaDelay)

    // Calculate time until Iqama in seconds
    const iqamaDiffInSeconds = Math.floor((iqamaDateTime.getTime() - currentTime.getTime()) / 1000)

    // If we're between Athan and Iqama
    if (diffInSeconds < 0 && iqamaDiffInSeconds > 0) {
      // Show countdown to Iqama
      setCountdown(iqamaDiffInSeconds)
    } else if (iqamaDiffInSeconds >= -60 && iqamaDiffInSeconds <= 0) {
      // Show Iqama notification for 1 minute
      setShowIqama(true)
      setCountdown(null)
      // Hide Iqama after 1 minute
      setTimeout(() => {
        setShowIqama(false)
      }, 60000)
    } else {
      setShowIqama(false)
      setCountdown(null)
    }
  }, [currentTime, nextPrayer, prayerTime, prayerName, iqamaDelay])

  // Format countdown time
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!nextPrayer) return null

  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
      <AnimatePresence>
        {showAthan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-500/80 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg"
          >
            Athan
          </motion.div>
        )}

        {countdown !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-blue-500/80 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg"
          >
            Iqama om {formatCountdown(countdown)}
          </motion.div>
        )}

        {showIqama && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-500/80 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg"
          >
            Iqama
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

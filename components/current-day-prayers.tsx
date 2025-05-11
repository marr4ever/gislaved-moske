"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { fetchPrayerTimes } from "@/lib/prayer-api"
import type { DailyPrayers, PrayerTime } from "@/types/prayer"
import { PrayerIcon } from "@/components/prayer-icon"
import { PrayerNotification } from "@/components/prayer-notification"

export function CurrentDayPrayers() {
  const [currentPrayers, setCurrentPrayers] = useState<DailyPrayers | null>(null)
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const prayerData = await fetchPrayerTimes(new Date())
        setCurrentPrayers(prayerData)

        // Find next prayer
        const now = new Date()
        const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
        const nextPrayerTime = prayerData.prayers.find((prayer) => prayer.time > currentTime)
        setNextPrayer(nextPrayerTime || null)
      } catch (err) {
        setError("Failed to load prayer times")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-600 py-4 bg-white/90 rounded-lg">{error}</div>
  }

  if (!currentPrayers) {
    return null
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {currentPrayers.prayers.map((prayer) => {
          const isNextPrayer = nextPrayer?.name === prayer.name
          const isFriday = new Date(currentPrayers.date).getDay() === 5
          const isPrayerJomoa = prayer.name === "Dhuhr" && isFriday
          const displayName = isPrayerJomoa ? "Jomoa" : prayer.name

          return (
            <Card key={prayer.name} className={`prayer-card ${isNextPrayer ? "next-prayer" : ""}`}>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="mb-2">
                  <PrayerIcon
                    prayerName={isPrayerJomoa ? "Jomoa" : prayer.name}
                    size={28}
                    className={isNextPrayer ? "animate-pulse" : ""}
                  />
                </div>
                <span className="prayer-name text-lg mb-1">{isPrayerJomoa ? "Jomoa" : prayer.swedishName}</span>
                <span className="prayer-arabic font-arabic text-base mb-2">
                  {isPrayerJomoa ? "الجمعة" : prayer.arabicName}
                </span>
                <span className={`prayer-time text-2xl ${isNextPrayer ? "text-blue-700" : ""}`}>{prayer.time}</span>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {nextPrayer && <PrayerNotification prayerName={nextPrayer.name} prayerTime={nextPrayer.time} nextPrayer={true} />}
    </div>
  )
}

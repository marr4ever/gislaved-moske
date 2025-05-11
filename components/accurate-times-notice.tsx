"use client"

import { useEffect, useState } from "react"
import { getAccuratePrayerTimesDateRange, hasAccuratePrayerTimes } from "@/lib/accurate-prayer-times"

export function AccurateTimesNotice() {
  const [hasAccurateTimes, setHasAccurateTimes] = useState(false)
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(null)

  useEffect(() => {
    // Check if we have accurate times for today
    const today = new Date()
    setHasAccurateTimes(hasAccuratePrayerTimes(today))

    // Get the date range
    const range = getAccuratePrayerTimesDateRange()
    setDateRange(range)
  }, [])

  if (!hasAccurateTimes || !dateRange) {
    return null
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4 text-green-800 text-sm">
      <p className="font-medium">
        Exakta bönetider tillgängliga från {formatDate(dateRange.start)} till {formatDate(dateRange.end)}
      </p>
    </div>
  )
}

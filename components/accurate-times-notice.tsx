"use client"

import { useEffect, useState } from "react"
import { getDataDateRange, hasDataForDate } from "@/lib/accurate-prayer-times"

export function AccurateTimesNotice() {
  const [hasAccurateTimes, setHasAccurateTimes] = useState(false)
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(null)

  useEffect(() => {
    // Check if we have accurate times for today
    const today = new Date()
    setHasAccurateTimes(hasDataForDate(today))

    // Get the date range
    const range = getDataDateRange()
    setDateRange(range)
  }, [])

  // Check if we're on the TV page
  const isTV = typeof window !== "undefined" && window.location.pathname.includes("/tv")

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

  if (isTV) {
    return (
      <div className="bg-blue-900/50 rounded-lg p-3 mb-4 text-white text-center">
        <p className="font-medium">
          Exakta bönetider tillgängliga från {formatDate(dateRange.start)} till {formatDate(dateRange.end)}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4 text-green-800 text-sm">
      <p className="font-medium">
        Exakta bönetider tillgängliga från {formatDate(dateRange.start)} till {formatDate(dateRange.end)}
      </p>
    </div>
  )
}

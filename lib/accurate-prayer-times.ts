import type { DailyPrayers } from "@/types/prayer"
import { translations } from "@/lib/translations"

// This is where you'll store your accurate prayer times
// The data structure follows the DailyPrayers type
export const accuratePrayerTimes: DailyPrayers[] = [
  // Example for today (you should replace with your actual prayer times)
  {
    date: "2025-05-11", // Format: YYYY-MM-DD
    weekday: "Söndag",
    weekdayArabic: "الاحد",
    hijriDate: "12 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:15",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:45",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:05",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:30",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:25",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "23:00",
      },
    ],
  },
  // Add more days here...
  // You should add entries for each day from today until September 11th
]

// Helper function to get prayer times for a specific date
export function getAccuratePrayerTimesForDate(date: Date): DailyPrayers | null {
  const dateString = date.toISOString().split("T")[0] // Format: YYYY-MM-DD
  return accuratePrayerTimes.find((day) => day.date === dateString) || null
}

// Helper function to get prayer times for a specific month
export function getAccuratePrayerTimesForMonth(year: number, month: number): DailyPrayers[] {
  // Month is 1-based in our data but 0-based in JavaScript Date
  const monthStr = month.toString().padStart(2, "0")
  const yearStr = year.toString()

  return accuratePrayerTimes.filter((day) => {
    const [y, m] = day.date.split("-")
    return y === yearStr && m === monthStr
  })
}

// Function to check if we have accurate prayer times for a given date
export function hasAccuratePrayerTimes(date: Date): boolean {
  const dateString = date.toISOString().split("T")[0]
  return accuratePrayerTimes.some((day) => day.date === dateString)
}

// Function to get the date range for which we have accurate prayer times
export function getAccuratePrayerTimesDateRange(): { start: Date; end: Date } {
  if (accuratePrayerTimes.length === 0) {
    const today = new Date()
    return { start: today, end: today }
  }

  // Sort by date
  const sortedDays = [...accuratePrayerTimes].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return {
    start: new Date(sortedDays[0].date),
    end: new Date(sortedDays[sortedDays.length - 1].date),
  }
}

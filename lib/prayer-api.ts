import type { DailyPrayers } from "@/types/prayer"
import { translations } from "@/lib/translations"
import { getAccuratePrayerTimesForDate, getAccuratePrayerTimesForMonth } from "@/lib/accurate-prayer-times"

const GISLAVED_COORDINATES = {
  latitude: 57.3028,
  longitude: 13.5357,
}

function formatTime(time: string): string {
  return time.split(" ")[0]
}

function getSwedishWeekday(date: Date): string {
  const weekdays = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
  return weekdays[date.getDay()]
}

function getArabicWeekday(englishWeekday: string): string {
  const weekdays: { [key: string]: string } = {
    Monday: "الاثنين",
    Tuesday: "الثلاثاء",
    Wednesday: "الأربعاء",
    Thursday: "الخميس",
    Friday: "الجمعة",
    Saturday: "السبت",
    Sunday: "الأحد",
  }
  return weekdays[englishWeekday] || englishWeekday
}

function parseDate(dateStr: string): Date {
  // Handle different date formats
  const formats = [
    /(\d{4})-(\d{2})-(\d{2})/, // YYYY-MM-DD
    /(\d{2})-(\d{2})-(\d{4})/, // DD-MM-YYYY
  ]

  for (const format of formats) {
    const match = dateStr.match(format)
    if (match) {
      const [_, part1, part2, part3] = match
      if (part1.length === 4) {
        // YYYY-MM-DD
        return new Date(Number.parseInt(part1), Number.parseInt(part2) - 1, Number.parseInt(part3))
      } else {
        // DD-MM-YYYY
        return new Date(Number.parseInt(part3), Number.parseInt(part2) - 1, Number.parseInt(part1))
      }
    }
  }

  throw new Error(`Invalid date format: ${dateStr}`)
}

function formatDate(dateStr: string): string {
  try {
    const date = parseDate(dateStr)
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date")
    }
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  } catch (error) {
    console.error("Error formatting date:", dateStr, error)
    return dateStr // Return original string if parsing fails
  }
}

// Function to check if a date is a Friday
export function isFriday(date: Date): boolean {
  return date.getDay() === 5 // 5 is Friday in JavaScript Date
}

// Function to format prayer name based on day of week
export function formatPrayerNameForDay(prayerName: string, date: Date): string {
  if (prayerName === "Dhuhr" && isFriday(date)) {
    return "Jomoa"
  }
  return prayerName
}

// Function to get Arabic name for prayer based on day of week
export function getArabicPrayerNameForDay(prayerName: string, date: Date): string {
  if (prayerName === "Dhuhr" && isFriday(date)) {
    return "الجمعة" // Arabic for Jomoa
  }

  // Return the regular Arabic name from translations
  const key = prayerName.toLowerCase()
  return translations.prayers[key]?.arabic || prayerName
}

// Function to get Swedish name for prayer based on day of week
export function getSwedishPrayerNameForDay(prayerName: string, date: Date): string {
  if (prayerName === "Dhuhr" && isFriday(date)) {
    return "Jomoa"
  }

  // Return the regular Swedish name from translations
  const key = prayerName.toLowerCase()
  return translations.prayers[key]?.swedish || prayerName
}

export async function fetchPrayerTimes(date: Date): Promise<DailyPrayers> {
  // Always use accurate prayer times from our local data
  const accurateTimes = getAccuratePrayerTimesForDate(date)
  if (accurateTimes) {
    console.log(`Using accurate prayer times for ${date.toISOString().split("T")[0]}`)

    // Make sure to handle Jomoa correctly
    if (isFriday(date)) {
      const updatedPrayers = accurateTimes.prayers.map((prayer) => {
        if (prayer.name === "Dhuhr") {
          return {
            ...prayer,
            name: "Jomoa",
            arabicName: "الجمعة",
            swedishName: "Jomoa",
          }
        }
        return prayer
      })

      return {
        ...accurateTimes,
        prayers: updatedPrayers,
      }
    }

    return accurateTimes
  }

  // If no accurate times are available, generate fallback times
  return generateFallbackPrayerTimes(date)
}

// Generate fallback prayer times for a specific date when the API fails
function generateFallbackPrayerTimes(date: Date): DailyPrayers {
  const weekday = getSwedishWeekday(date)
  const weekdayEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]
  const isFridayPrayer = date.getDay() === 5

  // Adjust prayer times based on the time of year
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  const seasonalAdjustment = Math.sin((dayOfYear / 365) * Math.PI) * 60 // -60 to 60 minutes

  // Base times that will be adjusted
  let fajrHour = 4
  const fajrMinute = 30 + seasonalAdjustment
  let sunriseHour = 6
  const sunriseMinute = 0 + seasonalAdjustment
  const dhuhrHour = 12
  const dhuhrMinute = 0
  const asrHour = 15
  const asrMinute = 0 - seasonalAdjustment
  let maghribHour = 18
  const maghribMinute = 0 - seasonalAdjustment
  let ishaHour = 19
  const ishaMinute = 30 - seasonalAdjustment

  // Summer adjustments for Nordic countries
  const month = date.getMonth() + 1
  if (month >= 5 && month <= 8) {
    // May to August
    fajrHour = 3
    sunriseHour = 5
    maghribHour = 21
    ishaHour = 22
  }

  // Format times properly
  const formatTimeValue = (hours: number, minutes: number): string => {
    const totalMinutes = (hours * 60 + minutes + 1440) % 1440 // Ensure positive value
    const adjustedHours = Math.floor(totalMinutes / 60)
    const adjustedMinutes = Math.floor(totalMinutes % 60)
    return `${adjustedHours.toString().padStart(2, "0")}:${adjustedMinutes.toString().padStart(2, "0")}`
  }

  return {
    date: date.toISOString().split("T")[0],
    weekday: weekday,
    weekdayArabic: getArabicWeekday(weekdayEn),
    hijriDate: `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`, // Simplified hijri date
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: formatTimeValue(fajrHour, fajrMinute),
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: formatTimeValue(sunriseHour, sunriseMinute),
      },
      {
        name: isFridayPrayer ? "Jomoa" : "Dhuhr",
        arabicName: isFridayPrayer ? "الجمعة" : translations.prayers.dhuhr.arabic,
        swedishName: isFridayPrayer ? "Jomoa" : translations.prayers.dhuhr.swedish,
        time: formatTimeValue(dhuhrHour, dhuhrMinute),
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: formatTimeValue(asrHour, asrMinute),
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: formatTimeValue(maghribHour, maghribMinute),
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: formatTimeValue(ishaHour, ishaMinute),
      },
    ],
  }
}

export async function fetchMonthlyPrayerTimes(year: number, month: number): Promise<DailyPrayers[]> {
  // Always use accurate prayer times from our local data
  const accurateTimes = getAccuratePrayerTimesForMonth(year, month)
  if (accurateTimes.length > 0) {
    console.log(`Using accurate prayer times for ${year}-${month}`)

    // Make sure to handle Jomoa correctly for each day
    const updatedTimes = accurateTimes.map((day) => {
      const dayDate = new Date(day.date)
      if (isFriday(dayDate)) {
        const updatedPrayers = day.prayers.map((prayer) => {
          if (prayer.name === "Dhuhr") {
            return {
              ...prayer,
              name: "Jomoa",
              arabicName: "الجمعة",
              swedishName: "Jomoa",
            }
          }
          return prayer
        })

        return {
          ...day,
          prayers: updatedPrayers,
        }
      }
      return day
    })

    return updatedTimes
  }

  // If no accurate times are available, generate fallback times
  return generateFallbackMonthlyPrayerTimes(year, month)
}

// Generate fallback prayer times for a month when the API fails
function generateFallbackMonthlyPrayerTimes(year: number, month: number): DailyPrayers[] {
  const daysInMonth = new Date(year, month, 0).getDate()
  const result: DailyPrayers[] = []

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day)
    result.push(generateFallbackPrayerTimes(date))
  }

  return result
}

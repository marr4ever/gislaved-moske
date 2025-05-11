export interface PrayerTime {
  name: string
  time: string
  arabicName: string
  swedishName: string
}

export interface DailyPrayers {
  date: string
  weekday: string
  weekdayArabic: string
  hijriDate: string
  prayers: PrayerTime[]
}

export interface MonthlyPrayers {
  month: string
  days: DailyPrayers[]
}

export interface PrayerAPIResponse {
  code: number
  status: string
  data: {
    timings: {
      Fajr: string
      Sunrise: string
      Dhuhr: string
      Asr: string
      Maghrib: string
      Isha: string
      [key: string]: string
    }
    date: {
      readable: string
      timestamp: string
      gregorian: {
        date: string
        format: string
        day: string
        weekday: {
          en: string
        }
        month: {
          number: number
          en: string
        }
        year: string
      }
      hijri: {
        date: string
        format: string
        day: string
        weekday: {
          ar: string
          en: string
        }
        month: {
          number: number
          ar: string
          en: string
        }
        year: string
      }
    }
    meta: {
      latitude: number
      longitude: number
      timezone: string
    }
  }
}

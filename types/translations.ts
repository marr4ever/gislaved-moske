export interface PrayerTranslations {
  swedish: string
  arabic: string
  english: string
}

export interface Translations {
  prayers: {
    [key: string]: PrayerTranslations
  }
  weekDays: {
    [key: string]: {
      swedish: string
      arabic: string
    }
  }
  months: {
    [key: string]: {
      swedish: string
      arabic: string
    }
  }
}

import type { DailyPrayers } from "@/types/prayer"
import { translations } from "@/lib/translations"

// This is where you'll store your accurate prayer times
// The data structure follows the DailyPrayers type
export const accuratePrayerTimes: DailyPrayers[] = [
  // May 2025 - Starting from May 11
  {
    date: "2025-05-11", // Format: YYYY-MM-DD
    weekday: "Söndag",
    weekdayArabic: "الأحد",
    hijriDate: "12 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:14",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:47",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:07",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:24",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:18",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:41",
      },
    ],
  },
  {
    date: "2025-05-12",
    weekday: "Måndag",
    weekdayArabic: "الاثنين",
    hijriDate: "13 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:12",
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
        time: "13:07",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:24",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:20",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:42",
      },
    ],
  },
  {
    date: "2025-05-13",
    weekday: "Tisdag",
    weekdayArabic: "الثلاثاء",
    hijriDate: "14 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:11",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:43",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:07",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:25",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:22",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:43",
      },
    ],
  },
  {
    date: "2025-05-14",
    weekday: "Onsdag",
    weekdayArabic: "الأربعاء",
    hijriDate: "15 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:10",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:41",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:07",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:26",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:24",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:44",
      },
    ],
  },
  {
    date: "2025-05-15",
    weekday: "Torsdag",
    weekdayArabic: "الخميس",
    hijriDate: "16 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:09",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:39",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:07",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:27",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:26",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:46",
      },
    ],
  },
  {
    date: "2025-05-16",
    weekday: "Fredag",
    weekdayArabic: "الجمعة",
    hijriDate: "17 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:08",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:37",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:07",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:28",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:28",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:47",
      },
    ],
  },
  {
    date: "2025-05-17",
    weekday: "Lördag",
    weekdayArabic: "السبت",
    hijriDate: "18 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:07",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:35",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:07",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:28",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:30",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:48",
      },
    ],
  },
  {
    date: "2025-05-18",
    weekday: "Söndag",
    weekdayArabic: "الأحد",
    hijriDate: "19 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:05",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:33",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:07",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:29",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:32",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:49",
      },
    ],
  },
  {
    date: "2025-05-19",
    weekday: "Måndag",
    weekdayArabic: "الاثنين",
    hijriDate: "20 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:04",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:31",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:07",
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
        time: "21:34",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:51",
      },
    ],
  },
  {
    date: "2025-05-20",
    weekday: "Tisdag",
    weekdayArabic: "الثلاثاء",
    hijriDate: "21 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:03",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:29",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:07",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:31",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:36",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:52",
      },
    ],
  },
  {
    date: "2025-05-21",
    weekday: "Onsdag",
    weekdayArabic: "الأربعاء",
    hijriDate: "22 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:02",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:28",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:07",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:31",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:37",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:53",
      },
    ],
  },
  {
    date: "2025-05-22",
    weekday: "Torsdag",
    weekdayArabic: "الخميس",
    hijriDate: "23 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:01",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:26",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:08",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:32",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:39",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:54",
      },
    ],
  },
  {
    date: "2025-05-23",
    weekday: "Fredag",
    weekdayArabic: "الجمعة",
    hijriDate: "24 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:00",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:24",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:08",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:33",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:41",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:56",
      },
    ],
  },
  {
    date: "2025-05-24",
    weekday: "Lördag",
    weekdayArabic: "السبت",
    hijriDate: "25 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "03:00",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:23",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:08",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:34",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:43",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:57",
      },
    ],
  },
  {
    date: "2025-05-25",
    weekday: "Söndag",
    weekdayArabic: "الأحد",
    hijriDate: "26 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "02:59",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:21",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:08",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:34",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:45",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:58",
      },
    ],
  },
  {
    date: "2025-05-26",
    weekday: "Måndag",
    weekdayArabic: "الاثنين",
    hijriDate: "27 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "02:58",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:19",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:08",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:35",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:46",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "22:59",
      },
    ],
  },
  {
    date: "2025-05-27",
    weekday: "Tisdag",
    weekdayArabic: "الثلاثاء",
    hijriDate: "28 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "02:57",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:18",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:08",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:36",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:48",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "23:00",
      },
    ],
  },
  {
    date: "2025-05-28",
    weekday: "Onsdag",
    weekdayArabic: "الأربعاء",
    hijriDate: "29 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "02:56",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:17",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:08",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:36",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:50",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "23:01",
      },
    ],
  },
  {
    date: "2025-05-29",
    weekday: "Torsdag",
    weekdayArabic: "الخميس",
    hijriDate: "30 شوال 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "02:55",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:15",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:08",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:37",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:51",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "23:02",
      },
    ],
  },
  {
    date: "2025-05-30",
    weekday: "Fredag",
    weekdayArabic: "الجمعة",
    hijriDate: "1 ذو القعدة 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "02:55",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:14",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:08",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:38",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:53",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "23:03",
      },
    ],
  },
  {
    date: "2025-05-31",
    weekday: "Lördag",
    weekdayArabic: "السبت",
    hijriDate: "2 ذو القعدة 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "02:54",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:13",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:09",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:38",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:55",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "23:04",
      },
    ],
  },
  // June 2025 - Starting from June 1
  {
    date: "2025-06-01",
    weekday: "Söndag",
    weekdayArabic: "الأحد",
    hijriDate: "3 ذو القعدة 1446",
    prayers: [
      {
        name: "Fajr",
        arabicName: translations.prayers.fajr.arabic,
        swedishName: translations.prayers.fajr.swedish,
        time: "02:53",
      },
      {
        name: "Sunrise",
        arabicName: translations.prayers.sunrise.arabic,
        swedishName: translations.prayers.sunrise.swedish,
        time: "04:12",
      },
      {
        name: "Dhuhr",
        arabicName: translations.prayers.dhuhr.arabic,
        swedishName: translations.prayers.dhuhr.swedish,
        time: "13:09",
      },
      {
        name: "Asr",
        arabicName: translations.prayers.asr.arabic,
        swedishName: translations.prayers.asr.swedish,
        time: "17:39",
      },
      {
        name: "Maghrib",
        arabicName: translations.prayers.maghrib.arabic,
        swedishName: translations.prayers.maghrib.swedish,
        time: "21:56",
      },
      {
        name: "Isha",
        arabicName: translations.prayers.isha.arabic,
        swedishName: translations.prayers.isha.swedish,
        time: "23:05",
      },
    ],
  },
  // Add more June days as needed
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

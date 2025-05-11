import { Header } from "@/components/header"
import { PrayerTimes } from "@/components/prayer-times"
import { MonthlyPrayerTimes } from "@/components/monthly-prayer-times"
import { TVClock } from "@/components/tv-clock"
import { CurrentDayPrayers } from "@/components/current-day-prayers"
import { RotatingBackground } from "@/components/rotating-background"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <RotatingBackground />
      <div className="relative z-10 bg-black/30 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-12">
            <TVClock />
          </div>
          <div className="mb-12">
            <CurrentDayPrayers />
          </div>
          <div className="mb-12">
            <PrayerTimes />
          </div>
          <div>
            <MonthlyPrayerTimes />
          </div>
        </div>
      </div>
      <footer className="bg-blue-600 text-white text-center text-sm py-2">
        <p>ISLAMISKA KULTURFÖRSAMLINGEN I GISLAVED. Besöksadress: Västergatan 15 B 33232 Gislaved</p>
        <p>Swedbank:84178 947377073 – Bankgiro:755-3803 - Swisha:123 196 03 50 Mob:0765905090 / 0729198909</p>
      </footer>
    </main>
  )
}

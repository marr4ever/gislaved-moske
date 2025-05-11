import { Header } from "@/components/header"
import { MonthlyPrayerTimes } from "@/components/monthly-prayer-times"

export default function PrayerTimesPage() {
  return (
    <main>
      <Header />
      <div className="py-8 container mx-auto px-4">
        <MonthlyPrayerTimes />
      </div>
      <footer className="fixed bottom-0 w-full bg-blue-600 text-white text-center text-sm py-2">
        <p>ISLAMISKA KULTURFÖRSAMLINGEN I GISLAVED. Besöksadress: Västergatan 15 B 33232 Gislaved</p>
        <p>Swedbank:84178 947377073 – Bankgiro:755-3803 - Swisha:123 196 03 50 Mob:0765905090 / 0729198909</p>
      </footer>
    </main>
  )
}

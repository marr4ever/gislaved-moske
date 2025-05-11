import { Header } from "@/components/header"
import { TVClock } from "@/components/tv-clock"
import { CurrentDayPrayers } from "@/components/current-day-prayers"
import { RotatingMosqueBackground } from "@/components/rotating-mosque-background"
import { AccurateTimesNotice } from "@/components/accurate-times-notice"

export default function TVPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <RotatingMosqueBackground />
      <div className="relative z-10 bg-black/30 min-h-screen">
        <Header />
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[80vh] gap-12 py-8">
            <TVClock />
            <div className="w-full max-w-7xl">
              <AccurateTimesNotice />
              <CurrentDayPrayers />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

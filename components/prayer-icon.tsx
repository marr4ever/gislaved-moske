import { Sunrise, Sun, Sunset, Moon, Clock, Users } from "lucide-react"

type PrayerIconProps = {
  prayerName: string
  size?: number
  className?: string
}

export function PrayerIcon({ prayerName, size = 24, className = "" }: PrayerIconProps) {
  // Define colors and icons based on prayer name
  switch (prayerName) {
    case "Fajr":
      return (
        <div className={`bg-indigo-500/50 rounded-full p-2 ${className}`}>
          <Sunrise size={size} className="text-white" />
        </div>
      )
    case "Sunrise":
      return (
        <div className={`bg-orange-500/50 rounded-full p-2 ${className}`}>
          <Sun size={size} className="text-white" />
        </div>
      )
    case "Dhuhr":
      return (
        <div className={`bg-yellow-500/50 rounded-full p-2 ${className}`}>
          <Sun size={size} className="text-white" />
        </div>
      )
    case "Jomoa":
      return (
        <div className={`bg-green-500/50 rounded-full p-2 ${className}`}>
          <Users size={size} className="text-white" />
        </div>
      )
    case "Asr":
      return (
        <div className={`bg-amber-500/50 rounded-full p-2 ${className}`}>
          <Clock size={size} className="text-white" />
        </div>
      )
    case "Maghrib":
      return (
        <div className={`bg-red-500/50 rounded-full p-2 ${className}`}>
          <Sunset size={size} className="text-white" />
        </div>
      )
    case "Isha":
      return (
        <div className={`bg-blue-800/50 rounded-full p-2 ${className}`}>
          <Moon size={size} className="text-white" />
        </div>
      )
    default:
      return (
        <div className={`bg-gray-500/50 rounded-full p-2 ${className}`}>
          <Clock size={size} className="text-white" />
        </div>
      )
  }
}

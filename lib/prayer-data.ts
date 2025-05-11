import type { MonthlyPrayers } from '@/types/prayer'

function generatePrayerTimes(startDate: Date, days: number): MonthlyPrayers['days'] {
  const prayerTimes = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    // Adjust prayer times based on the time of year
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const seasonalAdjustment = Math.sin((dayOfYear / 365) * Math.PI) * 60; // -60 to 60 minutes

    prayerTimes.push({
      date: date.toISOString().split('T')[0],
      prayers: [
        { name: "Fajr", time: formatTime(4, 30 + seasonalAdjustment) },
        { name: "Sunrise", time: formatTime(6, 0 + seasonalAdjustment) },
        { name: "Dhuhr", time: formatTime(12, 0) },
        { name: "Asr", time: formatTime(15, 0 - seasonalAdjustment) },
        { name: "Maghrib", time: formatTime(18, 0 - seasonalAdjustment) },
        { name: "Isha", time: formatTime(19, 30 - seasonalAdjustment) }
      ]
    });
  }
  return prayerTimes;
}

function formatTime(hours: number, minutes: number): string {
  const totalMinutes = (hours * 60 + minutes + 1440) % 1440; // Ensure positive value
  const adjustedHours = Math.floor(totalMinutes / 60);
  const adjustedMinutes = Math.floor(totalMinutes % 60);
  return `${adjustedHours.toString().padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`;
}

const startDate = new Date('2025-01-01');
const daysIn2025 = 365;

export const prayerData: MonthlyPrayers = {
  month: "2025",
  days: generatePrayerTimes(startDate, daysIn2025)
}

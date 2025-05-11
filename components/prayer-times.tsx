'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fetchPrayerTimes, fetchMonthlyPrayerTimes } from '@/lib/prayer-api'
import type { PrayerTime, DailyPrayers } from '@/types/prayer'
import { translations } from '@/lib/translations'

function addMinutes(time: string, minutes: number): string {
  const [hours, mins] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, mins + minutes)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

function getSwedishWeekday(date: string): string {
  const weekdays = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
  return weekdays[new Date(date).getDay()];
}

export function PrayerTimes() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentPrayers, setCurrentPrayers] = useState<DailyPrayers | null>(null)
  const [monthlyPrayers, setMonthlyPrayers] = useState<DailyPrayers[]>([])
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null)
  const [timeUntilNext, setTimeUntilNext] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [monthlyError, setMonthlyError] = useState<string | null>(null)
  const [isLoadingMonthly, setIsLoadingMonthly] = useState(true)

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString('sv-SE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }, [])

  const findNextPrayer = useCallback((prayers: PrayerTime[], currentTime: string) => {
    const now = new Date()
    const [hours, minutes] = currentTime.split(':').map(Number)
    now.setHours(hours, minutes + 10)
    const adjustedCurrentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    
    return prayers.find(prayer => prayer.time > adjustedCurrentTime)
  }, [])

  const updatePrayerTimes = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const prayerData = await fetchPrayerTimes(currentDate)
      setCurrentPrayers(prayerData)
      
      const now = new Date()
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      
      const nextPrayerTime = findNextPrayer(prayerData.prayers, currentTime)

      if (nextPrayerTime) {
        setNextPrayer(nextPrayerTime)
        updateTimeUntilNext(nextPrayerTime.time)
      } else {
        setNextPrayer(null)
        setTimeUntilNext('')
      }
    } catch (err) {
      setError('Failed to load prayer times')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [currentDate, findNextPrayer])

  const updateMonthlyPrayerTimes = useCallback(async () => {
    try {
      setIsLoadingMonthly(true)
      setMonthlyError(null)
      const nextMonth = new Date(currentDate)
      nextMonth.setMonth(currentDate.getMonth() + 1)
      const monthlyData = await fetchMonthlyPrayerTimes(
        nextMonth.getFullYear(),
        nextMonth.getMonth() + 1
      )
      setMonthlyPrayers(monthlyData)
    } catch (err) {
      setMonthlyError('Failed to load monthly prayer times')
      console.error(err)
    } finally {
      setIsLoadingMonthly(false)
    }
  }, [currentDate])

  const updateTimeUntilNext = useCallback((prayerTime: string) => {
    const [hours, minutes] = prayerTime.split(':')
    const nextTime = new Date(currentDate)
    nextTime.setHours(parseInt(hours), parseInt(minutes), 0)
    const now = new Date()
    const diff = nextTime.getTime() - now.getTime()
    const hoursUntil = Math.floor(diff / (1000 * 60 * 60))
    const minutesUntil = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    setTimeUntilNext(`${hoursUntil}h ${minutesUntil}m`)
  }, [currentDate])

  useEffect(() => {
    updatePrayerTimes()
    const interval = setInterval(updatePrayerTimes, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [updatePrayerTimes])

  useEffect(() => {
    updateMonthlyPrayerTimes()
  }, [updateMonthlyPrayerTimes])

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + days)
    setCurrentDate(newDate)
  }

  const formatPrayerName = (prayerName: string, date: Date) => {
    if (prayerName === 'Dhuhr' && date.getDay() === 5) { // 5 is Friday
      return {
        swedishName: 'Jomoa',
        arabicName: 'الجمعة'
      }
    }
    return {
      swedishName: prayerName,
      arabicName: translations.prayers[prayerName.toLowerCase()].arabic
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card className="bg-white/95">
        <CardHeader>
          <CardTitle className="text-center text-blue-800">
            Bönetider / أوقات الصلاة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="today" className="w-full">Idag / اليوم</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="space-y-4">
              <div className="text-center py-2">
                {formatDate(currentDate)}
              </div>
              <div className="flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => changeDate(-1)}
                  aria-label="Föregående dag"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h3 className="font-semibold mb-2">Nästa bön om / الصلاة القادمة في</h3>
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" />
                      <p className="text-sm text-gray-600">
                        Laddar... / جار التحميل...
                      </p>
                    </div>
                  ) : error ? (
                    <p className="text-sm text-red-600">{error}</p>
                  ) : nextPrayer ? (
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-700">
                        {nextPrayer.swedishName} / {nextPrayer.arabicName}
                      </p>
                      <p className="text-sm text-gray-600">{timeUntilNext}</p>
                      <p className="text-base mt-1">{nextPrayer.time}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Inga fler böner idag / لا صلوات أخرى اليوم
                    </p>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => changeDate(1)}
                  aria-label="Nästa dag"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              {!isLoading && !error && currentPrayers && (
                <div className="mt-6 space-y-2">
                  {currentPrayers.prayers.map((prayer) => {
                    const { swedishName, arabicName } = formatPrayerName(prayer.name, new Date(currentPrayers.date))
                    return (
                      <div 
                        key={prayer.name}
                        className="flex justify-between items-center px-4 py-2 rounded-lg hover:bg-gray-50"
                      >
                        <span className="font-medium space-x-2 rtl:space-x-reverse">
                          <span>{swedishName}</span>
                          <span className="text-gray-400">/</span>
                          <span className="font-arabic">{arabicName}</span>
                        </span>
                        <span className="text-gray-600">{prayer.time}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

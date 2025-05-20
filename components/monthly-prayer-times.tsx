"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, AlertTriangle } from "lucide-react"
import { fetchMonthlyPrayerTimes } from "@/lib/prayer-api"
import type { DailyPrayers } from "@/types/prayer"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { getDataDateRange } from "@/lib/accurate-prayer-times"

export function MonthlyPrayerTimes() {
  const [yearlyPrayers, setYearlyPrayers] = useState<DailyPrayers[][]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [failedMonths, setFailedMonths] = useState<number[]>([])
  const [usingFallbackData, setUsingFallbackData] = useState<boolean>(false)

  useEffect(() => {
    const fetchYearlyData = async () => {
      try {
        setIsLoading(true)
        const year = 2025
        const monthlyData: DailyPrayers[][] = []
        const failed: number[] = []
        let usedFallback = false

        // Get current month and only fetch from current month to September (month 9)
        const today = new Date()
        const currentMonth = today.getMonth() + 1 // 1-based month

        // Get the date range for which we have accurate data
        const { start, end } = getDataDateRange()
        const startMonth = start.getMonth() + 1 // 1-based month (May)
        const endMonth = end.getMonth() + 1 // 1-based month (September)

        // Fetch months sequentially to avoid overwhelming the API
        for (let i = startMonth - 1; i < endMonth; i++) {
          try {
            console.log(`Fetching data for month ${i + 1}...`)
            const data = await fetchMonthlyPrayerTimes(year, i + 1)

            // Filter out dates before today if this is the current month
            if (i + 1 === currentMonth) {
              const currentDay = today.getDate()
              const filteredData = data.filter((day) => {
                const dayDate = new Date(day.date)
                return dayDate.getDate() >= currentDay
              })
              monthlyData[i] = filteredData
            } else {
              monthlyData[i] = data
            }

            // Check if we got data
            if (monthlyData[i].length === 0) {
              failed.push(i + 1)
              usedFallback = true
            }

            // Add a small delay between requests to avoid rate limiting
            await new Promise((resolve) => setTimeout(resolve, 1000))
          } catch (err) {
            console.error(`Error fetching data for month ${i + 1}:`, err)
            failed.push(i + 1)
            usedFallback = true

            // Use empty array for failed months
            monthlyData[i] = []

            // Add a longer delay after an error
            await new Promise((resolve) => setTimeout(resolve, 2000))
          }
        }

        setYearlyPrayers(monthlyData)
        setFailedMonths(failed)
        setUsingFallbackData(usedFallback)

        if (failed.length > 0) {
          setError(
            `Some months are using estimated prayer times. Please check with your local mosque for accurate times.`,
          )
        }
      } catch (err) {
        setError("Failed to load prayer times")
        console.error("Error fetching yearly data:", err)
        setUsingFallbackData(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchYearlyData()
  }, [])

  const downloadMonthlyPrayerTimes = (monthIndex: number) => {
    const monthlyPrayers = yearlyPrayers[monthIndex]
    if (!monthlyPrayers || monthlyPrayers.length === 0) return

    const monthName = new Date(2025, monthIndex).toLocaleString("sv-SE", { month: "long" })
    const doc = new jsPDF()

    // Add title
    doc.setFontSize(18)
    doc.text(`Bönetider för ${monthName} 2025`, 14, 15)

    // Add disclaimer if using fallback data
    if (failedMonths.includes(monthIndex + 1) || usingFallbackData) {
      doc.setFontSize(10)
      doc.setTextColor(255, 0, 0)
      doc.text(
        "OBS: Dessa tider är uppskattningar. Vänligen kontrollera med din lokala moské för exakta tider.",
        14,
        22,
      )
      doc.setTextColor(0, 0, 0)
    }

    // Prepare data for the table
    const tableData = monthlyPrayers.map((day) => {
      // Check if day is Friday (5) to format Dhuhr as Jomoa
      const dayDate = new Date(day.date)
      const isFriday = dayDate.getDay() === 5 // 5 is Friday in JavaScript

      const prayers = day.prayers.map((prayer, index) => {
        // Index 2 is Dhuhr in the prayer array
        if (index === 2 && isFriday) {
          return `Jomoa ${prayer.time}`
        }
        return prayer.time
      })

      return [day.date, day.weekday, day.hijriDate, ...prayers]
    })

    // Add the table
    autoTable(doc, {
      head: [["Datum", "Veckodag", "Hijri Datum", "Fajr", "Soluppgång", "Dhuhr/Jomoa", "Asr", "Maghrib", "Isha"]],
      body: tableData,
      startY: failedMonths.includes(monthIndex + 1) || usingFallbackData ? 25 : 22,
      didDrawCell: (data) => {
        // Check if this is a Dhuhr cell on a Friday
        if (data.column.index === 5) {
          // 5 is the index of Dhuhr column (0-based)
          const rowIndex = data.row.index
          if (rowIndex >= 0 && rowIndex < monthlyPrayers.length) {
            const dayDate = new Date(monthlyPrayers[rowIndex].date)
            if (dayDate.getDay() === 5) {
              // Friday
              // Highlight Jomoa cell
              doc.setFillColor(230, 247, 255)
              doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F")

              // Reset text color for cell content
              doc.setTextColor(0, 100, 0)
            }
          }
        }
      },
      willDrawCell: (data) => {
        // Reset text color for each cell
        doc.setTextColor(0, 0, 0)
      },
    })

    // Save the PDF
    doc.save(`bonetider_${monthName}_2025.pdf`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" />
      </div>
    )
  }

  // Get the date range for which we have accurate data
  const { start, end } = getDataDateRange()
  const startMonth = start.getMonth() // 0-based month (May - 4)
  const endMonth = end.getMonth() // 0-based month (September - 8)

  // Filter out empty months and only show from start month to end month
  const filteredYearlyPrayers = yearlyPrayers.filter((month, index) => {
    return month && month.length > 0 && index >= startMonth && index <= endMonth
  })

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Card className="bg-white/95">
        <CardHeader>
          <CardTitle className="text-center text-blue-800">Bönetider 2025 / أوقات الصلاة ٢٠٢٥</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                {error}
                {failedMonths.length > 0 && (
                  <p className="text-sm mt-1">
                    Månader med uppskattade tider:{" "}
                    {failedMonths
                      .map((m) => new Date(2025, m - 1).toLocaleString("sv-SE", { month: "long" }))
                      .join(", ")}
                  </p>
                )}
              </div>
            </div>
          )}

          {yearlyPrayers.map((monthlyPrayers, monthIndex) => {
            // Skip months outside our range or empty months
            if (monthIndex < startMonth || monthIndex > endMonth || !monthlyPrayers || monthlyPrayers.length === 0) {
              return null
            }

            return (
              <div key={`month-${monthIndex + 1}`} className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {new Date(2025, monthIndex).toLocaleString("sv-SE", { month: "long" })} 2025
                    {failedMonths.includes(monthIndex + 1) && (
                      <span className="ml-2 text-sm text-yellow-600 font-normal">(Uppskattade tider)</span>
                    )}
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadMonthlyPrayerTimes(monthIndex)}
                    disabled={monthlyPrayers.length === 0}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Ladda ner PDF
                  </Button>
                </div>
                {monthlyPrayers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Dag</TableHead>
                          <TableHead>Datum</TableHead>
                          <TableHead>Fajr</TableHead>
                          <TableHead>Soluppgång</TableHead>
                          <TableHead>Dhuhr/Jomoa</TableHead>
                          <TableHead>Asr</TableHead>
                          <TableHead>Maghrib</TableHead>
                          <TableHead>Isha</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {monthlyPrayers.map((day, dayIndex) => {
                          const dayDate = new Date(day.date)
                          const isFriday = dayDate.getDay() === 5

                          return (
                            <TableRow key={`day-${monthIndex + 1}-${dayIndex + 1}`}>
                              <TableCell className="font-medium">{dayDate.getDate()}</TableCell>
                              <TableCell className="font-medium">
                                <div>{day.weekday}</div>
                                <div className="text-sm text-gray-500 font-arabic">{day.hijriDate}</div>
                              </TableCell>
                              {day.prayers.map((prayer, prayerIndex) => {
                                const isPrayerJomoa = prayer.name === "Dhuhr" && isFriday

                                return (
                                  <TableCell key={`prayer-${monthIndex + 1}-${dayIndex + 1}-${prayerIndex}`}>
                                    {isPrayerJomoa ? (
                                      <span className="font-bold text-green-600">Jomoa {prayer.time}</span>
                                    ) : (
                                      prayer.time
                                    )}
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center text-yellow-600 p-4 bg-yellow-50 rounded-md">
                    Data för denna månad kunde inte laddas. Försök igen senare.
                  </p>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}

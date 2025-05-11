'use client'

import { useState, useEffect, useRef } from 'react'
import { fetchPrayerTimes } from '@/lib/prayer-api'

// Hijri calendar start (1 Muharram 1444)
const HIJRI_EPOCH = new Date(2022, 6, 30).getTime()
const HIJRI_YEAR_LENGTH = 354.367 // Average length of a Hijri year in days

const HIJRI_MONTHS = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
  'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
]

const HADITH = "يَقولُ النَّبيُّ صلَّى اللهُ علَيْه وسلَّم: \"مَن توَضَّأَ فأحسَنَ الوُضوءَ\"، أي: أتَى به على الوجهِ الأكمَلِ والأتمِّ له، وأعطى كلَّ عضوٍ حقَّه مِن الماءِ، \"ثمَّ أتى الجمُعةَ\"، أي: صلاةَ الجمعةِ؛ \"فاستَمَع وأنصَت\"، أي: استَمَع لخُطبَةِ الإمامِ بإنصاتٍ وتعَقُّلٍ، ولم يتَكلَّمْ، وجلَس في مَكانِه ولم يتَحرَّكْ ولم يتَقدَّمِ الصُّفوفَ، أو يتَنقَّلْ مُتخطِّيًا الرِّقابَ، \"غُفِر له ما بينَ الجُمعةِ إلى الجمعةِ، وزِيادةُ ثلاثةِ أيَّامٍ\"، أي: يُكفِّرُ اللهُ عزَّ وجلَّ مِن ذُنوبِه عَشَرةَ أيَّامٍ؛ وذلك بأنَّ اللهَ عزَّ وجلَّ يَقولُ: {مَنْ جَاءَ بِالْحَسَنَةِ فَلَهُ عَشْرُ أَمْثالِهَا} [الأنعام: 160]، والمرادُ غُفرانُ الذُّنوبِ الصَّغائرِ لا الكَبائرِ؛ كما بيَّنَت الرِّواياتُ الأخرى؛ لأنَّ الكبائرَ لا بُدَّ لها مِن التَّوبةِ وعدَمِ العودةِ وغيرِ ذلك مِن الشُّروطِ. \"ومَن مسَّ الحَصى\"، أي: انشَغَل عن الخُطبَةِ أوِ الصَّلاةِ بمسِّ الحَصى أو ما شابهَ \"فقد لَغا\"، أي: تَكلَّمَ بما لا يُشرَعُ له، ويتَحقَّقُ اللَّغوُ بأيِّ شيءٍ مِن الكلامِ، حتَّى وإن قال الرَّجُلُ لأَخيه: أنصِتْ، ومَن لَغا فلا حظَّ له مِن أجرِ الجمعةِ، وإنَّما حظُّه ونَصيبُه مِنها هو كلامُه أو فِعلُه. وفي الحديثِ: بيانُ فضلِ يومِ الجمعةِ. وفيه: الحثُّ على الإنصاتِ وحُسنِ الاستِماعِ يومَ الجمعةِ مع مُراعاةِ الآدابِ، وذلك له أجرٌ عظيمٌ. وفيه: الزَّجرُ عن اللَّغوِ أثناءَ خُطبةِ الجمعةِ؛ لأنَّه مُضيِّعٌ للأجرِ."

export function TVClock() {
  const [time, setTime] = useState(new Date())
  const [hijriDate, setHijriDate] = useState<string>('')
  const [showHadith, setShowHadith] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [prayerTimes, setPrayerTimes] = useState<any>(null)

  const hadithRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setTime(now)
      checkJomoaTime(now)
    }, 1000)

    fetchPrayerTimes(new Date()).then(times => setPrayerTimes(times))

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const calculateHijriDate = (date: Date) => {
      const timeDiff = date.getTime() - HIJRI_EPOCH
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24)
      const yearsFraction = daysDiff / HIJRI_YEAR_LENGTH
      
      const year = Math.floor(yearsFraction) + 1444
      const monthFraction = (yearsFraction % 1) * 12
      const month = Math.floor(monthFraction)
      const day = Math.floor((monthFraction % 1) * 30) + 1

      return {
        day,
        month: HIJRI_MONTHS[month],
        year
      }
    }

    const hijri = calculateHijriDate(time)
    setHijriDate(`${convertToArabicNumerals(hijri.day)} ${hijri.month} ${convertToArabicNumerals(hijri.year)}`)
  }, [time])

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return {
      main: `${hours}:${minutes} `,
      seconds: seconds
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('sv-SE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).toLowerCase()
  }

  const { main: timeMain, seconds } = formatTime(time)

  useEffect(() => {
    if (showHadith) {
      const scrollTimer = setInterval(() => {
        setScrollPosition(prev => {
          if (prev <= -hadithRef.current!.scrollWidth) {
            return 0
          }
          return prev - 1
        })
      }, 50)

      return () => clearInterval(scrollTimer)
    }
  }, [showHadith])

  const checkJomoaTime = (currentTime: Date) => {
    if (currentTime.getDay() === 5 && prayerTimes) { // Friday
      const jomoaTime = prayerTimes.prayers.find((p: any) => p.name === 'Dhuhr').time
      const [hours, minutes] = jomoaTime.split(':').map(Number)
      const jomoaDate = new Date(currentTime)
      jomoaDate.setHours(hours, minutes, 0, 0)

      const timeDiff = (jomoaDate.getTime() - currentTime.getTime()) / (1000 * 60)

      if (timeDiff >= -5 && timeDiff <= 5) {
        setShowHadith(true)
      } else {
        setShowHadith(false)
        setScrollPosition(0)
      }
    } else {
      setShowHadith(false)
      setScrollPosition(0)
    }
  }

  return (
    <div className="text-center text-white">
      <div className="text-[12vw] font-bold leading-none tracking-tight">
        {timeMain}
        <span className="text-yellow-300">{seconds}</span>
      </div>
      {showHadith && (
        <div className="mt-4 overflow-hidden h-8">
          <div 
            ref={hadithRef}
            className="whitespace-nowrap font-arabic text-xl"
            style={{ transform: `translateX(${scrollPosition}px)` }}
          >
            {HADITH}
          </div>
        </div>
      )}
      <div className="text-2xl mt-4 capitalize">
        {formatDate(time)}
      </div>
      <div className="text-xl mt-2 font-arabic text-yellow-100">
        {hijriDate}
      </div>
    </div>
  )
}

function convertToArabicNumerals(num: number | string): string {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  return String(num).split('').map(digit => 
    arabicNumerals[parseInt(digit)] || digit
  ).join('')
}

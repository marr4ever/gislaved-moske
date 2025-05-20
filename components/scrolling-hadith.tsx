"use client"

import { useState, useEffect, useRef } from "react"

// Collection of hadith and Sunnah texts
const HADITH_TEXTS = [
  'قال رسول الله صلى الله عليه وسلم: "إنما الأعمال بالنيات وإنما لكل امرئ ما نوى"',
  'قال رسول الله صلى الله عليه وسلم: "من كان يؤمن بالله واليوم الآخر فليقل خيرا أو ليصمت"',
  'قال رسول الله صلى الله عليه وسلم: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه"',
  'قال رسول الله صلى الله عليه وسلم: "من حسن إسلام المرء تركه ما لا يعنيه"',
  'قال رسول الله صلى الله عليه وسلم: "الطهور شطر الإيمان والحمد لله تملأ الميزان"',
  'قال رسول الله صلى الله عليه وسلم: "من توضأ فأحسن الوضوء ثم أتى الجمعة فاستمع وأنصت غفر له ما بين الجمعة إلى الجمعة وزيادة ثلاثة أيام"',
  'قال رسول الله صلى الله عليه وسلم: "الصلوات الخمس والجمعة إلى الجمعة ورمضان إلى رمضان مكفرات لما بينهن إذا اجتنبت الكبائر"',
  'قال رسول الله صلى الله عليه وسلم: "من صام رمضان إيمانا واحتسابا غفر له ما تقدم من ذنبه"',
  'قال رسول الله صلى الله عليه وسلم: "من قام ليلة القدر إيمانا واحتسابا غفر له ما تقدم من ذنبه"',
  'قال رسول الله صلى الله عليه وسلم: "سبعة يظلهم الله في ظله يوم لا ظل إلا ظله: إمام عادل، وشاب نشأ في عبادة الله، ورجل قلبه معلق بالمساجد، ورجلان تحابا في الله اجتمعا عليه وتفرقا عليه، ورجل دعته امرأة ذات منصب وجمال فقال إني أخاف الله، ورجل تصدق بصدقة فأخفاها حتى لا تعلم شماله ما تنفق يمينه، ورجل ذكر الله خاليا ففاضت عيناه"',
  'قال رسول الله صلى الله عليه وسلم: "من سلك طريقا يلتمس فيه علما سهل الله له به طريقا إلى الجنة"',
  'قال رسول الله صلى الله عليه وسلم: "المسلم من سلم المسلمون من لسانه ويده"',
  'قال رسول الله صلى الله عليه وسلم: "لا تدخلون الجنة حتى تؤمنوا ولا تؤمنوا حتى تحابوا أولا أدلكم على شيء إذا فعلتموه تحاببتم أفشوا السلام بينكم"',
  'قال رسول الله صلى الله عليه وسلم: "من غسل يوم الجمعة واغتسل، ثم بكر وابتكر، ومشى ولم يركب، ودنا من الإمام، واستمع ولم يلغ، كان له بكل خطوة عمل سنة أجر صيامها وقيامها"',
  'قال رسول الله صلى الله عليه وسلم: "إن الله كتب الإحسان على كل شيء فإذا قتلتم فأحسنوا القتلة وإذا ذبحتم فأحسنوا الذبحة وليحد أحدكم شفرته وليرح ذبيحته"',
]

export function ScrollingHadith() {
  const [currentHadithIndex, setCurrentHadithIndex] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const hadithRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Change hadith every 60 seconds
  useEffect(() => {
    const hadithTimer = setInterval(() => {
      setCurrentHadithIndex((prev) => (prev + 1) % HADITH_TEXTS.length)
      // Start from left side (negative value) for right-to-left scrolling
      setScrollPosition(-window.innerWidth)
    }, 60000)

    return () => clearInterval(hadithTimer)
  }, [])

  // Initialize position when component mounts or hadith changes
  useEffect(() => {
    if (containerRef.current) {
      // Start from left side (negative value)
      setScrollPosition(-window.innerWidth)
    }
  }, [currentHadithIndex])

  // Scroll the text from left to right
  useEffect(() => {
    if (!hadithRef.current || !containerRef.current) return

    const scrollTimer = setInterval(() => {
      setScrollPosition((prev) => {
        // If text has scrolled completely to the right
        if (prev >= hadithRef.current!.scrollWidth) {
          return -window.innerWidth // Reset to start from left again
        }
        return prev + 1 // Move 1px to the right
      })
    }, 30) // Adjust speed by changing the interval

    return () => clearInterval(scrollTimer)
  }, [currentHadithIndex])

  return (
    <div ref={containerRef} className="mt-6 bg-blue-900/50 rounded-lg p-4 overflow-hidden">
      <div className="relative h-12 overflow-hidden">
        <div
          ref={hadithRef}
          className="absolute whitespace-nowrap font-arabic text-xl text-white rtl"
          dir="rtl" // Set text direction to right-to-left
          style={{ transform: `translateX(${scrollPosition}px)` }}
        >
          {HADITH_TEXTS[currentHadithIndex]}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"

// Prayer-related verses and hadith in multiple languages
const prayerTexts = [
  {
    arabic: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ",
    swedish: "Bevara noggrant era böner, särskilt den mellersta bönen, och stå upp inför Allah i ödmjuk lydnad.",
    somalian: "Ilaaliya salaadaha, gaar ahaan salaadda dhexe, oo u istaaga Alle adoon ahaan.",
    kosovar: "Ruajini namazet, veçanërisht namazin e mesëm, dhe qëndroni para Allahut me devotshmëri.",
  },
  {
    arabic: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا",
    swedish: "Bönen är föreskriven för de troende vid bestämda tider.",
    somalian: "Salaaddu waa ku waajib mu'miniinta waqtiyo go'an.",
    kosovar: "Namazi është obligim për besimtarët në kohë të caktuara.",
  },
  {
    arabic: "وَأَقِمِ الصَّلَاةَ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ",
    swedish: "Förrätta bönen. Bönen avhåller från skamlösa handlingar och allt som strider mot förnuftet.",
    somalian: "Oog salaadda. Salaaddu waxay ka reebaysaa xumaan iyo waxa la nacay.",
    kosovar: "Fale namazin. Namazi të ndalon nga veprat e turpshme dhe të këqija.",
  },
  {
    arabic: "قال رسول الله ﷺ: مفتاح الجنة الصلاة",
    swedish: "Profeten Muhammed (frid vare med honom) sa: Nyckeln till paradiset är bönen.",
    somalian: "Rasuulka Alle (SCW) wuxuu yiri: Furaha jannada waa salaadda.",
    kosovar: "Profeti Muhamed (paqja qoftë mbi të) ka thënë: Çelësi i xhenetit është namazi.",
  },
  {
    arabic: "قال رسول الله ﷺ: أول ما يحاسب به العبد يوم القيامة الصلاة",
    swedish:
      "Profeten Muhammed (frid vare med honom) sa: Det första som en person kommer att ställas till svars för på Domedagen är bönen.",
    somalian:
      "Rasuulka Alle (SCW) wuxuu yiri: Waxa ugu horreeya ee la xisaabiyo addoonka Maalinta Qiyaame waa salaadda.",
    kosovar:
      "Profeti Muhamed (paqja qoftë mbi të) ka thënë: Gjëja e parë për të cilën njeriu do të merret në llogari në Ditën e Gjykimit është namazi.",
  },
]

export function AccurateTimesNotice() {
  const pathname = usePathname()
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showNotice, setShowNotice] = useState(false)

  // Set whether to show the notice based on the current path
  useEffect(() => {
    setShowNotice(pathname === "/tv")
  }, [pathname])

  // Change text every 30 seconds
  useEffect(() => {
    if (!showNotice) return

    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % prayerTexts.length)
      setScrollPosition(0) // Reset scroll position when text changes
    }, 30000)

    return () => clearInterval(textInterval)
  }, [showNotice])

  // Scroll animation
  useEffect(() => {
    if (!showNotice) return

    const scrollInterval = setInterval(() => {
      if (containerRef.current) {
        const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth

        setScrollPosition((prev) => {
          if (prev <= -maxScroll) {
            return containerRef.current!.clientWidth // Reset to start position
          }
          return prev - 1 // Move 1px to the left
        })
      }
    }, 30)

    return () => clearInterval(scrollInterval)
  }, [currentTextIndex, showNotice])

  // Only render the component on the TV page
  if (!showNotice) {
    return null
  }

  const currentText = prayerTexts[currentTextIndex]

  return (
    <div className="bg-blue-900/70 border border-blue-700 rounded-md p-3 mb-4 text-white text-sm mt-8 overflow-hidden">
      <div ref={containerRef} className="whitespace-nowrap" style={{ transform: `translateX(${scrollPosition}px)` }}>
        <span className="font-arabic text-yellow-300 text-lg mx-2">{currentText.arabic}</span>
        <span className="mx-2">|</span>
        <span className="text-white mx-2">{currentText.swedish}</span>
        <span className="mx-2">|</span>
        <span className="text-green-300 mx-2">{currentText.somalian}</span>
        <span className="mx-2">|</span>
        <span className="text-blue-300 mx-2">{currentText.kosovar}</span>
      </div>
    </div>
  )
}

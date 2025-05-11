import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-500">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="bg-white/95 max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-blue-800">Kontakta Oss</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Besöksadress: Västergatan 15 B  33232 Gislaved</h3>
              <h3 className="font-semibold">Mob:0737719347 // 0765905090</h3>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Bankuppgifter:</h3>
              <h3 className="font-bold text-red-600">Swedbank: 84178 947377073  //  Bankgiro: 755-3803  //  Swish: 123 196 03 50</h3>
              <h3 className="font-semibold">*******Vad är Sadaqa Jariya?****</h3>
              <p>Sadaqa Jariya är en gåva som gynnar utsatta i detta liv men även dig, dina nära och kära i det nästa. Det är ett islamiskt koncept av 
              ständigt och långsiktigt givande. Det fina med denna sadaqa ligger i att belöningen ackumuleras så länge gåvan bidrar till nytta.
              Följden kan bli att donationen lever vidare, även när vi själva inte finns kvar.</p>
              <p className="font-arabic">الصدقة الجارية** هي الصدقة التي يستمر ثوابها حتى عند الموت وهو ما يسعى له الكثير من المسلمين بإقامة
              مشروع صدقة جارية حتى تكون شفيعة له عند الله وتكون في ميزان حسناته ويستمر ثوابها
              حتى بعد الموت. وقد أكد الرسول صلى الله عليه وسلم على فضل الصدقة الجارية في السنة النبوية الشريفة</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-blue-600 text-white text-center text-sm py-2 mt-8">
        <p>ISLAMISKA KULTURFÖRSAMLINGEN I GISLAVED. Besöksadress: Västergatan 15 B 33232  Gislaved</p>
        <p>Swedbank:84178 947377073  – Bankgiro:755-3803 - Swisha:123 196 03 50  Mob:0765905090 / 0729198909</p>
      </footer>
    </div>
  )
}

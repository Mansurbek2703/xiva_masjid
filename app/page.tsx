"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { ColumnData } from "@/lib/database"

export default function HomePage() {
  const [showFullText, setShowFullText] = useState(false)
  const [columns, setColumns] = useState<ColumnData[]>([])
  const [loading, setLoading] = useState(true)

  // Server dan ma'lumotlarni yuklash
  useEffect(() => {
    fetch("/api/columns")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setColumns(data.data)
        }
      })
      .catch((error) => console.error("Ma'lumotlarni yuklashda xato:", error))
      .finally(() => setLoading(false))
  }, [])

  const shortText = `Mamlakatimizni jadal rivojlantirishga qaratilgan "Harakatlar strategiyasida" shaharsozlik va me'morchilikni yanada takomillashtirish, me'moriy yodgorliklarni saqlash va ulardan oqilona foydalanish borasidagi muammolarni hal etish chora-tadbirlari hamda O'zbekiston Respublikasi Prezidentining 2014 yil 21 iyuldagi 200-sonli qarori bilan "Madaniy meros ob'ektlarini muhofaza qilish va ulardan foydalanish sohasini yanada takomillashtirish" bo'yicha qo'shimcha chora-tadbirlar dasturi va shu sohaga tegishli boshqa me'yoriy-huquqiy hujjatlarda belgilangan vazifalarni amalga oshirishda mazkur loyiha muayyan darajada xizmat qiladi.`

  const fullText = `Mamlakatimizni jadal rivojlantirishga qaratilgan "Harakatlar strategiyasida" shaharsozlik va me'morchilikni yanada takomillashtirish, me'moriy yodgorliklarni saqlash va ulardan oqilona foydalanish borasidagi muammolarni hal etish chora-tadbirlari hamda O'zbekiston Respublikasi Prezidentining 2014 yil 21 iyuldagi 200-sonli qarori bilan "Madaniy meros ob'ektlarini muhofaza qilish va ulardan foydalanish sohasini yanada takomillashtirish" bo'yicha qo'shimcha chora-tadbirlar dasturi va shu sohaga tegishli boshqa me'yoriy-huquqiy hujjatlarda belgilangan vazifalarni amalga oshirishda mazkur loyiha muayyan darajada xizmat qiladi.

Muhtaram Yurtboshimizning "Murojaatnomasi"da (yanvar 2021y) mamlakatimizdagi barcha - "me'moriy obidalarni to'liq ro'yxatini tuzib chiqish" vazifasini va uni bajarishni mutasaddilar oldiga ko'ndalang masala sifatida qo'ygan edi. Chunki, shu davrgacha O'zbekistonning ko'p sonli me'moriy yodgorliklarining xususiyatlari zamonaviy ilm-fan nuqtai nazaridan kompleks tarzda yetarlicha o'rganilmagan, ularni individual ravishda monitoring qilish va turli xil salbiy ta'sirlardan himoya qilish metodologiyasi ishlab chiqilmagan.

Tarixiy me'moriy yodgorliklarni saqlash, muhofaza qilish, ta'mirlash va foydalanish samaradorligini oshirish maqsadida har bir tarixiy yodgorlik uchun "Ma'lumotlar bazasi" shakllantirilmagan, hamda me'morchilik talablari darajasida har bir obida uchun individual bo'lgan "pasportlari" ishlab chiqilmagan. Mamlakatimizdagi mavjud me'moriy yodgorliklarning bugungi kundagi holatini bayon etuvchi, aynan ta'mirlashga doir klassifikatsiyasi ishlab chiqilmaganligi sababli YuNESKO tasarrufidagi bir qator me'moriy yodgorliklarni saqlash, ta'mirlash va ulardan foydalanish amaliyotida bir qator muammolarga duch kelinmoqda.

O'zbekiston me'moriy yodgorliklarini saqlash va to'g'ri ta'mirlashdagi eng samarador uslub, bu: - obidalarning bugungi kundagi holatlarini monitoring qilish bo'yicha instrumental va natura holida innovatsion yondoshuv asosida kompleks tadqiqotlar olib borish, ularning bugungi kundagi holati bo'yicha klassifikatsiyasini tuzish hamda obidalar bo'yicha elektron ma'lumotlar bazasini yaratishdir.

Shu xususda, yuqoridagi kamchiliklarni imkon darajasida o'rganish va oldini olish maqsadida O'zbekiston-Germaniya qo'shma loyihasi doirasida Xorazm Ma'mun akademiyasining yosh tadqiqotchilari ishtirokida Germaniyadagi "Heritage City in Quedlinburg" ta'mirlash markazi bilan hamkorlikda bir qator amaliy ishlar bajarilmoqda.

Ushbu grant loyihasida Xiva shahridagi Juma Masjidning deformatsiyalangan, shikastlangan qadimiy yog'och ustunlari, eshiklari, qosh-xarilari germaniyalik mutaxassislar va Ma'mun akademiyasi ilmiy xodimlari hamda Urganch Davlat universiteti talabalari bilan hamkorlikda ta'mirlanmoqda. Albatta ushbu amaliy ishlarni bajarishda obidaning qurilmalarining badiiyligini yo'qotmaslikka harakat qilindi.Kelgusida O'rta Osiyoda betakror deb hisoblangan Juma Masjidi me'moriy obidasi o'zining mustahkamligini saqlaydi hamda qadimiy shaharga kelayotgan sayyohlarni asrlar davomida o'ziga jalb qiladi.

Qo'shma loyiha doirasida O'zbekiston va Germaniya olimlari orasida seminarlar va hamkorlikda nufuzli jurnallarda maqolalar nashr etildi. Loyihada belgilab olingan maqsad va vazifalar to'liq bajarilmoqda, amaliyotga joriy etish ishlari davom etmoqda. Xulosa qilib shuni aytish joizki, olingan natijalar yodgorliklarning umrboqiyligini ta'minlashga va ma'naviy boyligimizni kelgusi avlodga dastlabki holida yetkazishga imkon beradi.`

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800">Ma'lumotlar yuklanmoqda...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            O'ZBEKISTON RESPUBLIKASI FANLAR AKADEMIYASI – XORAZM MA'MUN AKADEMIYASI
          </h1>
          <p className="text-lg md:text-xl">G.S. Durdiyeva A.K.Zargarov B.Xudayberganov N.Zargarova</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Title and Image */}
        <section className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            XIVA SHAHRIDAGI JUMA MASJIDNING YOG'OCH USTUNLARI BO'YICHA MA'LUMOTLAR BAZASI
          </h2>

          <div className="relative w-full max-w-4xl mx-auto mb-8">
            <Image
              src="/images/mosque-interior.jpg"
              alt="Juma masjidi ichki ko'rinishi"
              width={1200}
              height={600}
              className="rounded-lg shadow-lg w-full h-auto"
              priority
            />
          </div>
        </section>

        {/* Admin Panel Link */}
        <div className="text-center mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Ma'lumotlar kiritish paneli
          </Link>
        </div>

        {/* Columns Grid */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Ustunlar ro'yxati ({columns.length})
          </h3>
          {columns.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {columns.map((column) => (
                <Link
                  key={column.id}
                  href={`/ustun/${column.id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-3 border border-blue-100 hover:border-blue-200 text-center"
                >
                  <div className="font-semibold text-gray-800 text-sm">{column.title}</div>
                  <div className="text-xs text-blue-600 mt-2">Ko'rish →</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-blue-100">
              <p className="text-gray-600 mb-4">Ma'lumotlar yuklanmoqda...</p>
              <Link
                href="/admin"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Admin panelga o'tish
              </Link>
            </div>
          )}
        </section>

        {/* Project Description */}
        <section className="bg-white rounded-lg shadow-sm p-6 border border-blue-100">
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-justify">{showFullText ? fullText : shortText}</p>

            <button
              onClick={() => setShowFullText(!showFullText)}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              {showFullText ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Qisqartirish
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Batafsil
                </>
              )}
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2024 Xorazm Ma'mun akademiyasi. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  )
}

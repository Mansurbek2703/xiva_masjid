"use client"

import Link from "next/link"
import Image from "next/image"
import { Home } from "lucide-react"
import { useState, useEffect, use } from "react"
import type { ColumnData } from "@/lib/database"
import AnimatedPatterns from "@/components/animated-patterns"
import ThemeToggle from "@/components/theme-toggle"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ColumnPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const [column, setColumn] = useState<ColumnData | null>(null)
  const [allColumns, setAllColumns] = useState<ColumnData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Bitta ustunni yuklash
        const columnResponse = await fetch(`/api/columns/${resolvedParams.id}`)
        const columnData = await columnResponse.json()

        if (columnData.success) {
          setColumn(columnData.data)
        }

        // Barcha ustunlarni yuklash (navigatsiya uchun)
        const allResponse = await fetch("/api/columns")
        const allData = await allResponse.json()

        if (allData.success) {
          setAllColumns(allData.data)
        }
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xato:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [resolvedParams.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-enhanced relative overflow-hidden">
        <AnimatedPatterns />
        <ThemeToggle />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center glass-morphism rounded-2xl p-8 shadow-enhanced">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-emerald-400 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Yuklanmoqda...</h1>
          </div>
        </div>
      </div>
    )
  }

  if (!column) {
    return (
      <div className="min-h-screen bg-gradient-enhanced relative overflow-hidden">
        <AnimatedPatterns />
        <ThemeToggle />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center glass-morphism rounded-2xl p-8 shadow-enhanced">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Ustun topilmadi</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">ID: {resolvedParams.id} bo'lgan ustun mavjud emas.</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 text-white rounded-xl hover:from-blue-700 hover:to-emerald-700 dark:hover:from-blue-600 dark:hover:to-emerald-600 transition-all duration-300 shadow-enhanced transform hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              Bosh sahifa
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-enhanced relative overflow-hidden">
      <AnimatedPatterns />
      <ThemeToggle />

      <div className="relative z-10">
        {/* Header */}
        <header className="glass-morphism border-b border-blue-200/50 dark:border-emerald-400/30 shadow-enhanced">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 dark:text-emerald-400 hover:text-blue-800 dark:hover:text-emerald-300 transition-colors mb-4 font-semibold text-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Bosh sahifa
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center">
              {column.title}
            </h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="glass-morphism rounded-2xl shadow-enhanced overflow-hidden">
            {/* Flex container - bir xil balandlikda */}
            <div className="flex flex-col lg:flex-row min-h-[800px]">
              {/* Ma'lumotlar jadvali */}
              <div className="flex-1 p-6 flex flex-col">
                <h2 className="text-xl font-bold text-center mb-6 bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/60 dark:to-emerald-900/60 py-3 rounded-xl text-gray-800 dark:text-gray-100">
                  USTUN HAQIDA MA'LUMOT:
                </h2>

                <div className="flex-1 flex flex-col">
                  <div className="space-y-0 border table-border flex-1 rounded-xl overflow-hidden">
                    {/* 1. Ustunning darxt navi */}
                    <div className="grid grid-cols-12 border-b table-border">
                      <div className="col-span-1 table-cell-gray p-3 border-r table-border text-center font-bold text-lg">
                        1
                      </div>
                      <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                        Ustunning daraxt navi
                      </div>
                      <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                        {column.ustunningDarxtNavi || "-"}
                      </div>
                    </div>

                    {/* 2. Ustunning o'lchamlari */}
                    <div className="border-b table-border">
                      <div className="grid grid-cols-12">
                        <div className="col-span-1 table-cell-gray p-3 border-r table-border text-center font-bold text-lg">
                          2
                        </div>
                        <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                          Ustunning o'lchamlari
                        </div>
                        <div className="col-span-4 table-cell-light p-3"></div>
                      </div>
                      <div className="grid grid-cols-12 border-t table-border">
                        <div className="col-span-1 table-cell-gray p-3 border-r table-border"></div>
                        <div className="col-span-7 table-cell-light p-3 border-r table-border pl-6 font-medium text-gray-800 dark:text-gray-200">
                          Qoshidan po'lgacha
                        </div>
                        <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                          {column.qoshidanPolgacha || "-"}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 border-t table-border">
                        <div className="col-span-1 table-cell-gray p-3 border-r table-border"></div>
                        <div className="col-span-7 table-cell-light p-3 border-r table-border pl-6 font-medium text-gray-800 dark:text-gray-200">
                          Ustunning balandligi
                        </div>
                        <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                          {column.ustunningBalandligi || "-"}
                        </div>
                      </div>
                    </div>

                    {/* 3. Ustunning ulanganlik holati */}
                    <div className="grid grid-cols-12 border-b table-border">
                      <div className="col-span-1 table-cell-gray p-3 border-r table-border text-center font-bold text-lg">
                        3
                      </div>
                      <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                        Ustunning ulanganlik holati
                      </div>
                      <div className="col-span-4 table-cell-light p-3"></div>
                    </div>

                    {/* Balandlik - alohida qator */}
                    <div className="grid grid-cols-12 border-b table-border">
                      <div className="col-span-1 table-cell-gray p-3 border-r table-border"></div>
                      <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                        Balandlik
                      </div>
                      <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                        {column.balandlik || "-"}
                      </div>
                    </div>

                    {/* Ustki diametr */}
                    <div className="grid grid-cols-12 border-b table-border">
                      <div className="col-span-1 table-cell-gray p-3 border-r table-border"></div>
                      <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                        Ustki diametr
                      </div>
                      <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                        {column.ustkiDiametr || "-"}
                      </div>
                    </div>

                    {/* Ulangan diametr */}
                    <div className="grid grid-cols-12 border-b table-border">
                      <div className="col-span-1 table-cell-gray p-3 border-r table-border"></div>
                      <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                        Ulangan diametr
                      </div>
                      <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                        {column.ulanganDiametr || "-"}
                      </div>
                    </div>

                    {/* 4. Ustun taglik o'lchamlari */}
                    <div className="border-b table-border">
                      <div className="grid grid-cols-12">
                        <div className="col-span-1 table-cell-gray p-3 border-r table-border text-center font-bold text-lg">
                          4
                        </div>
                        <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                          Ustun taglik o'lchamlari
                        </div>
                        <div className="col-span-4 table-cell-light p-3"></div>
                      </div>
                      <div className="grid grid-cols-12 border-t table-border">
                        <div className="col-span-1 table-cell-gray p-3 border-r table-border"></div>
                        <div className="col-span-7 table-cell-light p-3 border-r table-border pl-6 font-medium text-gray-800 dark:text-gray-200">
                          Taglik balandligi
                        </div>
                        <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                          {column.taglikBalandligi || "-"}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 border-t table-border">
                        <div className="col-span-1 table-cell-gray p-3 border-r table-border"></div>
                        <div className="col-span-7 table-cell-light p-3 border-r table-border pl-6 font-medium text-gray-800 dark:text-gray-200">
                          Taglik eni
                        </div>
                        <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                          {column.taglikEni || "-"}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 border-t table-border">
                        <div className="col-span-1 table-cell-gray p-3 border-r table-border"></div>
                        <div className="col-span-7 table-cell-light p-3 border-r table-border pl-6 font-medium text-gray-800 dark:text-gray-200">
                          Taglik bo'yi
                        </div>
                        <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                          {column.taglikBoyi || "-"}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 border-t table-border">
                        <div className="col-span-1 table-cell-gray p-3 border-r table-border"></div>
                        <div className="col-span-7 table-cell-light p-3 border-r table-border pl-6 font-medium text-gray-800 dark:text-gray-200">
                          Taglik materiali
                        </div>
                        <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                          {column.taglikMateriali || "-"}
                        </div>
                      </div>
                    </div>

                    {/* 5. Ustun diametri */}
                    <div className="border-b table-border">
                      <div className="grid grid-cols-12">
                        <div className="col-span-1 table-cell-gray p-3 border-r table-border text-center font-bold text-lg">
                          5
                        </div>
                        <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                          Ustun diametri
                        </div>
                        <div className="col-span-4 table-cell-light p-3"></div>
                      </div>
                      <div className="grid grid-cols-12 border-t table-border">
                        <div className="col-span-1 table-cell-gray p-3 border-r table-border"></div>
                        <div className="col-span-7 table-cell-light p-3 border-r table-border pl-6 font-medium text-gray-800 dark:text-gray-200">
                          Osti
                        </div>
                        <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                          {column.diametrOsti || "-"}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 border-t table-border">
                        <div className="col-span-1 table-cell-gray p-3 border-r table-border"></div>
                        <div className="col-span-7 table-cell-light p-3 border-r table-border pl-6 font-medium text-gray-800 dark:text-gray-200">
                          O'rta
                        </div>
                        <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                          {column.diametrOrta || "-"}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 border-t table-border">
                        <div className="col-span-1 table-cell-gray p-3 border-r table-border"></div>
                        <div className="col-span-7 table-cell-light p-3 border-r table-border pl-6 font-medium text-gray-800 dark:text-gray-200">
                          Usti
                        </div>
                        <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                          {column.diametrUsti || "-"}
                        </div>
                      </div>
                    </div>

                    {/* 6. Qosh o'lchamlari */}
                    <div className="grid grid-cols-12 border-b table-border">
                      <div className="col-span-1 table-cell-gray p-3 border-r table-border text-center font-bold text-lg">
                        6
                      </div>
                      <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                        Qosh o'lchamlari
                      </div>
                      <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                        {column.qoshOlchamlari || "-"}
                      </div>
                    </div>

                    {/* 7. Termitlarni ustunda mavjudligi */}
                    <div className="grid grid-cols-12 border-b table-border">
                      <div className="col-span-1 table-cell-gray p-3 border-r table-border text-center font-bold text-lg">
                        7
                      </div>
                      <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                        Termitlarni ustunda mavjudligi
                      </div>
                      <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                        {column.termitlarniUstundaMavjudligi || "-"}
                      </div>
                    </div>

                    {/* 8. Ishlatilgan naqsh turi */}
                    <div className="grid grid-cols-12 border-b table-border">
                      <div className="col-span-1 table-cell-gray p-3 border-r table-border text-center font-bold text-lg">
                        8
                      </div>
                      <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                        Ishlatilgan naqsh turi
                      </div>
                      <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                        {column.ishlatilganNaqshTuri || "-"}
                      </div>
                    </div>

                    {/* 9. Xattotlik yozuvi mavjudligi */}
                    <div className="grid grid-cols-12 border-b table-border">
                      <div className="col-span-1 table-cell-gray p-3 border-r table-border text-center font-bold text-lg">
                        9
                      </div>
                      <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                        Xattotlik yozuvi mavjudligi
                      </div>
                      <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                        {column.xattotlikYozuviMavjudligi || "-"}
                      </div>
                    </div>

                    {/* 10. Texnik holati */}
                    <div className="grid grid-cols-12 flex-1 items-start">
                      <div className="col-span-1 table-cell-gray p-3 border-r table-border text-center font-bold text-lg">
                        10
                      </div>
                      <div className="col-span-7 table-cell-light p-3 border-r table-border font-semibold text-gray-900 dark:text-gray-100">
                        Texnik holati
                      </div>
                      <div className="col-span-4 table-cell-light p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                        {column.texnikHolati || "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ustun rasmi */}
              <div className="w-full lg:w-80 bg-gradient-to-b from-gray-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 flex flex-col min-h-[800px]">
                <div className="p-4 border-b table-border">
                  <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-100">
                    Ustunning ko'rinishi
                  </h3>
                </div>
                <div className="flex-1 p-4 flex items-center justify-center">
                  <div className="relative w-full max-w-xs h-full flex items-center justify-center">
                    <Image
                      src={column.image || "/placeholder.svg?height=1200&width=200"}
                      alt={`${column.title} rasmi`}
                      width={200}
                      height={1200}
                      className="max-w-full max-h-full object-contain rounded-lg border table-border bg-white dark:bg-gray-100 shadow-enhanced"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          {allColumns.length > 0 && (
  <div className="mt-8 glass-morphism rounded-2xl p-6 shadow-enhanced">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
      Boshqa ustunlar
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {allColumns.slice(0, 213).map((col) => (
        <Link
          key={col.id}
          href={`/ustun/${col.id}`}
          className={`block text-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-md ${
            col.id === column.id
              ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg scale-[1.02]"
              : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-emerald-200 hover:to-blue-200 dark:hover:from-gray-700 dark:hover:to-gray-600"
          }`}
        >
          {col.title}
        </Link>
      ))}
      <Link
        href="/"
        className="block text-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-100 to-emerald-200 dark:from-emerald-800 dark:to-emerald-700 text-emerald-800 dark:text-emerald-200 hover:from-emerald-200 hover:to-emerald-300 dark:hover:from-emerald-700 dark:hover:to-emerald-600 transition-all duration-300 shadow-md"
      >
        Bosh sahifa →
      </Link>
    </div>
  </div>
)}

        </main>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect, use } from "react"
import type { ColumnData } from "@/lib/database"

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800">Yuklanmoqda...</h1>
        </div>
      </div>
    )
  }

  if (!column) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-sm p-8 border border-blue-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ustun topilmadi</h1>
          <p className="text-gray-600 mb-6">ID: {resolvedParams.id} bo'lgan ustun mavjud emas.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Asosiy sahifaga qaytish
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Asosiy sahifaga qaytish
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 text-center">{column.title}</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
          {/* Flex container - bir xil balandlikda */}
          <div className="flex flex-col lg:flex-row min-h-[800px]">
            {/* Ma'lumotlar jadvali */}
            <div className="flex-1 p-6 flex flex-col">
              <h2 className="text-xl font-bold text-center mb-6 bg-gray-100 py-2">USTUN HAQIDA MA'LUMOT:</h2>

              <div className="flex-1 flex flex-col">
                <div className="space-y-0 border border-gray-300 flex-1">
                  {/* 1. Ustunning darxt navi */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300 text-center font-semibold">
                      1
                    </div>
                    <div className="col-span-7 p-2 border-r border-gray-300 font-medium">Ustunning daraxt navi</div>
                    <div className="col-span-4 p-2 text-center">{column.ustunningDarxtNavi || "-"}</div>
                  </div>

                  {/* 2. Ustunning o'lchamlari */}
                  <div className="border-b border-gray-300">
                    <div className="grid grid-cols-12">
                      <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300 text-center font-semibold">
                        2
                      </div>
                      <div className="col-span-7 p-2 border-r border-gray-300 font-medium">Ustunning o'lchamlari</div>
                      <div className="col-span-4 p-2"></div>
                    </div>
                    <div className="grid grid-cols-12 border-t border-gray-300">
                      <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300"></div>
                      <div className="col-span-7 p-2 border-r border-gray-300 pl-4">Qoshidan po'lgacha</div>
                      <div className="col-span-4 p-2 text-center">{column.qoshidanPolgacha || "-"}</div>
                    </div>
                    <div className="grid grid-cols-12 border-t border-gray-300">
                      <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300"></div>
                      <div className="col-span-7 p-2 border-r border-gray-300 pl-4">Ustunning balandligi</div>
                      <div className="col-span-4 p-2 text-center">{column.ustunningBalandligi || "-"}</div>
                    </div>
                  </div>

                  {/* 3. Ustunning ulanganlik holati */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300 text-center font-semibold">
                      3
                    </div>
                    <div className="col-span-7 p-2 border-r border-gray-300 font-medium">
                      Ustunning ulanganlik holati
                    </div>
                    <div className="col-span-4 p-2 text-center">{column.ustunningUlanganlikHolati || ""}</div>
                  </div>

                  {/* Balandlik - alohida qator */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300"></div>
                    <div className="col-span-7 p-2 border-r border-gray-300 font-medium">Balandlik</div>
                    <div className="col-span-4 p-2 text-center">{column.balandlik || "-"}</div>
                  </div>

                  {/* Ustki diametr */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300"></div>
                    <div className="col-span-7 p-2 border-r border-gray-300 font-medium">Ustki diametr</div>
                    <div className="col-span-4 p-2 text-center">{column.ustkiDiametr || "-"}</div>
                  </div>

                  {/* Ulangan diametr */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300"></div>
                    <div className="col-span-7 p-2 border-r border-gray-300 font-medium">Ulangan diametr</div>
                    <div className="col-span-4 p-2 text-center">{column.ulanganDiametr || "-"}</div>
                  </div>

                  {/* 4. Ustun taglik o'lchamlari */}
                  <div className="border-b border-gray-300">
                    <div className="grid grid-cols-12">
                      <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300 text-center font-semibold">
                        4
                      </div>
                      <div className="col-span-7 p-2 border-r border-gray-300 font-medium">
                        Ustun taglik o'lchamlari
                      </div>
                      <div className="col-span-4 p-2"></div>
                    </div>
                    <div className="grid grid-cols-12 border-t border-gray-300">
                      <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300"></div>
                      <div className="col-span-7 p-2 border-r border-gray-300 pl-4">Taglik balandligi</div>
                      <div className="col-span-4 p-2 text-center">{column.taglikBalandligi || "-"}</div>
                    </div>
                    <div className="grid grid-cols-12 border-t border-gray-300">
                      <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300"></div>
                      <div className="col-span-7 p-2 border-r border-gray-300 pl-4">Taglik eni</div>
                      <div className="col-span-4 p-2 text-center">{column.taglikEni || "-"}</div>
                    </div>
                    <div className="grid grid-cols-12 border-t border-gray-300">
                      <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300"></div>
                      <div className="col-span-7 p-2 border-r border-gray-300 pl-4">Taglik bo'yi</div>
                      <div className="col-span-4 p-2 text-center">{column.taglikBoyi || "-"}</div>
                    </div>
                    <div className="grid grid-cols-12 border-t border-gray-300">
                      <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300"></div>
                      <div className="col-span-7 p-2 border-r border-gray-300 pl-4">Taglik materiali</div>
                      <div className="col-span-4 p-2 text-center">{column.taglikMateriali || "-"}</div>
                    </div>
                  </div>

                  {/* 5. Ustun diametri */}
                  <div className="border-b border-gray-300">
                    <div className="grid grid-cols-12">
                      <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300 text-center font-semibold">
                        5
                      </div>
                      <div className="col-span-7 p-2 border-r border-gray-300 font-medium">Ustun diametri</div>
                      <div className="col-span-4 p-2"></div>
                    </div>
                    <div className="grid grid-cols-12 border-t border-gray-300">
                      <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300"></div>
                      <div className="col-span-7 p-2 border-r border-gray-300 pl-4">Osti</div>
                      <div className="col-span-4 p-2 text-center">{column.diametrOsti || "-"}</div>
                    </div>
                    <div className="grid grid-cols-12 border-t border-gray-300">
                      <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300"></div>
                      <div className="col-span-7 p-2 border-r border-gray-300 pl-4">O'rta</div>
                      <div className="col-span-4 p-2 text-center">{column.diametrOrta || "-"}</div>
                    </div>
                    <div className="grid grid-cols-12 border-t border-gray-300">
                      <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300"></div>
                      <div className="col-span-7 p-2 border-r border-gray-300 pl-4">Usti</div>
                      <div className="col-span-4 p-2 text-center">{column.diametrUsti || "-"}</div>
                    </div>
                  </div>

                  {/* 6. Qosh o'lchamlari */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300 text-center font-semibold">
                      6
                    </div>
                    <div className="col-span-7 p-2 border-r border-gray-300 font-medium">Qosh o'lchamlari</div>
                    <div className="col-span-4 p-2 text-center">{column.qoshOlchamlari || "-"}</div>
                  </div>

                  {/* 7. Termitlarni ustunda mavjudligi */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300 text-center font-semibold">
                      7
                    </div>
                    <div className="col-span-7 p-2 border-r border-gray-300 font-medium">
                      Termitlarni ustunda mavjudligi
                    </div>
                    <div className="col-span-4 p-2 text-center">{column.termitlarniUstundaMavjudligi || "-"}</div>
                  </div>

                  {/* 8. Ishlatilgan naqsh turi */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300 text-center font-semibold">
                      8
                    </div>
                    <div className="col-span-7 p-2 border-r border-gray-300 font-medium">Ishlatilgan naqsh turi</div>
                    <div className="col-span-4 p-2 text-center">{column.ishlatilganNaqshTuri || "-"}</div>
                  </div>

                  {/* 9. Xattotlik yozuvi mavjudligi */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300 text-center font-semibold">
                      9
                    </div>
                    <div className="col-span-7 p-2 border-r border-gray-300 font-medium">
                      Xattotlik yozuvi mavjudligi
                    </div>
                    <div className="col-span-4 p-2 text-center">{column.xattotlikYozuviMavjudligi || "-"}</div>
                  </div>

                  {/* 10. Texnik holati */}
                  <div className="grid grid-cols-12 flex-1 items-start">
                    <div className="col-span-1 bg-gray-50 p-2 border-r border-gray-300 text-center font-semibold">
                      10
                    </div>
                    <div className="col-span-7 p-2 border-r border-gray-300 font-medium">Texnik holati</div>
                    <div className="col-span-4 p-2 text-center">{column.texnikHolati || "-"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ustun rasmi */}
            <div className="w-full lg:w-80 bg-gray-50 flex flex-col min-h-[800px]">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-center">Ustunning ko'rinishi</h3>
              </div>
              <div className="flex-1 p-4 flex items-center justify-center">
                <div className="relative w-full max-w-xs h-full flex items-center justify-center">
                  <Image
                    src={column.image || "/placeholder.svg?height=1200&width=200"}
                    alt={`${column.title} rasmi`}
                    width={200}
                    height={1200}
                    className="max-w-full max-h-full object-contain rounded-lg border border-gray-300 bg-white"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {allColumns.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Boshqa ustunlar</h3>
            <div className="flex flex-wrap gap-2">
              {allColumns.slice(0, 15).map((col) => (
                <Link
                  key={col.id}
                  href={`/ustun/${col.id}`}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    col.id === column.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {col.title}
                </Link>
              ))}
              <Link
                href="/"
                className="px-3 py-2 rounded-lg text-sm bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
              >
                Barcha ustunlar →
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

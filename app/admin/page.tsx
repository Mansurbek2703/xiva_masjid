"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { ColumnData } from "@/lib/database"
import { Save, Edit, ArrowLeft, Plus, Upload, Trash2, Database, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminPage() {
  const [columns, setColumns] = useState<ColumnData[]>([])
  const [selectedColumn, setSelectedColumn] = useState<ColumnData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<ColumnData>>({})
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Server dan ma'lumotlarni yuklash
  const loadColumns = async () => {
    try {
      const response = await fetch("/api/columns")
      const data = await response.json()
      if (data.success) {
        setColumns(data.data)
      }
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xato:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadColumns()
  }, [])

  // Database ni initialize qilish
  const initializeDatabase = async () => {
    if (confirm("Sizning aniq ID'laringiz bilan barcha ustunlarni yaratishni xohlaysizmi?")) {
      setSaving(true)
      try {
        const response = await fetch("/api/columns", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "initialize" }),
        })

        const data = await response.json()
        if (data.success) {
          alert(`✅ ${data.count} ta ustun yaratildi!`)
          await loadColumns()
        } else {
          alert("❌ Xato yuz berdi!")
        }
      } catch (error) {
        alert("❌ Server xatosi!")
      } finally {
        setSaving(false)
      }
    }
  }

  // Yangi ustun yaratish
  const handleCreateNew = () => {
    setIsCreating(true)
    setIsEditing(false)
    setSelectedColumn(null)
    setFormData({
      id: "",
      title: "",
      ustunningDarxtNavi: "",
      qoshidanPolgacha: "",
      ustunningBalandligi: "",
      ustunningUlanganlikHolati: "",
      balandlik: "",
      ustkiDiametr: "",
      ulanganDiametr: "",
      taglikBalandligi: "",
      taglikEni: "",
      taglikBoyi: "",
      taglikMateriali: "",
      diametrOsti: "",
      diametrOrta: "",
      diametrUsti: "",
      qoshOlchamlari: "",
      termitlarniUstundaMavjudligi: "",
      ishlatilganNaqshTuri: "",
      xattotlikYozuviMavjudligi: "",
      texnikHolati: "",
      image: "",
    })
    setImageFile(null)
    setImagePreview("")
  }

  // Mavjud ustunni tahrirlash
  const handleEdit = (column: ColumnData) => {
    setSelectedColumn(column)
    setFormData(column)
    setIsEditing(true)
    setIsCreating(false)
    setImagePreview(column.image)
  }

  // Rasm yuklash
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Rasm hajmi 5MB dan kichik bo'lishi kerak!")
        return
      }

      if (!file.type.startsWith("image/")) {
        alert("Faqat rasm fayllari yuklanadi!")
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Ma'lumotlarni saqlash
  const handleSave = async () => {
    if (!formData.title || !formData.id) {
      alert("Ustun nomi va ID ni kiriting!")
      return
    }

    setSaving(true)

    const columnData: ColumnData = {
      id: formData.id,
      title: formData.title,
      ustunningDarxtNavi: formData.ustunningDarxtNavi || "",
      qoshidanPolgacha: formData.qoshidanPolgacha || "",
      ustunningBalandligi: formData.ustunningBalandligi || "",
      ustunningUlanganlikHolati: formData.ustunningUlanganlikHolati || "",
      balandlik: formData.balandlik || "",
      ustkiDiametr: formData.ustkiDiametr || "",
      ulanganDiametr: formData.ulanganDiametr || "",
      taglikBalandligi: formData.taglikBalandligi || "",
      taglikEni: formData.taglikEni || "",
      taglikBoyi: formData.taglikBoyi || "",
      taglikMateriali: formData.taglikMateriali || "",
      diametrOsti: formData.diametrOsti || "",
      diametrOrta: formData.diametrOrta || "",
      diametrUsti: formData.diametrUsti || "",
      qoshOlchamlari: formData.qoshOlchamlari || "",
      termitlarniUstundaMavjudligi: formData.termitlarniUstundaMavjudligi || "",
      ishlatilganNaqshTuri: formData.ishlatilganNaqshTuri || "",
      xattotlikYozuviMavjudligi: formData.xattotlikYozuviMavjudligi || "",
      texnikHolati: formData.texnikHolati || "",
      image: `/images/columns/${formData.id.toLowerCase()}.png`,
    }

    try {
      let response
      if (isCreating) {
        response = await fetch("/api/columns", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(columnData),
        })
      } else {
        response = await fetch(`/api/columns/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(columnData),
        })
      }

      const data = await response.json()
      if (data.success) {
        alert("✅ Ma'lumotlar DOIMIY saqlandi!")
        await loadColumns()
        setIsEditing(false)
        setIsCreating(false)
        setSelectedColumn(null)
        setImageFile(null)
        setImagePreview("")
      } else {
        alert("❌ Saqlashda xato!")
      }
    } catch (error) {
      alert("❌ Server xatosi!")
    } finally {
      setSaving(false)
    }
  }

  // Ustunni o'chirish
  const handleDelete = async (id: string) => {
    if (confirm("Ushbu ustunni o'chirishni xohlaysizmi?")) {
      try {
        const response = await fetch(`/api/columns/${id}`, {
          method: "DELETE",
        })

        const data = await response.json()
        if (data.success) {
          alert("✅ Ustun o'chirildi!")
          await loadColumns()
          if (selectedColumn?.id === id) {
            setSelectedColumn(null)
            setIsEditing(false)
            setIsCreating(false)
          }
        } else {
          alert("❌ O'chirishda xato!")
        }
      } catch (error) {
        alert("❌ Server xatosi!")
      }
    }
  }

  const handleInputChange = (field: keyof ColumnData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800">Ma'lumotlar yuklanmoqda...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Asosiy sahifaga qaytish
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Ma'lumotlar kiritish paneli</h1>
            <div className="flex gap-2">

              <button
                onClick={handleCreateNew}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Yangi ustun yaratish
              </button>
            </div>
          </div>
        </div>

        {/* DOIMIY SAQLASH MA'LUMOTI */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800">Jami ustunlar</h3>
            <p className="text-2xl font-bold text-blue-600">{columns.length}</p>
            <p className="text-xs text-blue-500">SQLite database da</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Saqlash holati
            </h3>
            <p className="text-sm text-green-600">✅ DOIMIY saqlash</p>
            <p className="text-xs text-green-500">Server database</p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-purple-800">Sizning ID'laringiz</h3>
            <p className="text-xs text-purple-600">B2-B17, D2-D17, E2-E17</p>
            <p className="text-xs text-purple-600">F2-F17, G2-G17, H2-H18</p>
            <p className="text-xs text-purple-600">I2-I18, J2-J18, K2-K18</p>
            <p className="text-xs text-purple-600">L2-L18, M2-M18, N2-N18, O2-O18</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Ustunlar ro'yxati */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Ustunlar ro'yxati ({columns.length})</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {columns.map((column) => (
                <div
                  key={column.id}
                  className={`p-3 rounded-lg border transition-colors ${
                    selectedColumn?.id === column.id ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <button onClick={() => handleEdit(column)} className="text-left flex-1">
                      <div className="font-medium">{column.title}</div>
                      <div className="text-sm text-gray-600">
                        {column.ustunningDarxtNavi || "Ma'lumot kiritilmagan"}
                      </div>
                      <div className="text-xs text-blue-600">🖼️ {column.id.toLowerCase()}.png</div>
                    </button>
                    <button onClick={() => handleDelete(column.id)} className="text-red-500 hover:text-red-700 ml-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {columns.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>Hali ustunlar yaratilmagan</p>
                  <button
                    onClick={initializeDatabase}
                    disabled={saving}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? "Yaratilmoqda..." : "Database yaratish"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Ma'lumot kiritish formasi */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            {isEditing || isCreating ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {isCreating ? "Yangi ustun yaratish" : `Ma'lumot tahrirlash: ${formData.title}`}
                  </h2>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saqlanmoqda..." : "DOIMIY saqlash"}
                  </button>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                  {/* Rasm yuklash */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ustun rasmi</label>
                    <div className="space-y-4">
                      <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                        {imagePreview ? (
                          <Image
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            width={200}
                            height={1200}
                            className="w-full h-auto object-contain"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Rasm yuklang</p>
                              <p className="text-xs text-gray-400 mt-1">JPG, PNG, max 5MB</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        <strong>Rasm yo'li:</strong>
                        <br />
                        /images/columns/{formData.id?.toLowerCase() || "id"}.png
                      </div>
                    </div>
                  </div>

                  {/* Ma'lumotlar */}
                  <div className="md:col-span-3 grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ustun ID *</label>
                      <input
                        type="text"
                        value={formData.id || ""}
                        onChange={(e) => handleInputChange("id", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: B2, D3, E5"
                        disabled={isEditing}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ustun nomi *</label>
                      <input
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: B qator №-2 B2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ustunning darxt navi</label>
                      <input
                        type="text"
                        value={formData.ustunningDarxtNavi || ""}
                        onChange={(e) => handleInputChange("ustunningDarxtNavi", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: terak, yilda"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Qoshidan po'lgacha</label>
                      <input
                        type="text"
                        value={formData.qoshidanPolgacha || ""}
                        onChange={(e) => handleInputChange("qoshidanPolgacha", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: 3760 mm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ustunning balandligi</label>
                      <input
                        type="text"
                        value={formData.ustunningBalandligi || ""}
                        onChange={(e) => handleInputChange("ustunningBalandligi", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: 3220 mm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ustunning ulanganlik holati
                      </label>
                      <select
                        value={formData.ustunningUlanganlikHolati || ""}
                        onChange={(e) => handleInputChange("ustunningUlanganlikHolati", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Bo'sh qoldirish</option>
                        <option value="-">-</option>
                        <option value="Ulangan">Ulangan</option>
                        <option value="Ulanmagan">Ulanmagan</option>
                        <option value="Qisman ulangan">Qisman ulangan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Balandlik</label>
                      <input
                        type="text"
                        value={formData.balandlik || ""}
                        onChange={(e) => handleInputChange("balandlik", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: 900 mm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ustki diametr</label>
                      <input
                        type="text"
                        value={formData.ustkiDiametr || ""}
                        onChange={(e) => handleInputChange("ustkiDiametr", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: 440 mm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ulangan diametr</label>
                      <input
                        type="text"
                        value={formData.ulanganDiametr || ""}
                        onChange={(e) => handleInputChange("ulanganDiametr", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: 287 mm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Taglik balandligi</label>
                      <input
                        type="text"
                        value={formData.taglikBalandligi || ""}
                        onChange={(e) => handleInputChange("taglikBalandligi", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: 730 mm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Taglik eni</label>
                      <input
                        type="text"
                        value={formData.taglikEni || ""}
                        onChange={(e) => handleInputChange("taglikEni", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: 41 mm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Taglik bo'yi</label>
                      <input
                        type="text"
                        value={formData.taglikBoyi || ""}
                        onChange={(e) => handleInputChange("taglikBoyi", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: 60 mm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Taglik materiali</label>
                      <input
                        type="text"
                        value={formData.taglikMateriali || ""}
                        onChange={(e) => handleInputChange("taglikMateriali", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: tosh"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Diametr (Osti)</label>
                      <input
                        type="text"
                        value={formData.diametrOsti || ""}
                        onChange={(e) => handleInputChange("diametrOsti", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: 440 mm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Diametr (O'rta)</label>
                      <input
                        type="text"
                        value={formData.diametrOrta || ""}
                        onChange={(e) => handleInputChange("diametrOrta", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: 287 mm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Diametr (Usti)</label>
                      <input
                        type="text"
                        value={formData.diametrUsti || ""}
                        onChange={(e) => handleInputChange("diametrUsti", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: 440 mm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Qosh o'lchamlari</label>
                      <input
                        type="text"
                        value={formData.qoshOlchamlari || ""}
                        onChange={(e) => handleInputChange("qoshOlchamlari", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: 485x145x130 mm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Termitlarni ustunda mavjudligi
                      </label>
                      <select
                        value={formData.termitlarniUstundaMavjudligi || ""}
                        onChange={(e) => handleInputChange("termitlarniUstundaMavjudligi", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Tanlang</option>
                        <option value="Yo'q">Yo'q</option>
                        <option value="Bor">Bor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Xattotlik yozuvi mavjudligi
                      </label>
                      <select
                        value={formData.xattotlikYozuviMavjudligi || ""}
                        onChange={(e) => handleInputChange("xattotlikYozuviMavjudligi", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Tanlang</option>
                        <option value="yo'q">yo'q</option>
                        <option value="Ustunda yozuv bor">Ustunda yozuv bor</option>
                        <option value="Yozuv ustun tanasiga o’yib yozilgan">Yozuv ustun tanasiga o’yib yozilgan</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ishlatilgan naqsh turi</label>
                      <textarea
                        value={formData.ishlatilganNaqshTuri || ""}
                        onChange={(e) => handleInputChange("ishlatilganNaqshTuri", e.target.value)}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: Naqshsiz, shakilli"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Texnik holati</label>
                      <textarea
                        value={formData.texnikHolati || ""}
                        onChange={(e) => handleInputChange("texnikHolati", e.target.value)}
                        rows={2}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masalan: Ta'mirtalab, qoniqarli toifaga kiradi"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Edit className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ustun tanlang yoki yangi yarating</h3>
                <p className="text-gray-600 mb-4">
                  Tahrirlash uchun chap tomondagi ro'yxatdan ustun tanlang yoki yangi ustun yarating
                </p>
                <div className="space-y-2">
                  <button
                    onClick={handleCreateNew}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Yangi ustun yaratish
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

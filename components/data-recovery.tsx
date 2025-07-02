"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, XCircle, RefreshCw } from "lucide-react"

export default function DataRecoveryInfo() {
  const [storageStatus, setStorageStatus] = useState<{
    main: boolean
    backup1: boolean
    backup2: boolean
    session: boolean
  }>({
    main: false,
    backup1: false,
    backup2: false,
    session: false,
  })

  const checkStorageStatus = () => {
    setStorageStatus({
      main: !!localStorage.getItem("xiva-columns-main"),
      backup1: !!localStorage.getItem("xiva-columns-backup1"),
      backup2: !!localStorage.getItem("xiva-columns-backup2"),
      session: !!sessionStorage.getItem("xiva-columns-main"),
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6 mb-6">
      <div className="flex items-center mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
        <h2 className="text-xl font-semibold text-red-800">Kechagi ma'lumotlar nima uchun yo'qolgan?</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">❌ Eski tizimning muammolari:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Faqat bir joyda saqlash (localStorage)</li>
            <li>• Brauzer cache tozalanganda yo'qoladi</li>
            <li>• Private mode da saqlanmaydi</li>
            <li>• Brauzer crash bo'lganda yo'qoladi</li>
            <li>• Boshqa kompyuterda ko'rinmaydi</li>
            <li>• Avtomatik backup yo'q</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-green-800 mb-3">✅ Yangi tizimning afzalliklari:</h3>
          <ul className="space-y-2 text-sm text-green-600">
            <li>• 4 ta joyda saqlash (main + 3 backup)</li>
            <li>• Avtomatik backup har 30 soniyada</li>
            <li>• Har o'zgarishda avtomatik saqlash</li>
            <li>• JSON export/import imkoniyati</li>
            <li>• Recovery tizimi</li>
            <li>• Real-time saqlash holati</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-800">Hozirgi saqlash holati:</h4>
          <button
            onClick={checkStorageStatus}
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Tekshirish
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center">
            {storageStatus.main ? (
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600 mr-2" />
            )}
            <span className="text-sm">Main Storage</span>
          </div>
          <div className="flex items-center">
            {storageStatus.backup1 ? (
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600 mr-2" />
            )}
            <span className="text-sm">Backup 1</span>
          </div>
          <div className="flex items-center">
            {storageStatus.backup2 ? (
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600 mr-2" />
            )}
            <span className="text-sm">Backup 2</span>
          </div>
          <div className="flex items-center">
            {storageStatus.session ? (
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600 mr-2" />
            )}
            <span className="text-sm">Session</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Tavsiya:</strong> Har kuni ishni tugatgandan so'ng "Export" tugmasini bosib JSON backup oling. Bu eng
          xavfsiz usul!
        </p>
      </div>
    </div>
  )
}

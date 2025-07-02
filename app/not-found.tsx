import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-sm p-8 border border-blue-100">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sahifa topilmadi</h2>
          <p className="text-gray-600 mb-6">Siz qidirayotgan ustun ma'lumotlari mavjud emas.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Asosiy sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  )
}

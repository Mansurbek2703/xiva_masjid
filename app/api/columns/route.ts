import { type NextRequest, NextResponse } from "next/server"
import { getAllColumns, createColumn } from "@/lib/database"

// GET - Barcha ustunlarni olish
export async function GET() {
  try {
    const columns = getAllColumns()
    return NextResponse.json({ success: true, data: columns, count: columns.length })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ma'lumotlarni olishda xato" }, { status: 500 })
  }
}

// POST - Yangi ustun yaratish
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Yangi ustun yaratish
    const success = createColumn(body)
    if (success) {
      return NextResponse.json({ success: true, message: "Ustun yaratildi" })
    } else {
      return NextResponse.json({ success: false, error: "Ustun yaratishda xato" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server xatosi" }, { status: 500 })
  }
}

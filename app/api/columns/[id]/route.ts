import { type NextRequest, NextResponse } from "next/server"
import { getColumnById, updateColumn, deleteColumn } from "@/lib/database"

// GET - Bitta ustunni olish
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const column = getColumnById(params.id)
    if (column) {
      return NextResponse.json({ success: true, data: column })
    } else {
      return NextResponse.json({ success: false, error: "Ustun topilmadi" }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server xatosi" }, { status: 500 })
  }
}

// PUT - Ustunni yangilash
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const success = updateColumn(params.id, body)

    if (success) {
      return NextResponse.json({ success: true, message: "Ustun yangilandi" })
    } else {
      return NextResponse.json({ success: false, error: "Ustunni yangilashda xato" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server xatosi" }, { status: 500 })
  }
}

// DELETE - Ustunni o'chirish
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = deleteColumn(params.id)

    if (success) {
      return NextResponse.json({ success: true, message: "Ustun o'chirildi" })
    } else {
      return NextResponse.json({ success: false, error: "Ustunni o'chirishda xato" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server xatosi" }, { status: 500 })
  }
}

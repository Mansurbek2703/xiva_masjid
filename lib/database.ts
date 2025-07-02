import Database from "better-sqlite3"
import path from "path"

export interface ColumnData {
  id: string
  title: string
  ustunningDarxtNavi: string
  qoshidanPolgacha: string
  ustunningBalandligi: string
  ustunningUlanganlikHolati: string
  balandlik: string
  ustkiDiametr: string
  ulanganDiametr: string
  taglikBalandligi: string
  taglikEni: string
  taglikBoyi: string
  taglikMateriali: string
  diametrOsti: string
  diametrOrta: string
  diametrUsti: string
  qoshOlchamlari: string
  termitlarniUstundaMavjudligi: string
  ishlatilganNaqshTuri: string
  xattotlikYozuviMavjudligi: string
  texnikHolati: string
  image: string
}

// Database yo'li
const dbPath = path.join(process.cwd(), "data", "xiva-columns.db")

// Database yaratish va ulanish
let db: Database.Database

try {
  // data papkasini yaratish
  const fs = require("fs")
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  db = new Database(dbPath)

  // Jadval yaratish (faqat struktura)
  db.exec(`
    CREATE TABLE IF NOT EXISTS columns (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      ustunningDarxtNavi TEXT,
      qoshidanPolgacha TEXT,
      ustunningBalandligi TEXT,
      ustunningUlanganlikHolati TEXT,
      balandlik TEXT,
      ustkiDiametr TEXT,
      ulanganDiametr TEXT,
      taglikBalandligi TEXT,
      taglikEni TEXT,
      taglikBoyi TEXT,
      taglikMateriali TEXT,
      diametrOsti TEXT,
      diametrOrta TEXT,
      diametrUsti TEXT,
      qoshOlchamlari TEXT,
      termitlarniUstundaMavjudligi TEXT,
      ishlatilganNaqshTuri TEXT,
      xattotlikYozuviMavjudligi TEXT,
      texnikHolati TEXT,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  console.log("✅ SQLite database yaratildi:", dbPath)
} catch (error) {
  console.error("❌ Database xatosi:", error)
}

// TO'G'RI TARTIB UCHUN SORTING FUNKSIYASI
function sortColumnsCorrectly(columns: ColumnData[]): ColumnData[] {
  return columns.sort((a, b) => {
    // ID dan harf va raqamni ajratish
    const aMatch = a.id.match(/([A-Z])(\d+)/)
    const bMatch = b.id.match(/([A-Z])(\d+)/)

    if (!aMatch || !bMatch) return a.id.localeCompare(b.id)

    const [, aLetter, aNumber] = aMatch
    const [, bLetter, bNumber] = bMatch

    // Avval harfni solishtirish (A, B, C, D...)
    if (aLetter !== bLetter) {
      return aLetter.localeCompare(bLetter)
    }

    // Keyin raqamni solishtirish (2, 3, 4, 5... 10, 11, 12...)
    return Number.parseInt(aNumber) - Number.parseInt(bNumber)
  })
}

// Barcha ustunlarni olish - TO'G'RI TARTIBDA
export function getAllColumns(): ColumnData[] {
  try {
    const stmt = db.prepare("SELECT * FROM columns")
    const columns = stmt.all() as ColumnData[]

    // TO'G'RI TARTIBDA QAYTARISH
    return sortColumnsCorrectly(columns)
  } catch (error) {
    console.error("❌ Ustunlarni olishda xato:", error)
    return []
  }
}

// Bitta ustunni olish
export function getColumnById(id: string): ColumnData | null {
  try {
    const stmt = db.prepare("SELECT * FROM columns WHERE id = ?")
    return (stmt.get(id) as ColumnData) || null
  } catch (error) {
    console.error("❌ Ustunni olishda xato:", error)
    return null
  }
}

// Ustun yangilash
export function updateColumn(id: string, data: Partial<ColumnData>): boolean {
  try {
    const fields = Object.keys(data).filter((key) => key !== "id")
    const setClause = fields.map((field) => `${field} = ?`).join(", ")
    const values = fields.map((field) => (data as any)[field])

    const stmt = db.prepare(`UPDATE columns SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
    const result = stmt.run(...values, id)

    return result.changes > 0
  } catch (error) {
    console.error("❌ Ustunni yangilashda xato:", error)
    return false
  }
}

// Yangi ustun qo'shish
export function createColumn(data: ColumnData): boolean {
  try {
    const stmt = db.prepare(`
      INSERT INTO columns (
        id, title, ustunningDarxtNavi, qoshidanPolgacha, ustunningBalandligi,
        ustunningUlanganlikHolati, balandlik, ustkiDiametr, ulanganDiametr,
        taglikBalandligi, taglikEni, taglikBoyi, taglikMateriali,
        diametrOsti, diametrOrta, diametrUsti, qoshOlchamlari,
        termitlarniUstundaMavjudligi, ishlatilganNaqshTuri,
        xattotlikYozuviMavjudligi, texnikHolati, image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      data.id,
      data.title,
      data.ustunningDarxtNavi,
      data.qoshidanPolgacha,
      data.ustunningBalandligi,
      data.ustunningUlanganlikHolati,
      data.balandlik,
      data.ustkiDiametr,
      data.ulanganDiametr,
      data.taglikBalandligi,
      data.taglikEni,
      data.taglikBoyi,
      data.taglikMateriali,
      data.diametrOsti,
      data.diametrOrta,
      data.diametrUsti,
      data.qoshOlchamlari,
      data.termitlarniUstundaMavjudligi,
      data.ishlatilganNaqshTuri,
      data.xattotlikYozuviMavjudligi,
      data.texnikHolati,
      data.image,
    )

    return result.changes > 0
  } catch (error) {
    console.error("❌ Ustun yaratishda xato:", error)
    return false
  }
}

// Ustunni o'chirish
export function deleteColumn(id: string): boolean {
  try {
    const stmt = db.prepare("DELETE FROM columns WHERE id = ?")
    const result = stmt.run(id)
    return result.changes > 0
  } catch (error) {
    console.error("❌ Ustunni o'chirishda xato:", error)
    return false
  }
}

export { db }

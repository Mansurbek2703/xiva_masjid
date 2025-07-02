# Xiva Juma Masjidi Yog'och Ustunlari Ma'lumotlar Bazasi

Bu loyiha Xiva shahridagi Juma masjidining 238 ta yog'och ustunlari bo'yicha ilmiy, texnik va tarixiy ma'lumotlarni onlayn tarzda ko'rish va o'rganish uchun yaratilgan veb-sayt.

## Loyiha haqida

- **Buyurtmachi**: O'zbekiston Respublikasi Fanlar akademiyasi – Xorazm Ma'mun akademiyasi
- **Maqsad**: Tarixiy yodgorlik ustunlarining ilmiy tadqiqoti va saqlanishi
- **Ustunlar soni**: 238 ta
- **Texnologiya**: Next.js, TypeScript, Tailwind CSS

## Xususiyatlar

- ✅ 238 ta ustun uchun individual sahifalar
- ✅ Responsive dizayn (mobil va desktop)
- ✅ Tez yuklanish (Static Site Generation)
- ✅ SEO optimizatsiyasi
- ✅ Minimalist va professional dizayn
- ✅ Oson navigatsiya

## O'rnatish va ishga tushirish

### 1. Loyihani yuklab olish
\`\`\`bash
git clone [repository-url]
cd xiva-juma-masjid-columns
\`\`\`

### 2. Bog'liqliklarni o'rnatish
\`\`\`bash
npm install
\`\`\`

### 3. Development rejimida ishga tushirish
\`\`\`bash
npm run dev
\`\`\`

Sayt http://localhost:3000 da ochiladi.

### 4. Production uchun build qilish
\`\`\`bash
npm run build
\`\`\`

### 5. Static export (Netlify/Vercel uchun)
\`\`\`bash
npm run export
\`\`\`

## Ma'lumotlarni qo'shish

### 1. Ustun ma'lumotlarini qo'shish

`lib/data.ts` faylida `columnsData` massiviga yangi ustun ma'lumotlarini qo'shing:

\`\`\`typescript
{
  id: 'B3', // Ustun identifikatori
  title: 'B qator №-2 B3', // Ustun nomi
  treeType: 'Chinor', // Daraxt turi
  dimensions: '4.2m × 0.35m', // O'lchamlari
  baseDimensions: '0.45m × 0.45m', // Taglik o'lchamlari
  diameter: '0.35m', // Diametri
  doubleDimensions: '0.70m', // Qo'sh o'lchamlari
  termiteCondition: 'Yaxshi holat', // Termit holati
  patternTypes: 'Geometrik naqshlar', // Naqsh turlari
  hasCalligraphy: true, // Xattotlik mavjudligi
  technicalCondition: 'Yaxshi', // Texnik holat
  image: '/images/columns/B3.jpg' // Rasm yo'li
}
\`\`\`

### 2. Rasmlarni qo'shish

Ustun rasmlarini `public/images/columns/` papkasiga joylashtiring.

Rasm nomlari ustun ID bilan mos kelishi kerak:
- `B3.jpg` → `id: 'B3'`
- `B4.jpg` → `id: 'B4'`

### 3. Doc fayldan ma'lumot olish

103MB doc fayldan ma'lumotlarni olish uchun:

1. Doc faylni Word yoki LibreOffice da oching
2. Ma'lumotlarni jadval formatida export qiling (CSV yoki Excel)
3. `scripts/convert-data.js` faylini yarating va ma'lumotlarni JSON formatiga o'tkazing
4. Rasmlarni alohida papkaga ajratib oling

## Deploy qilish

### Vercel (Tavsiya etiladi)

1. GitHub repository yarating va kodni yuklang
2. [Vercel](https://vercel.com) da account oching
3. "New Project" tugmasini bosing
4. GitHub repository ni tanlang
5. Deploy tugmasini bosing

### Netlify

1. Loyihani build qiling: `npm run build`
2. `out` papkasini [Netlify](https://netlify.com) ga drag & drop qiling

### GitHub Pages

1. `next.config.js` da `assetPrefix` ni repository nomiga o'zgartiring
2. GitHub Actions orqali deploy qiling

## Fayl strukturasi

\`\`\`
├── app/
│   ├── page.tsx              # Asosiy sahifa
│   ├── ustun/[id]/page.tsx   # Ustun sahifalari
│   ├── layout.tsx            # Layout
│   ├── globals.css           # Global CSS
│   └── not-found.tsx         # 404 sahifa
├── lib/
│   └── data.ts               # Ma'lumotlar bazasi
├── public/
│   └── images/
│       └── columns/          # Ustun rasmlari
├── README.md
├── package.json
└── next.config.js
\`\`\`

## Texnik talablar

- Node.js 18+
- NPM yoki Yarn
- Modern brauzer (Chrome, Firefox, Safari, Edge)

## Yordam va qo'llab-quvvatlash

Savollar yoki muammolar uchun:
- Email: [akademiya@email.com]
- Telefon: [telefon raqami]

## Litsenziya

© 2024 Xorazm Ma'mun akademiyasi. Barcha huquqlar himoyalangan.

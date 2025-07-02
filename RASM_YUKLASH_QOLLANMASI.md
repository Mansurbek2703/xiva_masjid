# Rasm yuklash va saqlash qo'llanmasi

## Loyiha strukturasi

\`\`\`
xiva-juma-masjid/
├── public/
│   └── images/
│       └── columns/          # Ustun rasmlari bu yerda saqlanadi
│           ├── B2.jpg        # Ustun ID nomi bilan
│           ├── B3.png        # Turli formatlar qo'llab-quvvatlanadi
│           ├── A1.jpg
│           └── ...
├── app/
│   ├── admin/
│   │   └── page.tsx         # Admin panel
│   └── ustun/[id]/
│       └── page.tsx         # Ustun sahifasi
└── ...
\`\`\`

## Rasm yuklash jarayoni

### 1. Admin panelda rasm yuklash
- Rasm tanlang (JPG, PNG, max 5MB)
- Ustun ID kiriting (masalan: B2)
- Saqlash tugmasini bosing
- Rasm avtomatik `/images/columns/B2.jpg` yo'liga saqlanadi

### 2. Rasm yo'llari
- **Loyiha ichida**: `/images/columns/[ID].jpg`
- **Fayl tizimida**: `public/images/columns/[ID].jpg`

### 3. Rasm ko'rsatish
- Ustun sahifasida avtomatik ko'rsatiladi
- Agar rasm yo'q bo'lsa, placeholder ko'rsatiladi

## Hozirgi holat

✅ **Mavjud ma'lumotlar saqlanadi** - 10 ta ustun o'chib ketmaydi
✅ **Yangi rasmlar** loyiha strukturasiga saqlanadi  
✅ **Export/Import** JSON orqali backup
✅ **Rasm formatlar** JPG, PNG qo'llab-quvvatlanadi
✅ **Hajm cheklovi** 5MB gacha

## Keyingi qadamlar

1. **Rasmlarni qo'lda joylashtirish**:
   - `public/images/columns/` papkasini yarating
   - Rasmlarni to'g'ri nom bilan joylashtiring (B2.jpg, A1.png, ...)

2. **Server-side upload** (ixtiyoriy):
   - API route yaratish: `/api/upload-image`
   - Multer yoki boshqa upload library ishlatish
   - Fayl validatsiya va xavfsizlik

3. **Rasm optimizatsiya**:
   - Next.js Image optimization
   - WebP formatga o'tkazish
   - Lazy loading

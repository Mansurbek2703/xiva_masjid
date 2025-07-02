// Ustun ma'lumotlari uchun aniq struktura
export interface ColumnData {
  id: string
  title: string
  // Rasmdagi aniq maydonlar - to'g'ri ketma-ketlik bilan
  ustunningDarxtNavi: string
  qoshidanPolgacha: string
  ustunningBalandligi: string
  ustunningUlanganlikHolati: string
  balandlik: string // Bu qator qo'shildi - "Balandlik"
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

// 238 ta ustun uchun namuna ma'lumotlar yaratish
export const generateAllColumns = (): ColumnData[] => {
  const columns: ColumnData[] = []

  // A qator (1-30)
  for (let i = 1; i <= 30; i++) {
    columns.push({
      id: `A${i}`,
      title: `A qator №-${i} A${i}`,
      ustunningDarxtNavi: "terak, yilda",
      qoshidanPolgacha: "3760 mm",
      ustunningBalandligi: "3220 mm",
      ustunningUlanganlikHolati: "-",
      balandlik: "900 mm",
      ustkiDiametr: "440 mm",
      ulanganDiametr: "287 mm",
      taglikBalandligi: "730 mm",
      taglikEni: "41 mm",
      taglikBoyi: "60 mm",
      taglikMateriali: "tosh",
      diametrOsti: "440 mm",
      diametrOrta: "287 mm",
      diametrUsti: "440 mm",
      qoshOlchamlari: "485x145x130 mm",
      termitlarniUstundaMavjudligi: "Yo'q",
      ishlatilganNaqshTuri: "Naqshsiz, shakilli",
      xattotlikYozuviMavjudligi: "yo'q",
      texnikHolati: "Ta'mirtalab, qoniqarli toifaga kiradi",
      image: `/images/columns/a${i}.png`,
    })
  }

  // B qator (1-30)
  for (let i = 1; i <= 30; i++) {
    columns.push({
      id: `B${i}`,
      title: `B qator №-${i} B${i}`,
      ustunningDarxtNavi: "Gujum",
      qoshidanPolgacha: "3800 mm",
      ustunningBalandligi: "3380 mm",
      ustunningUlanganlikHolati: "-",
      balandlik: "420 mm",
      ustkiDiametr: "500 mm",
      ulanganDiametr: "400 mm",
      taglikBalandligi: "-",
      taglikEni: "-",
      taglikBoyi: "-",
      taglikMateriali: "tosh",
      diametrOsti: "341 mm",
      diametrOrta: "277 mm",
      diametrUsti: "223 mm",
      qoshOlchamlari: "600x175x190 mm",
      termitlarniUstundaMavjudligi: "Yo'q",
      ishlatilganNaqshTuri: "Taxya, marpesh, xoshya",
      xattotlikYozuviMavjudligi: "Ustunda yozuv bor",
      texnikHolati: "qoniqarli toifaga kiradi",
      image: `/images/columns/b${i}.png`,
    })
  }

  // C qator (1-30)
  for (let i = 1; i <= 30; i++) {
    columns.push({
      id: `C${i}`,
      title: `C qator №-${i} C${i}`,
      ustunningDarxtNavi: "chinor",
      qoshidanPolgacha: "3650 mm",
      ustunningBalandligi: "3100 mm",
      ustunningUlanganlikHolati: "Ulangan",
      balandlik: "550 mm",
      ustkiDiametr: "380 mm",
      ulanganDiametr: "320 mm",
      taglikBalandligi: "680 mm",
      taglikEni: "45 mm",
      taglikBoyi: "65 mm",
      taglikMateriali: "tosh",
      diametrOsti: "380 mm",
      diametrOrta: "320 mm",
      diametrUsti: "380 mm",
      qoshOlchamlari: "420x160x140 mm",
      termitlarniUstundaMavjudligi: "Bor",
      ishlatilganNaqshTuri: "Geometrik naqshlar",
      xattotlikYozuviMavjudligi: "yo'q",
      texnikHolati: "Yaxshi holat",
      image: `/images/columns/c${i}.png`,
    })
  }

  // D qator (1-30)
  for (let i = 1; i <= 30; i++) {
    columns.push({
      id: `D${i}`,
      title: `D qator №-${i} D${i}`,
      ustunningDarxtNavi: "archa",
      qoshidanPolgacha: "3900 mm",
      ustunningBalandligi: "3450 mm",
      ustunningUlanganlikHolati: "Qisman ulangan",
      balandlik: "450 mm",
      ustkiDiametr: "520 mm",
      ulanganDiametr: "450 mm",
      taglikBalandligi: "800 mm",
      taglikEni: "50 mm",
      taglikBoyi: "70 mm",
      taglikMateriali: "tosh",
      diametrOsti: "520 mm",
      diametrOrta: "450 mm",
      diametrUsti: "520 mm",
      qoshOlchamlari: "580x180x200 mm",
      termitlarniUstundaMavjudligi: "Yo'q",
      ishlatilganNaqshTuri: "Islomiy naqshlar",
      xattotlikYozuviMavjudligi: "Ustunda yozuv bor",
      texnikHolati: "Ta'mir talab",
      image: `/images/columns/d${i}.png`,
    })
  }

  // E qator (1-30)
  for (let i = 1; i <= 30; i++) {
    columns.push({
      id: `E${i}`,
      title: `E qator №-${i} E${i}`,
      ustunningDarxtNavi: "qarag'ay",
      qoshidanPolgacha: "3700 mm",
      ustunningBalandligi: "3250 mm",
      ustunningUlanganlikHolati: "-",
      balandlik: "500 mm",
      ustkiDiametr: "460 mm",
      ulanganDiametr: "380 mm",
      taglikBalandligi: "750 mm",
      taglikEni: "42 mm",
      taglikBoyi: "62 mm",
      taglikMateriali: "tosh",
      diametrOsti: "460 mm",
      diametrOrta: "380 mm",
      diametrUsti: "460 mm",
      qoshOlchamlari: "510x170x150 mm",
      termitlarniUstundaMavjudligi: "Yo'q",
      ishlatilganNaqshTuri: "O'simlik naqshlari",
      xattotlikYozuviMavjudligi: "yo'q",
      texnikHolati: "Qoniqarli",
      image: `/images/columns/e${i}.png`,
    })
  }

  // F qator (1-30)
  for (let i = 1; i <= 30; i++) {
    columns.push({
      id: `F${i}`,
      title: `F qator №-${i} F${i}`,
      ustunningDarxtNavi: "tol",
      qoshidanPolgacha: "3850 mm",
      ustunningBalandligi: "3400 mm",
      ustunningUlanganlikHolati: "Ulangan",
      balandlik: "450 mm",
      ustkiDiametr: "480 mm",
      ulanganDiametr: "420 mm",
      taglikBalandligi: "780 mm",
      taglikEni: "48 mm",
      taglikBoyi: "68 mm",
      taglikMateriali: "tosh",
      diametrOsti: "480 mm",
      diametrOrta: "420 mm",
      diametrUsti: "480 mm",
      qoshOlchamlari: "530x175x160 mm",
      termitlarniUstundaMavjudligi: "Bor",
      ishlatilganNaqshTuri: "Aralash naqshlar",
      xattotlikYozuviMavjudligi: "Ustunda yozuv bor",
      texnikHolati: "Yaxshi",
      image: `/images/columns/f${i}.png`,
    })
  }

  // G qator (1-30)
  for (let i = 1; i <= 30; i++) {
    columns.push({
      id: `G${i}`,
      title: `G qator №-${i} G${i}`,
      ustunningDarxtNavi: "eman",
      qoshidanPolgacha: "3750 mm",
      ustunningBalandligi: "3300 mm",
      ustunningUlanganlikHolati: "-",
      balandlik: "400 mm",
      ustkiDiametr: "450 mm",
      ulanganDiametr: "370 mm",
      taglikBalandligi: "720 mm",
      taglikEni: "44 mm",
      taglikBoyi: "64 mm",
      taglikMateriali: "tosh",
      diametrOsti: "450 mm",
      diametrOrta: "370 mm",
      diametrUsti: "450 mm",
      qoshOlchamlari: "490x165x145 mm",
      termitlarniUstundaMavjudligi: "Yo'q",
      ishlatilganNaqshTuri: "Sodda naqshlar",
      xattotlikYozuviMavjudligi: "yo'q",
      texnikHolati: "Qoniqarli",
      image: `/images/columns/g${i}.png`,
    })
  }

  // H qator (1-28) - Jami 238 ta bo'lishi uchun
  for (let i = 1; i <= 28; i++) {
    columns.push({
      id: `H${i}`,
      title: `H qator №-${i} H${i}`,
      ustunningDarxtNavi: "qayrag'och",
      qoshidanPolgacha: "3800 mm",
      ustunningBalandligi: "3350 mm",
      ustunningUlanganlikHolati: "Qisman ulangan",
      balandlik: "480 mm",
      ustkiDiametr: "470 mm",
      ulanganDiametr: "390 mm",
      taglikBalandligi: "760 mm",
      taglikEni: "46 mm",
      taglikBoyi: "66 mm",
      taglikMateriali: "tosh",
      diametrOsti: "470 mm",
      diametrOrta: "390 mm",
      diametrUsti: "470 mm",
      qoshOlchamlari: "520x170x155 mm",
      termitlarniUstundaMavjudligi: "Yo'q",
      ishlatilganNaqshTuri: "Murakkab naqshlar",
      xattotlikYozuviMavjudligi: "Ustunda yozuv bor",
      texnikHolati: "Ta'mir talab",
      image: `/images/columns/h${i}.png`,
    })
  }

  return columns
}

// Barcha ustunlar ro'yxati
export const columnsData: ColumnData[] = generateAllColumns()

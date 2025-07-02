-- Xiva Juma Masjidi ustunlari uchun SQLite database
-- Bu script faqat database yaratish uchun, ma'lumotlarni o'chirmaydi

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
);

-- Bu script faqat jadval strukturasini yaratadi
-- Ma'lumotlar admin panel orqali qo'shiladi

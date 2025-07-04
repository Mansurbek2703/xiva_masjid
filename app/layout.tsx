import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Xiva Juma masjidi 238 ta yog'och ustunlari",
  description: "Xiva shahridagi Juma masjidining yog'och ustunlari bo'yicha ilmiy ma'lumotlar bazasi",
  keywords: "Xiva, Juma masjidi, yog'och ustunlar, tarix, arxitektura, O'zbekiston",
  authors: [{ name: "Xorazm Ma'mun akademiyasi" }],
  openGraph: {
    title: "Xiva Juma masjidi yog'och ustunlari",
    description: "Tarixiy yodgorlik ustunlarining ilmiy tadqiqoti",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cabinet de Psychologie - Accompagnement professionnel",
  description:
    "Cabinet de psychologie à Paris. Thérapie individuelle, de couple et familiale. Prenez rendez-vous avec nos psychologues qualifiés.",
  keywords: "psychologue, thérapie, consultation, Paris, bien-être mental, accompagnement psychologique",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navigation />
        <Breadcrumb />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

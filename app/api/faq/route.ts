import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import type { FAQ } from "@/types"

export async function GET() {
  try {
    const faqs = (await query("SELECT id, question, answer FROM faq ORDER BY id")) as FAQ[]

    return NextResponse.json(faqs)
  } catch (error) {
    console.error("Erreur lors de la récupération des FAQ:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

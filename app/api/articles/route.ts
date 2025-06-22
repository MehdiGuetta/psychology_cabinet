import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import type { Article } from "@/types"

export async function GET() {
  try {
    const articles = (await query(
      "SELECT id, title, slug, LEFT(content, 200) as summary, author, published_date FROM articles ORDER BY published_date DESC",
    )) as Article[]

    return NextResponse.json(articles)
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

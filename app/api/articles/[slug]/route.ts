import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import type { Article } from "@/types"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const articles = (await query(
      "SELECT id, title, slug, content, author, published_date FROM articles WHERE slug = ?",
      [params.slug],
    )) as Article[]

    if (articles.length === 0) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 })
    }

    return NextResponse.json(articles[0])
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

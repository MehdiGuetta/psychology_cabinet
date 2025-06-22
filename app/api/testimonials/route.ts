import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import type { Testimonial } from "@/types"

export async function GET() {
  try {
    const testimonials = (await query(
      "SELECT id, name, content, rating FROM testimonials WHERE is_validated = TRUE ORDER BY created_at DESC",
    )) as Testimonial[]

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Erreur lors de la récupération des témoignages:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body: Testimonial = await request.json()

    // Validation des données
    if (!body.name || !body.content) {
      return NextResponse.json({ error: "Le nom et le contenu sont obligatoires" }, { status: 400 })
    }

    // Insérer le témoignage (non validé par défaut)
    await query("INSERT INTO testimonials (name, content, rating, is_validated) VALUES (?, ?, ?, FALSE)", [
      body.name,
      body.content,
      body.rating || null,
    ])

    return NextResponse.json({ message: "Témoignage soumis avec succès. Il sera publié après validation." })
  } catch (error) {
    console.error("Erreur lors de la soumission du témoignage:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

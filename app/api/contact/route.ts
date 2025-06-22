import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import type { ContactMessage } from "@/types"

export async function POST(request: Request) {
  try {
    const body: ContactMessage = await request.json()

    // Validation des données
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Tous les champs sont obligatoires" }, { status: 400 })
    }

    // Insérer le message
    await query("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)", [
      body.name,
      body.email,
      body.message,
    ])

    return NextResponse.json({ message: "Message envoyé avec succès" })
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

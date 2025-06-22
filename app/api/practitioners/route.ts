import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import type { Practitioner } from "@/types"

export async function GET() {
  try {
    const practitioners = (await query(
      "SELECT id, name, specialty, photo_url, bio FROM practitioners ORDER BY name",
    )) as Practitioner[]

    return NextResponse.json(practitioners)
  } catch (error) {
    console.error("Erreur lors de la récupération des praticiens:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

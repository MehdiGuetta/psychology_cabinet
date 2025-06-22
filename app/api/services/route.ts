import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import type { Service } from "@/types"

export async function GET() {
  try {
    const services = (await query("SELECT id, title, description, image_url FROM services ORDER BY id")) as Service[]

    return NextResponse.json(services)
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

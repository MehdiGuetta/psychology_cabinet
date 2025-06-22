import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import type { Appointment } from "@/types"

export async function POST(request: Request) {
  try {
    const body: Appointment = await request.json()

    // Validation des données
    if (
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.phone ||
      !body.practitioner_id ||
      !body.date ||
      !body.time
    ) {
      return NextResponse.json({ error: "Tous les champs sont obligatoires" }, { status: 400 })
    }

    // Vérifier si le créneau est disponible
    const existingAppointment = await query(
      "SELECT id FROM appointments WHERE practitioner_id = ? AND date = ? AND time = ?",
      [body.practitioner_id, body.date, body.time],
    )

    if (Array.isArray(existingAppointment) && existingAppointment.length > 0) {
      return NextResponse.json({ error: "Ce créneau n'est pas disponible" }, { status: 409 })
    }

    // Insérer le rendez-vous
    await query(
      "INSERT INTO appointments (first_name, last_name, email, phone, practitioner_id, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [body.first_name, body.last_name, body.email, body.phone, body.practitioner_id, body.date, body.time],
    )

    return NextResponse.json({ message: "Rendez-vous pris avec succès" })
  } catch (error) {
    console.error("Erreur lors de la prise de rendez-vous:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

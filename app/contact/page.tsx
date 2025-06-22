"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ContactMessage } from "@/types"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<ContactMessage>({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setFormData({ name: "", email: "", message: "" })
      } else {
        setError(data.error || "Une erreur est survenue")
      }
    } catch (error) {
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Message envoyé !</h2>
            <p className="text-gray-600 mb-6">
              Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
            </p>
            <Button onClick={() => setSuccess(false)} className="w-full">
              Envoyer un autre message
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Nous Contacter</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            N'hésitez pas à nous contacter pour toute question ou demande d'information. Nous sommes là pour vous
            accompagner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
              <CardDescription>Remplissez le formulaire ci-dessous et nous vous répondrons rapidement</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre nom complet"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre message..."
                    className="min-h-[120px]"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informations de contact */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-gray-600">+212 658-655054</p>
                    <p className="text-sm text-gray-500">Lun-Ven: 9h-19h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contact@cabinet-psy.ma</p>
                    <p className="text-sm text-gray-500">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-gray-600">123 Rue de la Santé</p>
                    <p className="text-gray-600">75014 Paris</p>
                    <p className="text-sm text-gray-500">Métro: Alésia (ligne 4)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Horaires d'ouverture</p>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>Lundi - Vendredi: 9h - 19h</p>
                      <p>Samedi: 9h - 13h</p>
                      <p>Dimanche: Fermé</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Urgences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">En cas d'urgence psychologique, contactez:</p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>SOS Amitié:</strong> 09 72 39 40 50
                  </p>
                  <p>
                    <strong>Suicide Écoute:</strong> 01 45 39 40 00
                  </p>
                  <p>
                    <strong>Urgences:</strong> 15 (SAMU)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

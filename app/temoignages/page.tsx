"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Testimonial } from "@/types"
import { Star, Quote } from "lucide-react"

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<Testimonial>({
    name: "",
    content: "",
    rating: 5,
  })

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials")
        if (response.ok) {
          const data = await response.json()
          setTestimonials(data)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des témoignages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setFormData({ name: "", content: "", rating: 5 })
      } else {
        setError(data.error || "Une erreur est survenue")
      }
    } catch (error) {
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number.parseInt(value) : value,
    }))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Témoignages</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les expériences de nos patients et partagez la vôtre pour aider d'autres personnes dans leur
            démarche.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Testimonials */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Ce que disent nos patients</h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <Quote className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.content}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{testimonial.name}</p>
                              {testimonial.rating && (
                                <div className="flex items-center mt-1">{renderStars(testimonial.rating)}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Submission Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Partagez votre expérience</CardTitle>
                <CardDescription>Votre témoignage sera publié après validation</CardDescription>
              </CardHeader>
              <CardContent>
                {success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">✓</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Merci pour votre témoignage !</h3>
                    <p className="text-gray-600 mb-4">Il sera publié après validation par notre équipe.</p>
                    <Button onClick={() => setSuccess(false)} variant="outline">
                      Ajouter un autre témoignage
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom ou initiales *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre nom ou initiales"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rating">Note (optionnel)</Label>
                      <select
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={5}>5 étoiles - Excellent</option>
                        <option value={4}>4 étoiles - Très bien</option>
                        <option value={3}>3 étoiles - Bien</option>
                        <option value={2}>2 étoiles - Moyen</option>
                        <option value={1}>1 étoile - Décevant</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Votre témoignage *</Label>
                      <Textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        placeholder="Partagez votre expérience..."
                        className="min-h-[100px]"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}

                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? "Envoi en cours..." : "Envoyer le témoignage"}
                    </Button>

                    <p className="text-xs text-gray-500">
                      Votre témoignage sera vérifié avant publication pour respecter la confidentialité et les bonnes
                      pratiques.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { Practitioner } from "@/types"

export default function AboutPage() {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPractitioners = async () => {
      try {
        const response = await fetch("/api/practitioners")
        if (response.ok) {
          const data = await response.json()
          setPractitioners(data)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des praticiens:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPractitioners()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Notre Équipe</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos psychologues qualifiés, chacun apportant son expertise et sa passion pour vous accompagner
            dans votre parcours de bien-être.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16 bg-blue-50 rounded-lg p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              Nous nous engageons à offrir un accompagnement psychologique de qualité, dans un environnement sécurisant
              et bienveillant. Notre approche se base sur l'écoute, le respect et l'adaptation à vos besoins
              individuels.
            </p>
            <p className="text-lg text-gray-700">
              Chaque membre de notre équipe apporte son expertise unique pour vous aider à surmonter vos difficultés et
              développer votre potentiel.
            </p>
          </div>
        </div>

        {/* Practitioners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practitioners.map((practitioner) => (
            <Card key={practitioner.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <Image
                  src={practitioner.photo_url || "/placeholder.svg"}
                  alt={practitioner.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{practitioner.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{practitioner.specialty}</p>
                <p className="text-gray-600 leading-relaxed">{practitioner.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Bienveillance</h3>
              <p className="text-gray-600">
                Nous créons un espace sécurisant où vous pouvez vous exprimer librement, sans jugement.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Professionnalisme</h3>
              <p className="text-gray-600">
                Notre équipe est formée aux dernières approches thérapeutiques et maintient ses compétences à jour.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personnalisation</h3>
              <p className="text-gray-600">
                Chaque accompagnement est adapté à vos besoins spécifiques et à votre rythme personnel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

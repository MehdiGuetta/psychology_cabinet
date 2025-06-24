"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Service } from "@/types"
import { CheckCircle, Clock, Users, Heart, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services")
        if (response.ok) {
          const data = await response.json()
          setServices(data)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des services:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Chargement de nos services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              🌟 Services professionnels
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6">Nos Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Nous proposons différents types d'accompagnement psychologique adaptés à vos besoins spécifiques et à votre
            situation personnelle.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Services Grid */}
        <div className="space-y-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <Card className="h-full overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-300">
                  <div className="relative h-80 lg:h-96 overflow-hidden">
                    <Image
                      src={service.image_url || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </Card>
              </div>

              <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Service #{index + 1}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">{service.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {[
                    "Séances de 50 minutes",
                    "Approche personnalisée",
                    "Suivi régulier et adapté",
                    "Environnement sécurisant",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 py-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">50min</div>
                    <div className="text-sm text-gray-500">Durée séance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">98%</div>
                    <div className="text-sm text-gray-500">Satisfaction</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Link href="/rendez-vous" className="flex items-center justify-center">
                      Réserver ce service
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 hover:bg-gray-50">
                    <Link href="/contact">Poser une question</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-24 relative">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Vous ne savez pas quel service choisir ?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour un premier échange gratuit de 15 minutes. Nous vous aiderons à identifier le type
                d'accompagnement le plus adapté à votre situation.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center">
                  <Clock className="h-6 w-6 mr-2" />
                  <span>Consultation gratuite 15min</span>
                </div>
                <div className="flex items-center justify-center">
                  <Users className="h-6 w-6 mr-2" />
                  <span>Équipe de spécialistes</span>
                </div>
                <div className="flex items-center justify-center">
                  <Heart className="h-6 w-6 mr-2" />
                  <span>Approche bienveillante</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  <Link href="/contact" className="flex items-center">
                    Consultation gratuite
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

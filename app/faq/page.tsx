"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { FAQ } from "@/types"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch("/api/faq")
        if (response.ok) {
          const data = await response.json()
          setFaqs(data)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des FAQ:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Questions Fréquentes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses aux questions les plus courantes concernant nos services et consultations.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                aria-expanded={openItems.has(faq.id)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openItems.has(faq.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </div>
              </button>
              {openItems.has(faq.id) && (
                <CardContent className="px-6 pb-6 pt-0">
                  <div className="text-gray-600 leading-relaxed">{faq.answer}</div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vous ne trouvez pas la réponse à votre question ?</h2>
          <p className="text-gray-600 mb-6">
            N'hésitez pas à nous contacter directement. Nous serons ravis de vous aider et de répondre à toutes vos
            interrogations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/rendez-vous">Prendre rendez-vous</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

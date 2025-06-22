"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Article } from "@/types"
import { Calendar, User, ArrowRight } from "lucide-react"

export default function ResourcesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles")
        if (response.ok) {
          const data = await response.json()
          setArticles(data)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Ressources & Articles</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos articles et conseils pour mieux comprendre la psychologie et améliorer votre bien-être au
            quotidien.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(article.published_date).toLocaleDateString("fr-FR")}</span>
                  <span className="mx-2">•</span>
                  <User className="h-4 w-4 mr-1" />
                  <span>{article.author}</span>
                </div>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {(article as any).summary || article.content.substring(0, 150) + "..."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/ressources/${article.slug}`} className="flex items-center justify-center">
                    Lire l'article
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Besoin d'un accompagnement personnalisé ?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Nos articles vous donnent des pistes, mais rien ne remplace un accompagnement professionnel adapté à votre
            situation unique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/rendez-vous">Prendre rendez-vous</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Poser une question</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

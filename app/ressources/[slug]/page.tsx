"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Article } from "@/types"
import { Calendar, User, ArrowLeft } from "lucide-react"

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${params.slug}`)
        if (response.ok) {
          const data = await response.json()
          setArticle(data)
        } else {
          setError("Article non trouvé")
        }
      } catch (error) {
        setError("Erreur lors du chargement de l'article")
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params.slug])

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

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Button asChild>
            <Link href="/ressources">Retour aux articles</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/ressources" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux articles
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(article.published_date).toLocaleDateString("fr-FR")}</span>
            <span className="mx-2">•</span>
            <User className="h-4 w-4 mr-1" />
            <span>{article.author}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap leading-relaxed text-gray-700">{article.content}</div>
        </article>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cet article vous a été utile ?</h2>
          <p className="text-gray-600 mb-6">
            Pour un accompagnement personnalisé, n'hésitez pas à prendre rendez-vous avec l'un de nos psychologues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/rendez-vous">Prendre rendez-vous</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/ressources">Lire d'autres articles</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

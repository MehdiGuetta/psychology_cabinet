"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname()

  // Generate breadcrumb items from pathname if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Accueil", href: "/" }]

    const pathMap: Record<string, string> = {
      "a-propos": "À propos",
      services: "Services",
      "rendez-vous": "Rendez-vous",
      ressources: "Ressources",
      contact: "Contact",
    }

    let currentPath = ""
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1

      breadcrumbs.push({
        label: pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: isLast ? undefined : currentPath,
      })
    })

    return breadcrumbs
  }

  const breadcrumbItems = items || generateBreadcrumbs()

  if (breadcrumbItems.length <= 1) return null

  return (
    <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-4">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />}
                {index === 0 && <Home className="h-4 w-4 mr-2 text-gray-500" />}
                {item.href ? (
                  <Link href={item.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  )
}

import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface EnhancedCardProps {
  icon?: LucideIcon
  title: string
  description: string
  children?: ReactNode
  className?: string
  gradient?: string
}

export default function EnhancedCard({
  icon: Icon,
  title,
  description,
  children,
  className = "",
  gradient = "from-blue-500 to-blue-600",
}: EnhancedCardProps) {
  return (
    <Card
      className={`group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg ${className}`}
    >
      <CardContent className="p-8 text-center h-full flex flex-col">
        {Icon && (
          <div
            className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200`}
          >
            <Icon className="h-8 w-8 text-white" />
          </div>
        )}
        <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
        <p className="text-gray-600 flex-grow mb-6">{description}</p>
        {children}
      </CardContent>
    </Card>
  )
}

export interface Practitioner {
  id: number
  name: string
  specialty: string
  photo_url: string
  bio: string
}

export interface Service {
  id: number
  title: string
  description: string
  image_url: string
}

export interface Appointment {
  id?: number
  first_name: string
  last_name: string
  email: string
  phone: string
  practitioner_id: number
  date: string
  time: string
}

export interface ContactMessage {
  id?: number
  name: string
  email: string
  message: string
}

export interface Article {
  id: number
  title: string
  slug: string
  content: string
  author: string
  published_date: string
}

export interface FAQ {
  id: number
  question: string
  answer: string
}

export interface Testimonial {
  id?: number
  name: string
  content: string
  rating?: number
  is_validated?: boolean
}

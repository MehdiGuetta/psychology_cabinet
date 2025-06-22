"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Heart,
  Building,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import carousel1 from "../public/carousel1.avif";
import carousel2 from "../public/carousel2.avif";
import carousel3 from "../public/carousel3.avif";
import TeamPsychologists from "../public/TeamPsychologists.jpg";

const carouselImages = [
  { src: carousel1, alt: "Cabinet accueillant" },
  {
    src: carousel2,
    alt: "Salle de consultation",
  },
  { src: carousel3, alt: "Espace détente" },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-5xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                ✨ Votre bien-être mental est notre priorité
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Bienvenue dans notre
              <span className="block bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
                Cabinet de Psychologie
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Un accompagnement professionnel et bienveillant pour votre
              épanouissement personnel et votre bien-être mental
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/rendez-vous" className="flex items-center">
                  Prendre rendez-vous
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 hover:text-white shadow-xl"
              >
                <Link href="/a-propos">Découvrir l'équipe</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300">15+</div>
                <div className="text-sm text-blue-100">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300">500+</div>
                <div className="text-sm text-blue-100">
                  Patients accompagnés
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300">98%</div>
                <div className="text-sm text-blue-100">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-200 hover:scale-110"
          aria-label="Image précédente"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-200 hover:scale-110"
          aria-label="Image suivante"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Enhanced Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Enhanced Quick Navigation */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Comment pouvons-nous vous aider ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos services et prenez le premier pas vers votre
              bien-être
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Thérapie Individuelle",
                description:
                  "Accompagnement personnalisé pour votre épanouissement",
                color: "from-pink-500 to-rose-500",
                href: "/services",
              },
              {
                icon: Users,
                title: "Thérapie de Couple",
                description: "Renforcez votre relation et votre communication",
                color: "from-purple-500 to-indigo-500",
                href: "/services",
              },
              {
                icon: Building,
                title: "Thérapie Familiale",
                description: "Harmonie et compréhension au sein de la famille",
                color: "from-green-500 to-emerald-500",
                href: "/services",
              },
              {
                icon: Calendar,
                title: "Prendre RDV",
                description: "Réservez votre consultation en quelques clics",
                color: "from-blue-500 to-cyan-500",
                href: "/rendez-vous",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
              >
                <Link href={service.href}>
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 flex-grow">
                      {service.description}
                    </p>
                    <div className="mt-6 flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                      <span className="text-sm font-medium">
                        En savoir plus
                      </span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Notre équipe
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Des professionnels à votre écoute
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Notre cabinet réunit des psychologues expérimentés, spécialisés
                dans différents domaines pour vous offrir un accompagnement
                adapté à vos besoins spécifiques.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {[
                  "Approche humaine et personnalisée",
                  "Environnement sécurisant et bienveillant",
                  "Formation continue et expertise reconnue",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Link href="/a-propos" className="flex items-center">
                  Découvrir notre équipe
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={TeamPsychologists}
                  alt="Équipe de psychologues"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  "Une équipe exceptionnelle qui m'a vraiment aidée"
                </p>
                <p className="text-xs text-gray-500">- Marie L.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à commencer votre parcours ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Prenez le premier pas vers un mieux-être durable. Notre équipe vous
            accompagne avec bienveillance et professionnalisme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Link href="/rendez-vous" className="flex items-center">
                Planifier ma première séance
                <Calendar className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-black hover:bg-white/50 backdrop-blur-sm"
            >
              <Link href="/contact">Poser une question</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

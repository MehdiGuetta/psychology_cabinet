import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Heart, Shield, Award } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cabinet Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">🧠</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Cabinet de Psychologie</h3>
                <p className="text-blue-300 text-sm">
                  Bien-être & Accompagnement
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Accompagnement psychologique professionnel pour votre bien-être
              mental et émotionnel. Notre équipe de psychologues qualifiés vous
              offre un soutien personnalisé dans un environnement sécurisant et
              bienveillant.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <span>+212 658-655054</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <span>contact@cabinet-psy.ma</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-white transition-colors">
                <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                <span>Av. Abdelkhalek Torres, Salé</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/a-propos", label: "À propos" },
                { href: "/services", label: "Services" },
                { href: "/rendez-vous", label: "Prendre RDV" },
                { href: "/ressources", label: "Ressources" },
                { href: "/faq", label: "FAQ" },
                { href: "/temoignages", label: "Témoignages" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires & Urgences */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Informations
            </h4>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                <span className="font-medium">Horaires</span>
              </div>
              <div className="text-gray-300 text-sm space-y-1 ml-7">
                <p>Lun - Ven: 9h - 19h</p>
                <p>Sam: 9h - 13h</p>
                <p>Dim: Fermé</p>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3 text-red-300">Urgences</h5>
              <div className="text-gray-300 text-sm space-y-1">
                <p>SOS Amitié: 09 72 39 40 50</p>
                <p>Suicide Écoute: 01 45 39 40 00</p>
                <p>SAMU: 15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="border-t border-gray-700 mt-12 pt-12">
          <h4 className="text-xl font-semibold mb-8 text-center">
            Nos Engagements
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold mb-2">Bienveillance</h5>
              <p className="text-gray-300 text-sm">
                Un accompagnement humain et respectueux
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold mb-2">Confidentialité</h5>
              <p className="text-gray-300 text-sm">
                Respect absolu du secret professionnel
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold mb-2">Excellence</h5>
              <p className="text-gray-300 text-sm">
                Formation continue et expertise reconnue
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Cabinet de Psychologie. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/mentions-legales"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/confidentialite"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Confidentialité
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

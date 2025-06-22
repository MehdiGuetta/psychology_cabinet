"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Practitioner, Appointment } from "@/types";
import { Calendar, Clock, User, Phone } from "lucide-react";

export default function AppointmentPage() {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<Appointment>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    practitioner_id: 0,
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchPractitioners = async () => {
      try {
        const response = await fetch("/api/practitioners");
        if (response.ok) {
          const data = await response.json();
          setPractitioners(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des praticiens:", error);
      }
    };

    fetchPractitioners();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          practitioner_id: 0,
          date: "",
          time: "",
        });
      } else {
        setError(data.error || "Une erreur est survenue");
      }
    } catch (error) {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "practitioner_id" ? Number.parseInt(value) : value,
    }));
  };

  // Générer les créneaux horaires
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  // Date minimum (aujourd'hui)
  const today = new Date().toISOString().split("T")[0];

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Rendez-vous confirmé !
            </h2>
            <p className="text-gray-600 mb-6">
              Votre demande de rendez-vous a été enregistrée avec succès. Nous
              vous contacterons sous 24h pour confirmer le créneau.
            </p>
            <Button onClick={() => setSuccess(false)} className="w-full">
              Prendre un autre rendez-vous
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Prendre Rendez-vous
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Réservez votre consultation en remplissant le formulaire ci-dessous.
            Nous vous contacterons pour confirmer votre rendez-vous.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations de rendez-vous</CardTitle>
                <CardDescription>
                  Veuillez remplir tous les champs pour finaliser votre demande
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informations personnelles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">Prénom *</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Nom *</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+212 999 999999"
                      />
                    </div>
                  </div>

                  {/* Sélection du praticien */}
                  <div className="space-y-2">
                    <Label htmlFor="practitioner_id">Praticien *</Label>
                    <select
                      id="practitioner_id"
                      name="practitioner_id"
                      value={formData.practitioner_id}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionnez un praticien</option>
                      {practitioners.map((practitioner) => (
                        <option key={practitioner.id} value={practitioner.id}>
                          {practitioner.name} - {practitioner.specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date et heure */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={today}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Heure *</Label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Sélectionnez une heure</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <p className="text-red-600">{error}</p>
                    </div>
                  )}

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Envoi en cours..." : "Confirmer le rendez-vous"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Informations pratiques */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Informations pratiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Durée des séances</p>
                    <p className="text-sm text-gray-600">
                      50 minutes pour les consultations individuelles
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Premier rendez-vous</p>
                    <p className="text-sm text-gray-600">
                      Entretien d'évaluation et définition des objectifs
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Confirmation</p>
                    <p className="text-sm text-gray-600">
                      Nous vous appellerons sous 24h pour confirmer
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tarifs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Consultation individuelle</span>
                  <span className="font-medium">500DH</span>
                </div>
                <div className="flex justify-between">
                  <span>Thérapie de couple</span>
                  <span className="font-medium">900DH</span>
                </div>
                <div className="flex justify-between">
                  <span>Thérapie familiale</span>
                  <span className="font-medium">900DH</span>
                </div>
                <div className="pt-2 border-t text-sm text-gray-600">
                  Paiement par chèque ou virement bancaire
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Mail, Phone, MapPin, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "support",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "support",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="group flex items-center text-cyan-400 hover:text-cyan-300">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Contactez-nous
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl">
            Vous avez des questions ou besoin d'assistance? Notre équipe est là pour vous aider. Remplissez le
            formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-800/50 p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-black" />
                  </div>
                  <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Message Envoyé!</h2>
                  <p className="text-gray-300 mb-6">
                    Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les
                    plus brefs délais.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-black font-semibold"
                  >
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-200">
                        Nom complet
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                        className="bg-blue-950/30 border-cyan-800/50 focus:border-cyan-400 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-200">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                        className="bg-blue-950/30 border-cyan-800/50 focus:border-cyan-400 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-gray-200">Sujet</Label>
                    <RadioGroup
                      value={formState.subject}
                      onValueChange={handleRadioChange}
                      className="grid grid-cols-1 md:grid-cols-3 gap-3"
                    >
                      <div className="flex items-center space-x-2 bg-blue-950/30 p-3 rounded-md border border-cyan-800/50">
                        <RadioGroupItem value="support" id="support" className="text-cyan-400" />
                        <Label htmlFor="support" className="cursor-pointer">
                          Support technique
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 bg-blue-950/30 p-3 rounded-md border border-cyan-800/50">
                        <RadioGroupItem value="billing" id="billing" className="text-cyan-400" />
                        <Label htmlFor="billing" className="cursor-pointer">
                          Facturation
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 bg-blue-950/30 p-3 rounded-md border border-cyan-800/50">
                        <RadioGroupItem value="other" id="other" className="text-cyan-400" />
                        <Label htmlFor="other" className="cursor-pointer">
                          Autre demande
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-200">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Comment pouvons-nous vous aider?"
                      required
                      className="min-h-[150px] bg-blue-950/30 border-cyan-800/50 focus:border-cyan-400 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-black font-semibold h-12"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-5 w-5" />
                        Envoyer le message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-800/50 p-6">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Informations de Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-cyan-400 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:contact@votreplateforme.com" className="text-gray-300 hover:text-cyan-300">
                        contact@votreplateforme.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-cyan-400 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <a href="tel:+33123456789" className="text-gray-300 hover:text-cyan-300">
                        +33 (0)1 23 45 67 89
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-cyan-400 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-300">
                        123 Avenue de l'Innovation
                        <br />
                        75008 Paris, France
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-800/50 p-6">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Heures d'Ouverture</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi:</span>
                    <span className="text-gray-300">9h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi:</span>
                    <span className="text-gray-300">10h - 15h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche:</span>
                    <span className="text-gray-300">Fermé</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-800/50 p-6">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Support Rapide</h3>
                <p className="text-gray-300 mb-4">
                  Besoin d'une assistance immédiate? Consultez notre centre d'aide ou contactez-nous via les réseaux
                  sociaux.
                </p>
                <div className="flex space-x-3">
                  <Button variant="outline" className="border-cyan-800/50 hover:bg-blue-900/30 hover:text-cyan-300">
                    Centre d'aide
                  </Button>
                  <Button variant="outline" className="border-cyan-800/50 hover:bg-blue-900/30 hover:text-cyan-300">
                    Chat en direct
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


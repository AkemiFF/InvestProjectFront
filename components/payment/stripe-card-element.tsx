"use client"

import type React from "react"

import { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, CreditCard } from "lucide-react"

interface StripeCardElementProps {
  amount: number
  onPaymentSuccess: (paymentIntentId: string) => void
  onPaymentError: (error: string) => void
  clientSecret: string | null
  disabled?: boolean
}

export function StripeCardElement({
  amount,
  onPaymentSuccess,
  onPaymentError,
  clientSecret,
  disabled = false,
}: StripeCardElementProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  const cardStyle = {
    style: {
      base: {
        color: "#f1f5f9",
        fontFamily: "system-ui, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#64748b",
        },
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
    },
  }

  const handleChange = (event: any) => {
    // Écouter les changements dans le CardElement
    // et afficher les erreurs de validation du formulaire si nécessaire
    setError(event.error ? event.error.message : "")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      // Stripe.js n'a pas encore chargé ou clientSecret n'est pas disponible
      return
    }

    setProcessing(true)

    try {
      const cardElement = elements.getElement(CardElement)

      if (!cardElement) {
        throw new Error("Card element not found")
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      })

      if (error) {
        setError(`Paiement échoué: ${error.message}`)
        onPaymentError(error.message || "Une erreur est survenue lors du paiement")
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setSucceeded(true)
        setError(null)
        onPaymentSuccess(paymentIntent.id)
      } else {
        setError("Une erreur inattendue s'est produite.")
        onPaymentError("Statut de paiement inattendu")
      }
    } catch (err: any) {
      setError(`Erreur: ${err.message}`)
      onPaymentError(err.message || "Une erreur est survenue")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-slate-300 flex items-center">
            <CreditCard className="mr-2 h-4 w-4 text-cyan-500" />
            Détails de la carte
          </label>
          <span className="text-sm text-slate-400">Montant: {amount.toLocaleString()} MGA</span>
        </div>
        <div className="p-3 bg-slate-800 rounded-md border border-slate-700">
          <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="bg-red-900/20 border-red-700/50 text-red-300">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {succeeded && (
        <Alert className="bg-green-900/20 border-green-700/50 text-green-300">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Paiement réussi!</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={processing || disabled || succeeded || !stripe || !clientSecret}
        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
      >
        {processing ? (
          <div className="flex items-center">
            <div className="h-4 w-4 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-2"></div>
            Traitement...
          </div>
        ) : (
          "Payer maintenant"
        )}
      </Button>
    </form>
  )
}

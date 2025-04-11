"use client"

import type React from "react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { walletService } from "@/services/wallet-service"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { AlertCircle, ArrowLeft, Check, CreditCard, DollarSign, Info, Lock, Shield, Wallet } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Initialiser Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

function DepositForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/wallet/deposit/success`,
        },
        redirect: "if_required",
      })

      if (error) {
        setErrorMessage(error.message || "Une erreur est survenue lors du traitement du paiement.")
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Confirmer le dépôt côté serveur
        await walletService.confirmDeposit(paymentIntent.id)
        router.push("/wallet/deposit/success")
      }
    } catch (error) {
      console.error("Erreur de paiement:", error)
      setErrorMessage("Une erreur est survenue lors du traitement du paiement.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <PaymentElement />
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 flex items-center">
        <Shield className="h-5 w-5 text-cyan-500 mr-3" />
        <div className="text-sm text-slate-300">
          Vos informations de paiement sont sécurisées et cryptées. Nous ne stockons pas vos données de carte.
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="h-4 w-4 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-2"></div>
            Traitement en cours...
          </div>
        ) : (
          <div className="flex items-center">
            Confirmer le dépôt <Lock className="ml-2 h-4 w-4" />
          </div>
        )}
      </Button>
    </form>
  )
}

function DepositAmountForm({ onContinue }: { onContinue: (amount: number) => void }) {
  const [amount, setAmount] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const amountValue = Number.parseFloat(amount)
    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Veuillez entrer un montant valide.")
      return
    }

    if (amountValue < 1000) {
      setError("Le montant minimum de dépôt est de 1 000 MGA.")
      return
    }

    onContinue(amountValue)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="amount" className="text-slate-300">
          Montant du dépôt (MGA)
        </Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
            placeholder="Entrez le montant"
            min="1000"
            required
          />
        </div>
        <div className="text-xs text-slate-500">Montant minimum: 1 000 MGA</div>
      </div>

      <Alert className="bg-blue-900/20 border-blue-700/50 text-blue-300">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Les fonds déposés seront disponibles immédiatement dans votre portefeuille après confirmation du paiement.
        </AlertDescription>
      </Alert>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
      >
        Continuer
      </Button>
    </form>
  )
}

export default function DepositPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(0)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleContinue = async (amount: number) => {
    setAmount(amount)
    setIsLoading(true)
    setError(null)

    try {
      const { clientSecret } = await walletService.createDepositIntent(amount)
      setClientSecret(clientSecret)
      setStep(2)
    } catch (error) {
      console.error("Erreur lors de la création de l'intention de dépôt:", error)
      setError("Une erreur est survenue lors de la préparation du dépôt. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <Link href="/wallet" className="hover:text-slate-300 flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4" /> Retour au portefeuille
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Déposer des fonds</CardTitle>
                <CardDescription className="text-slate-400">
                  Ajoutez de l'argent à votre portefeuille pour investir dans des projets
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="h-8 w-8 border-4 border-slate-600 border-t-cyan-500 rounded-full animate-spin"></div>
                  </div>
                ) : error ? (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : step === 1 ? (
                  <DepositAmountForm onContinue={handleContinue} />
                ) : clientSecret ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "night",
                        variables: {
                          colorPrimary: "#0891b2",
                          colorBackground: "#1e293b",
                          colorText: "#f1f5f9",
                          colorDanger: "#ef4444",
                          fontFamily: "Inter, sans-serif",
                          spacingUnit: "4px",
                          borderRadius: "4px",
                        },
                      },
                    }}
                  >
                    <DepositForm clientSecret={clientSecret} />
                  </Elements>
                ) : null}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 text-base">Résumé du dépôt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Montant du dépôt</span>
                      <span className="text-sm font-medium text-slate-200">{formatCurrency(amount)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Frais</span>
                      <span className="text-sm font-medium text-slate-200">0 MGA</span>
                    </div>
                    <Separator className="my-1 bg-slate-700" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-300">Total</span>
                      <span className="text-sm font-medium text-cyan-400">{formatCurrency(amount)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-slate-300">Disponibilité immédiate des fonds</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-slate-300">Aucun frais de dépôt</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-slate-300">Paiement sécurisé</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 text-base">Méthodes de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <CreditCard className="h-5 w-5 text-cyan-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-200">Carte de crédit/débit</div>
                      <div className="text-xs text-slate-400">Visa, Mastercard, etc.</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <Wallet className="h-5 w-5 text-cyan-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-200">Mobile Money</div>
                      <div className="text-xs text-slate-400">MVola, Orange Money, etc.</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

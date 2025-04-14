"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Check, Info } from "lucide-react"
import { walletService } from "@/services/wallet-service1"

export default function DepositSuccessPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")

  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [amount, setAmount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setIsLoading(true)

        // Récupérer le payment_intent de l'URL
        const paymentIntent = searchParams.get("payment_intent")

        if (paymentIntent) {
          // Confirmer le dépôt côté serveur
          await walletService.confirmDeposit(paymentIntent)
          setSuccess(true)

          // Récupérer le montant depuis le localStorage
          const storedAmount = localStorage.getItem("depositAmount")
          if (storedAmount) {
            setAmount(Number.parseFloat(storedAmount))
            localStorage.removeItem("depositAmount") // Nettoyer après utilisation
          }
        } else {
          setError("Impossible de vérifier le paiement. Veuillez contacter le support.")
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du paiement:", error)
        setError("Une erreur est survenue lors de la vérification du paiement.")
      } finally {
        setIsLoading(false)
      }
    }

    verifyPayment()
  }, [searchParams, router])

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

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm max-w-2xl mx-auto">
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="h-8 w-8 border-4 border-slate-600 border-t-cyan-500 rounded-full animate-spin"></div>
                <p className="text-slate-400">Vérification du paiement en cours...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="h-20 w-20 rounded-full bg-red-900/20 flex items-center justify-center mb-2">
                  <Info className="h-10 w-10 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-100">Erreur de paiement</h2>
                <p className="text-slate-400 text-center max-w-md">{error}</p>
                <Button
                  onClick={() => router.push("/wallet/deposit")}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                >
                  Réessayer
                </Button>
              </div>
            ) : success ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="h-20 w-20 rounded-full bg-green-900/20 flex items-center justify-center mb-2">
                  <Check className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-100">Dépôt réussi!</h2>
                <p className="text-slate-400 text-center max-w-md">
                  Votre dépôt de {amount ? formatCurrency(amount) : "fonds"} a été traité avec succès et est maintenant
                  disponible dans votre portefeuille.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 w-full max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Montant déposé</span>
                    <span className="text-sm font-medium text-slate-200">
                      {amount ? formatCurrency(amount) : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Statut</span>
                    <span className="text-sm font-medium text-green-400">Complété</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Date</span>
                    <span className="text-sm font-medium text-slate-200">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                <Alert className="bg-blue-900/20 border-blue-700/50 text-blue-300">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Vous pouvez maintenant utiliser ces fonds pour investir dans des projets.
                  </AlertDescription>
                </Alert>
                <div className="flex space-x-4">
                  <Button
                    onClick={() => router.push("/wallet")}
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    Voir mon portefeuille
                  </Button>
                  <Button
                    onClick={() => router.push("/projects")}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  >
                    Explorer les projets
                  </Button>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

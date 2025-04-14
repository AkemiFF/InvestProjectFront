"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { investmentsService } from "@/services/investments-service"
import { paymentService } from "@/services/payment-service"

import { ArrowLeft, Check, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function InvestmentSuccessPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const projectId = params.id

  const [isLoading, setIsLoading] = useState(true)
  const [investmentDetails, setInvestmentDetails] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError("Session ID manquant. Impossible de vérifier le paiement.")
        setIsLoading(false)
        return
      }

      try {
        // 1. Vérifier le statut de la session de paiement
        const sessionStatus = await paymentService.checkSessionStatus(sessionId)
        console.log(sessionStatus);

        if (sessionStatus.status !== "complete") {
          setError("Le paiement n'a pas été complété. Veuillez réessayer.")
          setIsLoading(false)
          return
        }

        // 2. Créer l'investissement avec les détails de la session
        const investmentData = {
          project: projectId as string,
          project_id: projectId as unknown as number,
          amount: sessionStatus.amount / 100, // Convertir les centimes en unités
          payment_method: "bank",
          payment_session_id: sessionId,
        }

        const investment = await investmentsService.createInvestment(investmentData)
        console.log("Investment created:", investment)
        setInvestmentDetails(investment.data)

        toast({
          title: "Investissement réussi",
          description: "Votre paiement a été confirmé et votre investissement a été enregistré.",
        })
      } catch (err: any) {
        console.error("Error verifying payment:", err)
        setError(err.message || "Une erreur est survenue lors de la vérification du paiement.")
      } finally {
        setIsLoading(false)
      }
    }

    verifyPayment()
  }, [sessionId, projectId])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout userType="investor">
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <Link href="/projects" className="hover:text-slate-300 flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4" /> Retour aux projets
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-300">Confirmation d'investissement</span>
        </div>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-100">Confirmation de paiement</CardTitle>
            <CardDescription className="text-slate-400">
              Vérification de votre paiement et finalisation de l'investissement
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-12 w-12 text-cyan-500 animate-spin" />
                <p className="text-slate-300">Vérification de votre paiement...</p>
              </div>
            ) : error ? (
              <div className="space-y-6">
                <Alert variant="destructive" className="bg-red-900/20 border-red-700/50 text-red-300">
                  <AlertTitle>Erreur de paiement</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                <div className="flex justify-center">
                  <Button
                    onClick={() => router.push(`/projects/${projectId}`)}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  >
                    Retour au projet
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="h-20 w-20 rounded-full bg-green-900/20 flex items-center justify-center mb-2">
                    <Check className="h-10 w-10 text-green-500" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-100">Investissement réussi !</h2>
                  <p className="text-slate-400 text-center max-w-md">
                    Votre paiement a été confirmé et votre investissement a été enregistré avec succès.
                  </p>
                </div>

                {investmentDetails && (
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 w-full max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">Montant investi</span>
                      <span className="text-sm font-medium text-slate-200">
                        {formatCurrency(investmentDetails.amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">Projet</span>
                      <span className="text-sm font-medium text-slate-200">{investmentDetails.project.title}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">Date</span>
                      <span className="text-sm font-medium text-slate-200">
                        {new Date(investmentDetails.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Statut</span>
                      <span className="text-sm font-medium text-green-400">Confirmé</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-center space-x-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/investments/dashboard")}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    Voir mes investissements
                  </Button>
                  <Button
                    onClick={() => router.push("/projects")}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  >
                    Explorer d'autres projets
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowLeft, Calendar, Wallet } from "lucide-react"

export default function WithdrawSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [amount, setAmount] = useState<string | null>(null)
  const [currency, setCurrency] = useState<string | null>(null)
  const [estimatedArrival, setEstimatedArrival] = useState<string | null>(null)

  useEffect(() => {
    // Récupérer les paramètres de l'URL
    const amountParam = searchParams.get("amount")
    const currencyParam = searchParams.get("currency")
    const arrivalParam = searchParams.get("arrival")

    if (!amountParam || !currencyParam) {
      // Rediriger vers la page du portefeuille si les paramètres sont manquants
      router.push("/wallet")
      return
    }

    setAmount(amountParam)
    setCurrency(currencyParam)
    setEstimatedArrival(arrivalParam)
  }, [searchParams, router])

  // Format currency
  const formatCurrency = (amount: string, currency: string) => {
    const numAmount = Number.parseFloat(amount)

    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: currency === "MGA" ? 0 : 2,
    }).format(numAmount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-MG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <DashboardLayout userType="investor">
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <CardTitle className="text-2xl text-slate-100">Retrait confirmé</CardTitle>
            <CardDescription className="text-slate-400">
              Votre demande de retrait a été enregistrée avec succès
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {amount && currency && (
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-md border border-slate-700/50">
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 text-cyan-500 mr-3" />
                  <span className="text-sm text-slate-300">Montant</span>
                </div>
                <span className="text-lg font-semibold text-slate-100">{formatCurrency(amount, currency)}</span>
              </div>
            )}

            {estimatedArrival && (
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-md border border-slate-700/50">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-amber-500 mr-3" />
                  <span className="text-sm text-slate-300">Date estimée d'arrivée</span>
                </div>
                <span className="text-sm font-medium text-slate-100">{formatDate(estimatedArrival)}</span>
              </div>
            )}

            <div className="mt-6 text-sm text-slate-400 text-center">
              <p>
                Votre demande de retrait est en cours de traitement. Vous recevrez une notification lorsque les fonds
                seront transférés sur votre compte bancaire.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link href="/wallet" className="w-full">
              <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                Retour au portefeuille
              </Button>
            </Link>
            <Link href="/investments/dashboard" className="w-full">
              <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                <ArrowLeft className="mr-2 h-4 w-4" /> Voir mes investissements
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

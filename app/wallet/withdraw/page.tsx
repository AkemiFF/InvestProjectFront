"use client"

import type React from "react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import type { Wallet, WithdrawalLimits } from "@/services/wallet-service"
import { walletService } from "@/services/wallet-service"
import {
  AlertTriangle,
  ArrowLeft,
  BanknoteIcon as BankIcon,
  Banknote,
  CreditCard,
  DollarSign,
  Euro,
  WalletIcon,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function WithdrawPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("EUR")
  const [accountNumber, setAccountNumber] = useState("")
  const [bankCode, setBankCode] = useState("")
  const [accountName, setAccountName] = useState("")
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [withdrawalLimits, setWithdrawalLimits] = useState<WithdrawalLimits | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [walletData, limitsData] = await Promise.all([
          walletService.getWallet(),
          walletService.getWithdrawalLimits(),
        ])

        setWallet(walletData)
        setWithdrawalLimits(limitsData)

        // Définir la devise par défaut à celle du portefeuille
        if (walletData.currency) {
          setCurrency(walletData.currency)
        }

        setError(null)
      } catch (err) {
        console.error("Error fetching wallet data:", err)
        setError("Impossible de charger les données du portefeuille. Veuillez réessayer.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un montant valide.",
        variant: "destructive",
      })
      return
    }

    if (!accountNumber || !bankCode || !accountName) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs bancaires.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      const response = await walletService.createWithdrawal({
        amount: Number.parseFloat(amount),
        currency,
        account_number: accountNumber,
        bank_code: bankCode,
        account_name: accountName,
      })

      toast({
        title: "Demande de retrait créée",
        description: `Votre demande de retrait de ${amount} ${currency} a été créée avec succès. Date estimée d'arrivée: ${response.estimated_arrival}.`,
      })

      // Rediriger vers la page du portefeuille
      router.push("/wallet")
    } catch (err: any) {
      console.error("Error creating withdrawal:", err)
      toast({
        title: "Erreur",
        description: err.response?.data?.detail || "Impossible de créer la demande de retrait. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format currency
  const formatCurrency = (amount: number | string, currencyCode = "EUR") => {
    const numAmount = typeof amount === "string" ? Number.parseFloat(amount) : amount

    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: currencyCode === "MGA" ? 0 : 2,
    }).format(numAmount)
  }

  // Get currency icon
  const getCurrencyIcon = (currencyCode: string) => {
    switch (currencyCode) {
      case "EUR":
        return <Euro className="h-4 w-4" />
      case "USD":
        return <DollarSign className="h-4 w-4" />
      case "MGA":
        return <Banknote className="h-4 w-4" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  return (
    <DashboardLayout userType="investor">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Retrait de fonds</h1>
            <p className="text-slate-400">Retirez des fonds de votre portefeuille vers votre compte bancaire</p>
          </div>

          <Link href="/wallet">
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour au portefeuille
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 border-4 border-slate-600 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-red-400 mb-4">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                >
                  Réessayer
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100">Formulaire de retrait</CardTitle>
                  <CardDescription className="text-slate-400">
                    Remplissez ce formulaire pour retirer des fonds de votre portefeuille
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="amount" className="text-slate-300">
                          Montant à retirer
                        </Label>
                        <div className="flex mt-1.5">
                          <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger className="w-[100px] bg-slate-800 border-slate-700 text-slate-300">
                              <SelectValue placeholder="Devise" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="EUR" className="text-slate-300">
                                <div className="flex items-center">
                                  <Euro className="mr-2 h-4 w-4 text-slate-400" />
                                  <span>EUR</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="USD" className="text-slate-300">
                                <div className="flex items-center">
                                  <DollarSign className="mr-2 h-4 w-4 text-slate-400" />
                                  <span>USD</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="MGA" className="text-slate-300">
                                <div className="flex items-center">
                                  <Banknote className="mr-2 h-4 w-4 text-slate-400" />
                                  <span>MGA</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="flex-1 ml-2 bg-slate-800 border-slate-700 text-slate-300"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                        {withdrawalLimits && (
                          <p className="text-xs text-slate-500 mt-1">
                            Limite de retrait:{" "}
                            {formatCurrency(withdrawalLimits[currency as keyof WithdrawalLimits], currency)}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-700/50">
                        <h3 className="text-sm font-medium text-slate-300 mb-3">Informations bancaires</h3>

                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="accountName" className="text-slate-300">
                              Nom du titulaire
                            </Label>
                            <Input
                              id="accountName"
                              placeholder="Nom complet du titulaire"
                              value={accountName}
                              onChange={(e) => setAccountName(e.target.value)}
                              className="mt-1.5 bg-slate-800 border-slate-700 text-slate-300"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="accountNumber" className="text-slate-300">
                              Numéro de compte
                            </Label>
                            <Input
                              id="accountNumber"
                              placeholder="IBAN ou numéro de compte"
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value)}
                              className="mt-1.5 bg-slate-800 border-slate-700 text-slate-300"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="bankCode" className="text-slate-300">
                              Code banque / BIC
                            </Label>
                            <Input
                              id="bankCode"
                              placeholder="Code banque ou BIC"
                              value={bankCode}
                              onChange={(e) => setBankCode(e.target.value)}
                              className="mt-1.5 bg-slate-800 border-slate-700 text-slate-300"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Alert className="bg-amber-900/20 border-amber-700/50 text-amber-200">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Important</AlertTitle>
                      <AlertDescription className="text-amber-300/80">
                        Les retraits peuvent prendre jusqu'à 3 jours ouvrables pour être traités. Assurez-vous que les
                        informations bancaires sont correctes.
                      </AlertDescription>
                    </Alert>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-slate-600 border-t-white rounded-full animate-spin mr-2"></div>
                          Traitement en cours...
                        </>
                      ) : (
                        "Confirmer le retrait"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Solde disponible</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-cyan-900/30 flex items-center justify-center">
                      <WalletIcon className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-slate-100">
                        {wallet ? formatCurrency(wallet.balance, wallet.currency) : "0"}
                      </div>
                      <div className="text-xs text-slate-500">Solde actuel</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Méthodes de retrait</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-slate-800/50 rounded-md border border-slate-700/50">
                      <BankIcon className="h-5 w-5 text-cyan-500 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-slate-200">Virement bancaire</div>
                        <div className="text-xs text-slate-500">3-5 jours ouvrables</div>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-slate-800/20 rounded-md border border-slate-700/30 opacity-60">
                      <CreditCard className="h-5 w-5 text-slate-500 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-slate-400">Carte bancaire</div>
                        <div className="text-xs text-slate-500">Bientôt disponible</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Limites de retrait</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {withdrawalLimits &&
                      Object.entries(withdrawalLimits).map(([curr, limit]) => (
                        <div key={curr} className="flex items-center justify-between">
                          <div className="flex items-center">
                            {getCurrencyIcon(curr)}
                            <span className="ml-2 text-sm text-slate-300">{curr}</span>
                          </div>
                          <span className="text-sm text-slate-300">{formatCurrency(limit, curr)}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

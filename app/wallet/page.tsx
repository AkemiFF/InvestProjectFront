"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import type { Transaction, Wallet } from "@/services/wallet-service"
import { walletService } from "@/services/wallet-service"
import {
  ArrowDown,
  ArrowUp,
  Banknote,
  Clock,
  DollarSign,
  Download,
  Euro,
  Plus,
  DollarSignIcon as USDIcon,
  WalletIcon
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function WalletPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [changingCurrency, setChangingCurrency] = useState(false)

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setIsLoading(true)
        const walletData = await walletService.getWallet()
        setWallet(walletData)

        const transactionsData = await walletService.getTransactions()
        setTransactions(transactionsData.results)

        setError(null)
      } catch (err) {
        console.error("Error fetching wallet data:", err)
        setError("Impossible de charger les données du portefeuille. Veuillez réessayer.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchWalletData()
  }, [])

  const handleChangeCurrency = async (currency: string) => {
    try {
      setChangingCurrency(true)
      const response = await walletService.changeCurrency(currency)

      // Mettre à jour le portefeuille avec les nouvelles données
      setWallet((prev) =>
        prev
          ? {
            ...prev,
            balance: response.new_balance,
            currency: response.currency,
          }
          : null,
      )

      toast({
        title: "Devise modifiée",
        description: response.status,
      })
    } catch (err) {
      console.error("Error changing currency:", err)
      toast({
        title: "Erreur",
        description: "Impossible de changer la devise. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setChangingCurrency(false)
    }
  }

  // Format currency
  const formatCurrency = (amount: number | string, currency?: string) => {
    const numAmount = typeof amount === "string" ? Number.parseFloat(amount) : amount

    // Utiliser la devise du portefeuille ou celle spécifiée
    const currencyCode = currency || wallet?.currency || "MGA"

    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: currencyCode === "MGA" ? 0 : 2,
    }).format(numAmount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-MG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get transaction icon and color
  const getTransactionDetails = (type: string) => {
    switch (type) {
      case "deposit":
        return {
          icon: <ArrowDown className="h-4 w-4 text-green-500" />,
          color: "text-green-500",
          badge: <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Dépôt</Badge>,
        }
      case "withdrawal":
        return {
          icon: <ArrowUp className="h-4 w-4 text-red-500" />,
          color: "text-red-500",
          badge: <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Retrait</Badge>,
        }
      case "investment":
        return {
          icon: <ArrowUp className="h-4 w-4 text-amber-500" />,
          color: "text-amber-500",
          badge: <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">Investissement</Badge>,
        }
      case "return":
        return {
          icon: <ArrowDown className="h-4 w-4 text-blue-500" />,
          color: "text-blue-500",
          badge: <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Retour</Badge>,
        }
      default:
        return {
          icon: <DollarSign className="h-4 w-4 text-slate-500" />,
          color: "text-slate-500",
          badge: <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/30">{type}</Badge>,
        }
    }
  }

  // Get currency icon
  const getCurrencyIcon = (currency?: string) => {
    const currencyCode = currency || wallet?.currency || "MGA"

    switch (currencyCode) {
      case "EUR":
        return <Euro className="h-4 w-4" />
      case "USD":
        return <USDIcon className="h-4 w-4" />
      case "MGA":
        return <Banknote className="h-4 w-4" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Mon Portefeuille</h1>
            <p className="text-slate-400">Gérez vos fonds et suivez vos transactions</p>
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  {getCurrencyIcon(wallet?.currency)}
                  <span className="ml-2">{wallet?.currency || "MGA"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                <DropdownMenuItem
                  onClick={() => handleChangeCurrency("EUR")}
                  className="text-slate-200 focus:bg-slate-700 focus:text-slate-100"
                  disabled={changingCurrency || wallet?.currency === "EUR"}
                >
                  <Euro className="mr-2 h-4 w-4 text-slate-400" />
                  <span>Euro (EUR)</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleChangeCurrency("USD")}
                  className="text-slate-200 focus:bg-slate-700 focus:text-slate-100"
                  disabled={changingCurrency || wallet?.currency === "USD"}
                >
                  <USDIcon className="mr-2 h-4 w-4 text-slate-400" />
                  <span>Dollar (USD)</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleChangeCurrency("MGA")}
                  className="text-slate-200 focus:bg-slate-700 focus:text-slate-100"
                  disabled={changingCurrency || wallet?.currency === "MGA"}
                >
                  <Banknote className="mr-2 h-4 w-4 text-slate-400" />
                  <span>Ariary (MGA)</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/wallet/deposit">
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                <Plus className="mr-2 h-4 w-4" /> Déposer des fonds
              </Button>
            </Link>
          </div>
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm md:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100">Solde du portefeuille</CardTitle>
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">Disponible</Badge>
                  </div>
                  <CardDescription className="text-slate-400">
                    Votre solde actuel disponible pour investir
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-cyan-900/30 flex items-center justify-center">
                      <WalletIcon className="h-8 w-8 text-cyan-500" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-slate-100">
                        {wallet ? formatCurrency(wallet.balance, wallet.currency) : "0"}
                      </div>
                      <div className="text-sm text-slate-400">
                        Dernière mise à jour: {wallet ? formatDate(wallet.updated_at) : "N/A"}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700/50 pt-4 flex justify-between">
                  <Link href="/wallet/deposit">
                    <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                      <Plus className="mr-2 h-4 w-4" /> Déposer
                    </Button>
                  </Link>
                  <Link href="/wallet/withdraw">
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                      <ArrowUp className="mr-2 h-4 w-4" /> Retirer
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Actions rapides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/wallet/deposit">
                      {/* <Button
                        variant="outline"
                        className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        <CreditCard className="mr-2 h-4 w-4 text-cyan-500" /> Ajouter une carte
                      </Button> */}
                    </Link>
                    <Link href="/projects">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        <Plus className="mr-2 h-4 w-4 text-green-500" /> Investir dans un projet
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      <Download className="mr-2 h-4 w-4 text-blue-500" /> Télécharger l'historique
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100">Historique des transactions</CardTitle>
                <CardDescription className="text-slate-400">Suivez toutes vos transactions récentes</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">Toutes</TabsTrigger>
                    <TabsTrigger value="deposits">Dépôts</TabsTrigger>
                    <TabsTrigger value="withdrawals">Retraits</TabsTrigger>
                    <TabsTrigger value="investments">Investissements</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                            <th className="text-left font-medium p-3">Transaction</th>
                            <th className="text-left font-medium p-3">Date</th>
                            <th className="text-left font-medium p-3">Montant</th>
                            <th className="text-left font-medium p-3">Statut</th>
                            <th className="text-left font-medium p-3">Détails</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.length > 0 ? (
                            transactions.map((transaction) => {
                              const { icon, color, badge } = getTransactionDetails(transaction.transaction_type)
                              return (
                                <tr key={transaction.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                                  <td className="p-3">
                                    <div className="flex items-center">
                                      <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                                        {icon}
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium text-slate-200">
                                          {transaction.transaction_type === "investment"
                                            ? "Investissement"
                                            : transaction.transaction_type === "deposit"
                                              ? "Dépôt"
                                              : transaction.transaction_type === "withdrawal"
                                                ? "Retrait"
                                                : "Retour"}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                          {transaction.project ? transaction.project.title : "Portefeuille"}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <div className="text-sm text-slate-300">{formatDate(transaction.created_at)}</div>
                                  </td>
                                  <td className="p-3">
                                    <div className={`text-sm font-medium ${color}`}>
                                      {transaction.transaction_type === "deposit" ||
                                        transaction.transaction_type === "return"
                                        ? "+"
                                        : "-"}
                                      {formatCurrency(transaction.amount, wallet?.currency)}
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    {transaction.status === "completed" ? (
                                      <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                                        Complété
                                      </Badge>
                                    ) : transaction.status === "pending" ? (
                                      <div className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1 text-amber-500" />
                                        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                                          En attente
                                        </Badge>
                                      </div>
                                    ) : (
                                      <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Échoué</Badge>
                                    )}
                                  </td>
                                  <td className="p-3">
                                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                                      Détails
                                    </Button>
                                  </td>
                                </tr>
                              )
                            })
                          ) : (
                            <tr>
                              <td colSpan={5} className="p-6 text-center text-slate-400">
                                Aucune transaction trouvée
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="deposits">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                            <th className="text-left font-medium p-3">Transaction</th>
                            <th className="text-left font-medium p-3">Date</th>
                            <th className="text-left font-medium p-3">Montant</th>
                            <th className="text-left font-medium p-3">Statut</th>
                            <th className="text-left font-medium p-3">Détails</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.filter((t) => t.transaction_type === "deposit").length > 0 ? (
                            transactions
                              .filter((t) => t.transaction_type === "deposit")
                              .map((transaction) => {
                                const { icon, color, badge } = getTransactionDetails(transaction.transaction_type)
                                return (
                                  <tr
                                    key={transaction.id}
                                    className="border-b border-slate-700/30 hover:bg-slate-800/30"
                                  >
                                    <td className="p-3">
                                      <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                                          {icon}
                                        </div>
                                        <div>
                                          <div className="text-sm font-medium text-slate-200">Dépôt</div>
                                          <div className="text-xs text-slate-500">Portefeuille</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      <div className="text-sm text-slate-300">{formatDate(transaction.created_at)}</div>
                                    </td>
                                    <td className="p-3">
                                      <div className={`text-sm font-medium ${color}`}>
                                        +{formatCurrency(transaction.amount, wallet?.currency)}
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      {transaction.status === "completed" ? (
                                        <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                                          Complété
                                        </Badge>
                                      ) : transaction.status === "pending" ? (
                                        <div className="flex items-center">
                                          <Clock className="h-3 w-3 mr-1 text-amber-500" />
                                          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                                            En attente
                                          </Badge>
                                        </div>
                                      ) : (
                                        <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Échoué</Badge>
                                      )}
                                    </td>
                                    <td className="p-3">
                                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                                        Détails
                                      </Button>
                                    </td>
                                  </tr>
                                )
                              })
                          ) : (
                            <tr>
                              <td colSpan={5} className="p-6 text-center text-slate-400">
                                Aucun dépôt trouvé
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="withdrawals">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                            <th className="text-left font-medium p-3">Transaction</th>
                            <th className="text-left font-medium p-3">Date</th>
                            <th className="text-left font-medium p-3">Montant</th>
                            <th className="text-left font-medium p-3">Statut</th>
                            <th className="text-left font-medium p-3">Détails</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.filter((t) => t.transaction_type === "withdrawal").length > 0 ? (
                            transactions
                              .filter((t) => t.transaction_type === "withdrawal")
                              .map((transaction) => {
                                const { icon, color, badge } = getTransactionDetails(transaction.transaction_type)
                                return (
                                  <tr
                                    key={transaction.id}
                                    className="border-b border-slate-700/30 hover:bg-slate-800/30"
                                  >
                                    <td className="p-3">
                                      <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                                          {icon}
                                        </div>
                                        <div>
                                          <div className="text-sm font-medium text-slate-200">Retrait</div>
                                          <div className="text-xs text-slate-500">Portefeuille</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      <div className="text-sm text-slate-300">{formatDate(transaction.created_at)}</div>
                                    </td>
                                    <td className="p-3">
                                      <div className={`text-sm font-medium ${color}`}>
                                        -{formatCurrency(transaction.amount, wallet?.currency)}
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      {transaction.status === "completed" ? (
                                        <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                                          Complété
                                        </Badge>
                                      ) : transaction.status === "pending" ? (
                                        <div className="flex items-center">
                                          <Clock className="h-3 w-3 mr-1 text-amber-500" />
                                          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                                            En attente
                                          </Badge>
                                        </div>
                                      ) : (
                                        <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Échoué</Badge>
                                      )}
                                    </td>
                                    <td className="p-3">
                                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                                        Détails
                                      </Button>
                                    </td>
                                  </tr>
                                )
                              })
                          ) : (
                            <tr>
                              <td colSpan={5} className="p-6 text-center text-slate-400">
                                Aucun retrait trouvé
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="investments">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                            <th className="text-left font-medium p-3">Transaction</th>
                            <th className="text-left font-medium p-3">Date</th>
                            <th className="text-left font-medium p-3">Montant</th>
                            <th className="text-left font-medium p-3">Statut</th>
                            <th className="text-left font-medium p-3">Détails</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.filter((t) => t.transaction_type === "investment").length > 0 ? (
                            transactions
                              .filter((t) => t.transaction_type === "investment")
                              .map((transaction) => {
                                const { icon, color, badge } = getTransactionDetails(transaction.transaction_type)
                                return (
                                  <tr
                                    key={transaction.id}
                                    className="border-b border-slate-700/30 hover:bg-slate-800/30"
                                  >
                                    <td className="p-3">
                                      <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                                          {icon}
                                        </div>
                                        <div>
                                          <div className="text-sm font-medium text-slate-200">Investissement</div>
                                          <div className="text-xs text-slate-500">
                                            {transaction.project ? transaction.project.title : "Projet"}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      <div className="text-sm text-slate-300">{formatDate(transaction.created_at)}</div>
                                    </td>
                                    <td className="p-3">
                                      <div className={`text-sm font-medium ${color}`}>
                                        -{formatCurrency(transaction.amount, wallet?.currency)}
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      {transaction.status === "completed" ? (
                                        <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                                          Complété
                                        </Badge>
                                      ) : transaction.status === "pending" ? (
                                        <div className="flex items-center">
                                          <Clock className="h-3 w-3 mr-1 text-amber-500" />
                                          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                                            En attente
                                          </Badge>
                                        </div>
                                      ) : (
                                        <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Échoué</Badge>
                                      )}
                                    </td>
                                    <td className="p-3">
                                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                                        Détails
                                      </Button>
                                    </td>
                                  </tr>
                                )
                              })
                          ) : (
                            <tr>
                              <td colSpan={5} className="p-6 text-center text-slate-400">
                                Aucun investissement trouvé
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t border-slate-700/50 pt-4 flex justify-center">
                <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-slate-100">
                  Voir toutes les transactions
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

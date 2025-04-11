"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Briefcase,
  Clock,
  DollarSign,
  Eye,
  PieChart,
  Plus,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { walletService } from "@/services/wallet-service"
import type { Investment, Transaction } from "@/services/wallet-service"

export default function InvestmentDashboardPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [timeRange, setTimeRange] = useState("all")
  const [summary, setSummary] = useState({
    portfolioValue: 0,
    totalInvested: 0,
    totalReturns: 0,
    activeInvestments: 0,
    portfolioGrowth: 0,
  })
  const [investments, setInvestments] = useState<Investment[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)

        // Récupérer le résumé des investissements
        const summaryData = await walletService.getInvestmentSummary()
        setSummary(summaryData)

        // Récupérer les investissements
        const investmentsData = await walletService.getInvestments({ limit: 5 })
        setInvestments(investmentsData.results)

        // Récupérer les transactions
        const transactionsData = await walletService.getTransactions({ limit: 5 })
        setTransactions(transactionsData.results)

        setError(null)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Impossible de charger les données du tableau de bord. Veuillez réessayer.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get transaction icon and color
  const getTransactionDetails = (type: string) => {
    switch (type) {
      case "investment":
        return {
          icon: <ArrowUp className="h-4 w-4 text-amber-500" />,
          color: "text-amber-500",
          badge: <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">Investment</Badge>,
        }
      case "return":
        return {
          icon: <ArrowDown className="h-4 w-4 text-green-500" />,
          color: "text-green-500",
          badge: <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Return</Badge>,
        }
      case "withdrawal":
        return {
          icon: <ArrowUp className="h-4 w-4 text-red-500" />,
          color: "text-red-500",
          badge: <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Withdrawal</Badge>,
        }
      case "deposit":
        return {
          icon: <ArrowDown className="h-4 w-4 text-blue-500" />,
          color: "text-blue-500",
          badge: <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Deposit</Badge>,
        }
      default:
        return {
          icon: <DollarSign className="h-4 w-4 text-slate-500" />,
          color: "text-slate-500",
          badge: <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/30">{type}</Badge>,
        }
    }
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Investment Dashboard</h1>
            <p className="text-slate-400">Track and manage your investment portfolio</p>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/projects">
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                <Plus className="mr-2 h-4 w-4" /> New Investment
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-10 w-10 rounded-full bg-cyan-900/30 flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-cyan-500" />
                    </div>
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">Total</Badge>
                  </div>
                  <div className="text-2xl font-bold text-slate-100 mb-1">{formatCurrency(summary.portfolioValue)}</div>
                  <div className="text-sm text-slate-400">Portfolio Value</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-blue-500" />
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Invested</Badge>
                  </div>
                  <div className="text-2xl font-bold text-slate-100 mb-1">{formatCurrency(summary.totalInvested)}</div>
                  <div className="text-sm text-slate-400">Total Invested</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Returns</Badge>
                  </div>
                  <div className="text-2xl font-bold text-slate-100 mb-1">{formatCurrency(summary.totalReturns)}</div>
                  <div className="text-sm text-slate-400">Total Returns</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-purple-500" />
                    </div>
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30">Active</Badge>
                  </div>
                  <div className="text-2xl font-bold text-slate-100 mb-1">{summary.activeInvestments}</div>
                  <div className="text-sm text-slate-400">Active Investments</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Portfolio Performance */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100">Portfolio Performance</CardTitle>
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                        <ArrowUp className="h-3 w-3 mr-1" /> {summary.portfolioGrowth}%
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-400">Track your investment growth over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                      <PerformanceChart />
                      <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                        <div className="text-xs text-slate-400">Portfolio Growth</div>
                        <div className="text-lg font-mono text-cyan-400">+{summary.portfolioGrowth}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100">Your Investments</CardTitle>
                    <CardDescription className="text-slate-400">
                      Track all your active and completed investments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                            <th className="text-left font-medium p-3">Project</th>
                            <th className="text-left font-medium p-3">Amount</th>
                            <th className="text-left font-medium p-3">Date</th>
                            <th className="text-left font-medium p-3">Progress</th>
                            <th className="text-left font-medium p-3">Return</th>
                            <th className="text-left font-medium p-3">Status</th>
                            <th className="text-right font-medium p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {investments.length > 0 ? (
                            investments.map((investment) => (
                              <tr key={investment.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                                <td className="p-3">
                                  <div className="flex items-center">
                                    <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center mr-3">
                                      <Briefcase className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-slate-200">
                                        {investment.project.title}
                                      </div>
                                      <div className="text-xs text-slate-500">{investment.project.sector.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div className="text-sm text-cyan-400">{formatCurrency(investment.amount)}</div>
                                </td>
                                <td className="p-3">
                                  <div className="text-sm text-slate-300">{formatDate(investment.created_at)}</div>
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center space-x-2">
                                    <Progress value={investment.progress} className="h-1.5 w-24 bg-slate-700">
                                      <div
                                        className={`h-full rounded-full ${
                                          investment.status === "completed"
                                            ? "bg-green-500"
                                            : "bg-gradient-to-r from-cyan-500 to-blue-500"
                                        }`}
                                        style={{ width: `${investment.progress}%` }}
                                      />
                                    </Progress>
                                    <span className="text-xs text-slate-400">{investment.progress}%</span>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div className="text-sm text-green-400">
                                    {investment.returns ? formatCurrency(investment.returns) : "Pending"}
                                  </div>
                                  <div className="text-xs text-slate-500">{investment.return_rate}% ROI</div>
                                </td>
                                <td className="p-3">
                                  {investment.status === "active" || investment.status === "pending" ? (
                                    <div className="text-sm text-slate-300 flex items-center">
                                      <Clock className="h-3 w-3 mr-1 text-amber-500" /> {investment.days_left} days left
                                    </div>
                                  ) : (
                                    <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                                      Completed
                                    </Badge>
                                  )}
                                </td>
                                <td className="p-3 text-right">
                                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                                    <Eye className="h-3 w-3 mr-1" /> View
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="p-6 text-center text-slate-400">
                                No investments found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-slate-700/50 pt-4 flex justify-center">
                    <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-slate-100">
                      View All Investments
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-base">Portfolio Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center mb-4">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-sm text-slate-400">Portfolio allocation chart will appear here</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-cyan-500 mr-2"></div>
                          <span className="text-sm text-slate-300">Technology</span>
                        </div>
                        <span className="text-sm text-slate-400">35%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm text-slate-300">Green Energy</span>
                        </div>
                        <span className="text-sm text-slate-400">25%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                          <span className="text-sm text-slate-300">Healthcare</span>
                        </div>
                        <span className="text-sm text-slate-400">20%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                          <span className="text-sm text-slate-300">Agriculture</span>
                        </div>
                        <span className="text-sm text-slate-400">15%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-sm text-slate-300">Other</span>
                        </div>
                        <span className="text-sm text-slate-400">5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-base">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.length > 0 ? (
                        transactions.slice(0, 4).map((transaction) => {
                          const { icon, color, badge } = getTransactionDetails(transaction.transaction_type)
                          return (
                            <div key={transaction.id} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                                  {icon}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-slate-200">
                                    {transaction.project ? transaction.project.title : "Wallet Transaction"}
                                  </div>
                                  <div className="text-xs text-slate-500">{formatDate(transaction.created_at)}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-sm font-medium ${color}`}>
                                  {transaction.transaction_type === "investment" ? "-" : "+"}
                                  {formatCurrency(transaction.amount)}
                                </div>
                                <div className="mt-1">{badge}</div>
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        <div className="text-center py-4 text-slate-400">No transactions found</div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-slate-700/50 pt-4">
                    <Link href="/wallet" className="w-full">
                      <Button variant="outline" className="w-full border-slate-700 text-slate-400 hover:text-slate-100">
                        View All Transactions
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-base">Investment Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium text-slate-200">AI-Powered Healthcare</div>
                          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">Featured</Badge>
                        </div>
                        <div className="text-xs text-slate-400 mb-2">Technology • 22% ROI</div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">78% Funded</span>
                          <span className="text-slate-500">5 days left</span>
                        </div>
                        <Progress value={78} className="h-1 mt-1 mb-2 bg-slate-700">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: "78%" }}
                          />
                        </Progress>
                        <Button
                          size="sm"
                          className="w-full mt-2 h-7 text-xs bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                        >
                          View Project
                        </Button>
                      </div>

                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium text-slate-200">Solar Panel Manufacturing</div>
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/30">New</Badge>
                        </div>
                        <div className="text-xs text-slate-400 mb-2">Green Energy • 18% ROI</div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">25% Funded</span>
                          <span className="text-slate-500">21 days left</span>
                        </div>
                        <Progress value={25} className="h-1 mt-1 mb-2 bg-slate-700">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: "25%" }}
                          />
                        </Progress>
                        <Button
                          size="sm"
                          className="w-full mt-2 h-7 text-xs bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                        >
                          View Project
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-slate-700/50 pt-4">
                    <Link href="/projects" className="w-full">
                      <Button variant="outline" className="w-full border-slate-700 text-slate-400 hover:text-slate-100">
                        Browse All Projects
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

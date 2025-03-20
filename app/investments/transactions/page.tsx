"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  Filter,
  Search,
  SlidersHorizontal,
  Wallet,
} from "lucide-react"

export default function TransactionHistoryPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("all")
  const [transactionType, setTransactionType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      type: "investment",
      project: "AI-Powered Healthcare Assistant",
      amount: 2000000,
      date: "2023-11-05",
      time: "14:32:45",
      status: "completed",
      reference: "INV-20231105-001",
    },
    {
      id: 2,
      type: "return",
      project: "Medical Supplies Chain",
      amount: 846000,
      date: "2023-10-25",
      time: "10:15:22",
      status: "completed",
      reference: "RET-20231025-003",
    },
    {
      id: 3,
      type: "investment",
      project: "Urban Farming Initiative",
      amount: 1800000,
      date: "2023-10-02",
      time: "09:45:11",
      status: "completed",
      reference: "INV-20231002-005",
    },
    {
      id: 4,
      type: "return",
      project: "Smart City Infrastructure",
      amount: 350000,
      date: "2023-09-28",
      time: "16:20:33",
      status: "completed",
      reference: "RET-20230928-002",
    },
    {
      id: 5,
      type: "investment",
      project: "EcoTech Solutions",
      amount: 2500000,
      date: "2023-09-15",
      time: "11:05:47",
      status: "completed",
      reference: "INV-20230915-008",
    },
    {
      id: 6,
      type: "deposit",
      project: "Wallet Funding",
      amount: 5000000,
      date: "2023-09-10",
      time: "14:22:18",
      status: "completed",
      reference: "DEP-20230910-004",
    },
    {
      id: 7,
      type: "withdrawal",
      project: "Bank Transfer",
      amount: 1000000,
      date: "2023-08-28",
      time: "15:40:29",
      status: "completed",
      reference: "WIT-20230828-001",
    },
    {
      id: 8,
      type: "return",
      project: "Renewable Energy Plant",
      amount: 450000,
      date: "2023-08-15",
      time: "09:12:55",
      status: "completed",
      reference: "RET-20230815-006",
    },
    {
      id: 9,
      type: "investment",
      project: "FinTech Mobile App",
      amount: 3500000,
      date: "2023-08-05",
      time: "10:30:42",
      status: "completed",
      reference: "INV-20230805-007",
    },
    {
      id: 10,
      type: "deposit",
      project: "Wallet Funding",
      amount: 10000000,
      date: "2023-07-20",
      time: "13:25:11",
      status: "completed",
      reference: "DEP-20230720-002",
    },
  ]

  // Filter transactions based on search query, date range, and type
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by search query
    if (
      searchQuery &&
      !transaction.project.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !transaction.reference.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by transaction type
    if (transactionType !== "all" && transaction.type !== transactionType) {
      return false
    }

    // Filter by date range
    if (dateRange !== "all") {
      const transactionDate = new Date(transaction.date)
      const currentDate = new Date()

      if (
        dateRange === "month" &&
        (transactionDate.getMonth() !== currentDate.getMonth() ||
          transactionDate.getFullYear() !== currentDate.getFullYear())
      ) {
        return false
      }

      if (dateRange === "quarter") {
        const currentQuarter = Math.floor(currentDate.getMonth() / 3)
        const transactionQuarter = Math.floor(transactionDate.getMonth() / 3)

        if (transactionQuarter !== currentQuarter || transactionDate.getFullYear() !== currentDate.getFullYear()) {
          return false
        }
      }

      if (dateRange === "year" && transactionDate.getFullYear() !== currentDate.getFullYear()) {
        return false
      }
    }

    return true
  })

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

  // Calculate totals
  const calculateTotals = () => {
    let totalInvestments = 0
    let totalReturns = 0
    let totalDeposits = 0
    let totalWithdrawals = 0

    transactions.forEach((transaction) => {
      switch (transaction.type) {
        case "investment":
          totalInvestments += transaction.amount
          break
        case "return":
          totalReturns += transaction.amount
          break
        case "deposit":
          totalDeposits += transaction.amount
          break
        case "withdrawal":
          totalWithdrawals += transaction.amount
          break
      }
    })

    return {
      totalInvestments,
      totalReturns,
      totalDeposits,
      totalWithdrawals,
      netBalance: totalDeposits + totalReturns - totalInvestments - totalWithdrawals,
    }
  }

  const totals = calculateTotals()

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Transaction History</h1>
            <p className="text-slate-400">View and manage your financial transactions</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search transactions..."
                className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-slate-700 bg-slate-800/50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-slate-700 bg-slate-800/50">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-100 text-base flex items-center">
                  <SlidersHorizontal className="mr-2 h-5 w-5 text-cyan-500" />
                  Filter Transactions
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Date Range</label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Transaction Type</label>
                  <Select value={transactionType} onValueChange={setTransactionType}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="investment">Investments</SelectItem>
                      <SelectItem value="return">Returns</SelectItem>
                      <SelectItem value="deposit">Deposits</SelectItem>
                      <SelectItem value="withdrawal">Withdrawals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={() => {
                      setSearchQuery("")
                      setDateRange("all")
                      setTransactionType("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                  <Wallet className="h-4 w-4 text-blue-500" />
                </div>
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Net</Badge>
              </div>
              <div className="text-lg font-bold text-slate-100 mb-1">{formatCurrency(totals.netBalance)}</div>
              <div className="text-xs text-slate-400">Net Balance</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="h-8 w-8 rounded-full bg-amber-900/30 flex items-center justify-center">
                  <ArrowUp className="h-4 w-4 text-amber-500" />
                </div>
                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">Out</Badge>
              </div>
              <div className="text-lg font-bold text-slate-100 mb-1">{formatCurrency(totals.totalInvestments)}</div>
              <div className="text-xs text-slate-400">Total Investments</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="h-8 w-8 rounded-full bg-green-900/30 flex items-center justify-center">
                  <ArrowDown className="h-4 w-4 text-green-500" />
                </div>
                <Badge className="bg-green-500/10 text-green-400 border-green-500/30">In</Badge>
              </div>
              <div className="text-lg font-bold text-slate-100 mb-1">{formatCurrency(totals.totalReturns)}</div>
              <div className="text-xs text-slate-400">Total Returns</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="h-8 w-8 rounded-full bg-cyan-900/30 flex items-center justify-center">
                  <ArrowDown className="h-4 w-4 text-cyan-500" />
                </div>
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">In</Badge>
              </div>
              <div className="text-lg font-bold text-slate-100 mb-1">{formatCurrency(totals.totalDeposits)}</div>
              <div className="text-xs text-slate-400">Total Deposits</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="h-8 w-8 rounded-full bg-red-900/30 flex items-center justify-center">
                  <ArrowUp className="h-4 w-4 text-red-500" />
                </div>
                <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Out</Badge>
              </div>
              <div className="text-lg font-bold text-slate-100 mb-1">{formatCurrency(totals.totalWithdrawals)}</div>
              <div className="text-xs text-slate-400">Total Withdrawals</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-slate-800/50 p-1 mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              All Transactions
            </TabsTrigger>
            <TabsTrigger
              value="investments"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Investments
            </TabsTrigger>
            <TabsTrigger value="returns" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              Returns
            </TabsTrigger>
            <TabsTrigger
              value="deposits"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Deposits
            </TabsTrigger>
            <TabsTrigger
              value="withdrawals"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Withdrawals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                        <th className="text-left font-medium p-4">Reference</th>
                        <th className="text-left font-medium p-4">Date & Time</th>
                        <th className="text-left font-medium p-4">Type</th>
                        <th className="text-left font-medium p-4">Project</th>
                        <th className="text-right font-medium p-4">Amount</th>
                        <th className="text-right font-medium p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => {
                        const { icon, color, badge } = getTransactionDetails(transaction.type)
                        return (
                          <tr key={transaction.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                            <td className="p-4">
                              <div className="text-sm font-mono text-slate-300">{transaction.reference}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-slate-300">{formatDate(transaction.date)}</div>
                              <div className="text-xs text-slate-500">{transaction.time}</div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                                  {icon}
                                </div>
                                <div>{badge}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-slate-300">{transaction.project}</div>
                            </td>
                            <td className="p-4 text-right">
                              <div className={`text-sm font-medium ${color}`}>
                                {transaction.type === "investment" || transaction.type === "withdrawal" ? "-" : "+"}
                                {formatCurrency(transaction.amount)}
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                                {transaction.status}
                              </Badge>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredTransactions.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="h-12 w-12 text-slate-600 mb-4" />
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No transactions found</h3>
                    <p className="text-sm text-slate-500 max-w-md mb-6">
                      We couldn't find any transactions matching your search criteria. Try adjusting your filters or
                      search query.
                    </p>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      onClick={() => {
                        setSearchQuery("")
                        setDateRange("all")
                        setTransactionType("all")
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </CardContent>
              {filteredTransactions.length > 0 && (
                <CardFooter className="border-t border-slate-700/50 pt-4 flex justify-between items-center">
                  <div className="text-sm text-slate-400">
                    Showing {filteredTransactions.length} of {transactions.length} transactions
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-slate-400 hover:text-slate-100"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-slate-400 hover:text-slate-100"
                    >
                      Next
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="mt-0">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                        <th className="text-left font-medium p-4">Reference</th>
                        <th className="text-left font-medium p-4">Date & Time</th>
                        <th className="text-left font-medium p-4">Project</th>
                        <th className="text-right font-medium p-4">Amount</th>
                        <th className="text-right font-medium p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions
                        .filter((t) => t.type === "investment")
                        .map((transaction) => (
                          <tr key={transaction.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                            <td className="p-4">
                              <div className="text-sm font-mono text-slate-300">{transaction.reference}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-slate-300">{formatDate(transaction.date)}</div>
                              <div className="text-xs text-slate-500">{transaction.time}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-slate-300">{transaction.project}</div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="text-sm font-medium text-amber-500">
                                -{formatCurrency(transaction.amount)}
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                                {transaction.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {filteredTransactions.filter((t) => t.type === "investment").length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No investment transactions found</h3>
                    <p className="text-sm text-slate-500 max-w-md">
                      We couldn't find any investment transactions matching your search criteria.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="returns" className="mt-0">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                        <th className="text-left font-medium p-4">Reference</th>
                        <th className="text-left font-medium p-4">Date & Time</th>
                        <th className="text-left font-medium p-4">Project</th>
                        <th className="text-right font-medium p-4">Amount</th>
                        <th className="text-right font-medium p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions
                        .filter((t) => t.type === "return")
                        .map((transaction) => (
                          <tr key={transaction.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                            <td className="p-4">
                              <div className="text-sm font-mono text-slate-300">{transaction.reference}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-slate-300">{formatDate(transaction.date)}</div>
                              <div className="text-xs text-slate-500">{transaction.time}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-slate-300">{transaction.project}</div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="text-sm font-medium text-green-500">
                                +{formatCurrency(transaction.amount)}
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                                {transaction.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {filteredTransactions.filter((t) => t.type === "return").length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No return transactions found</h3>
                    <p className="text-sm text-slate-500 max-w-md">
                      We couldn't find any return transactions matching your search criteria.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deposits" className="mt-0">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                        <th className="text-left font-medium p-4">Reference</th>
                        <th className="text-left font-medium p-4">Date & Time</th>
                        <th className="text-left font-medium p-4">Method</th>
                        <th className="text-right font-medium p-4">Amount</th>
                        <th className="text-right font-medium p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions
                        .filter((t) => t.type === "deposit")
                        .map((transaction) => (
                          <tr key={transaction.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                            <td className="p-4">
                              <div className="text-sm font-mono text-slate-300">{transaction.reference}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-slate-300">{formatDate(transaction.date)}</div>
                              <div className="text-xs text-slate-500">{transaction.time}</div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                                  <CreditCard className="h-4 w-4 text-blue-500" />
                                </div>
                                <div className="text-sm text-slate-300">Bank Transfer</div>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="text-sm font-medium text-blue-500">
                                +{formatCurrency(transaction.amount)}
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                                {transaction.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {filteredTransactions.filter((t) => t.type === "deposit").length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No deposit transactions found</h3>
                    <p className="text-sm text-slate-500 max-w-md">
                      We couldn't find any deposit transactions matching your search criteria.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals" className="mt-0">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                        <th className="text-left font-medium p-4">Reference</th>
                        <th className="text-left font-medium p-4">Date & Time</th>
                        <th className="text-left font-medium p-4">Method</th>
                        <th className="text-right font-medium p-4">Amount</th>
                        <th className="text-right font-medium p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions
                        .filter((t) => t.type === "withdrawal")
                        .map((transaction) => (
                          <tr key={transaction.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                            <td className="p-4">
                              <div className="text-sm font-mono text-slate-300">{transaction.reference}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-slate-300">{formatDate(transaction.date)}</div>
                              <div className="text-xs text-slate-500">{transaction.time}</div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                                  <Wallet className="h-4 w-4 text-red-500" />
                                </div>
                                <div className="text-sm text-slate-300">{transaction.project}</div>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="text-sm font-medium text-red-500">
                                -{formatCurrency(transaction.amount)}
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                                {transaction.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {filteredTransactions.filter((t) => t.type === "withdrawal").length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No withdrawal transactions found</h3>
                    <p className="text-sm text-slate-500 max-w-md">
                      We couldn't find any withdrawal transactions matching your search criteria.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}


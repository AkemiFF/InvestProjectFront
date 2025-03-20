"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Filter,
  HelpCircle,
  Info,
  Landmark,
  Lock,
  Search,
  Shield,
  Wallet,
} from "lucide-react"

export default function PaymentsPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [paymentStep, setPaymentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "mobile">("card")
  const [amount, setAmount] = useState("10000")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const handlePaymentSubmit = () => {
    // Simulate API call to Stripe
    setTimeout(() => {
      setShowSuccess(true)
      setPaymentStep(1)

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    }, 1500)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Sample transaction data
  const transactions = [
    {
      id: "TRX-2023-001",
      date: "Mar 15, 2023",
      amount: 500000,
      type: "Investment",
      status: "Completed",
      project: "AI-Powered Healthcare Assistant",
      fee: 15000,
    },
    {
      id: "TRX-2023-002",
      date: "Mar 10, 2023",
      amount: 250000,
      type: "Investment",
      status: "Completed",
      project: "Solar Panel Manufacturing",
      fee: 7500,
    },
    {
      id: "TRX-2023-003",
      date: "Mar 5, 2023",
      amount: 100000,
      type: "Deposit",
      status: "Completed",
      project: "-",
      fee: 0,
    },
    {
      id: "TRX-2023-004",
      date: "Feb 28, 2023",
      amount: 350000,
      type: "Investment",
      status: "Completed",
      project: "Urban Farming Initiative",
      fee: 10500,
    },
    {
      id: "TRX-2023-005",
      date: "Feb 20, 2023",
      amount: 200000,
      type: "Withdrawal",
      status: "Completed",
      project: "-",
      fee: 5000,
    },
    {
      id: "TRX-2023-006",
      date: "Feb 15, 2023",
      amount: 150000,
      type: "Return",
      status: "Completed",
      project: "Educational Platform",
      fee: 0,
    },
  ]

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter((transaction) => {
    if (searchQuery) {
      return (
        transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return true
  })

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Payment Processing</h1>
            <p className="text-slate-400">Manage your investments, deposits, and withdrawals</p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg p-1">
            <Button
              variant={userType === "investor" ? "default" : "ghost"}
              size="sm"
              className={
                userType === "investor"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600"
                  : "text-slate-400 hover:text-slate-100"
              }
              onClick={() => setUserType("investor")}
            >
              Investor View
            </Button>
            <Button
              variant={userType === "project-owner" ? "default" : "ghost"}
              size="sm"
              className={
                userType === "project-owner"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600"
                  : "text-slate-400 hover:text-slate-100"
              }
              onClick={() => setUserType("project-owner")}
            >
              Project Owner View
            </Button>
          </div>
        </div>

        {showSuccess && (
          <Alert className="bg-green-900/20 border-green-700/50 text-green-300">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Payment Successful</AlertTitle>
            <AlertDescription>
              Your payment has been processed successfully. You can view the details in your transaction history.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="process" className="w-full">
          <TabsList className="bg-slate-800/50 p-1 mb-6">
            <TabsTrigger value="process" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              {userType === "investor" ? "Make Payment" : "Receive Payment"}
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              Transaction History
            </TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              Wallet
            </TabsTrigger>
          </TabsList>

          <TabsContent value="process" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">
                  {userType === "investor" ? "Make a Payment" : "Receive a Payment"}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {userType === "investor"
                    ? "Invest in a project or add funds to your wallet"
                    : "Withdraw funds or receive investments"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {paymentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="paymentType">Payment Type</Label>
                      <RadioGroup defaultValue="investment" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <RadioGroupItem value="investment" id="investment" className="peer sr-only" />
                          <Label
                            htmlFor="investment"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-900/10"
                          >
                            <DollarSign className="mb-3 h-6 w-6 text-cyan-400" />
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-200">
                                {userType === "investor" ? "Invest in Project" : "Receive Investment"}
                              </p>
                              <p className="text-xs text-slate-400">
                                {userType === "investor" ? "Fund a specific project" : "Process incoming investment"}
                              </p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="deposit" id="deposit" className="peer sr-only" />
                          <Label
                            htmlFor="deposit"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-900/10"
                          >
                            <Wallet className="mb-3 h-6 w-6 text-cyan-400" />
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-200">
                                {userType === "investor" ? "Add Funds" : "Deposit Funds"}
                              </p>
                              <p className="text-xs text-slate-400">
                                {userType === "investor" ? "Add money to your wallet" : "Add money to project wallet"}
                              </p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="withdrawal" id="withdrawal" className="peer sr-only" />
                          <Label
                            htmlFor="withdrawal"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-900/10"
                          >
                            <Landmark className="mb-3 h-6 w-6 text-cyan-400" />
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-200">
                                {userType === "investor" ? "Withdraw Funds" : "Withdraw Funds"}
                              </p>
                              <p className="text-xs text-slate-400">
                                {userType === "investor"
                                  ? "Transfer to your bank account"
                                  : "Transfer to your bank account"}
                              </p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {userType === "investor" && (
                      <div className="space-y-2">
                        <Label htmlFor="project">Select Project (for Investment)</Label>
                        <Select>
                          <SelectTrigger className="bg-slate-800/50 border-slate-700">
                            <SelectValue placeholder="Select a project" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="project1">AI-Powered Healthcare Assistant</SelectItem>
                            <SelectItem value="project2">Solar Panel Manufacturing</SelectItem>
                            <SelectItem value="project3">Urban Farming Initiative</SelectItem>
                            <SelectItem value="project4">Renewable Energy Plant</SelectItem>
                            <SelectItem value="project5">Educational Platform</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (MGA)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                          id="amount"
                          type="number"
                          className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <Alert className="bg-slate-800/50 border-slate-700">
                      <Info className="h-4 w-4 text-slate-400" />
                      <AlertDescription className="text-slate-400">
                        {userType === "investor"
                          ? "Platform fees: 3% for investments, 1% for deposits, 2% for withdrawals."
                          : "Platform fees: 3% for received investments, 1% for deposits, 2% for withdrawals."}
                      </AlertDescription>
                    </Alert>

                    <Button
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      onClick={() => setPaymentStep(2)}
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {paymentStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <RadioGroup
                        defaultValue="card"
                        value={paymentMethod}
                        onValueChange={(value) => setPaymentMethod(value as any)}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div>
                          <RadioGroupItem value="card" id="card" className="peer sr-only" />
                          <Label
                            htmlFor="card"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-900/10"
                          >
                            <CreditCard className="mb-3 h-6 w-6 text-cyan-400" />
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-200">Credit/Debit Card</p>
                              <p className="text-xs text-slate-400">Visa, Mastercard, etc.</p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
                          <Label
                            htmlFor="bank"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-900/10"
                          >
                            <Landmark className="mb-3 h-6 w-6 text-cyan-400" />
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-200">Bank Transfer</p>
                              <p className="text-xs text-slate-400">Direct bank transfer</p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="mobile" id="mobile" className="peer sr-only" />
                          <Label
                            htmlFor="mobile"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-900/10"
                          >
                            <Wallet className="mb-3 h-6 w-6 text-cyan-400" />
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-200">Mobile Money</p>
                              <p className="text-xs text-slate-400">MVola, Orange Money, etc.</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                              id="cardNumber"
                              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                              placeholder="4242 4242 4242 4242"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              className="bg-slate-800/50 border-slate-700 text-slate-100"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                              <Input
                                id="cvc"
                                className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            className="bg-slate-800/50 border-slate-700 text-slate-100"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "bank" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Select>
                            <SelectTrigger className="bg-slate-800/50 border-slate-700">
                              <SelectValue placeholder="Select your bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="boa">Bank of Africa</SelectItem>
                              <SelectItem value="bfv">BFV-Société Générale</SelectItem>
                              <SelectItem value="bni">BNI Madagascar</SelectItem>
                              <SelectItem value="bmoi">BMOI</SelectItem>
                              <SelectItem value="access">Access Bank</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input
                            id="accountNumber"
                            className="bg-slate-800/50 border-slate-700 text-slate-100"
                            placeholder="Enter your account number"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="accountName">Account Holder Name</Label>
                          <Input
                            id="accountName"
                            className="bg-slate-800/50 border-slate-700 text-slate-100"
                            placeholder="Enter account holder name"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "mobile" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="mobileProvider">Mobile Money Provider</Label>
                          <Select>
                            <SelectTrigger className="bg-slate-800/50 border-slate-700">
                              <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mvola">MVola</SelectItem>
                              <SelectItem value="orange">Orange Money</SelectItem>
                              <SelectItem value="airtel">Airtel Money</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mobileNumber">Mobile Number</Label>
                          <Input
                            id="mobileNumber"
                            className="bg-slate-800/50 border-slate-700 text-slate-100"
                            placeholder="Enter your mobile number"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                          htmlFor="terms"
                          className="text-sm text-slate-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions
                        </label>
                      </div>
                    </div>

                    <Alert className="bg-slate-800/50 border-slate-700">
                      <Shield className="h-4 w-4 text-slate-400" />
                      <AlertDescription className="text-slate-400">
                        Your payment information is secure and encrypted. We use Stripe for secure payment processing.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                {paymentStep === 1 ? (
                  <Button variant="outline" className="w-full sm:w-auto border-slate-700 hover:bg-slate-800">
                    Cancel
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-slate-700 hover:bg-slate-800"
                    onClick={() => setPaymentStep(1)}
                  >
                    Back
                  </Button>
                )}
                {paymentStep === 2 && (
                  <Button
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                    onClick={handlePaymentSubmit}
                  >
                    Complete Payment
                  </Button>
                )}
              </CardFooter>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Payment Summary</CardTitle>
                <CardDescription className="text-slate-400">
                  Review your payment details before proceeding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Amount</span>
                        <span className="text-sm font-medium text-slate-200">{formatCurrency(Number(amount))}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Platform Fee (3%)</span>
                        <span className="text-sm text-slate-200">{formatCurrency(Number(amount) * 0.03)}</span>
                      </div>

                      <Separator className="bg-slate-700/50" />

                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-slate-300">Total</span>
                        <span className="text-sm font-medium text-cyan-400">
                          {formatCurrency(Number(amount) * 1.03)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-cyan-900/10 border-cyan-500/30">
                    <HelpCircle className="h-4 w-4 text-cyan-400" />
                    <AlertDescription className="text-cyan-300">
                      {userType === "investor"
                        ? "Your investment will be processed immediately after payment confirmation."
                        : "Funds will be available in your account after processing (typically 1-2 business days)."}
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-slate-100">Transaction History</CardTitle>
                    <CardDescription className="text-slate-400">View all your past transactions</CardDescription>
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
                    <Button variant="outline" size="icon" className="h-10 w-10 border-slate-700 bg-slate-800/50">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">ID</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Project</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Fee</th>
                        <th className="text-right py-3 px-4 text-slate-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-slate-800">
                          <td className="py-3 px-4 text-slate-300">{transaction.id}</td>
                          <td className="py-3 px-4 text-slate-400">{transaction.date}</td>
                          <td className="py-3 px-4 text-slate-400">{formatCurrency(transaction.amount)}</td>
                          <td className="py-3 px-4">
                            <Badge
                              className={
                                transaction.type === "Investment"
                                  ? "bg-cyan-900/20 text-cyan-400 border-cyan-500/30"
                                  : transaction.type === "Deposit"
                                    ? "bg-green-900/20 text-green-400 border-green-500/30"
                                    : transaction.type === "Withdrawal"
                                      ? "bg-amber-900/20 text-amber-400 border-amber-500/30"
                                      : "bg-purple-900/20 text-purple-400 border-purple-500/30"
                              }
                            >
                              {transaction.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={
                                transaction.status === "Completed"
                                  ? "bg-green-900/20 text-green-400 border-green-500/30"
                                  : transaction.status === "Pending"
                                    ? "bg-amber-900/20 text-amber-400 border-amber-500/30"
                                    : "bg-red-900/20 text-red-400 border-red-500/30"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-slate-400">{transaction.project}</td>
                          <td className="py-3 px-4 text-slate-400">{formatCurrency(transaction.fee)}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4 text-slate-400" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredTransactions.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="h-12 w-12 text-slate-600 mb-4" />
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No transactions found</h3>
                    <p className="text-sm text-slate-500 max-w-md mb-6">
                      We couldn't find any transactions matching your search criteria.
                    </p>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <div className="text-sm text-slate-400">
                    Showing {filteredTransactions.length} of {transactions.length} transactions
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="h-8 border-slate-700 hover:bg-slate-800">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 border-slate-700 hover:bg-slate-800">
                      Next
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-lg">Available Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{formatCurrency(1250000)}</div>
                  <p className="text-sm text-slate-400">Last updated: Today, 10:45 AM</p>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-2 w-full">
                    <Button variant="outline" className="flex-1 border-slate-700 hover:bg-slate-800">
                      Withdraw
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                      Add Funds
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-lg">Invested Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400 mb-2">{formatCurrency(3500000)}</div>
                  <p className="text-sm text-slate-400">Across 5 active projects</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
                    View Investments
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-lg">Total Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400 mb-2">{formatCurrency(450000)}</div>
                  <p className="text-sm text-slate-400">+12.8% overall return rate</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
                    View Analytics
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Wallet Activity</CardTitle>
                <CardDescription className="text-slate-400">Recent transactions and balance changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                          <DollarSign className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-200">Deposit</div>
                          <div className="text-xs text-slate-400">Mar 15, 2023 at 10:45 AM</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-400">+{formatCurrency(100000)}</div>
                        <div className="text-xs text-slate-400">Fee: {formatCurrency(1000)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-cyan-900/30 flex items-center justify-center mr-3">
                          <Wallet className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-200">Investment</div>
                          <div className="text-xs text-slate-400">Mar 10, 2023 at 2:30 PM</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-amber-400">-{formatCurrency(250000)}</div>
                        <div className="text-xs text-slate-400">Fee: {formatCurrency(7500)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">
                          <ArrowRight className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-200">Return</div>
                          <div className="text-xs text-slate-400">Mar 5, 2023 at 9:15 AM</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-400">+{formatCurrency(35000)}</div>
                        <div className="text-xs text-slate-400">Fee: {formatCurrency(0)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}


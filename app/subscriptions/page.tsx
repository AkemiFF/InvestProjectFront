"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle2, CreditCard, Download, FileText, HelpCircle } from "lucide-react"

export default function SubscriptionsPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly")
  const [currentPlan, setCurrentPlan] = useState<"free" | "basic" | "premium" | "enterprise">("basic")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleUpgrade = (plan: "free" | "basic" | "premium" | "enterprise") => {
    // Simulate API call to Stripe
    setTimeout(() => {
      setCurrentPlan(plan)
      setShowSuccess(true)

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    }, 1000)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate prices with yearly discount
  const getPrice = (basePrice: number) => {
    if (billingCycle === "yearly") {
      return basePrice * 0.8 // 20% discount for yearly
    }
    return basePrice
  }

  const plans = {
    investor: [
      {
        id: "free",
        name: "Free",
        description: "Basic access to investment opportunities",
        price: 0,
        features: ["Access to public projects", "Basic investment tools", "Standard support", "1 investment per month"],
        limitations: ["No early access to projects", "Standard transaction fees (5%)", "No investment analytics"],
      },
      {
        id: "basic",
        name: "Basic",
        description: "Enhanced investment capabilities",
        price: getPrice(150000),
        features: [
          "All Free features",
          "Early access to select projects",
          "Reduced transaction fees (3%)",
          "Basic investment analytics",
          "5 investments per month",
          "Priority support",
        ],
        limitations: ["No advanced analytics", "No personalized recommendations"],
      },
      {
        id: "premium",
        name: "Premium",
        description: "Professional investment suite",
        price: getPrice(350000),
        features: [
          "All Basic features",
          "Early access to all projects",
          "Minimal transaction fees (1%)",
          "Advanced investment analytics",
          "Unlimited investments",
          "Personalized investment recommendations",
          "Dedicated account manager",
          "Exclusive investment webinars",
        ],
        limitations: [],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "Institutional investment solution",
        price: getPrice(1200000),
        features: [
          "All Premium features",
          "No transaction fees",
          "Custom investment dashboard",
          "API access for automated investing",
          "White-glove onboarding",
          "Legal document review",
          "Quarterly strategy sessions",
          "Custom reporting",
        ],
        limitations: [],
      },
    ],
    "project-owner": [
      {
        id: "free",
        name: "Free",
        description: "Basic project listing",
        price: 0,
        features: ["List 1 project", "Basic project page", "Standard visibility", "Standard support"],
        limitations: ["High platform fees (8%)", "No promotion tools", "Limited analytics"],
      },
      {
        id: "basic",
        name: "Basic",
        description: "Enhanced project capabilities",
        price: getPrice(200000),
        features: [
          "All Free features",
          "List up to 3 projects",
          "Reduced platform fees (5%)",
          "Basic promotion tools",
          "Basic project analytics",
          "Priority support",
        ],
        limitations: ["No advanced analytics", "Limited promotion options"],
      },
      {
        id: "premium",
        name: "Premium",
        description: "Professional project suite",
        price: getPrice(450000),
        features: [
          "All Basic features",
          "Unlimited projects",
          "Low platform fees (3%)",
          "Advanced promotion tools",
          "Comprehensive analytics",
          "Featured project placement",
          "Dedicated account manager",
          "Investor matching service",
        ],
        limitations: [],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "Enterprise fundraising solution",
        price: getPrice(1500000),
        features: [
          "All Premium features",
          "Minimal platform fees (1%)",
          "Custom project pages",
          "API access",
          "White-glove onboarding",
          "Legal document templates",
          "Investor relations tools",
          "Custom reporting",
          "Roadshow support",
        ],
        limitations: [],
      },
    ],
  }

  const currentPlans = plans[userType]
  const invoices = [
    {
      id: "INV-2023-001",
      date: "Mar 15, 2023",
      amount: 120000,
      status: "Paid",
      description: "Basic Plan - Annual Subscription",
    },
    {
      id: "INV-2023-002",
      date: "Feb 15, 2023",
      amount: 120000,
      status: "Paid",
      description: "Basic Plan - Annual Subscription",
    },
    {
      id: "INV-2022-012",
      date: "Jan 15, 2023",
      amount: 120000,
      status: "Paid",
      description: "Basic Plan - Annual Subscription",
    },
    {
      id: "INV-2022-011",
      date: "Dec 15, 2022",
      amount: 120000,
      status: "Paid",
      description: "Basic Plan - Annual Subscription",
    },
  ]

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Subscription Management</h1>
            <p className="text-slate-400">Manage your subscription and billing information</p>
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
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your subscription has been updated successfully. The changes will be reflected immediately.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="bg-slate-800/50 p-1 mb-6">
            <TabsTrigger value="plans" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              Subscription Plans
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              Billing & Payment
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              Billing History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-slate-100">Choose Your Plan</CardTitle>
                    <CardDescription className="text-slate-400">
                      Select the plan that best fits your needs
                    </CardDescription>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Label
                      htmlFor="billing-toggle"
                      className={`text-sm ${billingCycle === "monthly" ? "text-slate-400" : "text-slate-100"}`}
                    >
                      Monthly
                    </Label>
                    <Switch
                      id="billing-toggle"
                      checked={billingCycle === "yearly"}
                      onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
                      className="data-[state=checked]:bg-cyan-500"
                    />
                    <Label
                      htmlFor="billing-toggle"
                      className={`text-sm flex items-center ${
                        billingCycle === "yearly" ? "text-slate-100" : "text-slate-400"
                      }`}
                    >
                      Yearly
                      <Badge className="ml-2 bg-green-900/30 text-green-400 border-green-500/30">Save 20%</Badge>
                    </Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentPlans.map((plan) => {
                    const isCurrentPlan = currentPlan === plan.id
                    const isPremiumPlan = plan.id === "premium"

                    return (
                      <Card
                        key={plan.id}
                        className={`border ${
                          isPremiumPlan
                            ? "bg-gradient-to-b from-slate-800/80 to-slate-900/80 border-cyan-500/30"
                            : "bg-slate-800/50 border-slate-700/50"
                        } h-full flex flex-col`}
                      >
                        <CardHeader>
                          {isPremiumPlan && (
                            <Badge className="w-fit mb-2 bg-cyan-900/30 text-cyan-400 border-cyan-500/30">
                              Most Popular
                            </Badge>
                          )}
                          <CardTitle className={isPremiumPlan ? "text-cyan-400" : "text-slate-100"}>
                            {plan.name}
                          </CardTitle>
                          <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="mb-6">
                            <div className="flex items-baseline">
                              <span className="text-3xl font-bold text-slate-100">
                                {plan.price === 0 ? "Free" : formatCurrency(plan.price)}
                              </span>
                              {plan.price > 0 && (
                                <span className="text-sm text-slate-400 ml-2">
                                  /{billingCycle === "monthly" ? "month" : "year"}
                                </span>
                              )}
                            </div>
                            {billingCycle === "yearly" && plan.price > 0 && (
                              <div className="text-xs text-green-400 mt-1">
                                Save {formatCurrency(plan.price * 0.2 * 12)} per year
                              </div>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-slate-300 mb-2">Features</h4>
                              <ul className="space-y-2">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-slate-300">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {plan.limitations.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-slate-300 mb-2">Limitations</h4>
                                <ul className="space-y-2">
                                  {plan.limitations.map((limitation, index) => (
                                    <li key={index} className="flex items-start">
                                      <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm text-slate-400">{limitation}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          {isCurrentPlan ? (
                            <Button className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200" disabled>
                              Current Plan
                            </Button>
                          ) : (
                            <Button
                              className={`w-full ${
                                isPremiumPlan
                                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                                  : "bg-slate-700 hover:bg-slate-600"
                              }`}
                              onClick={() => handleUpgrade(plan.id as any)}
                            >
                              {plan.price === 0 ? "Downgrade" : plan.price > 0 ? "Upgrade" : "Select"}
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <Alert className="bg-slate-800/50 border-slate-700 w-full">
                  <HelpCircle className="h-4 w-4 text-slate-400" />
                  <AlertDescription className="text-slate-400">
                    Need help choosing the right plan? Contact our support team for personalized assistance.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Plan Comparison</CardTitle>
                <CardDescription className="text-slate-400">
                  Detailed comparison of features across all plans
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Features</th>
                      {currentPlans.map((plan) => (
                        <th
                          key={plan.id}
                          className={`text-left py-3 px-4 ${
                            plan.id === currentPlan ? "text-cyan-400 font-medium" : "text-slate-300 font-medium"
                          }`}
                        >
                          {plan.name}
                          {plan.id === currentPlan && (
                            <Badge className="ml-2 bg-cyan-900/30 text-cyan-400 border-cyan-500/30">Current</Badge>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {userType === "investor" ? (
                      <>
                        <tr className="border-b border-slate-800">
                          <td className="py-3 px-4 text-slate-300">Project Access</td>
                          <td className="py-3 px-4 text-slate-400">Standard</td>
                          <td className="py-3 px-4 text-slate-400">Early Access (Select)</td>
                          <td className="py-3 px-4 text-slate-400">Early Access (All)</td>
                          <td className="py-3 px-4 text-slate-400">Priority Access</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                          <td className="py-3 px-4 text-slate-300">Transaction Fees</td>
                          <td className="py-3 px-4 text-slate-400">5%</td>
                          <td className="py-3 px-4 text-slate-400">3%</td>
                          <td className="py-3 px-4 text-slate-400">1%</td>
                          <td className="py-3 px-4 text-slate-400">0%</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                          <td className="py-3 px-4 text-slate-300">Monthly Investments</td>
                          <td className="py-3 px-4 text-slate-400">1</td>
                          <td className="py-3 px-4 text-slate-400">5</td>
                          <td className="py-3 px-4 text-slate-400">Unlimited</td>
                          <td className="py-3 px-4 text-slate-400">Unlimited</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                          <td className="py-3 px-4 text-slate-300">Analytics</td>
                          <td className="py-3 px-4 text-slate-400">Basic</td>
                          <td className="py-3 px-4 text-slate-400">Standard</td>
                          <td className="py-3 px-4 text-slate-400">Advanced</td>
                          <td className="py-3 px-4 text-slate-400">Custom</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                          <td className="py-3 px-4 text-slate-300">Support</td>
                          <td className="py-3 px-4 text-slate-400">Standard</td>
                          <td className="py-3 px-4 text-slate-400">Priority</td>
                          <td className="py-3 px-4 text-slate-400">Dedicated Manager</td>
                          <td className="py-3 px-4 text-slate-400">White Glove</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-slate-300">API Access</td>
                          <td className="py-3 px-4 text-slate-400">
                            <AlertCircle className="h-4 w-4 text-slate-600" />
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            <AlertCircle className="h-4 w-4 text-slate-600" />
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            <AlertCircle className="h-4 w-4 text-slate-600" />
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr className="border-b border-slate-800">
                          <td className="py-3 px-4 text-slate-300">Project Listings</td>
                          <td className="py-3 px-4 text-slate-400">1</td>
                          <td className="py-3 px-4 text-slate-400">3</td>
                          <td className="py-3 px-4 text-slate-400">Unlimited</td>
                          <td className="py-3 px-4 text-slate-400">Unlimited</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                          <td className="py-3 px-4 text-slate-300">Platform Fees</td>
                          <td className="py-3 px-4 text-slate-400">8%</td>
                          <td className="py-3 px-4 text-slate-400">5%</td>
                          <td className="py-3 px-4 text-slate-400">3%</td>
                          <td className="py-3 px-4 text-slate-400">1%</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                          <td className="py-3 px-4 text-slate-300">Promotion Tools</td>
                          <td className="py-3 px-4 text-slate-400">
                            <AlertCircle className="h-4 w-4 text-slate-600" />
                          </td>
                          <td className="py-3 px-4 text-slate-400">Basic</td>
                          <td className="py-3 px-4 text-slate-400">Advanced</td>
                          <td className="py-3 px-4 text-slate-400">Custom</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                          <td className="py-3 px-4 text-slate-300">Analytics</td>
                          <td className="py-3 px-4 text-slate-400">Limited</td>
                          <td className="py-3 px-4 text-slate-400">Basic</td>
                          <td className="py-3 px-4 text-slate-400">Comprehensive</td>
                          <td className="py-3 px-4 text-slate-400">Custom</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                          <td className="py-3 px-4 text-slate-300">Featured Placement</td>
                          <td className="py-3 px-4 text-slate-400">
                            <AlertCircle className="h-4 w-4 text-slate-600" />
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            <AlertCircle className="h-4 w-4 text-slate-600" />
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-slate-300">Legal Templates</td>
                          <td className="py-3 px-4 text-slate-400">
                            <AlertCircle className="h-4 w-4 text-slate-600" />
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            <AlertCircle className="h-4 w-4 text-slate-600" />
                          </td>
                          <td className="py-3 px-4 text-slate-400">Basic</td>
                          <td className="py-3 px-4 text-slate-400">Comprehensive</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Payment Methods</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your payment methods for subscription billing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-md bg-blue-900/30 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200">Visa ending in 4242</div>
                      <div className="text-xs text-slate-400">Expires 12/2025</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500/30">
                    Default
                  </Badge>
                </div>

                <Button variant="outline" className="w-full border-dashed border-slate-700 hover:bg-slate-800 mt-2">
                  + Add Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Current Subscription</CardTitle>
                <CardDescription className="text-slate-400">
                  Details about your current subscription plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-medium text-cyan-400">
                        {currentPlans.find((p) => p.id === currentPlan)?.name} Plan
                      </h3>
                      <p className="text-sm text-slate-400">
                        Billed {billingCycle === "monthly" ? "monthly" : "annually"}
                      </p>
                    </div>
                    <Badge className="w-fit bg-cyan-900/30 text-cyan-400 border-cyan-500/30">Active</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Subscription fee</span>
                      <span className="text-sm text-slate-200">
                        {formatCurrency(currentPlans.find((p) => p.id === currentPlan)?.price || 0)}
                        {billingCycle === "monthly" ? "/month" : "/year"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Next billing date</span>
                      <span className="text-sm text-slate-200">April 15, 2023</span>
                    </div>

                    <Separator className="bg-slate-700/50" />

                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Payment method</span>
                      <span className="text-sm text-slate-200">Visa ending in 4242</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                      Cancel Subscription
                    </Button>
                    <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                      Change Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Billing Information</CardTitle>
                <CardDescription className="text-slate-400">
                  Your billing details for invoices and receipts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingName">Billing Name</Label>
                    <Input
                      id="billingName"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      defaultValue="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingEmail">Billing Email</Label>
                    <Input
                      id="billingEmail"
                      type="email"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      defaultValue="john.doe@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Billing Address</Label>
                    <Input
                      id="billingAddress"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      defaultValue="123 Main Street"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingCity">City</Label>
                    <Input
                      id="billingCity"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      defaultValue="Antananarivo"
                    />
                  </div>
                </div>

                <Button className="mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                  Save Billing Information
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Billing History</CardTitle>
                <CardDescription className="text-slate-400">View and download your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Invoice</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                        <th className="text-right py-3 px-4 text-slate-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-slate-800">
                          <td className="py-3 px-4 text-slate-300">{invoice.id}</td>
                          <td className="py-3 px-4 text-slate-400">{invoice.date}</td>
                          <td className="py-3 px-4 text-slate-400">{formatCurrency(invoice.amount)}</td>
                          <td className="py-3 px-4">
                            <Badge
                              className={
                                invoice.status === "Paid"
                                  ? "bg-green-900/20 text-green-400 border-green-500/30"
                                  : "bg-amber-900/20 text-amber-400 border-amber-500/30"
                              }
                            >
                              {invoice.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-slate-400">{invoice.description}</td>
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
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Tax Documents</CardTitle>
                <CardDescription className="text-slate-400">Annual tax documents for your records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-md bg-slate-700 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-slate-300" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200">Annual Statement 2022</div>
                        <div className="text-xs text-slate-400">Generated on Jan 31, 2023</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4 text-slate-400" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-md bg-slate-700 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-slate-300" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200">Annual Statement 2021</div>
                        <div className="text-xs text-slate-400">Generated on Jan 31, 2022</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4 text-slate-400" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}


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
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronUp,
  FileText,
  HelpCircle,
  Info,
  LineChart,
  Megaphone,
  PieChart,
  Rocket,
  Search,
  Settings,
  Shield,
  Star,
  TrendingUp,
} from "lucide-react"

export default function PromotionsPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("project-owner")
  const [promotionStep, setPromotionStep] = useState(1)
  const [promotionType, setPromotionType] = useState<"featured" | "sponsored" | "newsletter">("featured")
  const [duration, setDuration] = useState<"7" | "14" | "30">("14")
  const [budget, setBudget] = useState(150000)
  const [showSuccess, setShowSuccess] = useState(false)

  const handlePromotionSubmit = () => {
    // Simulate API call to Stripe
    setTimeout(() => {
      setShowSuccess(true)
      setPromotionStep(1)

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

  // Sample promotion data
  const activePromotions = [
    {
      id: "PROMO-2023-001",
      project: "Urban Farming Initiative",
      type: "Featured",
      startDate: "Mar 15, 2023",
      endDate: "Mar 29, 2023",
      status: "Active",
      impressions: 1250,
      clicks: 85,
      conversions: 12,
      spent: 75000,
      budget: 150000,
    },
    {
      id: "PROMO-2023-002",
      project: "Renewable Energy Plant",
      type: "Newsletter",
      startDate: "Mar 10, 2023",
      endDate: "Mar 17, 2023",
      status: "Active",
      impressions: 3500,
      clicks: 210,
      conversions: 18,
      spent: 50000,
      budget: 50000,
    },
  ]

  const pastPromotions = [
    {
      id: "PROMO-2023-003",
      project: "Educational Platform",
      type: "Sponsored",
      startDate: "Feb 15, 2023",
      endDate: "Mar 1, 2023",
      status: "Completed",
      impressions: 5200,
      clicks: 320,
      conversions: 28,
      spent: 200000,
      budget: 200000,
    },
    {
      id: "PROMO-2023-004",
      project: "Medical Supplies Chain",
      type: "Featured",
      startDate: "Jan 20, 2023",
      endDate: "Feb 3, 2023",
      status: "Completed",
      impressions: 2800,
      clicks: 175,
      conversions: 15,
      spent: 150000,
      budget: 150000,
    },
  ]

  // Calculate promotion costs
  const getPromotionCost = () => {
    const baseCost = {
      featured: 10000,
      sponsored: 15000,
      newsletter: 50000,
    }[promotionType]

    const durationMultiplier = {
      "7": 1,
      "14": 1.8,
      "30": 3.5,
    }[duration]

    return baseCost * durationMultiplier
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Promotion Management</h1>
            <p className="text-slate-400">Boost your project visibility and attract more investors</p>
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
            <AlertTitle>Promotion Created Successfully</AlertTitle>
            <AlertDescription>
              Your promotion has been set up and will start running immediately. You can track its performance in the
              Active Promotions tab.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="bg-slate-800/50 p-1 mb-6">
            <TabsTrigger value="create" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              Create Promotion
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              Active Promotions
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              Past Promotions
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Create New Promotion</CardTitle>
                <CardDescription className="text-slate-400">
                  Boost your project visibility and reach more potential investors
                </CardDescription>
              </CardHeader>
              <CardContent>
                {promotionStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="project">Select Project</Label>
                      <Select>
                        <SelectTrigger className="bg-slate-800/50 border-slate-700">
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="project1">Urban Farming Initiative</SelectItem>
                          <SelectItem value="project2">Renewable Energy Plant</SelectItem>
                          <SelectItem value="project3">Educational Platform</SelectItem>
                          <SelectItem value="project4">Medical Supplies Chain</SelectItem>
                          <SelectItem value="project5">Eco-Friendly Packaging</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Promotion Type</Label>
                      <RadioGroup
                        defaultValue="featured"
                        value={promotionType}
                        onValueChange={(value) => setPromotionType(value as any)}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div>
                          <RadioGroupItem value="featured" id="featured" className="peer sr-only" />
                          <Label
                            htmlFor="featured"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-900/10"
                          >
                            <Star className="mb-3 h-6 w-6 text-cyan-400" />
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-200">Featured Project</p>
                              <p className="text-xs text-slate-400">
                                Highlight your project on the homepage and listings
                              </p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="sponsored" id="sponsored" className="peer sr-only" />
                          <Label
                            htmlFor="sponsored"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-900/10"
                          >
                            <Rocket className="mb-3 h-6 w-6 text-cyan-400" />
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-200">Sponsored Listing</p>
                              <p className="text-xs text-slate-400">
                                Appear at the top of search results and category pages
                              </p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="newsletter" id="newsletter" className="peer sr-only" />
                          <Label
                            htmlFor="newsletter"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-900/10"
                          >
                            <Megaphone className="mb-3 h-6 w-6 text-cyan-400" />
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-200">Newsletter Feature</p>
                              <p className="text-xs text-slate-400">Featured in our weekly investor newsletter</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Promotion Duration</Label>
                      <RadioGroup
                        defaultValue="14"
                        value={duration}
                        onValueChange={(value) => setDuration(value as any)}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div>
                          <RadioGroupItem value="7" id="7days" className="peer sr-only" />
                          <Label
                            htmlFor="7days"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-900/10"
                          >
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-200">7 Days</p>
                              <p className="text-xs text-slate-400">{formatCurrency(getPromotionCost() * (7 / 14))}</p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="14" id="14days" className="peer sr-only" />
                          <Label
                            htmlFor="14days"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-900/10"
                          >
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-200">14 Days</p>
                              <p className="text-xs text-slate-400">{formatCurrency(getPromotionCost())}</p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="30" id="30days" className="peer sr-only" />
                          <Label
                            htmlFor="30days"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-900/10"
                          >
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-200">30 Days</p>
                              <p className="text-xs text-slate-400">{formatCurrency(getPromotionCost() * (30 / 14))}</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {promotionType === "sponsored" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="budget">Budget (MGA)</Label>
                          <span className="text-sm text-slate-400">{formatCurrency(budget)}</span>
                        </div>
                        <Slider
                          id="budget"
                          min={50000}
                          max={500000}
                          step={10000}
                          value={[budget]}
                          onValueChange={(value) => setBudget(value[0])}
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>50,000 MGA</span>
                          <span>500,000 MGA</span>
                        </div>
                      </div>
                    )}

                    <Alert className="bg-slate-800/50 border-slate-700">
                      <Info className="h-4 w-4 text-slate-400" />
                      <AlertDescription className="text-slate-400">
                        Promotions help your project stand out and attract more investors. Choose the option that best
                        fits your goals and budget.
                      </AlertDescription>
                    </Alert>

                    <Button
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      onClick={() => setPromotionStep(2)}
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {promotionStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Targeting Options</Label>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="target-all" className="text-sm font-medium cursor-pointer">
                              All Investors
                            </Label>
                            <p className="text-xs text-slate-400">Show to all potential investors</p>
                          </div>
                          <Switch id="target-all" defaultChecked className="data-[state=checked]:bg-cyan-500" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="target-sector" className="text-sm font-medium cursor-pointer">
                              Sector-Specific
                            </Label>
                            <p className="text-xs text-slate-400">Target investors interested in your sector</p>
                          </div>
                          <Switch id="target-sector" className="data-[state=checked]:bg-cyan-500" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="target-premium" className="text-sm font-medium cursor-pointer">
                              Premium Investors
                            </Label>
                            <p className="text-xs text-slate-400">Target investors with premium accounts</p>
                          </div>
                          <Switch id="target-premium" className="data-[state=checked]:bg-cyan-500" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="target-location" className="text-sm font-medium cursor-pointer">
                              Location-Based
                            </Label>
                            <p className="text-xs text-slate-400">Target investors in specific regions</p>
                          </div>
                          <Switch id="target-location" className="data-[state=checked]:bg-cyan-500" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="promotion-message">Promotion Message (Optional)</Label>
                      <Input
                        id="promotion-message"
                        className="bg-slate-800/50 border-slate-700 text-slate-100"
                        placeholder="Enter a short message to highlight your project"
                      />
                      <p className="text-xs text-slate-500">
                        This message will be displayed alongside your project in promotions (max 100 characters)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" defaultChecked />
                        <label
                          htmlFor="terms"
                          className="text-sm text-slate-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the promotion terms and conditions
                        </label>
                      </div>
                    </div>

                    <Alert className="bg-cyan-900/10 border-cyan-500/30">
                      <HelpCircle className="h-4 w-4 text-cyan-400" />
                      <AlertDescription className="text-cyan-300">
                        Your promotion will be reviewed before going live. This typically takes less than 24 hours.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                {promotionStep === 1 ? (
                  <Button variant="outline" className="w-full sm:w-auto border-slate-700 hover:bg-slate-800">
                    Cancel
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-slate-700 hover:bg-slate-800"
                    onClick={() => setPromotionStep(1)}
                  >
                    Back
                  </Button>
                )}
                {promotionStep === 2 && (
                  <Button
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                    onClick={handlePromotionSubmit}
                  >
                    Create Promotion
                  </Button>
                )}
              </CardFooter>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Promotion Summary</CardTitle>
                <CardDescription className="text-slate-400">
                  Review your promotion details before proceeding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Promotion Type</span>
                        <span className="text-sm font-medium text-slate-200">
                          {promotionType === "featured"
                            ? "Featured Project"
                            : promotionType === "sponsored"
                              ? "Sponsored Listing"
                              : "Newsletter Feature"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Duration</span>
                        <span className="text-sm font-medium text-slate-200">{duration} days</span>
                      </div>

                      {promotionType === "sponsored" && (
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-400">Budget</span>
                          <span className="text-sm font-medium text-slate-200">{formatCurrency(budget)}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Estimated Reach</span>
                        <span className="text-sm font-medium text-slate-200">
                          {promotionType === "featured"
                            ? "5,000 - 8,000 impressions"
                            : promotionType === "sponsored"
                              ? "3,000 - 6,000 impressions"
                              : "2,500 - 4,000 opens"}
                        </span>
                      </div>

                      <Separator className="bg-slate-700/50" />

                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-slate-300">Total Cost</span>
                        <span className="text-sm font-medium text-cyan-400">
                          {promotionType === "sponsored" ? formatCurrency(budget) : formatCurrency(getPromotionCost())}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-slate-800/50 border-slate-700">
                    <Shield className="h-4 w-4 text-slate-400" />
                    <AlertDescription className="text-slate-400">
                      Payment will be processed through Stripe. You will only be charged when your promotion is
                      approved.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-slate-100">Active Promotions</CardTitle>
                    <CardDescription className="text-slate-400">
                      Currently running promotional campaigns
                    </CardDescription>
                  </div>

                  <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                    + Create New Promotion
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {activePromotions.length > 0 ? (
                  <div className="space-y-4">
                    {activePromotions.map((promotion) => (
                      <div
                        key={promotion.id}
                        className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 md:p-6"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium text-slate-100">{promotion.project}</h3>
                              <Badge className="ml-2 bg-green-900/20 text-green-400 border-green-500/30">
                                {promotion.status}
                              </Badge>
                            </div>
                            <div className="flex items-center mt-1 text-sm text-slate-400">
                              <span className="mr-2">{promotion.id}</span>
                              <span>•</span>
                              <Badge variant="outline" className="ml-2 border-cyan-500/30 text-cyan-400 bg-transparent">
                                {promotion.type}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="h-8 border-slate-700 hover:bg-slate-800">
                              <Settings className="h-4 w-4 mr-1" /> Manage
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 border-slate-700 hover:bg-slate-800">
                              <BarChart3 className="h-4 w-4 mr-1" /> Analytics
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-slate-900/50 rounded-md p-3">
                            <div className="text-xs text-slate-500 mb-1">Duration</div>
                            <div className="text-sm text-slate-300">
                              {promotion.startDate} - {promotion.endDate}
                            </div>
                          </div>

                          <div className="bg-slate-900/50 rounded-md p-3">
                            <div className="text-xs text-slate-500 mb-1">Impressions</div>
                            <div className="text-sm text-slate-300 flex items-center">
                              {promotion.impressions.toLocaleString()}
                              <Badge className="ml-2 bg-cyan-900/20 text-cyan-400 border-cyan-500/30 text-xs">
                                <TrendingUp className="h-3 w-3 mr-1" /> 12%
                              </Badge>
                            </div>
                          </div>

                          <div className="bg-slate-900/50 rounded-md p-3">
                            <div className="text-xs text-slate-500 mb-1">Clicks</div>
                            <div className="text-sm text-slate-300 flex items-center">
                              {promotion.clicks.toLocaleString()}
                              <span className="text-xs text-slate-500 ml-2">
                                ({((promotion.clicks / promotion.impressions) * 100).toFixed(1)}% CTR)
                              </span>
                            </div>
                          </div>

                          <div className="bg-slate-900/50 rounded-md p-3">
                            <div className="text-xs text-slate-500 mb-1">Conversions</div>
                            <div className="text-sm text-slate-300 flex items-center">
                              {promotion.conversions.toLocaleString()}
                              <span className="text-xs text-slate-500 ml-2">
                                ({((promotion.conversions / promotion.clicks) * 100).toFixed(1)}% CR)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex items-center mb-2 md:mb-0">
                            <div className="text-sm text-slate-400 mr-2">Budget:</div>
                            <div className="text-sm text-slate-300">
                              {formatCurrency(promotion.spent)} / {formatCurrency(promotion.budget)}
                            </div>
                          </div>

                          <div className="w-full md:w-1/2 bg-slate-700/30 rounded-full h-2.5">
                            <div
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full"
                              style={{ width: `${(promotion.spent / promotion.budget) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Megaphone className="h-12 w-12 text-slate-600 mb-4" />
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No active promotions</h3>
                    <p className="text-sm text-slate-500 max-w-md mb-6">
                      You don't have any active promotions running. Create a new promotion to boost your project
                      visibility.
                    </p>
                    <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                      Create New Promotion
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-slate-100">Past Promotions</CardTitle>
                    <CardDescription className="text-slate-400">
                      History of your completed promotional campaigns
                    </CardDescription>
                  </div>

                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      placeholder="Search promotions..."
                      className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {pastPromotions.length > 0 ? (
                  <div className="space-y-4">
                    {pastPromotions.map((promotion) => (
                      <div
                        key={promotion.id}
                        className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 md:p-6"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium text-slate-100">{promotion.project}</h3>
                              <Badge className="ml-2 bg-slate-700/50 text-slate-300 border-slate-600/50">
                                {promotion.status}
                              </Badge>
                            </div>
                            <div className="flex items-center mt-1 text-sm text-slate-400">
                              <span className="mr-2">{promotion.id}</span>
                              <span>•</span>
                              <Badge
                                variant="outline"
                                className="ml-2 border-slate-600/50 text-slate-300 bg-transparent"
                              >
                                {promotion.type}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="h-8 border-slate-700 hover:bg-slate-800">
                              <BarChart3 className="h-4 w-4 mr-1" /> Results
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 border-slate-700 hover:bg-slate-800">
                              <Rocket className="h-4 w-4 mr-1" /> Rerun
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-slate-900/50 rounded-md p-3">
                            <div className="text-xs text-slate-500 mb-1">Duration</div>
                            <div className="text-sm text-slate-300">
                              {promotion.startDate} - {promotion.endDate}
                            </div>
                          </div>

                          <div className="bg-slate-900/50 rounded-md p-3">
                            <div className="text-xs text-slate-500 mb-1">Impressions</div>
                            <div className="text-sm text-slate-300">{promotion.impressions.toLocaleString()}</div>
                          </div>

                          <div className="bg-slate-900/50 rounded-md p-3">
                            <div className="text-xs text-slate-500 mb-1">Clicks</div>
                            <div className="text-sm text-slate-300">
                              {promotion.clicks.toLocaleString()}
                              <span className="text-xs text-slate-500 ml-2">
                                ({((promotion.clicks / promotion.impressions) * 100).toFixed(1)}% CTR)
                              </span>
                            </div>
                          </div>

                          <div className="bg-slate-900/50 rounded-md p-3">
                            <div className="text-xs text-slate-500 mb-1">Conversions</div>
                            <div className="text-sm text-slate-300">
                              {promotion.conversions.toLocaleString()}
                              <span className="text-xs text-slate-500 ml-2">
                                ({((promotion.conversions / promotion.clicks) * 100).toFixed(1)}% CR)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex items-center mb-2 md:mb-0">
                            <div className="text-sm text-slate-400 mr-2">Total Spent:</div>
                            <div className="text-sm text-slate-300">{formatCurrency(promotion.spent)}</div>
                          </div>

                          <div className="flex items-center">
                            <div className="text-sm text-slate-400 mr-2">ROI:</div>
                            <div className="text-sm text-green-400">+{(Math.random() * 10 + 5).toFixed(1)}x</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="h-12 w-12 text-slate-600 mb-4" />
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No past promotions</h3>
                    <p className="text-sm text-slate-500 max-w-md mb-6">
                      You haven't run any promotions yet. Create a new promotion to boost your project visibility.
                    </p>
                    <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                      Create New Promotion
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <div className="text-sm text-slate-400">
                    Showing {pastPromotions.length} of {pastPromotions.length} past promotions
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

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-lg">Total Impressions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">12,450</div>
                  <p className="text-sm text-green-400 flex items-center">
                    <ChevronUp className="h-4 w-4 mr-1" /> 24% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-lg">Click-Through Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400 mb-2">6.8%</div>
                  <p className="text-sm text-green-400 flex items-center">
                    <ChevronUp className="h-4 w-4 mr-1" /> 1.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-lg">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400 mb-2">8.2%</div>
                  <p className="text-sm text-green-400 flex items-center">
                    <ChevronUp className="h-4 w-4 mr-1" /> 0.5% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Promotion Performance</CardTitle>
                <CardDescription className="text-slate-400">
                  Comparative analysis of your promotional campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <LineChart className="h-16 w-16 text-slate-600 mb-4" />
                    <p className="text-slate-400 text-center max-w-md">
                      Performance chart will be displayed here, showing impressions, clicks, and conversions over time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100">Promotion Type Effectiveness</CardTitle>
                  <CardDescription className="text-slate-400">Comparison of different promotion types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <BarChart3 className="h-12 w-12 text-slate-600 mb-4" />
                      <p className="text-slate-400 text-center max-w-md">
                        Bar chart comparing the effectiveness of different promotion types.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100">Audience Breakdown</CardTitle>
                  <CardDescription className="text-slate-400">Analysis of investor demographics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <PieChart className="h-12 w-12 text-slate-600 mb-4" />
                      <p className="text-slate-400 text-center max-w-md">
                        Pie chart showing the breakdown of investors by demographics and interests.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}


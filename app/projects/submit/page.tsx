"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  DollarSign,
  FileText,
  Image,
  Info,
  Layers,
  Link,
  MapPin,
  Save,
  Upload,
} from "lucide-react"

export default function ProjectSubmissionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentTab, setCurrentTab] = useState("basics")
  const [formComplete, setFormComplete] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    sector: "",
    location: "",
    targetAmount: "",
    duration: "",
    fullDescription: "",
    businessModel: "",
    marketAnalysis: "",
    competitiveAdvantage: "",
    useOfFunds: "",
    financialProjections: "",
    risks: "",
    team: "",
    milestones: "",
    equity: "",
    minimumInvestment: "",
    maximumInvestment: "",
    expectedReturn: "",
    returnTimeline: "",
    allowPartialFunding: true,
    isPublic: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setFormComplete(true)

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/projects/manage")
      }, 2000)
    }, 1500)
  }

  const handleNextTab = () => {
    if (currentTab === "basics") setCurrentTab("details")
    else if (currentTab === "details") setCurrentTab("financials")
    else if (currentTab === "financials") setCurrentTab("media")
    else if (currentTab === "media") setCurrentTab("review")
  }

  const handlePrevTab = () => {
    if (currentTab === "details") setCurrentTab("basics")
    else if (currentTab === "financials") setCurrentTab("details")
    else if (currentTab === "media") setCurrentTab("financials")
    else if (currentTab === "review") setCurrentTab("media")
  }

  return (
    <DashboardLayout userType="project-owner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Submit New Project</h1>
            <p className="text-slate-400">Create a new project to seek investment</p>
          </div>
        </div>

        {formComplete ? (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="h-20 w-20 rounded-full bg-green-900/20 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-100">Project Submitted Successfully!</h2>
                <p className="text-slate-400 text-center max-w-md">
                  Your project has been submitted for review. Our team will review your submission and get back to you
                  shortly.
                </p>
                <p className="text-slate-500 text-sm">Redirecting to your project management dashboard...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100">Project Information</CardTitle>
              <CardDescription className="text-slate-400">
                Fill in the details about your project to attract potential investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                <TabsList className="grid grid-cols-5 bg-slate-800/50 p-1 mb-6">
                  <TabsTrigger
                    value="basics"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Basics
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="financials"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Financials
                  </TabsTrigger>
                  <TabsTrigger
                    value="media"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Media
                  </TabsTrigger>
                  <TabsTrigger
                    value="review"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Review
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit}>
                  <TabsContent value="basics" className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-slate-300">
                          Project Title
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Enter a concise and descriptive title"
                          className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.title}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shortDescription" className="text-slate-300">
                          Short Description
                        </Label>
                        <Textarea
                          id="shortDescription"
                          name="shortDescription"
                          placeholder="Provide a brief overview of your project (100-150 words)"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.shortDescription}
                          onChange={handleChange}
                          required
                        />
                        <p className="text-xs text-slate-500">
                          This will appear in project listings and is your chance to grab investors' attention.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sector" className="text-slate-300">
                            Sector
                          </Label>
                          <Select
                            value={formData.sector}
                            onValueChange={(value) => handleSelectChange("sector", value)}
                          >
                            <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                              <SelectValue placeholder="Select project sector" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="green-energy">Green Energy</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="agriculture">Agriculture</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="real-estate">Real Estate</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="tourism">Tourism</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-slate-300">
                            Project Location
                          </Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                              id="location"
                              name="location"
                              placeholder="City, Country"
                              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                              value={formData.location}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="targetAmount" className="text-slate-300">
                            Target Funding Amount (MGA)
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                              id="targetAmount"
                              name="targetAmount"
                              type="number"
                              placeholder="5000000"
                              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                              value={formData.targetAmount}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="duration" className="text-slate-300">
                            Funding Duration (Days)
                          </Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                              id="duration"
                              name="duration"
                              type="number"
                              placeholder="30"
                              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                              value={formData.duration}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <p className="text-xs text-slate-500">How long your project will be open for investment.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      >
                        Next: Project Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullDescription" className="text-slate-300">
                          Full Project Description
                        </Label>
                        <Textarea
                          id="fullDescription"
                          name="fullDescription"
                          placeholder="Provide a comprehensive description of your project"
                          className="min-h-[150px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.fullDescription}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessModel" className="text-slate-300">
                          Business Model
                        </Label>
                        <Textarea
                          id="businessModel"
                          name="businessModel"
                          placeholder="Explain how your project will generate revenue and become sustainable"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.businessModel}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="marketAnalysis" className="text-slate-300">
                          Market Analysis
                        </Label>
                        <Textarea
                          id="marketAnalysis"
                          name="marketAnalysis"
                          placeholder="Describe your target market, size, and growth potential"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.marketAnalysis}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="competitiveAdvantage" className="text-slate-300">
                          Competitive Advantage
                        </Label>
                        <Textarea
                          id="competitiveAdvantage"
                          name="competitiveAdvantage"
                          placeholder="What makes your project unique compared to competitors?"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.competitiveAdvantage}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="team" className="text-slate-300">
                          Team Information
                        </Label>
                        <Textarea
                          id="team"
                          name="team"
                          placeholder="Describe your team, their expertise, and relevant experience"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.team}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevTab}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      >
                        Next: Financial Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="financials" className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="useOfFunds" className="text-slate-300">
                          Use of Funds
                        </Label>
                        <Textarea
                          id="useOfFunds"
                          name="useOfFunds"
                          placeholder="Explain how you plan to use the investment funds"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.useOfFunds}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="financialProjections" className="text-slate-300">
                          Financial Projections
                        </Label>
                        <Textarea
                          id="financialProjections"
                          name="financialProjections"
                          placeholder="Provide revenue and profit projections for the next 3-5 years"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.financialProjections}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="risks" className="text-slate-300">
                          Risks and Challenges
                        </Label>
                        <Textarea
                          id="risks"
                          name="risks"
                          placeholder="Identify potential risks and how you plan to mitigate them"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.risks}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="equity" className="text-slate-300">
                            Equity Offered (%)
                          </Label>
                          <Input
                            id="equity"
                            name="equity"
                            type="number"
                            placeholder="10"
                            className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            value={formData.equity}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="expectedReturn" className="text-slate-300">
                            Expected Return (%)
                          </Label>
                          <Input
                            id="expectedReturn"
                            name="expectedReturn"
                            type="number"
                            placeholder="15"
                            className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            value={formData.expectedReturn}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="minimumInvestment" className="text-slate-300">
                            Minimum Investment (MGA)
                          </Label>
                          <Input
                            id="minimumInvestment"
                            name="minimumInvestment"
                            type="number"
                            placeholder="100000"
                            className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            value={formData.minimumInvestment}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="maximumInvestment" className="text-slate-300">
                            Maximum Investment (MGA)
                          </Label>
                          <Input
                            id="maximumInvestment"
                            name="maximumInvestment"
                            type="number"
                            placeholder="1000000"
                            className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            value={formData.maximumInvestment}
                            onChange={handleChange}
                          />
                          <p className="text-xs text-slate-500">Leave blank for no maximum limit.</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="returnTimeline" className="text-slate-300">
                            Return Timeline (Months)
                          </Label>
                          <Input
                            id="returnTimeline"
                            name="returnTimeline"
                            type="number"
                            placeholder="24"
                            className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            value={formData.returnTimeline}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="allowPartialFunding" className="text-slate-300">
                              Allow Partial Funding
                            </Label>
                            <p className="text-xs text-slate-500">
                              If enabled, you can receive funds even if the target amount is not reached.
                            </p>
                          </div>
                          <Switch
                            id="allowPartialFunding"
                            checked={formData.allowPartialFunding}
                            onCheckedChange={(checked) => handleSwitchChange("allowPartialFunding", checked)}
                            className="data-[state=checked]:bg-cyan-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevTab}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      >
                        Next: Media & Documents <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Project Cover Image</Label>
                        <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-800/30">
                          <Image className="h-10 w-10 text-slate-500 mb-2" />
                          <p className="text-sm text-slate-400 mb-2">Drag and drop or click to upload</p>
                          <p className="text-xs text-slate-500 mb-4">PNG, JPG or WEBP (Max 5MB)</p>
                          <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                            <Upload className="mr-2 h-4 w-4" /> Select File
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-300">Project Gallery (Up to 5 images)</Label>
                        <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-800/30">
                          <Image className="h-10 w-10 text-slate-500 mb-2" />
                          <p className="text-sm text-slate-400 mb-2">Drag and drop or click to upload</p>
                          <p className="text-xs text-slate-500 mb-4">PNG, JPG or WEBP (Max 5MB each)</p>
                          <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                            <Upload className="mr-2 h-4 w-4" /> Select Files
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-300">Project Video (Optional)</Label>
                        <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-800/30">
                          <p className="text-sm text-slate-400 mb-2">Enter YouTube or Vimeo URL</p>
                          <div className="relative w-full max-w-md">
                            <Link className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                              placeholder="https://youtube.com/watch?v=..."
                              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 w-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-300">Supporting Documents (Optional)</Label>
                        <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-800/30">
                          <FileText className="h-10 w-10 text-slate-500 mb-2" />
                          <p className="text-sm text-slate-400 mb-2">Upload business plan, financial models, etc.</p>
                          <p className="text-xs text-slate-500 mb-4">PDF, DOCX, XLSX (Max 10MB each)</p>
                          <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                            <Upload className="mr-2 h-4 w-4" /> Select Documents
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevTab}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      >
                        Next: Review & Submit <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="review" className="space-y-6">
                    <Alert className="bg-blue-900/20 border-blue-700/50 text-blue-300">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Review Your Project</AlertTitle>
                      <AlertDescription>
                        Please review all information carefully before submitting. Once submitted, your project will be
                        reviewed by our team before being published.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-slate-200 mb-2 flex items-center">
                          <Briefcase className="mr-2 h-5 w-5 text-cyan-500" /> Basic Information
                        </h3>
                        <div className="bg-slate-800/30 rounded-lg p-4 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-slate-500">Project Title</p>
                              <p className="text-sm text-slate-300">{formData.title || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Sector</p>
                              <p className="text-sm text-slate-300">{formData.sector || "Not selected"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Location</p>
                              <p className="text-sm text-slate-300">{formData.location || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Target Amount</p>
                              <p className="text-sm text-slate-300">
                                {formData.targetAmount
                                  ? `${Number.parseInt(formData.targetAmount).toLocaleString()} MGA`
                                  : "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Funding Duration</p>
                              <p className="text-sm text-slate-300">
                                {formData.duration ? `${formData.duration} days` : "Not provided"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Short Description</p>
                            <p className="text-sm text-slate-300">{formData.shortDescription || "Not provided"}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-slate-200 mb-2 flex items-center">
                          <Layers className="mr-2 h-5 w-5 text-cyan-500" /> Project Details
                        </h3>
                        <div className="bg-slate-800/30 rounded-lg p-4 space-y-3">
                          <div>
                            <p className="text-xs text-slate-500">Full Description</p>
                            <p className="text-sm text-slate-300">{formData.fullDescription || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Business Model</p>
                            <p className="text-sm text-slate-300">{formData.businessModel || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Market Analysis</p>
                            <p className="text-sm text-slate-300">{formData.marketAnalysis || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Competitive Advantage</p>
                            <p className="text-sm text-slate-300">{formData.competitiveAdvantage || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Team Information</p>
                            <p className="text-sm text-slate-300">{formData.team || "Not provided"}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-slate-200 mb-2 flex items-center">
                          <DollarSign className="mr-2 h-5 w-5 text-cyan-500" /> Financial Details
                        </h3>
                        <div className="bg-slate-800/30 rounded-lg p-4 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-slate-500">Equity Offered</p>
                              <p className="text-sm text-slate-300">
                                {formData.equity ? `${formData.equity}%` : "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Expected Return</p>
                              <p className="text-sm text-slate-300">
                                {formData.expectedReturn ? `${formData.expectedReturn}%` : "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Minimum Investment</p>
                              <p className="text-sm text-slate-300">
                                {formData.minimumInvestment
                                  ? `${Number.parseInt(formData.minimumInvestment).toLocaleString()} MGA`
                                  : "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Maximum Investment</p>
                              <p className="text-sm text-slate-300">
                                {formData.maximumInvestment
                                  ? `${Number.parseInt(formData.maximumInvestment).toLocaleString()} MGA`
                                  : "No limit"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Return Timeline</p>
                              <p className="text-sm text-slate-300">
                                {formData.returnTimeline ? `${formData.returnTimeline} months` : "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Allow Partial Funding</p>
                              <p className="text-sm text-slate-300">{formData.allowPartialFunding ? "Yes" : "No"}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Use of Funds</p>
                            <p className="text-sm text-slate-300">{formData.useOfFunds || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Financial Projections</p>
                            <p className="text-sm text-slate-300">{formData.financialProjections || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Risks and Challenges</p>
                            <p className="text-sm text-slate-300">{formData.risks || "Not provided"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="isPublic"
                            checked={formData.isPublic}
                            onCheckedChange={(checked) => handleSwitchChange("isPublic", checked)}
                            className="data-[state=checked]:bg-cyan-500"
                          />
                          <Label htmlFor="isPublic" className="text-slate-300">
                            Make project public after approval
                          </Label>
                        </div>
                        <p className="text-xs text-slate-500 pl-7">
                          If disabled, your project will be saved as a draft and only visible to you.
                        </p>
                      </div>

                      <div className="pt-4">
                        <div className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handlePrevTab}
                            className="border-slate-700 text-slate-300 hover:bg-slate-800"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center">
                                <div className="h-4 w-4 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-2"></div>
                                Submitting...
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Save className="mr-2 h-4 w-4" /> Submit Project
                              </div>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </form>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}


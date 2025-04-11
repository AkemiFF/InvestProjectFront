"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calculator,
  Check,
  ChevronRight,
  CreditCard,
  DollarSign,
  FileText,
  HelpCircle,
  Info,
  Lightbulb,
  Lock,
  MapPin,
  Percent,
  Shield,
  ThumbsUp,
  Timer,
  Wallet,
} from "lucide-react"
import { projectsService } from "@/services/projects-service"
import type { Project } from "@/types/projects"
import type { InvestmentCreateData } from "@/types/investments";
import { investmentsService } from "@/services/investments-service";
import { useParams } from "next/navigation"

export default function InvestmentProcessPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [currentStep, setCurrentStep] = useState(1)
  const params = useParams()
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const projectId = params.id;
  const [isLoading, setIsLoading] = useState(false)
  const [investmentComplete, setInvestmentComplete] = useState(false)
  const [isLoadingProject, setIsLoadingProject] = useState(true)
  const [project, setProject] = useState<Project | null>(null)
  const [error, setError] = useState<string | null>(null)


  // Sample project data

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoadingProject(true)
        if (typeof projectId === "string" || typeof projectId === "number") {
          const response = await projectsService.getProjectById(projectId)
          setProject(response.data)
          console.log(response.data);
        } else {
          throw new Error("Invalid project ID")
        }
        setError(null)
      } catch (err) {
        console.error("Error fetching project:", err)
        setError("Failed to load project details. Please try again later.")
      } finally {
        setIsLoadingProject(false)
      }
    }

    if (projectId) {
      fetchProject()
    }
  }, [projectId])

  useEffect(() => {
    if (project && amount) {
      const numAmount = Number(amount);
      const min = Number(project.minimum_investment);
      const max = Number(project.maximum_investment);

      if (numAmount < min) {
        setError(`Le montant minimum est ${formatCurrency(min)}`);
      } else if (numAmount > max) {
        setError(`Le montant maximum est ${formatCurrency(max)}`);
      }
    }
  }, [project, amount]);

  // Form state
  const [formData, setFormData] = useState({
    amount: amount ? amount.toString() : "",
    paymentMethod: "wallet",
    termsAccepted: false,
    riskAccepted: false,
  })

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle payment method change
  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  // Calculate expected return
  const calculateReturn = () => {
    const amount = Number.parseInt(formData.amount)
    return project && project.expected_return !== undefined
      ? amount * (project.expected_return / 100)
      : 0
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Handle next step
  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setInvestmentComplete(true)

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/investments/dashboard")
      }, 3000)
    }, 2000)
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <Link href="/projects" className="hover:text-slate-300 flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Projects
          </Link>
          {project && (
            <>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/projects/${project.id}`} className="hover:text-slate-300">
                {project.title}
              </Link>
              <ChevronRight className="h-4 w-4" />
            </>
          )}

          <span className="text-slate-300">Invest</span>
        </div>

        {investmentComplete ? (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="h-20 w-20 rounded-full bg-green-900/20 flex items-center justify-center mb-2">
                  <Check className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-100">Investment Successful!</h2>
                <p className="text-slate-400 text-center max-w-md">
                  Your investment of {formatCurrency(Number.parseInt(formData.amount))} in {project?.title || "the project"} has been
                  processed successfully.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 w-full max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Investment Amount</span>
                    <span className="text-sm font-medium text-slate-200">
                      {formatCurrency(Number.parseInt(formData.amount))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Expected Return</span>
                    <span className="text-sm font-medium text-green-400">{formatCurrency(calculateReturn())}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Return Period</span>
                    <span className="text-sm font-medium text-slate-200">{project?.return_timeline ?? "N/A"} months</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm">Redirecting to your investment dashboard...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100">Investment Process</CardTitle>
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">Step {currentStep} of 4</Badge>
                  </div>
                  {(project) && (<CardDescription className="text-slate-400">
                    Complete the steps below to invest in {project?.title || "this project"}
                  </CardDescription>

                  )}

                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full h-1 bg-slate-800 rounded-full"></div>
                      </div>
                      <div className="relative flex justify-between">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`h-6 w-6 rounded-full flex items-center justify-center ${step < currentStep
                              ? "bg-cyan-500 text-black"
                              : step === currentStep
                                ? "bg-cyan-900 border-2 border-cyan-500 text-cyan-500"
                                : "bg-slate-800 text-slate-500"
                              }`}
                          >
                            {step < currentStep ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <span className="text-xs">{step}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-slate-400">Amount</span>
                      <span className="text-xs text-slate-400">Payment</span>
                      <span className="text-xs text-slate-400">Review</span>
                      <span className="text-xs text-slate-400">Confirm</span>
                    </div>
                  </div>

                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="text-slate-300">
                          Investment Amount (MGA)
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                          <Input
                            id="amount"
                            name="amount"
                            type="number"
                            className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            value={formData.amount}
                            onChange={handleChange}
                            min={project?.minimum_investment || 0}
                            max={project?.maximum_investment || 0}
                            required
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">
                            Min: {project ? formatCurrency(Number(project.minimum_investment)) : "N/A"}
                          </span>
                          <span className="text-slate-500">
                            Max: {project ? formatCurrency(Number(project.maximum_investment)) : "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 space-y-4">
                        <div className="flex items-center">
                          <Calculator className="h-5 w-5 text-cyan-500 mr-2" />
                          <h3 className="text-sm font-medium text-slate-200">Investment Calculator</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Investment Amount</span>
                            <span className="text-sm text-slate-300">
                              {formatCurrency(Number.parseInt(formData.amount) || 0)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Return Rate</span>
                            <span className="text-sm text-slate-300">{project?.expected_return}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Return Period</span>
                            <span className="text-sm text-slate-300">{project?.return_timeline} months</span>
                          </div>
                          <Separator className="my-2 bg-slate-700" />
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-300">Expected Return</span>
                            <span className="text-sm font-medium text-green-400">
                              {formatCurrency(calculateReturn())}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-300">Total Value</span>
                            <span className="text-sm font-medium text-cyan-400">
                              {formatCurrency(Number.parseInt(formData.amount) + calculateReturn())}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Alert className="bg-blue-900/20 border-blue-700/50 text-blue-300">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Your investment will be locked for the duration of the project. Returns are projected based on
                          the project's performance.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Label className="text-slate-300">Select Payment Method</Label>
                        <RadioGroup
                          value={formData.paymentMethod}
                          onValueChange={handlePaymentMethodChange}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                            <RadioGroupItem value="wallet" id="wallet" className="text-cyan-500 border-slate-700" />
                            <Label htmlFor="wallet" className="flex-1 flex items-center cursor-pointer">
                              <Wallet className="h-5 w-5 text-cyan-500 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-slate-200">Platform Wallet</div>
                                <div className="text-xs text-slate-400">Use your available balance</div>
                              </div>
                              <Badge className="ml-auto bg-green-500/10 text-green-400 border-green-500/30">
                                Available: {formatCurrency(7500000)}
                              </Badge>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                            <RadioGroupItem value="card" id="card" className="text-cyan-500 border-slate-700" />
                            <Label htmlFor="card" className="flex-1 flex items-center cursor-pointer">
                              <CreditCard className="h-5 w-5 text-cyan-500 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-slate-200">Credit/Debit Card</div>
                                <div className="text-xs text-slate-400">Pay with Visa, Mastercard, or other cards</div>
                              </div>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                            <RadioGroupItem value="bank" id="bank" className="text-cyan-500 border-slate-700" />
                            <Label htmlFor="bank" className="flex-1 flex items-center cursor-pointer">
                              <Briefcase className="h-5 w-5 text-cyan-500 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-slate-200">Bank Transfer</div>
                                <div className="text-xs text-slate-400">Direct transfer from your bank account</div>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {formData.paymentMethod === "card" && (
                        <div className="space-y-4 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber" className="text-slate-300">
                              Card Number
                            </Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate" className="text-slate-300">
                                Expiry Date
                              </Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv" className="text-slate-300">
                                CVV
                              </Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardName" className="text-slate-300">
                              Name on Card
                            </Label>
                            <Input
                              id="cardName"
                              placeholder="John Doe"
                              className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            />
                          </div>
                        </div>
                      )}

                      {formData.paymentMethod === "bank" && (
                        <Alert className="bg-blue-900/20 border-blue-700/50 text-blue-300">
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            You will be provided with bank transfer details after reviewing your investment. The funds
                            will be held in escrow until the transfer is confirmed.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-cyan-500" />
                        <span className="text-sm text-slate-300">All payments are secure and encrypted</span>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                        <h3 className="text-sm font-medium text-slate-200 mb-3">Investment Summary</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Project</span>
                            <span className="text-sm text-slate-300">{project?.title || "N/A"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Sector</span>
                            <span className="text-sm text-slate-300">
                              {typeof project?.sector === "string" ? project.sector : project?.sector?.name || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Investment Amount</span>
                            <span className="text-sm text-cyan-400">
                              {formatCurrency(Number.parseInt(formData.amount))}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Payment Method</span>
                            <span className="text-sm text-slate-300">
                              {formData.paymentMethod === "wallet"
                                ? "Platform Wallet"
                                : formData.paymentMethod === "card"
                                  ? "Credit/Debit Card"
                                  : "Bank Transfer"}
                            </span>
                          </div>
                          <Separator className="my-2 bg-slate-700" />
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Return Rate</span>
                            <span className="text-sm text-slate-300">{project?.expected_return}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Expected Return</span>
                            <span className="text-sm text-green-400">{formatCurrency(calculateReturn())}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Return Period</span>
                            <span className="text-sm text-slate-300">{project?.return_timeline} months</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-300">Total Value</span>
                            <span className="text-sm font-medium text-cyan-400">
                              {formatCurrency(Number.parseInt(formData.amount) + calculateReturn())}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Alert className="bg-amber-900/20 border-amber-700/50 text-amber-300">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Important Notice</AlertTitle>
                        <AlertDescription>
                          Please review the investment terms and conditions carefully before proceeding. All investments
                          carry risk, and returns are not guaranteed.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="termsAccepted"
                            checked={formData.termsAccepted}
                            onCheckedChange={(checked) => handleCheckboxChange("termsAccepted", checked as boolean)}
                            className="border-slate-700 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                          />
                          <Label htmlFor="termsAccepted" className="text-sm text-slate-300">
                            I have read and agree to the{" "}
                            <Link href="#" className="text-cyan-400 hover:underline">
                              Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link href="#" className="text-cyan-400 hover:underline">
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="riskAccepted"
                            checked={formData.riskAccepted}
                            onCheckedChange={(checked) => handleCheckboxChange("riskAccepted", checked as boolean)}
                            className="border-slate-700 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                          />
                          <Label htmlFor="riskAccepted" className="text-sm text-slate-300">
                            I understand that investments carry risk and past performance is not indicative of future
                            results
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <Alert className="bg-green-900/20 border-green-700/50 text-green-300">
                        <ThumbsUp className="h-4 w-4" />
                        <AlertTitle>Ready to Invest</AlertTitle>
                        <AlertDescription>
                          You're about to invest {formatCurrency(Number.parseInt(formData.amount))} in {project?.title}.
                          Please confirm to complete your investment.
                        </AlertDescription>
                      </Alert>

                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                        <h3 className="text-sm font-medium text-slate-200 mb-3">Final Confirmation</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Investment Amount</span>
                            <span className="text-sm font-medium text-cyan-400">
                              {formatCurrency(Number.parseInt(formData.amount))}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Payment Method</span>
                            <span className="text-sm text-slate-300">
                              {formData.paymentMethod === "wallet"
                                ? "Platform Wallet"
                                : formData.paymentMethod === "card"
                                  ? "Credit/Debit Card"
                                  : "Bank Transfer"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Expected Return</span>
                            <span className="text-sm font-medium text-green-400">
                              {formatCurrency(calculateReturn())}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 flex items-center">
                        <Lock className="h-5 w-5 text-cyan-500 mr-3" />
                        <div className="text-sm text-slate-300">
                          Your investment is secured by our platform's escrow system and will be released to the project
                          once the funding goal is reached.
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t border-slate-700/50 pt-4 flex justify-between">
                  {currentStep > 1 ? (
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  <Button
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                    disabled={
                      (currentStep === 1 && !formData.amount) ||
                      (currentStep === 3 && (!formData.termsAccepted || !formData.riskAccepted)) ||
                      isLoading
                    }
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="h-4 w-4 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : currentStep < 4 ? (
                      <div className="flex items-center">
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Confirm Investment <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Project Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-200 mb-1">{project?.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-600/50 text-xs">
                          {project?.sector.name}
                        </Badge>
                        <div className="text-xs text-slate-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {project?.location}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mb-3">{project?.short_description}</p>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs text-slate-400">
                          {project && formatCurrency(Number(project.amount_raised))} of {project && formatCurrency(Number(project.amount_needed))}
                        </div>
                        <div className="text-xs text-cyan-400">{project?.progress}%</div>
                      </div>
                      <Progress value={project?.progress} className="h-1.5 bg-slate-700">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          style={{ width: `${project?.progress}%` }}
                        />
                      </Progress>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-800/50 rounded p-2 text-center">
                        <div className="text-xs text-slate-500 mb-1">Investors</div>
                        <div className="text-sm font-medium text-slate-300">{project?.owner.username}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded p-2 text-center">
                        <div className="text-xs text-slate-500 mb-1">Days Left</div>
                        <div className="text-sm font-medium text-slate-300 flex items-center justify-center">
                          <Timer className="h-3 w-3 mr-1 text-amber-500" /> {project?.days_left}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Min. Investment</span>
                        <span className="text-xs text-slate-300">{project && formatCurrency(Number(project.minimum_investment))}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Return Rate</span>
                        <span className="text-xs text-green-400">{project?.expected_return}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Return Period</span>
                        <span className="text-xs text-slate-300">{project?.return_timeline} months</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-400">
                      Have questions about the investment process or this project?
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-slate-500" />
                        <Link href="#" className="text-sm text-cyan-400 hover:underline">
                          Investment Guide
                        </Link>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Percent className="h-4 w-4 text-slate-500" />
                        <Link href="#" className="text-sm text-cyan-400 hover:underline">
                          Return Calculation
                        </Link>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="h-4 w-4 text-slate-500" />
                        <Link href="#" className="text-sm text-cyan-400 hover:underline">
                          Investment Tips
                        </Link>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
                      <HelpCircle className="mr-2 h-4 w-4" /> Contact Support
                    </Button>
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


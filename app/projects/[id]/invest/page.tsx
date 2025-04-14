"use client"

import type React from "react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StripeCardElement } from "@/components/payment/stripe-card-element"
import { StripeProvider } from "@/components/payment/stripe-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { investmentsService } from "@/services/investments-service"
import { paymentService } from "@/services/payment-service"
import { projectsService } from "@/services/projects-service"
import type { InvestmentCreateData } from "@/types/investments"
import type { Project } from "@/types/projects"
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
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function InvestmentProcessPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const amount = searchParams.get("amount")
  const projectId = params.id

  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [investmentComplete, setInvestmentComplete] = useState(false)
  const [isLoadingProject, setIsLoadingProject] = useState(true)
  const [project, setProject] = useState<Project | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    amount: amount ? amount.toString() : "",
    paymentMethod: "wallet",
    termsAccepted: false,
    riskAccepted: false,
  })

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoadingProject(true)
        if (typeof projectId === "string" || typeof projectId === "number") {
          const response = await projectsService.getProjectById(projectId)
          setProject(response.data)
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
      const numAmount = Number(amount)
      const min = Number(project.minimum_investment)
      const max = Number(project.maximum_investment)

      if (numAmount < min) {
        setError(`Le montant minimum est ${formatCurrency(min)}`)
      } else if (max && numAmount > max) {
        setError(`Le montant maximum est ${formatCurrency(max)}`)
      }
    }
  }, [project, amount])

  // Créer une intention de paiement Stripe lorsque l'utilisateur choisit la carte comme méthode de paiement
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (formData.paymentMethod === "card" && currentStep === 2 && formData.amount) {
        try {
          const amountInCents = Math.round(Number(formData.amount) * 100)
          const metadata = {
            project_id: projectId as string,
            user_id: "current_user_id", // Remplacez par l'ID de l'utilisateur actuel
          }

          const paymentIntent = await paymentService.createPaymentIntent(amountInCents, "mga", metadata)
          setClientSecret(paymentIntent.client_secret)
          setPaymentIntentId(paymentIntent.id)
        } catch (err) {
          console.error("Error creating payment intent:", err)
          toast({
            title: "Erreur",
            description: "Impossible de préparer le paiement. Veuillez réessayer.",
            variant: "destructive",
          })
        }
      }
    }

    createPaymentIntent()
  }, [formData.paymentMethod, currentStep, formData.amount, projectId])

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
    // Réinitialiser les données de paiement Stripe
    if (value !== "card") {
      setClientSecret(null)
      setPaymentIntentId(null)
    }
  }

  // Calculate expected return
  const calculateReturn = () => {
    const amount = Number.parseInt(formData.amount)
    return project && project.expected_return !== undefined ? amount * (project.expected_return / 100) : 0
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
  const handleNextStep = async () => {
    if (currentStep < 4) {
      // Si l'utilisateur est à l'étape 2 et a choisi le paiement par Stripe Checkout
      if (currentStep === 2 && formData.paymentMethod === "bank") {
        try {
          setIsLoading(true)
          const amountInCents = Math.round(Number(formData.amount) * 100)
          const metadata = {
            project_id: projectId as string,
            user_id: "current_user_id", // Remplacez par l'ID de l'utilisateur actuel
          }

          // URL de succès et d'annulation
          const successUrl = `${window.location.origin}/projects/${projectId}/invest/success?session_id={CHECKOUT_SESSION_ID}`
          const cancelUrl = `${window.location.origin}/projects/${projectId}/invest?amount=${formData.amount}`

          const session = await paymentService.createCheckoutSession(
            amountInCents,
            "mga",
            metadata,
            successUrl,
            cancelUrl,
          )

          // Rediriger vers la page de paiement Stripe Checkout
          window.location.href = session.url
          return
        } catch (err) {
          console.error("Error creating checkout session:", err)
          toast({
            title: "Erreur",
            description: "Impossible de préparer le paiement. Veuillez réessayer.",
            variant: "destructive",
          })
          setIsLoading(false)
        }
      }

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

  // Handle payment success
  const handlePaymentSuccess = (paymentIntentId: string) => {
    // Enregistrer l'ID de l'intention de paiement pour l'utiliser lors de la soumission finale
    setPaymentIntentId(paymentIntentId)
    // Passer à l'étape suivante
    setCurrentStep(currentStep + 1)
  }

  // Handle payment error
  const handlePaymentError = (errorMessage: string) => {
    toast({
      title: "Erreur de paiement",
      description: errorMessage,
      variant: "destructive",
    })
  }

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Créer l'investissement
      const investmentData: InvestmentCreateData = {
        project: projectId as string,
        project_id: projectId as unknown as number,
        amount: Number(formData.amount),
        payment_method: formData.paymentMethod,
      }

      // Si nous avons un ID d'intention de paiement Stripe, l'ajouter aux données
      if (paymentIntentId) {
        investmentData.payment_intent_id = paymentIntentId
      }

      // Appeler l'API pour créer l'investissement
      const response = await investmentsService.createInvestment(investmentData)

      // Afficher un message de succès
      toast({
        title: "Investissement réussi",
        description: `Votre investissement de ${formatCurrency(Number(formData.amount))} a été enregistré avec succès.`,
      })

      setInvestmentComplete(true)

      // Rediriger après 3 secondes
      setTimeout(() => {
        router.push("/investments/dashboard")
      }, 3000)
    } catch (err: any) {
      console.error("Error creating investment:", err)
      toast({
        title: "Erreur",
        description: err.message || "Une erreur est survenue lors de la création de l'investissement.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <Link href="/projects" className="hover:text-slate-300 flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4" /> Retour aux projets
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

          <span className="text-slate-300">Investir</span>
        </div>

        {investmentComplete ? (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="h-20 w-20 rounded-full bg-green-900/20 flex items-center justify-center mb-2">
                  <Check className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-100">Investissement réussi !</h2>
                <p className="text-slate-400 text-center max-w-md">
                  Votre investissement de {formatCurrency(Number.parseInt(formData.amount))} dans{" "}
                  {project?.title || "le projet"} a été traité avec succès.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 w-full max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Montant investi</span>
                    <span className="text-sm font-medium text-slate-200">
                      {formatCurrency(Number.parseInt(formData.amount))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Rendement attendu</span>
                    <span className="text-sm font-medium text-green-400">{formatCurrency(calculateReturn())}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Période de retour</span>
                    <span className="text-sm font-medium text-slate-200">{project?.return_timeline ?? "N/A"} mois</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm">Redirection vers votre tableau de bord d'investissement...</p>
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
                    <CardTitle className="text-slate-100">Processus d'investissement</CardTitle>
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">Étape {currentStep} sur 4</Badge>
                  </div>
                  {project && (
                    <CardDescription className="text-slate-400">
                      Complétez les étapes ci-dessous pour investir dans {project?.title || "ce projet"}
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
                      <span className="text-xs text-slate-400">Montant</span>
                      <span className="text-xs text-slate-400">Paiement</span>
                      <span className="text-xs text-slate-400">Vérification</span>
                      <span className="text-xs text-slate-400">Confirmation</span>
                    </div>
                  </div>

                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="text-slate-300">
                          Montant d'investissement (MGA)
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
                          <h3 className="text-sm font-medium text-slate-200">Calculateur d'investissement</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Montant d'investissement</span>
                            <span className="text-sm text-slate-300">
                              {formatCurrency(Number.parseInt(formData.amount) || 0)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Taux de rendement</span>
                            <span className="text-sm text-slate-300">{project?.expected_return}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Période de retour</span>
                            <span className="text-sm text-slate-300">{project?.return_timeline} mois</span>
                          </div>
                          <Separator className="my-2 bg-slate-700" />
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-300">Rendement attendu</span>
                            <span className="text-sm font-medium text-green-400">
                              {formatCurrency(calculateReturn())}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-300">Valeur totale</span>
                            <span className="text-sm font-medium text-cyan-400">
                              {formatCurrency(Number.parseInt(formData.amount) + calculateReturn())}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Alert className="bg-blue-900/20 border-blue-700/50 text-blue-300">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Votre investissement sera bloqué pendant toute la durée du projet. Les rendements sont
                          projetés en fonction des performances du projet.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Label className="text-slate-300">Sélectionnez un mode de paiement</Label>
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
                                <div className="text-sm font-medium text-slate-200">Portefeuille de la plateforme</div>
                                <div className="text-xs text-slate-400">Utilisez votre solde disponible</div>
                              </div>
                              <Badge className="ml-auto bg-green-500/10 text-green-400 border-green-500/30">
                                Disponible: {formatCurrency(7500000)}
                              </Badge>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                            <RadioGroupItem value="card" id="card" className="text-cyan-500 border-slate-700" />
                            <Label htmlFor="card" className="flex-1 flex items-center cursor-pointer">
                              <CreditCard className="h-5 w-5 text-cyan-500 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-slate-200">Carte de crédit/débit</div>
                                <div className="text-xs text-slate-400">
                                  Payez avec Visa, Mastercard ou d'autres cartes
                                </div>
                              </div>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                            <RadioGroupItem value="bank" id="bank" className="text-cyan-500 border-slate-700" />
                            <Label htmlFor="bank" className="flex-1 flex items-center cursor-pointer">
                              <Briefcase className="h-5 w-5 text-cyan-500 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-slate-200">
                                  Virement bancaire (Stripe Checkout)
                                </div>
                                <div className="text-xs text-slate-400">
                                  Virement direct depuis votre compte bancaire
                                </div>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {formData.paymentMethod === "card" && (
                        <div className="space-y-4 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                          <StripeProvider>
                            <StripeCardElement
                              amount={Number(formData.amount)}
                              clientSecret={clientSecret}
                              onPaymentSuccess={handlePaymentSuccess}
                              onPaymentError={handlePaymentError}
                            />
                          </StripeProvider>
                        </div>
                      )}

                      {formData.paymentMethod === "bank" && (
                        <Alert className="bg-blue-900/20 border-blue-700/50 text-blue-300">
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            Vous serez redirigé vers Stripe Checkout pour effectuer votre paiement en toute sécurité.
                            Les fonds seront conservés en séquestre jusqu'à la confirmation du transfert.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-cyan-500" />
                        <span className="text-sm text-slate-300">Tous les paiements sont sécurisés et cryptés</span>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                        <h3 className="text-sm font-medium text-slate-200 mb-3">Résumé de l'investissement</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Projet</span>
                            <span className="text-sm text-slate-300">{project?.title || "N/A"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Secteur</span>
                            <span className="text-sm text-slate-300">
                              {typeof project?.sector === "string" ? project.sector : project?.sector?.name || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Montant d'investissement</span>
                            <span className="text-sm text-cyan-400">
                              {formatCurrency(Number.parseInt(formData.amount))}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Mode de paiement</span>
                            <span className="text-sm text-slate-300">
                              {formData.paymentMethod === "wallet"
                                ? "Portefeuille de la plateforme"
                                : formData.paymentMethod === "card"
                                  ? "Carte de crédit/débit"
                                  : "Virement bancaire"}
                            </span>
                          </div>
                          <Separator className="my-2 bg-slate-700" />
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Taux de rendement</span>
                            <span className="text-sm text-slate-300">{project?.expected_return}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Rendement attendu</span>
                            <span className="text-sm text-green-400">{formatCurrency(calculateReturn())}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Période de retour</span>
                            <span className="text-sm text-slate-300">{project?.return_timeline} mois</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-300">Valeur totale</span>
                            <span className="text-sm font-medium text-cyan-400">
                              {formatCurrency(Number.parseInt(formData.amount) + calculateReturn())}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Alert className="bg-amber-900/20 border-amber-700/50 text-amber-300">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Avis important</AlertTitle>
                        <AlertDescription>
                          Veuillez lire attentivement les conditions générales d'investissement avant de continuer. Tous
                          les investissements comportent des risques, et les rendements ne sont pas garantis.
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
                            J'ai lu et j'accepte les{" "}
                            <Link href="#" className="text-cyan-400 hover:underline">
                              Conditions Générales
                            </Link>{" "}
                            et la{" "}
                            <Link href="#" className="text-cyan-400 hover:underline">
                              Politique de Confidentialité
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
                            Je comprends que les investissements comportent des risques et que les performances passées
                            ne préjugent pas des résultats futurs
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <Alert className="bg-green-900/20 border-green-700/50 text-green-300">
                        <ThumbsUp className="h-4 w-4" />
                        <AlertTitle>Prêt à investir</AlertTitle>
                        <AlertDescription>
                          Vous êtes sur le point d'investir {formatCurrency(Number.parseInt(formData.amount))} dans{" "}
                          {project?.title}. Veuillez confirmer pour finaliser votre investissement.
                        </AlertDescription>
                      </Alert>

                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                        <h3 className="text-sm font-medium text-slate-200 mb-3">Confirmation finale</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Montant d'investissement</span>
                            <span className="text-sm font-medium text-cyan-400">
                              {formatCurrency(Number.parseInt(formData.amount))}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Mode de paiement</span>
                            <span className="text-sm text-slate-300">
                              {formData.paymentMethod === "wallet"
                                ? "Portefeuille de la plateforme"
                                : formData.paymentMethod === "card"
                                  ? "Carte de crédit/débit"
                                  : "Virement bancaire"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Rendement attendu</span>
                            <span className="text-sm font-medium text-green-400">
                              {formatCurrency(calculateReturn())}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 flex items-center">
                        <Lock className="h-5 w-5 text-cyan-500 mr-3" />
                        <div className="text-sm text-slate-300">
                          Votre investissement est sécurisé par le système de séquestre de notre plateforme et sera
                          libéré au profit du projet une fois l'objectif de financement atteint.
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
                      Retour
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  <Button
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                    disabled={
                      (currentStep === 1 && !formData.amount) ||
                      (currentStep === 2 && formData.paymentMethod === "card" && !paymentIntentId) ||
                      (currentStep === 3 && (!formData.termsAccepted || !formData.riskAccepted)) ||
                      isLoading
                    }
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="h-4 w-4 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Traitement...
                      </div>
                    ) : currentStep < 4 ? (
                      <div className="flex items-center">
                        Continuer <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Confirmer l'investissement <ArrowRight className="ml-2 h-4 w-4" />
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
                  <CardTitle className="text-slate-100 text-base">Résumé du projet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-200 mb-1">{project?.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-600/50 text-xs">
                          {typeof project?.sector === "string" ? project.sector : project?.sector?.name || "N/A"}
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
                          {project && formatCurrency(Number(project.amount_raised))} sur{" "}
                          {project && formatCurrency(Number(project.amount_needed))}
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
                        <div className="text-xs text-slate-500 mb-1">Investisseurs</div>
                        <div className="text-sm font-medium text-slate-300">{project?.owner.username}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded p-2 text-center">
                        <div className="text-xs text-slate-500 mb-1">Jours restants</div>
                        <div className="text-sm font-medium text-slate-300 flex items-center justify-center">
                          <Timer className="h-3 w-3 mr-1 text-amber-500" /> {project?.days_left}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Investissement min.</span>
                        <span className="text-xs text-slate-300">
                          {project && formatCurrency(Number(project.minimum_investment))}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Taux de rendement</span>
                        <span className="text-xs text-green-400">{project?.expected_return}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Période de retour</span>
                        <span className="text-xs text-slate-300">{project?.return_timeline} mois</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Besoin d'aide ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-400">
                      Vous avez des questions sur le processus d'investissement ou ce projet ?
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-slate-500" />
                        <Link href="#" className="text-sm text-cyan-400 hover:underline">
                          Guide d'investissement
                        </Link>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Percent className="h-4 w-4 text-slate-500" />
                        <Link href="#" className="text-sm text-cyan-400 hover:underline">
                          Calcul du rendement
                        </Link>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="h-4 w-4 text-slate-500" />
                        <Link href="#" className="text-sm text-cyan-400 hover:underline">
                          Conseils d'investissement
                        </Link>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
                      <HelpCircle className="mr-2 h-4 w-4" /> Contacter le support
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

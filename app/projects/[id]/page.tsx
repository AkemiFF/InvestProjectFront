"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  ExternalLink,
  FileText,
  Heart,
  HelpCircle,
  Info,
  Link2,
  MapPin,
  MessageSquare,
  Share2,
  Target,
  ThumbsUp,
  Users,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Sample project data
  const project = {
    id: projectId,
    title: "AI-Powered Healthcare Assistant",
    shortDescription:
      "An innovative AI solution that helps healthcare providers diagnose and treat patients more effectively, reducing costs and improving outcomes.",
    fullDescription:
      "Our AI-Powered Healthcare Assistant is designed to revolutionize the healthcare industry by providing real-time diagnostic support, treatment recommendations, and patient monitoring. The system uses advanced machine learning algorithms trained on millions of medical records to assist healthcare professionals in making more accurate diagnoses and treatment plans.\n\nThe platform integrates seamlessly with existing electronic health record systems and can be accessed via web or mobile applications. It includes features such as symptom analysis, medical imaging interpretation, drug interaction checking, and personalized treatment recommendations based on patient history and the latest medical research.",
    sector: "Technology",
    location: "Antananarivo, Madagascar",
    progress: 78,
    target: 8000000,
    raised: 6240000,
    investors: 35,
    daysLeft: 5,
    featured: true,
    owner: {
      name: "MedTech Innovations",
      image: "/placeholder.svg?height=40&width=40",
      description:
        "A leading healthcare technology company focused on developing AI solutions for the medical industry.",
      projects: 3,
      successRate: 100,
    },
    team: [
      {
        name: "Dr. Sarah Johnson",
        role: "CEO & Medical Director",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Alex Chen",
        role: "CTO & AI Specialist",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Maria Rodriguez",
        role: "Product Manager",
        image: "/placeholder.svg?height=40&width=40",
      },
    ],
    businessModel:
      "Our business model is based on a subscription service for healthcare providers. We offer tiered pricing based on the size of the healthcare facility and the number of users. Additionally, we will generate revenue through partnerships with pharmaceutical companies for anonymized data insights.",
    marketAnalysis:
      "The global healthcare AI market is projected to reach $45.2 billion by 2026, growing at a CAGR of 44.9%. There is increasing demand for AI solutions that can reduce healthcare costs while improving patient outcomes. Our target market includes hospitals, clinics, and individual healthcare practitioners.",
    competitiveAdvantage:
      "Unlike competitors who focus solely on diagnostic support or administrative automation, our solution provides comprehensive support across the entire patient care journey. Our proprietary algorithms have demonstrated 15% higher accuracy in diagnostic suggestions compared to leading competitors in blind tests.",
    useOfFunds:
      "The funds raised will be allocated as follows:\n- 40% for AI model refinement and expansion\n- 25% for regulatory approvals and compliance\n- 20% for marketing and business development\n-   25% for regulatory approvals and compliance\n- 20% for marketing and business development\n- 15% for operational expenses and team expansion",
    risks:
      "Key risks include regulatory challenges in different markets, competition from established healthcare technology providers, and potential data privacy concerns. We are mitigating these risks through proactive regulatory engagement, continuous innovation, and implementing robust data security measures that exceed industry standards.",
    equity: "12",
    minimumInvestment: "100000",
    maximumInvestment: "1000000",
    expectedReturn: "25",
    returnTimeline: "36",
    milestones: [
      {
        title: "Beta Testing Completion",
        description: "Complete beta testing with 5 partner hospitals",
        date: "Q1 2024",
        completed: true,
      },
      {
        title: "Regulatory Approval",
        description: "Obtain necessary regulatory approvals for commercial deployment",
        date: "Q2 2024",
        completed: false,
      },
      {
        title: "Commercial Launch",
        description: "Full commercial launch in Madagascar and neighboring countries",
        date: "Q3 2024",
        completed: false,
      },
      {
        title: "International Expansion",
        description: "Expand to international markets in Africa and beyond",
        date: "Q1 2025",
        completed: false,
      },
    ],
    updates: [
      {
        date: "2023-11-10",
        title: "Beta Testing Results",
        content:
          "We're excited to announce that our beta testing phase has been completed with outstanding results. Our AI system demonstrated a 92% accuracy rate in diagnostic suggestions, exceeding our initial targets by 12%.",
      },
      {
        date: "2023-10-25",
        title: "New Partnership Announcement",
        content:
          "We've secured a strategic partnership with Central Hospital, one of the largest healthcare providers in Madagascar. This partnership will accelerate our development and provide valuable real-world testing opportunities.",
      },
    ],
    comments: [
      {
        user: {
          name: "Jean Dupont",
          image: "/placeholder.svg?height=40&width=40",
        },
        date: "2023-11-12",
        content:
          "This project has enormous potential to transform healthcare delivery in our region. I'm particularly impressed by the team's expertise and track record.",
      },
      {
        user: {
          name: "Marie Laurent",
          image: "/placeholder.svg?height=40&width=40",
        },
        date: "2023-11-08",
        content:
          "I've been following this team's work for some time, and their approach to AI in healthcare is truly innovative. Looking forward to seeing this project succeed!",
      },
    ],
    documents: [
      {
        name: "Business Plan.pdf",
        size: "2.4 MB",
        type: "pdf",
      },
      {
        name: "Financial Projections.xlsx",
        size: "1.8 MB",
        type: "excel",
      },
      {
        name: "Technical Whitepaper.pdf",
        size: "3.2 MB",
        type: "pdf",
      },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleInvest = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <Link href="/projects" className="hover:text-slate-300 flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Projects
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-300">{project.title}</span>
        </div>

        {showSuccess && (
          <Alert className="bg-green-900/20 border-green-700/50 text-green-300">
            <Check className="h-4 w-4" />
            <AlertTitle>Investment Successful!</AlertTitle>
            <AlertDescription>
              Your investment of {formatCurrency(Number.parseInt(investmentAmount))} has been processed successfully.
              You can track your investment in your portfolio.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
              <div className="relative h-64 bg-slate-800">
                <img
                  src={project.gallery[0] || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.featured && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-cyan-500 text-xs font-medium px-2 py-0.5 text-black transform rotate-45 translate-x-6 translate-y-1">
                      Featured
                    </div>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-slate-100">{project.title}</CardTitle>
                    <CardDescription className="text-slate-400 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-slate-500" /> {project.location}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 border-slate-700">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 border-slate-700">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-600/50">
                    {project.sector}
                  </Badge>
                  <div className="text-xs text-slate-400 flex items-center">
                    <Users className="h-3 w-3 mr-1" /> {project.investors} Investors
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-slate-400">
                      {formatCurrency(project.raised)} of {formatCurrency(project.target)}
                    </div>
                    <div className="text-xs text-cyan-400">{project.progress}%</div>
                  </div>
                  <Progress value={project.progress} className="h-1.5 bg-slate-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </Progress>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-slate-800/50 rounded p-2 text-center">
                    <div className="text-xs text-slate-500 mb-1">Target</div>
                    <div className="text-sm font-medium text-slate-300">{formatCurrency(project.target)}</div>
                  </div>
                  <div className="bg-slate-800/50 rounded p-2 text-center">
                    <div className="text-xs text-slate-500 mb-1">Days Left</div>
                    <div className="text-sm font-medium text-slate-300 flex items-center justify-center">
                      <Clock className="h-3 w-3 mr-1 text-amber-500" /> {project.daysLeft}
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded p-2 text-center">
                    <div className="text-xs text-slate-500 mb-1">Return</div>
                    <div className="text-sm font-medium text-slate-300">{project.expectedReturn}%</div>
                  </div>
                </div>

                <p className="text-slate-300 mb-4">{project.shortDescription}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-slate-800/50 p-1 mb-6">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="financials"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                >
                  Financials
                </TabsTrigger>
                <TabsTrigger
                  value="team"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                >
                  Team
                </TabsTrigger>
                <TabsTrigger
                  value="updates"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                >
                  Updates
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                >
                  Comments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-slate-300">
                      {project.fullDescription.split("\n\n").map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Business Model</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-slate-300">
                      <p>{project.businessModel}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Market Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-slate-300">
                      <p>{project.marketAnalysis}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Competitive Advantage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-slate-300">
                      <p>{project.competitiveAdvantage}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Project Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-start">
                          <div
                            className={`h-6 w-6 rounded-full flex items-center justify-center mt-0.5 mr-3 ${milestone.completed ? "bg-green-900/30 text-green-500" : "bg-blue-900/30 text-blue-500"}`}
                          >
                            {milestone.completed ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-slate-200">{milestone.title}</h4>
                              <span className="text-xs text-slate-500">{milestone.date}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{milestone.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Project Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.gallery.map((image, index) => (
                        <div key={index} className="rounded-md overflow-hidden border border-slate-700">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Project image ${index + 1}`}
                            className="w-full h-40 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-800/50 rounded-md border border-slate-700/50"
                        >
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded bg-slate-700 flex items-center justify-center mr-3">
                              <FileText className="h-4 w-4 text-slate-300" />
                            </div>
                            <div>
                              <p className="text-sm text-slate-300">{doc.name}</p>
                              <p className="text-xs text-slate-500">{doc.size}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 border-slate-700 hover:bg-slate-800">
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financials" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Investment Terms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-md p-4 border border-slate-700/50">
                        <div className="flex items-center mb-2">
                          <DollarSign className="h-5 w-5 text-cyan-500 mr-2" />
                          <h3 className="text-sm font-medium text-slate-200">Equity Offered</h3>
                        </div>
                        <p className="text-2xl font-bold text-slate-100">{project.equity}%</p>
                        <p className="text-xs text-slate-500 mt-1">Percentage of company equity offered to investors</p>
                      </div>

                      <div className="bg-slate-800/50 rounded-md p-4 border border-slate-700/50">
                        <div className="flex items-center mb-2">
                          <Target className="h-5 w-5 text-cyan-500 mr-2" />
                          <h3 className="text-sm font-medium text-slate-200">Expected Return</h3>
                        </div>
                        <p className="text-2xl font-bold text-slate-100">{project.expectedReturn}%</p>
                        <p className="text-xs text-slate-500 mt-1">Projected annual return on investment</p>
                      </div>

                      <div className="bg-slate-800/50 rounded-md p-4 border border-slate-700/50">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-5 w-5 text-cyan-500 mr-2" />
                          <h3 className="text-sm font-medium text-slate-200">Return Timeline</h3>
                        </div>
                        <p className="text-2xl font-bold text-slate-100">{project.returnTimeline} months</p>
                        <p className="text-xs text-slate-500 mt-1">Estimated time to realize returns</p>
                      </div>

                      <div className="bg-slate-800/50 rounded-md p-4 border border-slate-700/50">
                        <div className="flex items-center mb-2">
                          <Briefcase className="h-5 w-5 text-cyan-500 mr-2" />
                          <h3 className="text-sm font-medium text-slate-200">Investment Range</h3>
                        </div>
                        <p className="text-2xl font-bold text-slate-100">
                          {formatCurrency(Number.parseInt(project.minimumInvestment))} -{" "}
                          {formatCurrency(Number.parseInt(project.maximumInvestment))}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">Min and max investment amounts</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Use of Funds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-slate-300">
                      {project.useOfFunds.split("\n").map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-slate-800 flex items-center justify-center mt-0.5 mr-2">
                            <Check className="h-3 w-3 text-cyan-500" />
                          </div>
                          <p>{item.trim()}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Risks & Challenges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Alert className="bg-amber-900/20 border-amber-700/50 text-amber-300 mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        All investments involve risk. Please read the following information carefully.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-4 text-slate-300">
                      <p>{project.risks}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Project Owner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="flex-shrink-0">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={project.owner.image} alt={project.owner.name} />
                          <AvatarFallback className="bg-slate-700 text-cyan-500">
                            {project.owner.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-slate-100 mb-1">{project.owner.name}</h3>
                        <p className="text-sm text-slate-400 mb-3">{project.owner.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 text-slate-500 mr-1" />
                            <span className="text-slate-300">{project.owner.projects} Projects</span>
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 text-slate-500 mr-1" />
                            <span className="text-slate-300">{project.owner.successRate}% Success Rate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Team Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.team.map((member, index) => (
                        <div
                          key={index}
                          className="bg-slate-800/50 rounded-md p-4 border border-slate-700/50 flex flex-col items-center text-center"
                        >
                          <Avatar className="h-16 w-16 mb-3">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback className="bg-slate-700 text-cyan-500">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h4 className="text-sm font-medium text-slate-200 mb-1">{member.name}</h4>
                          <p className="text-xs text-slate-400">{member.role}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Project Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {project.updates.map((update, index) => (
                        <div key={index} className="bg-slate-800/50 rounded-md p-4 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-slate-200">{update.title}</h4>
                            <span className="text-xs text-slate-500">{update.date}</span>
                          </div>
                          <p className="text-sm text-slate-300">{update.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 text-lg">Investor Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.comments.map((comment, index) => (
                        <div key={index} className="bg-slate-800/50 rounded-md p-4 border border-slate-700/50">
                          <div className="flex items-start">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src={comment.user.image} alt={comment.user.name} />
                              <AvatarFallback className="bg-slate-700 text-cyan-500">
                                {comment.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-slate-200">{comment.user.name}</h4>
                                <span className="text-xs text-slate-500">{comment.date}</span>
                              </div>
                              <p className="text-sm text-slate-300 mt-1">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                          <AvatarFallback className="bg-slate-700 text-cyan-500">JD</AvatarFallback>
                        </Avatar>
                        <Input
                          placeholder="Add a comment..."
                          className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                        />
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm sticky top-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100">Invest in this Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="investmentAmount" className="text-slate-300">
                      Investment Amount (MGA)
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="investmentAmount"
                        type="number"
                        placeholder={project.minimumInvestment}
                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Min: {formatCurrency(Number.parseInt(project.minimumInvestment))}
                      </span>
                      <span className="text-slate-500">
                        Max: {formatCurrency(Number.parseInt(project.maximumInvestment))}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Investment Amount</span>
                      <span className="text-slate-300">
                        {investmentAmount ? formatCurrency(Number.parseInt(investmentAmount)) : "0 MGA"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Platform Fee (2%)</span>
                      <span className="text-slate-300">
                        {investmentAmount ? formatCurrency(Number.parseInt(investmentAmount) * 0.02) : "0 MGA"}
                      </span>
                    </div>
                    <Separator className="my-1 bg-slate-700" />
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span className="text-slate-300">Total</span>
                      <span className="text-cyan-400">
                        {investmentAmount ? formatCurrency(Number.parseInt(investmentAmount) * 1.02) : "0 MGA"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-300">Potential Return ({project.expectedReturn}%)</div>
                      <div className="text-sm font-medium text-green-400">
                        {investmentAmount
                          ? formatCurrency(
                              Number.parseInt(investmentAmount) * (1 + Number.parseInt(project.expectedReturn) / 100),
                            )
                          : "0 MGA"}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">Estimated return after {project.returnTimeline} months</div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                    disabled={!investmentAmount || isLoading}
                    onClick={handleInvest}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="h-4 w-4 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      "Invest Now"
                    )}
                  </Button>

                  <Alert className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      By investing, you agree to the terms and conditions of this project. All investments carry risk.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 text-base">Project Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Funding Progress</span>
                    <span className="text-sm text-slate-300">{project.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Investors</span>
                    <span className="text-sm text-slate-300">{project.investors}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Days Left</span>
                    <span className="text-sm text-slate-300">{project.daysLeft}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Minimum Investment</span>
                    <span className="text-sm text-slate-300">
                      {formatCurrency(Number.parseInt(project.minimumInvestment))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Expected Return</span>
                    <span className="text-sm text-slate-300">{project.expectedReturn}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Return Timeline</span>
                    <span className="text-sm text-slate-300">{project.returnTimeline} months</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 text-base">Share Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
                    <Link2 className="mr-2 h-4 w-4" /> Copy Link
                  </Button>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-slate-400">Have questions about this project or how to invest?</p>
                  <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
                    <HelpCircle className="mr-2 h-4 w-4" /> Contact Support
                  </Button>
                  <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
                    <MessageSquare className="mr-2 h-4 w-4" /> Message Project Owner
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Briefcase,
  Check,
  Clock,
  DollarSign,
  Edit,
  Eye,
  FileText,
  Info,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Trash,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ProjectManagementPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("project-owner")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "Smart City Infrastructure",
      sector: "Technology",
      progress: 45,
      target: 15000000,
      raised: 6750000,
      investors: 24,
      daysLeft: 18,
      status: "active",
    },
    {
      id: 2,
      title: "Renewable Energy Plant",
      sector: "Green Energy",
      progress: 28,
      target: 12000000,
      raised: 3360000,
      investors: 15,
      daysLeft: 25,
      status: "active",
    },
    {
      id: 3,
      title: "Educational Platform",
      sector: "Education",
      progress: 100,
      target: 3200000,
      raised: 3200000,
      investors: 42,
      daysLeft: 0,
      status: "completed",
    },
    {
      id: 4,
      title: "Healthcare Mobile App",
      sector: "Healthcare",
      progress: 0,
      target: 5000000,
      raised: 0,
      investors: 0,
      daysLeft: 0,
      status: "draft",
    },
    {
      id: 5,
      title: "Sustainable Agriculture",
      sector: "Agriculture",
      progress: 0,
      target: 8000000,
      raised: 0,
      investors: 0,
      daysLeft: 0,
      status: "pending",
    },
  ]

  // Sample investor data
  const investors = [
    {
      id: 1,
      name: "Jean Dupont",
      image: "/placeholder.svg?height=40&width=40",
      amount: 500000,
      date: "2023-11-10",
      project: "Smart City Infrastructure",
    },
    {
      id: 2,
      name: "Marie Laurent",
      image: "/placeholder.svg?height=40&width=40",
      amount: 750000,
      date: "2023-11-05",
      project: "Smart City Infrastructure",
    },
    {
      id: 3,
      name: "Ahmed Nasser",
      image: "/placeholder.svg?height=40&width=40",
      amount: 1200000,
      date: "2023-10-28",
      project: "Renewable Energy Plant",
    },
    {
      id: 4,
      name: "Sophie Martin",
      image: "/placeholder.svg?height=40&width=40",
      amount: 350000,
      date: "2023-10-15",
      project: "Educational Platform",
    },
    {
      id: 5,
      name: "Thomas Dubois",
      image: "/placeholder.svg?height=40&width=40",
      amount: 500000,
      date: "2023-10-10",
      project: "Educational Platform",
    },
  ]

  // Sample messages
  const messages = [
    {
      id: 1,
      sender: {
        name: "Jean Dupont",
        image: "/placeholder.svg?height=40&width=40",
      },
      content:
        "I'm interested in your Smart City Infrastructure project. Could we schedule a call to discuss the details?",
      date: "2023-11-15",
      time: "15:42:12",
      unread: true,
      project: "Smart City Infrastructure",
    },
    {
      id: 2,
      sender: {
        name: "Marie Laurent",
        image: "/placeholder.svg?height=40&width=40",
      },
      content: "Thanks for accepting my investment proposal. I've transferred the first installment as discussed.",
      date: "2023-11-10",
      time: "14:30:45",
      unread: true,
      project: "Smart City Infrastructure",
    },
    {
      id: 3,
      sender: {
        name: "Ahmed Nasser",
        image: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Our team reviewed your project documentation. We'd like to increase our investment if you can provide more details on the expansion plan.",
      date: "2023-11-05",
      time: "12:15:33",
      unread: false,
      project: "Renewable Energy Plant",
    },
  ]

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Active</Badge>
      case "completed":
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Completed</Badge>
      case "draft":
        return <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/30">Draft</Badge>
      case "pending":
        return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">Pending Approval</Badge>
      default:
        return <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/30">{status}</Badge>
    }
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Project Management</h1>
            <p className="text-slate-400">Manage and track your projects</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search projects..."
                className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link href="/projects/submit">
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="bg-slate-800/50 p-1 mb-6">
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              My Projects
            </TabsTrigger>
            <TabsTrigger
              value="investors"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Investors
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-10 w-10 rounded-full bg-cyan-900/30 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-cyan-500" />
                    </div>
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">Total</Badge>
                  </div>
                  <div className="text-2xl font-bold text-slate-100 mb-1">{projects.length}</div>
                  <div className="text-sm text-slate-400">Projects</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-green-500" />
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Active</Badge>
                  </div>
                  <div className="text-2xl font-bold text-slate-100 mb-1">
                    {projects.filter((p) => p.status === "active").length}
                  </div>
                  <div className="text-sm text-slate-400">Active Projects</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Total</Badge>
                  </div>
                  <div className="text-2xl font-bold text-slate-100 mb-1">{investors.length}</div>
                  <div className="text-sm text-slate-400">Investors</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-purple-500" />
                    </div>
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30">Total</Badge>
                  </div>
                  <div className="text-2xl font-bold text-slate-100 mb-1">
                    {formatCurrency(projects.reduce((sum, p) => sum + p.raised, 0))}
                  </div>
                  <div className="text-sm text-slate-400">Funds Raised</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100">My Projects</CardTitle>
                <CardDescription className="text-slate-400">Manage and track all your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                        <th className="text-left font-medium p-3">Project</th>
                        <th className="text-left font-medium p-3">Status</th>
                        <th className="text-left font-medium p-3">Progress</th>
                        <th className="text-left font-medium p-3">Raised</th>
                        <th className="text-left font-medium p-3">Investors</th>
                        <th className="text-left font-medium p-3">Days Left</th>
                        <th className="text-right font-medium p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                          <td className="p-3">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center mr-3">
                                <Briefcase className="h-4 w-4 text-slate-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-slate-200">{project.title}</div>
                                <div className="text-xs text-slate-500">{project.sector}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">{getStatusBadge(project.status)}</td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <Progress value={project.progress} className="h-1.5 w-24 bg-slate-700">
                                <div
                                  className={`h-full rounded-full ${project.status === "completed"
                                      ? "bg-green-500"
                                      : "bg-gradient-to-r from-cyan-500 to-blue-500"
                                    }`}
                                  style={{ width: `${project.progress}%` }}
                                />
                              </Progress>
                              <span className="text-xs text-slate-400">{project.progress}%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm text-slate-300">{formatCurrency(project.raised)}</div>
                            <div className="text-xs text-slate-500">of {formatCurrency(project.target)}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm text-slate-300">{project.investors}</div>
                          </td>
                          <td className="p-3">
                            {project.status === "active" ? (
                              <div className="text-sm text-slate-300 flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-amber-500" /> {project.daysLeft}
                              </div>
                            ) : project.status === "completed" ? (
                              <div className="text-sm text-green-400 flex items-center">
                                <Check className="h-3 w-3 mr-1" /> Completed
                              </div>
                            ) : (
                              <div className="text-sm text-slate-500">-</div>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" /> View Project
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" /> Edit Project
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="h-4 w-4 mr-2" /> Messages
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <BarChart3 className="h-4 w-4 mr-2" /> Analytics
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Settings className="h-4 w-4 mr-2" /> Settings
                                </DropdownMenuItem>
                                {project.status === "draft" && (
                                  <DropdownMenuItem className="text-red-400">
                                    <Trash className="h-4 w-4 mr-2" /> Delete
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Recent Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium text-slate-200">Smart City Infrastructure</div>
                        <div className="text-xs text-slate-500">2 days ago</div>
                      </div>
                      <div className="text-xs text-slate-400">New investor joined. Total investors: 24</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium text-slate-200">Renewable Energy Plant</div>
                        <div className="text-xs text-slate-500">5 days ago</div>
                      </div>
                      <div className="text-xs text-slate-400">Project reached 25% of funding goal</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium text-slate-200">Educational Platform</div>
                        <div className="text-xs text-slate-500">1 week ago</div>
                      </div>
                      <div className="text-xs text-slate-400">Project successfully completed funding</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Pending Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium text-slate-200 flex items-center">
                          <AlertCircle className="h-4 w-4 text-amber-500 mr-2" /> Update project milestones
                        </div>
                        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">High</Badge>
                      </div>
                      <div className="text-xs text-slate-400">Smart City Infrastructure</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium text-slate-200 flex items-center">
                          <MessageSquare className="h-4 w-4 text-blue-500 mr-2" /> Respond to investor inquiries
                        </div>
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Medium</Badge>
                      </div>
                      <div className="text-xs text-slate-400">3 unread messages</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium text-slate-200 flex items-center">
                          <FileText className="h-4 w-4 text-cyan-500 mr-2" /> Submit quarterly report
                        </div>
                        <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">Low</Badge>
                      </div>
                      <div className="text-xs text-slate-400">Due in 2 weeks</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="investors" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100">Project Investors</CardTitle>
                <CardDescription className="text-slate-400">
                  View and manage investors across all your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                        <th className="text-left font-medium p-3">Investor</th>
                        <th className="text-left font-medium p-3">Project</th>
                        <th className="text-left font-medium p-3">Amount</th>
                        <th className="text-left font-medium p-3">Date</th>
                        <th className="text-right font-medium p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investors.map((investor) => (
                        <tr key={investor.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                          <td className="p-3">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarImage src={investor.image} alt={investor.name} />
                                <AvatarFallback className="bg-slate-700 text-cyan-500">
                                  {investor.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-sm font-medium text-slate-200">{investor.name}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm text-slate-300">{investor.project}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm text-cyan-400">{formatCurrency(investor.amount)}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm text-slate-300">{investor.date}</div>
                          </td>
                          <td className="p-3 text-right">
                            <Button variant="ghost" size="sm" className="h-8 text-xs">
                              <MessageSquare className="h-3 w-3 mr-1" /> Message
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="border-t border-slate-700/50 pt-4 flex justify-center">
                <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-slate-100">
                  View All Investors
                </Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Top Investors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investors
                      .sort((a, b) => b.amount - a.amount)
                      .slice(0, 3)
                      .map((investor, index) => (
                        <div key={investor.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center mr-3 text-xs font-medium text-slate-300">
                              {index + 1}
                            </div>
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src={investor.image} alt={investor.name} />
                              <AvatarFallback className="bg-slate-700 text-cyan-500">
                                {investor.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium text-slate-200">{investor.name}</div>
                              <div className="text-xs text-slate-500">{investor.project}</div>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-cyan-400">{formatCurrency(investor.amount)}</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Recent Investments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investors
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 3)
                      .map((investor) => (
                        <div key={investor.id} className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={investor.image} alt={investor.name} />
                                <AvatarFallback className="bg-slate-700 text-cyan-500">
                                  {investor.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-sm font-medium text-slate-200">{investor.name}</div>
                            </div>
                            <div className="text-xs text-slate-500">{investor.date}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-400">{investor.project}</div>
                            <div className="text-sm font-medium text-cyan-400">{formatCurrency(investor.amount)}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100">Investor Messages</CardTitle>
                <CardDescription className="text-slate-400">Communicate with your investors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex space-x-3 p-3 rounded-md ${message.unread ? "bg-slate-800/50 border border-slate-700/50" : ""}`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.sender.image} alt={message.sender.name} />
                        <AvatarFallback className="bg-slate-700 text-cyan-500">
                          {message.sender.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-slate-200">{message.sender.name}</div>
                          <div className="text-xs text-slate-500">
                            {message.date} - {message.time}
                          </div>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          <span className="text-cyan-400">Re: {message.project}</span>
                        </div>
                        <div className="text-sm text-slate-300 mt-1">{message.content}</div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs border-slate-700 hover:bg-slate-800"
                          >
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400">
                            Mark as Read
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-slate-700/50 pt-4">
                <div className="flex items-center w-full space-x-2">
                  <Input
                    type="text"
                    placeholder="Search messages..."
                    className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-slate-100">
                    View All
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Alert className="bg-blue-900/20 border-blue-700/50 text-blue-300">
              <Info className="h-4 w-4" />
              <AlertTitle>Project Analytics</AlertTitle>
              <AlertDescription>
                Track the performance of your projects with detailed analytics and insights.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Funding Progress</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-sm text-slate-400">Analytics visualization will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Investor Demographics</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-sm text-slate-400">Analytics visualization will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Investment Trends</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-sm text-slate-400">Analytics visualization will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100">Project Performance</CardTitle>
                <CardDescription className="text-slate-400">
                  Compare performance across all your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-slate-400 border-b border-slate-700/50">
                        <th className="text-left font-medium p-3">Project</th>
                        <th className="text-left font-medium p-3">Target</th>
                        <th className="text-left font-medium p-3">Raised</th>
                        <th className="text-left font-medium p-3">Progress</th>
                        <th className="text-left font-medium p-3">Investors</th>
                        <th className="text-left font-medium p-3">Avg. Investment</th>
                        <th className="text-left font-medium p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects
                        .filter((p) => p.status !== "draft")
                        .map((project) => (
                          <tr key={project.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                            <td className="p-3">
                              <div className="text-sm font-medium text-slate-200">{project.title}</div>
                            </td>
                            <td className="p-3">
                              <div className="text-sm text-slate-300">{formatCurrency(project.target)}</div>
                            </td>
                            <td className="p-3">
                              <div className="text-sm text-cyan-400">{formatCurrency(project.raised)}</div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <Progress value={project.progress} className="h-1.5 w-24 bg-slate-700">
                                  <div
                                    className={`h-full rounded-full ${project.status === "completed"
                                        ? "bg-green-500"
                                        : "bg-gradient-to-r from-cyan-500 to-blue-500"
                                      }`}
                                    style={{ width: `${project.progress}%` }}
                                  />
                                </Progress>
                                <span className="text-xs text-slate-400">{project.progress}%</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="text-sm text-slate-300">{project.investors}</div>
                            </td>
                            <td className="p-3">
                              <div className="text-sm text-slate-300">
                                {project.investors > 0
                                  ? formatCurrency(project.raised / project.investors)
                                  : formatCurrency(0)}
                              </div>
                            </td>
                            <td className="p-3">{getStatusBadge(project.status)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}


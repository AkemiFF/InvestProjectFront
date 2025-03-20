"use client"

import { useEffect, useState, useRef } from "react"
import {
  Activity,
  BarChart3,
  Bell,
  Briefcase,
  Command,
  CreditCard,
  DollarSign,
  FileText,
  Filter,
  Heart,
  HelpCircle,
  Hexagon,
  LineChart,
  type LucideIcon,
  MessageSquare,
  Moon,
  PieChart,
  Plus,
  Search,
  Settings,
  Shield,
  Star,
  Sun,
  TrendingUpIcon as Trending,
  Users,
  Wallet,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [totalInvestments, setTotalInvestments] = useState(12500000)
  const [availableBalance, setAvailableBalance] = useState(7500000)
  const [projectsSupported, setProjectsSupported] = useState(8)
  const [activeProjects, setActiveProjects] = useState(15)
  const [unreadMessages, setUnreadMessages] = useState(4)
  const [notifications, setNotifications] = useState(3)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">INITIALIZING PLATFORM</div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              INVEST NEXUS
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                      <MessageSquare className="h-5 w-5" />
                      {unreadMessages > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-cyan-500 rounded-full text-xs flex items-center justify-center">
                          {unreadMessages}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Messages</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-cyan-500 rounded-full text-xs flex items-center justify-center">
                          {notifications}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="text-slate-400 hover:text-slate-100"
                    >
                      {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback className="bg-slate-700 text-cyan-500">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-4">
                <div className="mb-6">
                  <Select
                    defaultValue={userType}
                    onValueChange={(value) => setUserType(value as "investor" | "project-owner")}
                  >
                    <SelectTrigger className="w-full bg-slate-800/50 border-slate-700/50">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investor">Investor</SelectItem>
                      <SelectItem value="project-owner">Project Owner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <nav className="space-y-2">
                  <NavItem icon={Command} label="Dashboard" active />
                  <NavItem icon={Briefcase} label="Projects" />
                  <NavItem icon={Users} label="Network" />
                  <NavItem icon={MessageSquare} label="Messages" />
                  <NavItem icon={Wallet} label="Finances" />
                  <NavItem icon={Heart} label="Favorites" />
                  <NavItem icon={FileText} label="Contracts" />
                  <NavItem icon={Settings} label="Settings" />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">ACCOUNT STATUS</div>
                  <div className="space-y-3">
                    <StatusItem
                      label="Account Type"
                      value={userType === "investor" ? "Basic Investor" : "Basic Project Owner"}
                      color="cyan"
                      isText
                    />
                    <StatusItem label="Membership" value="Valid until Dec 2024" color="green" isText />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 text-xs border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                    >
                      <Zap className="mr-1 h-3 w-3" />
                      Upgrade to Premium
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            <div className="grid gap-6">
              {/* Financial Overview */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-700/50 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-cyan-500" />
                      {userType === "investor" ? "Investment Overview" : "Project Funding Overview"}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                        LIVE
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {userType === "investor" ? (
                      <>
                        <MetricCard
                          title="Total Investments"
                          value={formatCurrency(totalInvestments)}
                          icon={DollarSign}
                          trend="up"
                          color="cyan"
                          detail="8 Projects Supported"
                        />
                        <MetricCard
                          title="Available Balance"
                          value={formatCurrency(availableBalance)}
                          icon={Wallet}
                          trend="stable"
                          color="purple"
                          detail="Ready to Invest"
                        />
                        <MetricCard
                          title="Return Rate"
                          value="12.5%"
                          icon={Trending}
                          trend="up"
                          color="green"
                          detail="Avg. Annual Return"
                        />
                      </>
                    ) : (
                      <>
                        <MetricCard
                          title="Total Raised"
                          value={formatCurrency(totalInvestments)}
                          icon={DollarSign}
                          trend="up"
                          color="cyan"
                          detail="Across 3 Projects"
                        />
                        <MetricCard
                          title="Available Funds"
                          value={formatCurrency(availableBalance)}
                          icon={Wallet}
                          trend="stable"
                          color="purple"
                          detail="Ready to Withdraw"
                        />
                        <MetricCard
                          title="Funding Success"
                          value="75%"
                          icon={PieChart}
                          trend="up"
                          color="green"
                          detail="Avg. Funding Rate"
                        />
                      </>
                    )}
                  </div>

                  <div className="mt-8">
                    <Tabs defaultValue="performance" className="w-full">
                      <div className="flex items-center justify-between mb-4">
                        <TabsList className="bg-slate-800/50 p-1">
                          <TabsTrigger
                            value="performance"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                          >
                            {userType === "investor" ? "Portfolio" : "Funding"}
                          </TabsTrigger>
                          <TabsTrigger
                            value="projects"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                          >
                            {userType === "investor" ? "Investments" : "Projects"}
                          </TabsTrigger>
                          <TabsTrigger
                            value="transactions"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                          >
                            Transactions
                          </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
                            Investments
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                            Returns
                          </div>
                        </div>
                      </div>

                      <TabsContent value="performance" className="mt-0">
                        <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <PerformanceChart />
                          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                            <div className="text-xs text-slate-400">
                              {userType === "investor" ? "Portfolio Growth" : "Funding Progress"}
                            </div>
                            <div className="text-lg font-mono text-cyan-400">+18.5%</div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="projects" className="mt-0">
                        <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                            <div className="col-span-4">Project</div>
                            <div className="col-span-2">Sector</div>
                            <div className="col-span-2">Amount</div>
                            <div className="col-span-2">Progress</div>
                            <div className="col-span-2">Status</div>
                          </div>

                          <div className="divide-y divide-slate-700/30">
                            {userType === "investor" ? (
                              <>
                                <ProjectRow
                                  name="EcoTech Solutions"
                                  sector="Green Energy"
                                  amount={2500000}
                                  progress={85}
                                  status="active"
                                />
                                <ProjectRow
                                  name="Urban Farming Initiative"
                                  sector="Agriculture"
                                  amount={1800000}
                                  progress={65}
                                  status="active"
                                />
                                <ProjectRow
                                  name="FinTech Mobile App"
                                  sector="Technology"
                                  amount={3500000}
                                  progress={42}
                                  status="active"
                                />
                                <ProjectRow
                                  name="Medical Supplies Chain"
                                  sector="Healthcare"
                                  amount={4700000}
                                  progress={100}
                                  status="completed"
                                />
                              </>
                            ) : (
                              <>
                                <ProjectRow
                                  name="Smart City Infrastructure"
                                  sector="Technology"
                                  amount={7500000}
                                  progress={45}
                                  status="active"
                                />
                                <ProjectRow
                                  name="Renewable Energy Plant"
                                  sector="Green Energy"
                                  amount={12000000}
                                  progress={28}
                                  status="active"
                                />
                                <ProjectRow
                                  name="Educational Platform"
                                  sector="Education"
                                  amount={3200000}
                                  progress={100}
                                  status="completed"
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="transactions" className="mt-0">
                        <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                            <div className="col-span-3">Date</div>
                            <div className="col-span-4">Description</div>
                            <div className="col-span-3">Amount</div>
                            <div className="col-span-2">Type</div>
                          </div>

                          <div className="divide-y divide-slate-700/30">
                            <TransactionRow
                              date="2023-11-15"
                              description="Investment in EcoTech"
                              amount={1500000}
                              type="outgoing"
                            />
                            <TransactionRow
                              date="2023-11-10"
                              description="Dividend Payment"
                              amount={350000}
                              type="incoming"
                            />
                            <TransactionRow
                              date="2023-11-05"
                              description="Premium Subscription"
                              amount={250000}
                              type="outgoing"
                            />
                            <TransactionRow
                              date="2023-10-28"
                              description="Investment Return"
                              amount={780000}
                              type="incoming"
                            />
                            <TransactionRow
                              date="2023-10-15"
                              description="Investment in FinTech"
                              amount={2000000}
                              type="outgoing"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              {/* Projects & Opportunities */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Briefcase className="mr-2 h-5 w-5 text-blue-500" />
                      {userType === "investor" ? "Investment Opportunities" : "Your Projects"}
                    </CardTitle>
                    {userType === "project-owner" && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8">
                        <Plus className="mr-1 h-4 w-4" /> New Project
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs border-slate-700 bg-slate-800/50">
                        <Filter className="mr-1 h-3 w-3" /> Filter
                      </Button>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[140px] h-8 text-xs bg-slate-800/50 border-slate-700">
                          <SelectValue placeholder="All Sectors" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sectors</SelectItem>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="energy">Green Energy</SelectItem>
                          <SelectItem value="health">Healthcare</SelectItem>
                          <SelectItem value="agri">Agriculture</SelectItem>
                          <SelectItem value="edu">Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="text-xs text-slate-400">
                      Showing {userType === "investor" ? activeProjects : "3"} projects
                    </div>
                  </div>

                  <div className="space-y-4">
                    {userType === "investor" ? (
                      <>
                        <ProjectCard
                          title="Sustainable Aquaculture Farm"
                          sector="Agriculture"
                          progress={42}
                          target={15000000}
                          raised={6300000}
                          investors={18}
                          daysLeft={12}
                        />
                        <ProjectCard
                          title="AI-Powered Healthcare Assistant"
                          sector="Technology"
                          progress={78}
                          target={8000000}
                          raised={6240000}
                          investors={35}
                          daysLeft={5}
                          featured
                        />
                        <ProjectCard
                          title="Solar Panel Manufacturing"
                          sector="Green Energy"
                          progress={25}
                          target={25000000}
                          raised={6250000}
                          investors={12}
                          daysLeft={21}
                        />
                      </>
                    ) : (
                      <>
                        <ProjectCard
                          title="Smart City Infrastructure"
                          sector="Technology"
                          progress={45}
                          target={15000000}
                          raised={6750000}
                          investors={24}
                          daysLeft={18}
                          isOwner
                        />
                        <ProjectCard
                          title="Renewable Energy Plant"
                          sector="Green Energy"
                          progress={28}
                          target={12000000}
                          raised={3360000}
                          investors={15}
                          daysLeft={25}
                          isOwner
                        />
                        <ProjectCard
                          title="Educational Platform"
                          sector="Education"
                          progress={100}
                          target={3200000}
                          raised={3200000}
                          investors={42}
                          daysLeft={0}
                          isOwner
                          completed
                        />
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700/50 pt-4 flex justify-center">
                  <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-slate-100">
                    View All Projects
                  </Button>
                </CardFooter>
              </Card>

              {/* Messages */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                    Recent Messages
                  </CardTitle>
                  <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">
                    {unreadMessages} New
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <MessageItem
                      sender="Jean Dupont"
                      time="15:42:12"
                      message="I'm interested in your renewable energy project. Could we schedule a call to discuss the details?"
                      avatar="/placeholder.svg?height=40&width=40"
                      unread
                    />
                    <MessageItem
                      sender="Marie Laurent"
                      time="14:30:45"
                      message="Thanks for accepting my investment proposal. I've transferred the first installment as discussed."
                      avatar="/placeholder.svg?height=40&width=40"
                      unread
                    />
                    <MessageItem
                      sender="Ahmed Nasser"
                      time="12:15:33"
                      message="Our team reviewed your project documentation. We'd like to increase our investment if you can provide more details on the expansion plan."
                      avatar="/placeholder.svg?height=40&width=40"
                      unread
                    />
                    <MessageItem
                      sender="Sophie Martin"
                      time="09:05:18"
                      message="The quarterly report looks promising. Let's discuss the next steps for the agricultural project."
                      avatar="/placeholder.svg?height=40&width=40"
                      unread
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700/50 pt-4">
                  <div className="flex items-center w-full space-x-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                    <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="grid gap-6">
              {/* User Profile */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-3">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
                        <AvatarFallback className="bg-slate-700 text-cyan-500 text-xl">JD</AvatarFallback>
                      </Avatar>
                      <div className="text-lg font-medium text-slate-100 mb-1">John Doe</div>
                      <div className="text-sm text-slate-400 mb-2">
                        {userType === "investor" ? "Investor" : "Project Owner"}
                      </div>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                        {userType === "investor" ? "Basic Account" : "Basic Account"}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">
                          {userType === "investor" ? "Projects Supported" : "Active Projects"}
                        </div>
                        <div className="text-sm font-mono text-slate-200">{projectsSupported}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Member Since</div>
                        <div className="text-sm font-mono text-slate-200">Nov 2023</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                    >
                      <Settings className="mr-1 h-3 w-3" />
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {userType === "investor" ? (
                      <>
                        <ActionButton icon={Briefcase} label="Invest Now" />
                        <ActionButton icon={CreditCard} label="Add Funds" />
                        <ActionButton icon={FileText} label="Contracts" />
                        <ActionButton icon={HelpCircle} label="Support" />
                      </>
                    ) : (
                      <>
                        <ActionButton icon={Plus} label="New Project" />
                        <ActionButton icon={Wallet} label="Withdraw" />
                        <ActionButton icon={FileText} label="Reports" />
                        <ActionButton icon={HelpCircle} label="Support" />
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Membership */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Premium Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-500/30">
                      <div className="flex items-center mb-2">
                        <Star className="h-5 w-5 text-cyan-400 mr-2" />
                        <div className="text-sm font-medium text-cyan-400">
                          {userType === "investor" ? "Investor Premium" : "Project Owner Premium"}
                        </div>
                      </div>
                      <div className="text-xs text-slate-300 mb-3">
                        {userType === "investor"
                          ? "Get early access to top projects and personalized investment advice"
                          : "Boost your project visibility and get expert guidance"}
                      </div>
                      <div className="text-sm font-medium text-slate-200 mb-1">
                        {userType === "investor" ? "250,000 MGA / year" : "200,000 MGA / year"}
                      </div>
                      <Button className="w-full mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                        Upgrade Now
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-slate-300">
                        <Shield className="h-3 w-3 text-green-500 mr-2" />
                        {userType === "investor"
                          ? "Personalized investment recommendations"
                          : "Priority project listing and promotion"}
                      </div>
                      <div className="flex items-center text-xs text-slate-300">
                        <Shield className="h-3 w-3 text-green-500 mr-2" />
                        {userType === "investor"
                          ? "Early access to promising projects"
                          : "Expert guidance on project presentation"}
                      </div>
                      <div className="flex items-center text-xs text-slate-300">
                        <Shield className="h-3 w-3 text-green-500 mr-2" />
                        {userType === "investor"
                          ? "Reduced platform fees on investments"
                          : "Dedicated support for funding campaigns"}
                      </div>
                      <div className="flex items-center text-xs text-slate-300">
                        <Shield className="h-3 w-3 text-green-500 mr-2" />
                        {userType === "investor"
                          ? "Direct access to project owners"
                          : "Marketing assistance and investor matching"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System time */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-1 font-mono">SYSTEM TIME</div>
                    <div className="text-2xl font-mono text-cyan-400 mb-1">{formatTime(currentTime)}</div>
                    <div className="text-sm text-slate-400">{formatDate(currentTime)}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for nav items
function NavItem({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// Component for status items
function StatusItem({
  label,
  value,
  color,
  isText = false,
}: {
  label: string
  value: string | number
  color: string
  isText?: boolean
}) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      default:
        return "from-cyan-500 to-blue-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        {isText ? (
          <div className="text-xs text-cyan-400">{value}</div>
        ) : (
          <div className="text-xs text-slate-400">{value}%</div>
        )}
      </div>
      {!isText && (
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
        </div>
      )}
    </div>
  )
}

// Component for metric cards
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
}: {
  title: string
  value: string | number
  icon: LucideIcon
  trend: "up" | "down" | "stable"
  color: string
  detail: string
}) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30"
      case "blue":
        return "from-blue-500 to-indigo-500 border-blue-500/30"
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30"
      default:
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <BarChart3 className="h-4 w-4 text-green-500" />
      case "down":
        return <BarChart3 className="h-4 w-4 rotate-180 text-amber-500" />
      case "stable":
        return <LineChart className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className="text-xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {value}
      </div>
      <div className="text-xs text-slate-500">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500"></div>
    </div>
  )
}

// Performance chart component
function PerformanceChart() {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-slate-500">100%</div>
        <div className="text-xs text-slate-500">75%</div>
        <div className="text-xs text-slate-500">50%</div>
        <div className="text-xs text-slate-500">25%</div>
        <div className="text-xs text-slate-500">0%</div>
      </div>

      {/* X-axis grid lines */}
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
      </div>

      {/* Chart bars */}
      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        {Array.from({ length: 24 }).map((_, i) => {
          const investHeight = Math.floor(Math.random() * 60) + 20
          const returnHeight = Math.floor(Math.random() * 40) + 10

          return (
            <div key={i} className="flex space-x-0.5">
              <div
                className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                style={{ height: `${investHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
                style={{ height: `${returnHeight}%` }}
              ></div>
            </div>
          )
        })}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        <div className="text-xs text-slate-500">Jan</div>
        <div className="text-xs text-slate-500">Apr</div>
        <div className="text-xs text-slate-500">Jul</div>
        <div className="text-xs text-slate-500">Oct</div>
        <div className="text-xs text-slate-500">Dec</div>
      </div>
    </div>
  )
}

// Project row component
function ProjectRow({
  name,
  sector,
  amount,
  progress,
  status,
}: {
  name: string
  sector: string
  amount: number
  progress: number
  status: string
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-4 text-slate-300">{name}</div>
      <div className="col-span-2 text-slate-400">{sector}</div>
      <div className="col-span-2 text-cyan-400">{formatCurrency(amount)}</div>
      <div className="col-span-2">
        <div className="w-full h-1.5 bg-slate-700 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="col-span-2">
        <Badge
          variant="outline"
          className={`${
            status === "active"
              ? "bg-green-500/10 text-green-400 border-green-500/30"
              : "bg-blue-500/10 text-blue-400 border-blue-500/30"
          } text-xs`}
        >
          {status}
        </Badge>
      </div>
    </div>
  )
}

// Transaction row component
function TransactionRow({
  date,
  description,
  amount,
  type,
}: {
  date: string
  description: string
  amount: number
  type: "incoming" | "outgoing"
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-3 text-slate-400">{date}</div>
      <div className="col-span-4 text-slate-300">{description}</div>
      <div className={`col-span-3 ${type === "incoming" ? "text-green-400" : "text-amber-400"}`}>
        {type === "incoming" ? "+" : "-"}
        {formatCurrency(amount)}
      </div>
      <div className="col-span-2">
        <Badge
          variant="outline"
          className={`${
            type === "incoming"
              ? "bg-green-500/10 text-green-400 border-green-500/30"
              : "bg-amber-500/10 text-amber-400 border-amber-500/30"
          } text-xs`}
        >
          {type}
        </Badge>
      </div>
    </div>
  )
}

// Project card component
function ProjectCard({
  title,
  sector,
  progress,
  target,
  raised,
  investors,
  daysLeft,
  featured = false,
  isOwner = false,
  completed = false,
}: {
  title: string
  sector: string
  progress: number
  target: number
  raised: number
  investors: number
  daysLeft: number
  featured?: boolean
  isOwner?: boolean
  completed?: boolean
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div
      className={`bg-slate-800/30 rounded-lg border ${
        featured
          ? "border-cyan-500/30 shadow-lg shadow-cyan-500/10"
          : completed
            ? "border-green-500/30"
            : "border-slate-700/50"
      } p-4 relative overflow-hidden`}
    >
      {featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-cyan-500 text-xs font-medium px-2 py-0.5 text-black transform rotate-45 translate-x-6 translate-y-1">
            Featured
          </div>
        </div>
      )}
      {isOwner && (
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
            Your Project
          </Badge>
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <div className="text-base font-medium text-slate-200">{title}</div>
        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
          {sector}
        </Badge>
      </div>
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs text-slate-400">
            {formatCurrency(raised)} of {formatCurrency(target)}
          </div>
          <div className="text-xs text-cyan-400">{progress}%</div>
        </div>
        <Progress value={progress} className="h-1.5 bg-slate-700">
          <div
            className={`h-full rounded-full ${
              completed
                ? "bg-green-500"
                : progress > 75
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </Progress>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-slate-800/50 rounded p-2 text-center">
          <div className="text-xs text-slate-500">Investors</div>
          <div className="text-sm font-medium text-slate-300">{investors}</div>
        </div>
        <div className="bg-slate-800/50 rounded p-2 text-center">
          <div className="text-xs text-slate-500">{completed ? "Completed" : "Days Left"}</div>
          <div className="text-sm font-medium text-slate-300">{completed ? "✓" : daysLeft}</div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          className={`flex-1 h-8 text-xs ${
            completed
              ? "bg-green-600 hover:bg-green-700"
              : isOwner
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >
          {completed ? "View Results" : isOwner ? "Manage Project" : "Invest Now"}
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 border-slate-700">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Message item component
function MessageItem({
  sender,
  time,
  message,
  avatar,
  unread,
}: {
  sender: string
  time: string
  message: string
  avatar: string
  unread?: boolean
}) {
  return (
    <div className={`flex space-x-3 p-2 rounded-md ${unread ? "bg-slate-800/50 border border-slate-700/50" : ""}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar} alt={sender} />
        <AvatarFallback className="bg-slate-700 text-cyan-500">{sender.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-200">{sender}</div>
          <div className="text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400 mt-1">{message}</div>
      </div>
      {unread && (
        <div className="flex-shrink-0 self-center">
          <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
        </div>
      )}
    </div>
  )
}

// Action button component
function ActionButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <Button
      variant="outline"
      className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
    >
      <Icon className="h-5 w-5 text-cyan-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}


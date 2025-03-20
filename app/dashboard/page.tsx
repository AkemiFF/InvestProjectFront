"use client"

import { useEffect, useState } from "react"
import { Activity, Briefcase, DollarSign, MessageSquare, PieChart, Plus, TrendingUp, Wallet } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MetricCard } from "@/components/dashboard/metric-card"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { ProjectCard } from "@/components/dashboard/project-card"
import { MessageItem } from "@/components/dashboard/message-item"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

export default function InvestorDashboard() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [totalInvestments, setTotalInvestments] = useState(12500000)
  const [availableBalance, setAvailableBalance] = useState(7500000)
  const [activeProjects, setActiveProjects] = useState(15)
  const [unreadMessages, setUnreadMessages] = useState(4)
useEffect(() => {
  
 
}, []);
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout userType={userType}>
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
                    icon={TrendingUp}
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
                  {/* Project list would go here */}
                </TabsContent>

                <TabsContent value="transactions" className="mt-0">
                  {/* Transaction list would go here */}
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
    </DashboardLayout>
  )
}


"use client"

import { useState } from "react"
import { Activity, BarChart3, CheckCircle, DollarSign, FileText, Shield, Users, XCircle } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MetricCard } from "@/components/dashboard/metric-card"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(245)
  const [totalProjects, setTotalProjects] = useState(78)
  const [pendingProjects, setPendingProjects] = useState(12)
  const [totalRevenue, setTotalRevenue] = useState(45750000)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout userType="admin">
      <div className="grid gap-6">
        {/* Admin Overview */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b border-slate-700/50 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100 flex items-center">
                <Activity className="mr-2 h-5 w-5 text-cyan-500" />
                Platform Overview
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard
                title="Total Users"
                value={totalUsers}
                icon={Users}
                trend="up"
                color="cyan"
                detail="45 new this month"
              />
              <MetricCard
                title="Total Projects"
                value={totalProjects}
                icon={FileText}
                trend="up"
                color="blue"
                detail="12 pending approval"
              />
              <MetricCard
                title="Platform Revenue"
                value={formatCurrency(totalRevenue)}
                icon={DollarSign}
                trend="up"
                color="green"
                detail="From commissions & fees"
              />
              <MetricCard
                title="Premium Users"
                value="32%"
                icon={Shield}
                trend="stable"
                color="purple"
                detail="78 premium accounts"
              />
            </div>

            <div className="mt-8">
              <Tabs defaultValue="statistics" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="bg-slate-800/50 p-1">
                    <TabsTrigger
                      value="statistics"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Statistics
                    </TabsTrigger>
                    <TabsTrigger
                      value="users"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Users
                    </TabsTrigger>
                    <TabsTrigger
                      value="projects"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Projects
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
                      Users
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                      Revenue
                    </div>
                  </div>
                </div>

                <TabsContent value="statistics" className="mt-0">
                  <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                    <PerformanceChart />
                    <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                      <div className="text-xs text-slate-400">Growth Rate</div>
                      <div className="text-lg font-mono text-cyan-400">+24.8%</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="users" className="mt-0">
                  <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                    <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                      <div className="col-span-3">User</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Joined</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-3">Actions</div>
                    </div>

                    <div className="divide-y divide-slate-700/30">
                      <UserRow
                        name="Jean Dupont"
                        email="jean@example.com"
                        type="Investor"
                        joined="2023-10-15"
                        status="active"
                      />
                      <UserRow
                        name="Marie Laurent"
                        email="marie@example.com"
                        type="Project Owner"
                        joined="2023-11-02"
                        status="active"
                      />
                      <UserRow
                        name="Ahmed Nasser"
                        email="ahmed@example.com"
                        type="Investor"
                        joined="2023-11-10"
                        status="premium"
                      />
                      <UserRow
                        name="Sophie Martin"
                        email="sophie@example.com"
                        type="Project Owner"
                        joined="2023-09-28"
                        status="premium"
                      />
                      <UserRow
                        name="Thomas Dubois"
                        email="thomas@example.com"
                        type="Investor"
                        joined="2023-11-15"
                        status="pending"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="mt-0">
                  <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                    <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                      <div className="col-span-3">Project</div>
                      <div className="col-span-2">Owner</div>
                      <div className="col-span-2">Sector</div>
                      <div className="col-span-2">Target</div>
                      <div className="col-span-3">Actions</div>
                    </div>

                    <div className="divide-y divide-slate-700/30">
                      <ProjectRow
                        name="Sustainable Aquaculture Farm"
                        owner="Marie Laurent"
                        sector="Agriculture"
                        target={15000000}
                        status="pending"
                      />
                      <ProjectRow
                        name="AI-Powered Healthcare Assistant"
                        owner="Ahmed Nasser"
                        sector="Technology"
                        target={8000000}
                        status="approved"
                      />
                      <ProjectRow
                        name="Solar Panel Manufacturing"
                        owner="Sophie Martin"
                        sector="Green Energy"
                        target={25000000}
                        status="pending"
                      />
                      <ProjectRow
                        name="Educational Platform"
                        owner="Jean Dupont"
                        sector="Education"
                        target={3200000}
                        status="approved"
                      />
                      <ProjectRow
                        name="Urban Farming Initiative"
                        owner="Thomas Dubois"
                        sector="Agriculture"
                        target={12000000}
                        status="rejected"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100 flex items-center text-base">
                <Shield className="mr-2 h-5 w-5 text-amber-500" />
                Pending Approvals
              </CardTitle>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                {pendingProjects} Projects
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <PendingProjectCard
                title="Sustainable Aquaculture Farm"
                owner="Marie Laurent"
                sector="Agriculture"
                target={15000000}
                description="A sustainable aquaculture farm using innovative recirculating systems to produce fish with minimal environmental impact."
              />
              <PendingProjectCard
                title="Solar Panel Manufacturing"
                owner="Sophie Martin"
                sector="Green Energy"
                target={25000000}
                description="Manufacturing facility for high-efficiency solar panels using locally sourced materials and creating jobs in the region."
              />
              <PendingProjectCard
                title="Mobile Banking Solution"
                owner="Thomas Dubois"
                sector="Finance"
                target={18000000}
                description="A mobile banking platform designed for rural communities with limited access to traditional banking services."
              />
            </div>
          </CardContent>
          <CardFooter className="border-t border-slate-700/50 pt-4 flex justify-center">
            <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-slate-100">
              View All Pending Approvals
            </Button>
          </CardFooter>
        </Card>

        {/* Platform Analytics */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
              Platform Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm text-slate-400">User Growth</div>
                  <div className="text-xs text-cyan-400">+24% this month</div>
                </div>
                <Progress value={24} className="h-2 bg-slate-700">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                </Progress>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm text-slate-400">Project Success Rate</div>
                  <div className="text-xs text-green-400">72%</div>
                </div>
                <Progress value={72} className="h-2 bg-slate-700">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                </Progress>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm text-slate-400">Premium Conversion</div>
                  <div className="text-xs text-purple-400">32%</div>
                </div>
                <Progress value={32} className="h-2 bg-slate-700">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                </Progress>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm text-slate-400">Average Investment</div>
                  <div className="text-xs text-blue-400">{formatCurrency(2500000)}</div>
                </div>
                <Progress value={65} className="h-2 bg-slate-700">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                </Progress>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

// User row component
function UserRow({
  name,
  email,
  type,
  joined,
  status,
}: {
  name: string
  email: string
  type: string
  joined: string
  status: "active" | "premium" | "pending" | "suspended"
}) {
  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50 items-center">
      <div className="col-span-3 flex items-center space-x-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src="/placeholder.svg?height=24&width=24" alt={name} />
          <AvatarFallback className="bg-slate-700 text-cyan-500 text-xs">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-slate-300">{name}</div>
          <div className="text-xs text-slate-500">{email}</div>
        </div>
      </div>
      <div className="col-span-2 text-slate-400">{type}</div>
      <div className="col-span-2 text-slate-400">{joined}</div>
      <div className="col-span-2">
        <Badge
          variant="outline"
          className={`${
            status === "premium"
              ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
              : status === "active"
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : status === "pending"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-red-500/10 text-red-400 border-red-500/30"
          } text-xs`}
        >
          {status}
        </Badge>
      </div>
      <div className="col-span-3 flex space-x-2">
        <Button variant="outline" size="sm" className="h-7 text-xs border-slate-700 bg-slate-800/50">
          View
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs border-slate-700 bg-slate-800/50">
          Edit
        </Button>
        {status !== "suspended" ? (
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs border-red-700/30 text-red-400 bg-red-900/10 hover:bg-red-900/20"
          >
            Suspend
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs border-green-700/30 text-green-400 bg-green-900/10 hover:bg-green-900/20"
          >
            Activate
          </Button>
        )}
      </div>
    </div>
  )
}

// Project row component
function ProjectRow({
  name,
  owner,
  sector,
  target,
  status,
}: {
  name: string
  owner: string
  sector: string
  target: number
  status: "pending" | "approved" | "rejected"
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50 items-center">
      <div className="col-span-3 text-slate-300">{name}</div>
      <div className="col-span-2 text-slate-400">{owner}</div>
      <div className="col-span-2 text-slate-400">{sector}</div>
      <div className="col-span-2 text-cyan-400">{formatCurrency(target)}</div>
      <div className="col-span-3 flex space-x-2">
        <Button variant="outline" size="sm" className="h-7 text-xs border-slate-700 bg-slate-800/50">
          View
        </Button>
        {status === "pending" ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs border-green-700/30 text-green-400 bg-green-900/10 hover:bg-green-900/20"
            >
              Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs border-red-700/30 text-red-400 bg-red-900/10 hover:bg-red-900/20"
            >
              Reject
            </Button>
          </>
        ) : (
          <Badge
            variant="outline"
            className={`${
              status === "approved"
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : "bg-red-500/10 text-red-400 border-red-500/30"
            } text-xs`}
          >
            {status}
          </Badge>
        )}
      </div>
    </div>
  )
}

// Pending project card component
function PendingProjectCard({
  title,
  owner,
  sector,
  target,
  description,
}: {
  title: string
  owner: string
  sector: string
  target: number
  description: string
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="bg-slate-800/30 rounded-lg border border-amber-500/20 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-base font-medium text-slate-200">{title}</div>
        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
          {sector}
        </Badge>
      </div>
      <div className="mb-3 text-xs text-slate-400">
        <span className="text-slate-500">Owner:</span> {owner} | <span className="text-slate-500">Target:</span>{" "}
        {formatCurrency(target)}
      </div>
      <div className="mb-3 text-sm text-slate-300">{description}</div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="h-8 text-xs border-slate-700 bg-slate-800/50">
          View Details
        </Button>
        <Button className="h-8 text-xs bg-green-600 hover:bg-green-700">
          <CheckCircle className="mr-1 h-3 w-3" /> Approve
        </Button>
        <Button variant="destructive" size="sm" className="h-8 text-xs">
          <XCircle className="mr-1 h-3 w-3" /> Reject
        </Button>
      </div>
    </div>
  )
}


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import adminService from "@/services/admin-service"
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  LineChart,
  RefreshCw,
  Users,
  XCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Define interfaces for dashboard data
interface DashboardMetrics {
  total_users: number
  total_projects: number
  pending_projects: number
  total_investments: number
  total_revenue: number
  new_users_today: number
  new_projects_today: number
  new_investments_today: number
}

interface GrowthDataPoint {
  date: string
  value: number
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [userGrowth, setUserGrowth] = useState<GrowthDataPoint[]>([])
  const [revenueData, setRevenueData] = useState<GrowthDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeframe, setTimeframe] = useState<"day" | "month">("month")

  useEffect(() => {
    fetchDashboardData()
  }, [timeframe])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      // Fetch all dashboard data in parallel
      const [metricsResponse, userGrowthResponse, revenueResponse] = await Promise.all([
        adminService.getDashboardMetrics(),
        adminService.getUserGrowthData(timeframe),
        adminService.getRevenueData(timeframe),
      ])

      setMetrics(metricsResponse.data)
      setUserGrowth(userGrowthResponse.data.results)
      setRevenueData(revenueResponse.data.results)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return timeframe === "day"
      ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Admin Dashboard</h1>
            <p className="text-slate-400">Overview of platform metrics and performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={(value: "day" | "month") => setTimeframe(value)}>
              <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-slate-100">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                <SelectItem value="day">Daily</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={fetchDashboardData}
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Users"
            value={metrics?.total_users}
            icon={<Users className="h-5 w-5 text-blue-400" />}
            change={metrics?.new_users_today}
            isLoading={isLoading}
            gradient="from-blue-600 to-indigo-600"
          />

          <MetricCard
            title="Total Projects"
            value={metrics?.total_projects}
            icon={<BarChart3 className="h-5 w-5 text-cyan-400" />}
            change={metrics?.new_projects_today}
            isLoading={isLoading}
            gradient="from-cyan-600 to-teal-600"
          />

          <MetricCard
            title="Total Investments"
            value={metrics?.total_investments}
            icon={<LineChart className="h-5 w-5 text-green-400" />}
            change={metrics?.new_investments_today}
            isLoading={isLoading}
            gradient="from-green-600 to-emerald-600"
          />

          <MetricCard
            title="Total Revenue"
            value={metrics?.total_revenue}
            icon={<DollarSign className="h-5 w-5 text-amber-400" />}
            change={metrics?.new_investments_today}
            isLoading={isLoading}
            isCurrency={true}
            gradient="from-amber-600 to-orange-600"
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-100">User Growth</CardTitle>
              <CardDescription className="text-slate-400">New user registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[300px] w-full bg-slate-800" />
              ) : userGrowth.length > 0 ? (
                <div className="h-[300px] w-full">
                  {/* Chart would go here - using a placeholder for now */}
                  <div className="h-full w-full bg-slate-800/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 text-cyan-500 mx-auto mb-2" />
                      <p className="text-slate-300">User Growth Chart</p>
                      <p className="text-sm text-slate-400">
                        {userGrowth.length} data points from {formatDate(userGrowth[0].date)} to{" "}
                        {formatDate(userGrowth[userGrowth.length - 1].date)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[300px] w-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-slate-400">No data available</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-100">Revenue</CardTitle>
              <CardDescription className="text-slate-400">Platform revenue over time</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[300px] w-full bg-slate-800" />
              ) : revenueData.length > 0 ? (
                <div className="h-[300px] w-full">
                  {/* Chart would go here - using a placeholder for now */}
                  <div className="h-full w-full bg-slate-800/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-10 w-10 text-green-500 mx-auto mb-2" />
                      <p className="text-slate-300">Revenue Chart</p>
                      <p className="text-sm text-slate-400">
                        {revenueData.length} data points from {formatDate(revenueData[0].date)} to{" "}
                        {formatDate(revenueData[revenueData.length - 1].date)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[300px] w-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-slate-400">No data available</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Projects Requiring Attention */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-100">Projects Requiring Attention</CardTitle>
            <CardDescription className="text-slate-400">
              Projects pending approval or requiring moderation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="bg-slate-800/50 p-1 mb-4">
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                >
                  Pending Approval ({metrics?.pending_projects || 0})
                </TabsTrigger>
                <TabsTrigger
                  value="reported"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                >
                  Reported Projects
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                {isLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton key={index} className="h-16 w-full bg-slate-800" />
                    ))}
                  </div>
                ) : metrics?.pending_projects ? (
                  <div className="space-y-3">
                    {/* This would be populated with actual pending projects */}
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-cyan-900/30 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-200">Project Name Example</h4>
                          <p className="text-sm text-slate-400">Submitted 2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button
                        onClick={() => router.push("/admin/projects?status=pending")}
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        View All Pending Projects
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-slate-300">No pending projects</h3>
                    <p className="text-slate-400 mt-1">All projects have been reviewed</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reported">
                <div className="text-center py-10">
                  <p className="text-slate-400">No reported projects at this time</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Manage Users"
            description="View and manage user accounts"
            icon={<Users className="h-5 w-5" />}
            onClick={() => router.push("/admin/users")}
          />

          <QuickActionCard
            title="Manage Projects"
            description="Review and moderate projects"
            icon={<BarChart3 className="h-5 w-5" />}
            onClick={() => router.push("/admin/projects")}
          />

          <QuickActionCard
            title="Export Reports"
            description="Download platform analytics"
            icon={<Download className="h-5 w-5" />}
            onClick={() => {
              /* Handle export */
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

// Metric Card Component
interface MetricCardProps {
  title: string
  value?: number
  icon: React.ReactNode
  change?: number
  isLoading: boolean
  isCurrency?: boolean
  gradient: string
}

function MetricCard({ title, value, icon, change, isLoading, isCurrency = false, gradient }: MetricCardProps) {
  const formatValue = (val?: number) => {
    if (val === undefined) return "-"

    if (isCurrency) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MGA",
        maximumFractionDigits: 0,
      }).format(val)
    }

    return new Intl.NumberFormat("en-US").format(val)
  }

  return (
    <Card className={`bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden relative`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 rounded-lg`}></div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <div className="h-8 w-8 rounded-full bg-slate-800/80 flex items-center justify-center">{icon}</div>
        </div>

        {isLoading ? (
          <Skeleton className="h-8 w-24 bg-slate-800" />
        ) : (
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-100">{formatValue(value)}</h3>
            {change !== undefined && (
              <p className="text-xs flex items-center text-green-400">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                {change} new today
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Quick Action Card Component
interface QuickActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}

function QuickActionCard({ title, description, icon, onClick }: QuickActionCardProps) {
  return (
    <Card
      className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-6 flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-cyan-900/20 flex items-center justify-center">
          <div className="text-cyan-400">{icon}</div>
        </div>
        <div>
          <h3 className="font-medium text-slate-200">{title}</h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

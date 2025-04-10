"use client"

import type React from "react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import adminService from "@/services/admin-service"
import projectsService from "@/services/projects-service"
import {
  CheckCircle,
  ChevronDown,
  Clock,
  Eye,
  Filter,
  MoreVertical,
  RefreshCw,
  Search,
  Trash2,
  XCircle,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

// Define project status types
type ProjectStatus = "all" | "pending" | "active" | "rejected" | "draft" | "funded"

// Define project interface based on the API response
interface Project {
  id: number
  title: string
  owner: {
    id: number
    name: string
    email?: string
  }
  amount_needed: number
  deadline: string
  status: string
  created_at: string
  sector: {
    id: number
    name: string
  }
  location: string
  short_description: string
  is_public: boolean
}

export default function AdminProjectsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State for projects data
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentStatus, setCurrentStatus] = useState<ProjectStatus>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // State for pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // State for project detail modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // State for delete confirmation
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // State for action confirmation
  const [projectToAction, setProjectToAction] = useState<{ id: number; action: "active" | "reject" } | null>(null)
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)

  // State for filters
  const [sectorFilter, setSectorFilter] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<string>("")
  const [sectors, setSectors] = useState<{ id: number; name: string }[]>([])

  // Load projects on mount and when filters change
  useEffect(() => {
    fetchProjects()
    fetchSectors()
  }, [currentStatus, page, pageSize])

  // Apply filters when search query or filters change
  useEffect(() => {
    applyFilters()
  }, [searchQuery, sectorFilter, dateFilter, projects])

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const params: Record<string, any> = {
        page,
        page_size: pageSize,
      }

      // Add status filter if not 'all'
      if (currentStatus !== "all") {
        params.status = currentStatus
      }

      const response = await adminService.listProjects(params)
      setProjects(response.data.results)
      setTotalPages(Math.ceil(response.data.count / pageSize))
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const fetchSectors = async () => {
    try {
      const response = await projectsService.getAllSectors()
      setSectors(response.data.results)
    } catch (error) {
      console.error("Error fetching sectors:", error)
    }
  }

  const applyFilters = () => {
    let filtered = [...projects]
    console.log(filtered);

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.owner.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sector filter
    if (sectorFilter) {
      filtered = filtered.filter((project) => project.sector.id.toString() === sectorFilter)
    }

    // Apply date filter
    if (dateFilter) {
      const today = new Date()
      const oneDay = 24 * 60 * 60 * 1000

      switch (dateFilter) {
        case "today":
          filtered = filtered.filter((project) => {
            const createdDate = new Date(project.created_at)
            return createdDate.toDateString() === today.toDateString()
          })
          break
        case "week":
          filtered = filtered.filter((project) => {
            const createdDate = new Date(project.created_at)
            const diffDays = Math.round(Math.abs((today.getTime() - createdDate.getTime()) / oneDay))
            return diffDays <= 7
          })
          break
        case "month":
          filtered = filtered.filter((project) => {
            const createdDate = new Date(project.created_at)
            return createdDate.getMonth() === today.getMonth() && createdDate.getFullYear() === today.getFullYear()
          })
          break
      }
    }

    setFilteredProjects(filtered)
  }

  const handleViewDetails = async (projectId: number) => {
    try {
      const response = await projectsService.getProjectById(projectId)
      setSelectedProject(response.data)
      setIsDetailModalOpen(true)
    } catch (error) {
      console.error("Error fetching project details:", error)
      toast({
        title: "Error",
        description: "Failed to load project details. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProject = (projectId: number) => {
    setProjectToDelete(projectId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return

    try {
      await projectsService.deleteProject(projectToDelete)
      toast({
        title: "Success",
        description: "Project has been deleted successfully.",
      })
      fetchProjects() // Refresh the list
    } catch (error) {
      console.error("Error deleting project:", error)
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setProjectToDelete(null)
    }
  }

  const handleProjectAction = (projectId: number, action: "active" | "reject") => {
    setProjectToAction({ id: projectId, action })
    setIsActionDialogOpen(true)
  }

  const confirmProjectAction = async () => {
    if (!projectToAction) return

    try {
      await adminService.manageProject({
        project_id: projectToAction.id,
        action: projectToAction.action,
        reason: projectToAction.action === "reject" ? "Does not meet platform requirements" : undefined,
      })

      toast({
        title: "Success",
        description: `Project has been ${projectToAction.action === "active" ? "approved" : "rejected"} successfully.`,
      })

      fetchProjects() // Refresh the list
    } catch (error) {
      console.error(`Error ${projectToAction.action}ing project:`, error)
      toast({
        title: "Error",
        description: `Failed to ${projectToAction.action} project. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsActionDialogOpen(false)
      setProjectToAction(null)
    }
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSectorFilter("")
    setDateFilter("")
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-900/20 text-amber-400 border-amber-400/30">
            Pending
          </Badge>
        )
      case "active":
        return (
          <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-400/30">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-400/30">
            Rejected
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="bg-slate-800/50 text-slate-400 border-slate-400/30">
            Draft
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-slate-800/50 text-slate-400 border-slate-400/30">
            {status}
          </Badge>
        )
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
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Project Management</h1>
            <p className="text-slate-400">Review, approve, and manage projects</p>
          </div>
          <Button
            onClick={fetchProjects}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-100">Projects</CardTitle>
            <CardDescription className="text-slate-400">Manage all projects submitted to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              value={currentStatus}
              onValueChange={(value) => setCurrentStatus(value as ProjectStatus)}
              className="w-full"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <TabsList className="bg-slate-800/50 p-1">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    All Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Pending Approval
                  </TabsTrigger>
                  <TabsTrigger
                    value="active"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Active
                  </TabsTrigger>
                  <TabsTrigger
                    value="rejected"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Rejected
                  </TabsTrigger>
                  <TabsTrigger
                    value="draft"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Drafts
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-slate-900 border-slate-700 text-slate-100">
                      <DropdownMenuLabel>Filter Projects</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-slate-700" />

                      <div className="p-2 space-y-2">
                        <div className="space-y-1">
                          <label className="text-xs text-slate-400">Sector</label>
                          <Select value={sectorFilter} onValueChange={setSectorFilter}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                              <SelectValue placeholder="All Sectors" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                              <SelectItem value="all">All Sectors</SelectItem>
                              {sectors.map((sector) => (
                                <SelectItem key={sector.id} value={sector.id.toString()}>
                                  {sector.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-slate-400">Date Created</label>
                          <Select value={dateFilter} onValueChange={setDateFilter}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                              <SelectValue placeholder="Any Time" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                              <SelectItem value="any">Any Time</SelectItem>
                              <SelectItem value="today">Today</SelectItem>
                              <SelectItem value="week">This Week</SelectItem>
                              <SelectItem value="month">This Month</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 border-slate-700 text-slate-300 hover:bg-slate-800"
                          onClick={resetFilters}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <ProjectsTable
                  projects={filteredProjects}
                  isLoading={isLoading}
                  onViewDetails={handleViewDetails}
                  onDeleteProject={handleDeleteProject}
                  onApproveProject={(id) => handleProjectAction(id, "active")}
                  onRejectProject={(id) => handleProjectAction(id, "reject")}
                  getStatusBadge={getStatusBadge}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              </TabsContent>

              <TabsContent value="pending" className="mt-0">
                <ProjectsTable
                  projects={filteredProjects}
                  isLoading={isLoading}
                  onViewDetails={handleViewDetails}
                  onDeleteProject={handleDeleteProject}
                  onApproveProject={(id) => handleProjectAction(id, "active")}
                  onRejectProject={(id) => handleProjectAction(id, "reject")}
                  getStatusBadge={getStatusBadge}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                  showApprovalActions={true}
                />
              </TabsContent>

              <TabsContent value="approved" className="mt-0">
                <ProjectsTable
                  projects={filteredProjects}
                  isLoading={isLoading}
                  onViewDetails={handleViewDetails}
                  onDeleteProject={handleDeleteProject}
                  onApproveProject={(id) => handleProjectAction(id, "active")}
                  onRejectProject={(id) => handleProjectAction(id, "reject")}
                  getStatusBadge={getStatusBadge}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              </TabsContent>

              <TabsContent value="rejected" className="mt-0">
                <ProjectsTable
                  projects={filteredProjects}
                  isLoading={isLoading}
                  onViewDetails={handleViewDetails}
                  onDeleteProject={handleDeleteProject}
                  onApproveProject={(id) => handleProjectAction(id, "active")}
                  onRejectProject={(id) => handleProjectAction(id, "reject")}
                  getStatusBadge={getStatusBadge}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              </TabsContent>

              <TabsContent value="draft" className="mt-0">
                <ProjectsTable
                  projects={filteredProjects}
                  isLoading={isLoading}
                  onViewDetails={handleViewDetails}
                  onDeleteProject={handleDeleteProject}
                  onApproveProject={(id) => handleProjectAction(id, "active")}
                  onRejectProject={(id) => handleProjectAction(id, "reject")}
                  getStatusBadge={getStatusBadge}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              </TabsContent>
            </Tabs>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-slate-400">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page > 1 ? page - 1 : 1)}
                  disabled={page === 1}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Previous
                </Button>
                <span className="text-sm text-slate-400">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                  disabled={page === totalPages}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-100 max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-xl">Project Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              Comprehensive information about the project
            </DialogDescription>
          </DialogHeader>

          {selectedProject ? (
            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-100">{selectedProject.title}</h2>
                  {getStatusBadge(selectedProject.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Owner</h3>
                    <p className="text-slate-200">{selectedProject.owner.name}</p>
                    {selectedProject.owner.email && (
                      <p className="text-sm text-slate-400">{selectedProject.owner.email}</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Sector</h3>
                    <p className="text-slate-200">{selectedProject.sector.name}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Location</h3>
                    <p className="text-slate-200">{selectedProject.location}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Funding Goal</h3>
                    <p className="text-slate-200">{formatCurrency(selectedProject.amount_needed)}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Created On</h3>
                    <p className="text-slate-200">{formatDate(selectedProject.created_at)}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Deadline</h3>
                    <p className="text-slate-200">{formatDate(selectedProject.deadline)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-400">Description</h3>
                  <p className="text-slate-200 mt-1">{selectedProject.short_description}</p>
                </div>

                {/* Additional project details would go here */}

                <Separator className="bg-slate-700" />

                <div className="flex flex-wrap gap-2">
                  {selectedProject.status === "pending" && (
                    <>
                      <Button
                        onClick={() => {
                          setIsDetailModalOpen(false)
                          handleProjectAction(selectedProject.id, "active")
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve Project
                      </Button>

                      <Button
                        onClick={() => {
                          setIsDetailModalOpen(false)
                          handleProjectAction(selectedProject.id, "reject")
                        }}
                        variant="destructive"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject Project
                      </Button>
                    </>
                  )}

                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={() => router.push(`/projects/${selectedProject.id}`)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Public Page
                  </Button>

                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={() => {
                      setIsDetailModalOpen(false)
                      handleDeleteProject(selectedProject.id)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Project
                  </Button>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4 bg-slate-800" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-16 bg-slate-800" />
                <Skeleton className="h-16 bg-slate-800" />
                <Skeleton className="h-16 bg-slate-800" />
                <Skeleton className="h-16 bg-slate-800" />
              </div>
              <Skeleton className="h-32 bg-slate-800" />
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDetailModalOpen(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700 text-slate-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              This action cannot be undone. This will permanently delete the project and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteProject} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Action Confirmation Dialog */}
      <AlertDialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700 text-slate-100">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {projectToAction?.action === "active" ? "Approve Project" : "Reject Project"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              {projectToAction?.action === "active"
                ? "This project will be approved and made visible to investors."
                : "This project will be rejected and the owner will be notified."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmProjectAction}
              className={
                projectToAction?.action === "active"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }
            >
              {projectToAction?.action === "active" ? "active" : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}

// ProjectsTable component to display the list of projects
interface ProjectsTableProps {
  projects: Project[]
  isLoading: boolean
  onViewDetails: (id: number) => void
  onDeleteProject: (id: number) => void
  onApproveProject: (id: number) => void
  onRejectProject: (id: number) => void
  getStatusBadge: (status: string) => React.ReactNode
  formatCurrency: (amount: number) => string
  formatDate: (date: string) => string
  showApprovalActions?: boolean
}

function ProjectsTable({
  projects,
  isLoading,
  onViewDetails,
  onDeleteProject,
  onApproveProject,
  onRejectProject,
  getStatusBadge,
  formatCurrency,
  formatDate,
  showApprovalActions = false,
}: ProjectsTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-full bg-slate-800" />
          </div>
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-10">
        <Clock className="h-10 w-10 text-slate-500 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-slate-300">No projects found</h3>
        <p className="text-slate-400 mt-1">Try adjusting your filters or search query</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border border-slate-700 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-800/50">
          <TableRow className="hover:bg-slate-800/80 border-slate-700">
            <TableHead className="text-slate-300 font-medium">Project</TableHead>
            <TableHead className="text-slate-300 font-medium">Owner</TableHead>
            <TableHead className="text-slate-300 font-medium">Status</TableHead>
            <TableHead className="text-slate-300 font-medium">Amount</TableHead>
            <TableHead className="text-slate-300 font-medium">Deadline</TableHead>
            <TableHead className="text-slate-300 font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="hover:bg-slate-800/50 border-slate-700">
              <TableCell className="font-medium text-slate-200">
                <div className="max-w-[250px] truncate">{project.title}</div>
                <div className="text-xs text-slate-400">{project.sector.name}</div>
              </TableCell>
              <TableCell className="text-slate-300">{project.owner.name}</TableCell>
              <TableCell>{getStatusBadge(project.status)}</TableCell>
              <TableCell className="text-slate-300">{formatCurrency(project.amount_needed)}</TableCell>
              <TableCell className="text-slate-300">{formatDate(project.deadline)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {showApprovalActions && project.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => onApproveProject(project.id)}
                        className="bg-green-600 hover:bg-green-700 text-white h-8 px-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onRejectProject(project.id)}
                        className="h-8 px-2"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDetails(project.id)}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 h-8 px-2"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 h-8 w-8 p-0"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-900 border-slate-700 text-slate-100">
                      <DropdownMenuItem
                        onClick={() => onViewDetails(project.id)}
                        className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => window.open(`/projects/${project.id}`, "_blank")}
                        className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Public Page
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-slate-700" />

                      {project.status === "pending" && (
                        <>
                          <DropdownMenuItem
                            onClick={() => onApproveProject(project.id)}
                            className="cursor-pointer hover:bg-green-900/30 focus:bg-green-900/30 text-green-400"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => onRejectProject(project.id)}
                            className="cursor-pointer hover:bg-red-900/30 focus:bg-red-900/30 text-red-400"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-slate-700" />
                        </>
                      )}

                      <DropdownMenuItem
                        onClick={() => onDeleteProject(project.id)}
                        className="cursor-pointer hover:bg-red-900/30 focus:bg-red-900/30 text-red-400"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

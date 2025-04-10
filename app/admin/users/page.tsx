"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import adminService from "@/services/admin-service"
import {
  Ban,
  Check,
  ChevronDown,
  Eye,
  Filter,
  MoreVertical,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  UserCheck,
  UserCog,
  UserX,
} from "lucide-react"

// Define user role types
type UserRole = "all" | "investor" | "project_owner" | "admin"

// Define user status types
type UserStatus = "all" | "active" | "inactive" | "unverified"

// Define user interface based on the API response
interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string | null
  role: "investor" | "project_owner" | "admin"
  is_active: boolean
  is_verified: boolean
  created_at: string
  last_login: string | null
  projects_count?: number
  investments_count?: number
  total_invested?: number
}

export default function AdminUsersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State for users data
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentRole, setCurrentRole] = useState<UserRole>("all")
  const [currentStatus, setCurrentStatus] = useState<UserStatus>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // State for pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // State for user detail modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // State for delete confirmation
  const [userToDelete, setUserToDelete] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // State for action confirmation
  const [userToAction, setUserToAction] = useState<{ id: number; action: "activate" | "deactivate" | "verify" } | null>(
    null,
  )
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)

  // State for role change
  const [userToChangeRole, setUserToChangeRole] = useState<{ id: number; currentRole: string } | null>(null)
  const [newRole, setNewRole] = useState<string>("")
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)

  // State for filters
  const [dateFilter, setDateFilter] = useState<string>("")

  // Load users on mount and when filters change
  useEffect(() => {
    fetchUsers()
  }, [currentRole, currentStatus, page, pageSize])

  // Apply filters when search query or filters change
  useEffect(() => {
    applyFilters()
  }, [searchQuery, dateFilter, users])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const params: Record<string, any> = {
        page,
        page_size: pageSize,
      }

      // Add role filter if not 'all'
      if (currentRole !== "all") {
        params.role = currentRole
      }

      // Add status filter if not 'all'
      if (currentStatus !== "all") {
        if (currentStatus === "active") params.is_active = true
        else if (currentStatus === "inactive") params.is_active = false
        else if (currentStatus === "unverified") params.is_verified = false
      }

      const response = await adminService.listUsers(params)
      setUsers(response.data.results)
      setTotalPages(Math.ceil(response.data.count / pageSize))
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...users]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply date filter
    if (dateFilter) {
      const today = new Date()
      const oneDay = 24 * 60 * 60 * 1000

      switch (dateFilter) {
        case "today":
          filtered = filtered.filter((user) => {
            const createdDate = new Date(user.created_at)
            return createdDate.toDateString() === today.toDateString()
          })
          break
        case "week":
          filtered = filtered.filter((user) => {
            const createdDate = new Date(user.created_at)
            const diffDays = Math.round(Math.abs((today.getTime() - createdDate.getTime()) / oneDay))
            return diffDays <= 7
          })
          break
        case "month":
          filtered = filtered.filter((user) => {
            const createdDate = new Date(user.created_at)
            return createdDate.getMonth() === today.getMonth() && createdDate.getFullYear() === today.getFullYear()
          })
          break
      }
    }

    setFilteredUsers(filtered)
  }

  const handleViewDetails = (user: User) => {
    setSelectedUser(user)
    setIsDetailModalOpen(true)
  }

  const handleDeleteUser = (userId: number) => {
    setUserToDelete(userId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteUser = async () => {
    if (!userToDelete) return

    try {
      await adminService.manageUser({
        user_id: userToDelete,
        action: "delete",
      })
      toast({
        title: "Success",
        description: "User has been deleted successfully.",
      })
      fetchUsers() // Refresh the list
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  const handleUserAction = (userId: number, action: "activate" | "deactivate" | "verify") => {
    setUserToAction({ id: userId, action })
    setIsActionDialogOpen(true)
  }

  const confirmUserAction = async () => {
    if (!userToAction) return

    try {
      await adminService.manageUser({
        user_id: userToAction.id,
        action: userToAction.action,
      })

      toast({
        title: "Success",
        description: `User has been ${
          userToAction.action === "activate"
            ? "activated"
            : userToAction.action === "deactivate"
              ? "deactivated"
              : "verified"
        } successfully.`,
      })

      fetchUsers() // Refresh the list
    } catch (error) {
      console.error(`Error ${userToAction.action}ing user:`, error)
      toast({
        title: "Error",
        description: `Failed to ${userToAction.action} user. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsActionDialogOpen(false)
      setUserToAction(null)
    }
  }

  const handleChangeRole = (userId: number, currentRole: string) => {
    setUserToChangeRole({ id: userId, currentRole })
    setNewRole(currentRole)
    setIsRoleDialogOpen(true)
  }

  const confirmRoleChange = async () => {
    if (!userToChangeRole || !newRole || newRole === userToChangeRole.currentRole) return

    try {
      await adminService.manageUser({
        user_id: userToChangeRole.id,
        action: "update_role",
        role: newRole,
      })

      toast({
        title: "Success",
        description: `User role has been updated to ${newRole} successfully.`,
      })

      fetchUsers() // Refresh the list
    } catch (error) {
      console.error("Error changing user role:", error)
      toast({
        title: "Error",
        description: "Failed to change user role. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRoleDialogOpen(false)
      setUserToChangeRole(null)
      setNewRole("")
    }
  }

  const resetFilters = () => {
    setSearchQuery("")
    setDateFilter("")
  }

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return (
          <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-400/30">
            Admin
          </Badge>
        )
      case "project_owner":
        return (
          <Badge variant="outline" className="bg-cyan-900/20 text-cyan-400 border-cyan-400/30">
            Project Owner
          </Badge>
        )
      case "investor":
        return (
          <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-400/30">
            Investor
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-slate-800/50 text-slate-400 border-slate-400/30">
            {role}
          </Badge>
        )
    }
  }

  const getStatusBadge = (isActive: boolean, isVerified: boolean) => {
    if (!isVerified) {
      return (
        <Badge variant="outline" className="bg-amber-900/20 text-amber-400 border-amber-400/30">
          Unverified
        </Badge>
      )
    }

    if (isActive) {
      return (
        <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-400/30">
          Active
        </Badge>
      )
    }

    return (
      <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-400/30">
        Inactive
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return "-"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">User Management</h1>
            <p className="text-slate-400">Manage user accounts and permissions</p>
          </div>
          <Button
            onClick={fetchUsers}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-100">Users</CardTitle>
            <CardDescription className="text-slate-400">Manage all users on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Tabs
                  defaultValue="all"
                  value={currentRole}
                  onValueChange={(value) => setCurrentRole(value as UserRole)}
                  className="w-full"
                >
                  <TabsList className="bg-slate-800/50 p-1">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      All Users
                    </TabsTrigger>
                    <TabsTrigger
                      value="investor"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Investors
                    </TabsTrigger>
                    <TabsTrigger
                      value="project_owner"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Project Owners
                    </TabsTrigger>
                    <TabsTrigger
                      value="admin"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Admins
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      placeholder="Search users..."
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
                      <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-slate-700" />

                      <div className="p-2 space-y-2">
                        <div className="space-y-1">
                          <label className="text-xs text-slate-400">Status</label>
                          <Select value={currentStatus} onValueChange={(value) => setCurrentStatus(value as UserStatus)}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                              <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="unverified">Unverified</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-slate-400">Date Joined</label>
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

              <UsersTable
                users={filteredUsers}
                isLoading={isLoading}
                onViewDetails={handleViewDetails}
                onDeleteUser={handleDeleteUser}
                onActivateUser={(id) => handleUserAction(id, "activate")}
                onDeactivateUser={(id) => handleUserAction(id, "deactivate")}
                onVerifyUser={(id) => handleUserAction(id, "verify")}
                onChangeRole={handleChangeRole}
                getRoleBadge={getRoleBadge}
                getStatusBadge={getStatusBadge}
                formatDate={formatDate}
              />

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-slate-400">
                  Showing {filteredUsers.length} of {users.length} users
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-100 max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-xl">User Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              Comprehensive information about the user
            </DialogDescription>
          </DialogHeader>

          {selectedUser ? (
            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedUser.avatar || undefined} alt={selectedUser.first_name} />
                    <AvatarFallback className="bg-slate-800 text-slate-200 text-lg">
                      {selectedUser.first_name.charAt(0)}
                      {selectedUser.last_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold text-slate-100">
                      {selectedUser.first_name} {selectedUser.last_name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      {getRoleBadge(selectedUser.role)}
                      {getStatusBadge(selectedUser.is_active, selectedUser.is_verified)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Email</h3>
                    <p className="text-slate-200">{selectedUser.email}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Joined On</h3>
                    <p className="text-slate-200">{formatDate(selectedUser.created_at)}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Last Login</h3>
                    <p className="text-slate-200">
                      {selectedUser.last_login ? formatDate(selectedUser.last_login) : "Never"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Status</h3>
                    <p className="text-slate-200">
                      {selectedUser.is_active ? "Active" : "Inactive"} •{" "}
                      {selectedUser.is_verified ? "Verified" : "Unverified"}
                    </p>
                  </div>
                </div>

                {selectedUser.role === "investor" && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Investment Activity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400">Investments</p>
                        <p className="text-lg font-semibold text-slate-100">
                          {selectedUser.investments_count || 0}
                        </p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400">Total Invested</p>
                        <p className="text-lg font-semibold text-slate-100">
                          {formatCurrency(selectedUser.total_invested)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedUser.role === "project_owner" && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Project Activity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400">Projects Created</p>
                        <p className="text-lg font-semibold text-slate-100">{selectedUser.projects_count || 0}</p>
                      </div>
                    </div>
                  </div>
                )}

                <Separator className="bg-slate-700" />

                <div className="flex flex-wrap gap-2">
                  {!selectedUser.is_active ? (
                    <Button
                      onClick={() => {
                        setIsDetailModalOpen(false)
                        handleUserAction(selectedUser.id, "activate")
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Activate User
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsDetailModalOpen(false)
                        handleUserAction(selectedUser.id, "deactivate")
                      }}
                      variant="destructive"
                    >
                      <Ban className="mr-2 h-4 w-4" />
                      Deactivate User
                    </Button>
                  )}

                  {!selectedUser.is_verified && (
                    <Button
                      onClick={() => {
                        setIsDetailModalOpen(false)
                        handleUserAction(selectedUser.id, "verify")
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Verify User
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={() => {
                      setIsDetailModalOpen(false)
                      handleChangeRole(selectedUser.id, selectedUser.role)
                    }}
                  >
                    <UserCog className="mr-2 h-4 w-4" />
                    Change Role
                  </Button>

                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={() => {
                      setIsDetailModalOpen(false)
                      handleDeleteUser(selectedUser.id)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete User
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
              This action cannot be undone. This will permanently delete the user account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700 text-white">
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
              {userToAction?.action === "activate"
                ? "Activate User"
                : userToAction?.action === "deactivate"
                  ? "Deactivate User"
                  : "Verify User"\
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              {userToAction?.action === "activate"
                ? "This user account will be activated and they will be able to log in."
                : userToAction?.action === "deactivate"
                  ? "This user account will be deactivated and they will not be able to log in."
                  : "This user account will be marked as verified."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmUserAction}
              className={
                userToAction?.action === "activate"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : userToAction?.action === "deactivate"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-amber-600 hover:bg-amber-700 text-white"
              }
            >
              {userToAction?.action === "activate"
                ? "Activate"
                : userToAction?.action === "deactivate"
                  ? "Deactivate"
                  : "Verify"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Role Change Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription className="text-slate-400">
              Select a new role for this user. This will change their permissions on the platform.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">New Role</label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="project_owner">Project Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-amber-900/20 border border-amber-700/30 rounded-md p-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-400" />
                <p className="text-sm font-medium text-amber-400">Important Note</p>
              </div>
              <p className="text-xs text-amber-300 mt-1">
                Changing a user to an Admin role will grant them full access to the admin dashboard and all platform
                management features. Use with caution.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRoleDialogOpen(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmRoleChange}
              disabled={!newRole || newRole === userToChangeRole?.currentRole}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Change Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

// UsersTable component to display the list of users
interface UsersTableProps {
  users: User[]
  isLoading: boolean
  onViewDetails: (user: User) => void
  onDeleteUser: (id: number) => void
  onActivateUser: (id: number) => void
  onDeactivateUser: (id: number) => void
  onVerifyUser: (id: number) => void
  onChangeRole: (id: number, currentRole: string) => void
  getRoleBadge: (role: string) => React.ReactNode
  getStatusBadge: (isActive: boolean, isVerified: boolean) => React.ReactNode
  formatDate: (date: string) => string
}

function UsersTable({
  users,
  isLoading,
  onViewDetails,
  onDeleteUser,
  onActivateUser,
  onDeactivateUser,
  onVerifyUser,
  onChangeRole,
  getRoleBadge,
  getStatusBadge,
  formatDate,
}: UsersTableProps) {
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

  if (users.length === 0) {
    return (
      <div className="text-center py-10">
        <UserX className="h-10 w-10 text-slate-500 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-slate-300">No users found</h3>
        <p className="text-slate-400 mt-1">Try adjusting your filters or search query</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border border-slate-700 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-800/50">
          <TableRow className="hover:bg-slate-800/80 border-slate-700">
            <TableHead className="text-slate-300 font-medium">User</TableHead>
            <TableHead className="text-slate-300 font-medium">Role</TableHead>
            <TableHead className="text-slate-300 font-medium">Status</TableHead>
            <TableHead className="text-slate-300 font-medium">Joined</TableHead>
            <TableHead className="text-slate-300 font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-slate-800/50 border-slate-700">
              <TableCell className="font-medium text-slate-200">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || undefined} alt={user.first_name} />
                    <AvatarFallback className="bg-slate-800 text-slate-200">
                      {user.first_name.charAt(0)}
                      {user.last_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-slate-200">
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="text-xs text-slate-400">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{getStatusBadge(user.is_active, user.is_verified)}</TableCell>
              <TableCell className="text-slate-300">{formatDate(user.created_at)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDetails(user)}
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
                        onClick={() => onViewDetails(user)}
                        className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-slate-700" />

                      {!user.is_active ? (
                        <DropdownMenuItem
                          onClick={() => onActivateUser(user.id)}
                          className="cursor-pointer hover:bg-green-900/30 focus:bg-green-900/30 text-green-400"
                        >
                          <UserCheck className="mr-2 h-4 w-4" />
                          Activate
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => onDeactivateUser(user.id)}
                          className="cursor-pointer hover:bg-red-900/30 focus:bg-red-900/30 text-red-400"
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Deactivate
                        </DropdownMenuItem>
                      )}

                      {!user.is_verified && (
                        <DropdownMenuItem
                          onClick={() => onVerifyUser(user.id)}
                          className="cursor-pointer hover:bg-amber-900/30 focus:bg-amber-900/30 text-amber-400"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Verify
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem
                        onClick={() => onChangeRole(user.id, user.role)}
                        className="cursor-pointer hover:bg-cyan-900/30 focus:bg-cyan-900/30 text-cyan-400"
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        Change Role
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-slate-700" />

                      <DropdownMenuItem
                        onClick={() => onDeleteUser(user.id)}
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

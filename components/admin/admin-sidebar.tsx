"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Bell,
  Building,
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Users,
} from "lucide-react"

export function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Building className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">InvestMada</h2>
            <p className="text-xs text-slate-400">Admin Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/dashboard")}>
              <a href="/admin/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/projects")}>
              <a href="/admin/projects">
                <BarChart3 className="h-4 w-4" />
                <span>Projects</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/users")}>
              <a href="/admin/users">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/investments")}>
              <a href="/admin/investments">
                <CreditCard className="h-4 w-4" />
                <span>Investments</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/comments")}>
              <a href="/admin/comments">
                <MessageSquare className="h-4 w-4" />
                <span>Comments</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/reports")}>
              <a href="/admin/reports">
                <FileText className="h-4 w-4" />
                <span>Reports</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarSeparator />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/settings")}>
              <a href="/admin/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/notifications")}>
              <a href="/admin/notifications">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/profile">
                <User className="h-4 w-4" />
                <span>My Profile</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/">
                <Home className="h-4 w-4" />
                <span>Back to Site</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarSeparator />

          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
              onClick={() => {
                // Handle logout
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

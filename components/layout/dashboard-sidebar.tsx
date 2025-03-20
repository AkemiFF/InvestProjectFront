"use client"

import { StatusItem } from "@/components/dashboard/status-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Command, FileText, Heart, MessageSquare, Settings, Shield, Users, Wallet, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"
import { useLayoutContext } from "./LayoutContext"
const adminName = "admin"
// Configuration des liens
const routeConfig = {
  common: {
    Dashboard: "/dashboard",
    Projects: "/projects",
    Finances: "/payments",
    Settings: "/profile"
  },
  admin: {
    "User Management": `/${adminName}/users`,
    Moderation: `/${adminName}/moderation`,
    Support: `/${adminName}/centre-aide`
  },
  user: {
    Network: "/contacts",
    Messages: "/messages",
    Favorites: "/favorites",
    Contracts: "/subscriptions"
  }
}

interface NavItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
  href: string
}

function NavItem({ icon: Icon, label, href }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={`w-full justify-start ${isActive ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </Link>
  )
}
interface DashboardSidebarProps {
  userType: "investor" | "project-owner" | "admin"
}

export function DashboardSidebar({ userType: initialUserType }: DashboardSidebarProps) {
  const [userType, setUserTp] = useState("")
  const { user, setUserType, updateUser } = useLayoutContext();

  useEffect(() => {
    setUserTp(user.userType)
  }, []);

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
      <CardContent className="p-4">
        {/* {userType !== "admin" && (
          <div className="mb-6">
            <Select
              defaultValue={userType}
              onValueChange={(value) => setUserType(value as typeof userType)}
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
        )} */}

        <nav className="space-y-2">
          <NavItem
            icon={Command}
            label="Dashboard"
            href={routeConfig.common.Dashboard}
          />

          {userType === "admin" ? (
            <>
              <NavItem icon={Users} label="User Management" href={routeConfig.admin["User Management"]} />
              <NavItem icon={Briefcase} label="Projects" href={routeConfig.common.Projects} />
              <NavItem icon={Shield} label="Moderation" href={routeConfig.admin.Moderation} />
              <NavItem icon={Wallet} label="Finances" href={routeConfig.common.Finances} />
              <NavItem icon={MessageSquare} label="Support" href={routeConfig.admin.Support} />
              <NavItem icon={Settings} label="Settings" href={routeConfig.common.Settings} />
            </>
          ) : (
            <>
              <NavItem icon={Briefcase} label="Projects" href={routeConfig.common.Projects} />
              <NavItem icon={Users} label="Network" href={routeConfig.user.Network} />
              <NavItem icon={MessageSquare} label="Messages" href={routeConfig.user.Messages} />
              <NavItem icon={Wallet} label="Finances" href={routeConfig.common.Finances} />
              <NavItem icon={Heart} label="Favorites" href={routeConfig.user.Favorites} />
              <NavItem icon={FileText} label="Contracts" href={routeConfig.user.Contracts} />
              <NavItem icon={Settings} label="Settings" href={routeConfig.common.Settings} />
            </>
          )}
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="text-xs text-slate-500 mb-2 font-mono">ACCOUNT STATUS</div>
          <div className="space-y-3">
            {userType === "admin" ? (
              <StatusItem label="Account Type" value="Administrator" color="cyan" isText />
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
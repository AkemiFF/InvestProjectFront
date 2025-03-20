"use client"

import type React from "react"

import { useState } from "react"
import { Briefcase, Command, FileText, Heart, MessageSquare, Settings, Shield, Users, Wallet, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusItem } from "@/components/dashboard/status-item"

interface NavItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
}

function NavItem({ icon: Icon, label, active }: NavItemProps) {
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

interface DashboardSidebarProps {
  userType: "investor" | "project-owner" | "admin"
}

export function DashboardSidebar({ userType: initialUserType }: DashboardSidebarProps) {
  const [userType, setUserType] = useState<"investor" | "project-owner" | "admin">(initialUserType)

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
      <CardContent className="p-4">
        {userType !== "admin" && (
          <div className="mb-6">
            <Select
              defaultValue={userType}
              onValueChange={(value) => setUserType(value as "investor" | "project-owner" | "admin")}
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
        )}

        <nav className="space-y-2">
          <NavItem icon={Command} label="Dashboard" active />

          {userType === "admin" ? (
            <>
              <NavItem icon={Users} label="User Management" />
              <NavItem icon={Briefcase} label="Projects" />
              <NavItem icon={Shield} label="Moderation" />
              <NavItem icon={Wallet} label="Finances" />
              <NavItem icon={MessageSquare} label="Support" />
              <NavItem icon={Settings} label="Settings" />
            </>
          ) : (
            <>
              <NavItem icon={Briefcase} label="Projects" />
              <NavItem icon={Users} label="Network" />
              <NavItem icon={MessageSquare} label="Messages" />
              <NavItem icon={Wallet} label="Finances" />
              <NavItem icon={Heart} label="Favorites" />
              <NavItem icon={FileText} label="Contracts" />
              <NavItem icon={Settings} label="Settings" />
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


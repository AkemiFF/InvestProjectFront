"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Archive,
  ArrowDown,
  Bell,
  BellOff,
  Briefcase,
  Check,
  CheckCheck,
  Clock,
  DollarSign,
  Filter,
  Info,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Search,
  Settings,
  Shield,
  Star,
  Trash,
  Wallet,
} from "lucide-react"

export default function NotificationCenterPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filter, setFilter] = useState("all")
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "investment",
      title: "Investment Successful",
      message: "Your investment of 2,000,000 MGA in AI-Powered Healthcare Assistant has been processed successfully.",
      timestamp: "2023-11-15T14:30:00",
      read: false,
      project: "AI-Powered Healthcare Assistant",
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
    },
    {
      id: 2,
      type: "return",
      title: "Investment Return",
      message: "You've received a return of 846,000 MGA from your investment in Medical Supplies Chain.",
      timestamp: "2023-11-14T10:15:00",
      read: false,
      project: "Medical Supplies Chain",
      icon: <ArrowDown className="h-5 w-5 text-cyan-500" />,
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      message: "Marie Laurent sent you a message regarding Urban Farming Initiative.",
      timestamp: "2023-11-13T09:45:00",
      read: true,
      project: "Urban Farming Initiative",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 4,
      type: "project",
      title: "Project Update",
      message: "FinTech Mobile App has reached 50% of its funding goal. Check out the latest updates.",
      timestamp: "2023-11-12T16:20:00",
      read: true,
      project: "FinTech Mobile App",
      icon: <Briefcase className="h-5 w-5 text-amber-500" />,
    },
    {
      id: 5,
      type: "system",
      title: "Security Alert",
      message:
        "A new device was used to log in to your account. If this wasn't you, please secure your account immediately.",
      timestamp: "2023-11-11T08:30:00",
      read: false,
      icon: <Shield className="h-5 w-5 text-red-500" />,
    },
    {
      id: 6,
      type: "project",
      title: "New Project",
      message: "A new project in Green Energy sector has been added that matches your investment preferences.",
      timestamp: "2023-11-10T11:45:00",
      read: true,
      project: "Solar Panel Manufacturing",
      icon: <Star className="h-5 w-5 text-purple-500" />,
    },
    {
      id: 7,
      type: "comment",
      title: "New Comment",
      message: "Ahmed Nasser commented on your question in AI-Powered Healthcare Assistant discussion.",
      timestamp: "2023-11-09T14:10:00",
      read: true,
      project: "AI-Powered Healthcare Assistant",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 8,
      type: "system",
      title: "Account Verification",
      message: "Your account has been successfully verified. You now have full access to all platform features.",
      timestamp: "2023-11-08T09:30:00",
      read: true,
      icon: <CheckCheck className="h-5 w-5 text-green-500" />,
    },
    {
      id: 9,
      type: "investment",
      title: "Investment Opportunity",
      message:
        "A project you're following, Urban Farming Initiative, is closing its funding round soon. Don't miss out!",
      timestamp: "2023-11-07T15:20:00",
      read: true,
      project: "Urban Farming Initiative",
      icon: <Clock className="h-5 w-5 text-amber-500" />,
    },
    {
      id: 10,
      type: "system",
      title: "Platform Update",
      message: "We've updated our terms of service and privacy policy. Please review the changes.",
      timestamp: "2023-11-06T10:00:00",
      read: true,
      icon: <Info className="h-5 w-5 text-blue-500" />,
    },
  ]

  // Filter notifications based on search query and filter
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by search query
    if (
      searchQuery &&
      !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notification.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(notification.project && notification.project.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Filter by type
    if (filter !== "all" && notification.type !== filter) {
      return false
    }

    // Filter by read status
    if (filter === "unread" && notification.read) {
      return false
    }

    return true
  })

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (diffDays < 7) {
      return `${date.toLocaleDateString([], { weekday: "long" })} at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else {
      return date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })
    }
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id))
    }
    setSelectAll(!selectAll)
  }

  // Handle select notification
  const handleSelectNotification = (id: number) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter((n) => n !== id))
      setSelectAll(false)
    } else {
      setSelectedNotifications([...selectedNotifications, id])
      if (selectedNotifications.length + 1 === filteredNotifications.length) {
        setSelectAll(true)
      }
    }
  }

  // Handle mark as read
  const handleMarkAsRead = () => {
    // Simulate API call
    console.log("Marking as read:", selectedNotifications)

    // Reset selection
    setSelectedNotifications([])
    setSelectAll(false)
  }

  // Handle delete
  const handleDelete = () => {
    // Simulate API call
    console.log("Deleting:", selectedNotifications)

    // Reset selection
    setSelectedNotifications([])
    setSelectAll(false)
  }

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Notification Center</h1>
            <p className="text-slate-400">Stay updated with the latest activities and alerts</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search notifications..."
                className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-slate-700 bg-slate-800/50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-slate-700 bg-slate-800/50">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("Mark all as read")}>
                  <Check className="h-4 w-4 mr-2" /> Mark All as Read
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Clear all notifications")}>
                  <Trash className="h-4 w-4 mr-2" /> Clear All
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("Notification settings")}>
                  <Settings className="h-4 w-4 mr-2" /> Notification Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {showFilters && (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-100 text-base">Filter Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                className={filter !== "all" ? "border-slate-700 bg-slate-800/50" : ""}
                onClick={() => setFilter("all")}
              >
                <Bell className="mr-2 h-4 w-4" /> All
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "outline"}
                className={filter !== "unread" ? "border-slate-700 bg-slate-800/50" : ""}
                onClick={() => setFilter("unread")}
              >
                <Mail className="mr-2 h-4 w-4" /> Unread
              </Button>
              <Button
                variant={filter === "investment" ? "default" : "outline"}
                className={filter !== "investment" ? "border-slate-700 bg-slate-800/50" : ""}
                onClick={() => setFilter("investment")}
              >
                <Wallet className="mr-2 h-4 w-4" /> Investments
              </Button>
              <Button
                variant={filter === "project" ? "default" : "outline"}
                className={filter !== "project" ? "border-slate-700 bg-slate-800/50" : ""}
                onClick={() => setFilter("project")}
              >
                <Briefcase className="mr-2 h-4 w-4" /> Projects
              </Button>
              <Button
                variant={filter === "message" ? "default" : "outline"}
                className={filter !== "message" ? "border-slate-700 bg-slate-800/50" : ""}
                onClick={() => setFilter("message")}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Messages
              </Button>
              <Button
                variant={filter === "comment" ? "default" : "outline"}
                className={filter !== "comment" ? "border-slate-700 bg-slate-800/50" : ""}
                onClick={() => setFilter("comment")}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Comments
              </Button>
              <Button
                variant={filter === "return" ? "default" : "outline"}
                className={filter !== "return" ? "border-slate-700 bg-slate-800/50" : ""}
                onClick={() => setFilter("return")}
              >
                <ArrowDown className="mr-2 h-4 w-4" /> Returns
              </Button>
              <Button
                variant={filter === "system" ? "default" : "outline"}
                className={filter !== "system" ? "border-slate-700 bg-slate-800/50" : ""}
                onClick={() => setFilter("system")}
              >
                <Info className="mr-2 h-4 w-4" /> System
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={`h-8 text-xs ${selectedNotifications.length > 0 ? "border-slate-700 bg-slate-800/50" : "border-slate-700 bg-slate-800/50 opacity-50"}`}
              disabled={selectedNotifications.length === 0}
              onClick={handleMarkAsRead}
            >
              <Check className="mr-1 h-3 w-3" /> Mark as Read
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 text-xs ${selectedNotifications.length > 0 ? "border-slate-700 bg-slate-800/50" : "border-slate-700 bg-slate-800/50 opacity-50"}`}
              disabled={selectedNotifications.length === 0}
              onClick={handleDelete}
            >
              <Trash className="mr-1 h-3 w-3" /> Delete
            </Button>
          </div>

          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">{unreadCount} Unread</Badge>
        </div>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-slate-100 text-base">Recent Notifications</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="selectAll"
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                  className="border-slate-700 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                />
                <Label htmlFor="selectAll" className="text-xs text-slate-400">
                  Select All
                </Label>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-700/30">
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className={`p-4 ${notification.read ? "" : "bg-slate-800/30"}`}>
                  <div className="flex items-start">
                    <div className="flex items-center h-full mr-3">
                      <Checkbox
                        id={`notification-${notification.id}`}
                        checked={selectedNotifications.includes(notification.id)}
                        onCheckedChange={() => handleSelectNotification(notification.id)}
                        className="border-slate-700 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                      />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-slate-200">{notification.title}</div>
                        <div className="text-xs text-slate-500">{formatTimestamp(notification.timestamp)}</div>
                      </div>
                      <div className="text-sm text-slate-400 mt-1">{notification.message}</div>
                      {notification.project && (
                        <div className="mt-1">
                          <Badge className="bg-slate-800/50 text-slate-300 border-slate-700/50 text-xs">
                            {notification.project}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="ml-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            {notification.read ? (
                              <>
                                <Mail className="h-4 w-4 mr-2" /> Mark as Unread
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" /> Mark as Read
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" /> Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}

              {filteredNotifications.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-slate-700 mb-4" />
                  <h3 className="text-lg font-medium text-slate-300 mb-2">No notifications found</h3>
                  <p className="text-sm text-slate-500 max-w-md mb-6">
                    {searchQuery || filter !== "all"
                      ? "We couldn't find any notifications matching your search criteria."
                      : "You don't have any notifications yet. They will appear here when you receive them."}
                  </p>
                  {(searchQuery || filter !== "all") && (
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      onClick={() => {
                        setSearchQuery("")
                        setFilter("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          {filteredNotifications.length > 0 && (
            <CardFooter className="border-t border-slate-700/50 pt-4 flex justify-center">
              <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-slate-100">
                Load More
              </Button>
            </CardFooter>
          )}
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base">Notification Settings</CardTitle>
            <CardDescription className="text-slate-400">
              Customize how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-200 flex items-center">
                <Bell className="mr-2 h-4 w-4 text-cyan-500" /> Email Notifications
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-investments" className="flex-1 cursor-pointer text-slate-300">
                    Investment updates
                  </Label>
                  <Switch id="email-investments" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="email-messages" className="flex-1 cursor-pointer text-slate-300">
                    New messages
                  </Label>
                  <Switch id="email-messages" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="email-projects" className="flex-1 cursor-pointer text-slate-300">
                    Project updates
                  </Label>
                  <Switch id="email-projects" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="email-comments" className="flex-1 cursor-pointer text-slate-300">
                    Comment replies
                  </Label>
                  <Switch id="email-comments" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="email-marketing" className="flex-1 cursor-pointer text-slate-300">
                    Marketing and promotions
                  </Label>
                  <Switch id="email-marketing" className="data-[state=checked]:bg-cyan-500" />
                </div>
              </div>
            </div>

            <Separator className="bg-slate-700" />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-200 flex items-center">
                <Bell className="mr-2 h-4 w-4 text-cyan-500" /> Push Notifications
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-investments" className="flex-1 cursor-pointer text-slate-300">
                    Investment updates
                  </Label>
                  <Switch id="push-investments" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="push-messages" className="flex-1 cursor-pointer text-slate-300">
                    New messages
                  </Label>
                  <Switch id="push-messages" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="push-projects" className="flex-1 cursor-pointer text-slate-300">
                    Project updates
                  </Label>
                  <Switch id="push-projects" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="push-comments" className="flex-1 cursor-pointer text-slate-300">
                    Comment replies
                  </Label>
                  <Switch id="push-comments" className="data-[state=checked]:bg-cyan-500" />
                </div>
              </div>
            </div>

            <Separator className="bg-slate-700" />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-200 flex items-center">
                <BellOff className="mr-2 h-4 w-4 text-cyan-500" /> Do Not Disturb
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dnd-enable" className="flex-1 cursor-pointer text-slate-300">
                    Enable Do Not Disturb
                  </Label>
                  <Switch id="dnd-enable" className="data-[state=checked]:bg-cyan-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dnd-start" className="text-slate-300">
                      Start Time
                    </Label>
                    <Input
                      id="dnd-start"
                      type="time"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      defaultValue="22:00"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dnd-end" className="text-slate-300">
                      End Time
                    </Label>
                    <Input
                      id="dnd-end"
                      type="time"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      defaultValue="08:00"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-slate-700/50 pt-4 flex justify-end">
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
              Save Settings
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}


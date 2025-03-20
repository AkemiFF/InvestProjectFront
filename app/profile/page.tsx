"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building,
  Globe,
  Camera,
  Upload,
  Save,
  AlertCircle,
  Bell,
  CreditCard,
  Lock,
  LogOut,
  CheckCircle2,
  Plus,
} from "lucide-react"

export default function ProfilePage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+261 34 12 345 67",
    location: "Antananarivo, Madagascar",
    bio: "Experienced investor with a focus on sustainable technology and renewable energy projects.",
    occupation: "Financial Analyst",
    company: "Global Investments Ltd",
    website: "https://johndoe.com",
  })

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSuccessMessage("Profile updated successfully")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1500)
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Profile Settings</h1>
            <p className="text-slate-400">Manage your account settings and preferences</p>
          </div>

          <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50">
            {userType === "investor" ? "Investor Account" : "Project Owner Account"}
          </Badge>
        </div>

        {successMessage && (
          <Alert className="bg-green-900/20 border-green-700/50 text-green-300">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="bg-slate-800/50 p-1 mb-6">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Personal Info
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              Payment Methods
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Profile Picture</CardTitle>
                <CardDescription className="text-slate-400">
                  This will be displayed on your profile and in comments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24 border-2 border-slate-700">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                    <AvatarFallback className="bg-slate-700 text-cyan-500 text-2xl">JD</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                        <Camera className="mr-2 h-4 w-4" /> Take Photo
                      </Button>
                      <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                        <Upload className="mr-2 h-4 w-4" /> Upload Image
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500">Allowed formats: JPG, PNG, GIF. Maximum size: 2MB.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Personal Information</CardTitle>
                <CardDescription className="text-slate-400">Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="fullName"
                        name="fullName"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                        value={personalInfo.fullName}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                        value={personalInfo.email}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="phone"
                        name="phone"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                        value={personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="location"
                        name="location"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                        value={personalInfo.location}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100"
                    placeholder="Tell us about yourself"
                    value={personalInfo.bio}
                    onChange={handlePersonalInfoChange}
                  />
                  <p className="text-xs text-slate-500">
                    Brief description for your profile. This will be visible to other users.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="occupation"
                        name="occupation"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                        value={personalInfo.occupation}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="company"
                        name="company"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                        value={personalInfo.company}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="website"
                        name="website"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                        value={personalInfo.website}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  onClick={handleSaveChanges}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="h-4 w-4 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </div>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Investment Preferences</CardTitle>
                <CardDescription className="text-slate-400">
                  Set your investment interests and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Preferred Investment Sectors</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="justify-start border-cyan-500/30 bg-cyan-900/10 text-cyan-400 hover:bg-cyan-900/20"
                    >
                      Technology
                    </Button>
                    <Button variant="outline" className="justify-start border-slate-700 hover:bg-slate-800">
                      Healthcare
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-cyan-500/30 bg-cyan-900/10 text-cyan-400 hover:bg-cyan-900/20"
                    >
                      Green Energy
                    </Button>
                    <Button variant="outline" className="justify-start border-slate-700 hover:bg-slate-800">
                      Real Estate
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-cyan-500/30 bg-cyan-900/10 text-cyan-400 hover:bg-cyan-900/20"
                    >
                      Agriculture
                    </Button>
                    <Button variant="outline" className="justify-start border-slate-700 hover:bg-slate-800">
                      Education
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investmentRange">Investment Range</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="bg-slate-800/50 border-slate-700">
                      <SelectValue placeholder="Select investment range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (Under 5,000,000 MGA)</SelectItem>
                      <SelectItem value="medium">Medium (5,000,000 - 20,000,000 MGA)</SelectItem>
                      <SelectItem value="large">Large (20,000,000 - 50,000,000 MGA)</SelectItem>
                      <SelectItem value="xlarge">Very Large (Over 50,000,000 MGA)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger className="bg-slate-800/50 border-slate-700">
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                  <Save className="mr-2 h-4 w-4" /> Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Change Password</CardTitle>
                <CardDescription className="text-slate-400">
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="currentPassword"
                      type="password"
                      className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="newPassword"
                      type="password"
                      className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <Alert className="bg-slate-800/50 border-slate-700">
                  <AlertCircle className="h-4 w-4 text-slate-400" />
                  <AlertDescription className="text-slate-400">
                    Password must be at least 8 characters and include a mix of letters, numbers, and special
                    characters.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                  Update Password
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Two-Factor Authentication</CardTitle>
                <CardDescription className="text-slate-400">
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-slate-200">SMS Authentication</div>
                    <div className="text-xs text-slate-400">Receive a code via SMS when signing in</div>
                  </div>
                  <Switch className="data-[state=checked]:bg-cyan-500" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-slate-200">Authenticator App</div>
                    <div className="text-xs text-slate-400">Use an authenticator app to generate codes</div>
                  </div>
                  <Switch className="data-[state=checked]:bg-cyan-500" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-slate-200">Email Authentication</div>
                    <div className="text-xs text-slate-400">Receive a code via email when signing in</div>
                  </div>
                  <Switch className="data-[state=checked]:bg-cyan-500" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Account Security</CardTitle>
                <CardDescription className="text-slate-400">Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-slate-200">Login Notifications</div>
                    <div className="text-xs text-slate-400">Receive notifications for new logins to your account</div>
                  </div>
                  <Switch className="data-[state=checked]:bg-cyan-500" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-slate-200">Suspicious Activity Alerts</div>
                    <div className="text-xs text-slate-400">Get alerts for suspicious account activity</div>
                  </div>
                  <Switch className="data-[state=checked]:bg-cyan-500" defaultChecked />
                </div>

                <Button variant="destructive" className="mt-4">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out From All Devices
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Notification Preferences</CardTitle>
                <CardDescription className="text-slate-400">
                  Choose how and when you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-slate-200 flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-cyan-500" /> Email Notifications
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-projects" className="flex-1 cursor-pointer">
                        New project opportunities
                      </Label>
                      <Switch id="email-projects" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-investments" className="flex-1 cursor-pointer">
                        Investment updates
                      </Label>
                      <Switch id="email-investments" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-messages" className="flex-1 cursor-pointer">
                        New messages
                      </Label>
                      <Switch id="email-messages" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-newsletter" className="flex-1 cursor-pointer">
                        Platform newsletter
                      </Label>
                      <Switch id="email-newsletter" className="data-[state=checked]:bg-cyan-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-slate-200 flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-cyan-500" /> Push Notifications
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-projects" className="flex-1 cursor-pointer">
                        New project opportunities
                      </Label>
                      <Switch id="push-projects" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-investments" className="flex-1 cursor-pointer">
                        Investment updates
                      </Label>
                      <Switch id="push-investments" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-messages" className="flex-1 cursor-pointer">
                        New messages
                      </Label>
                      <Switch id="push-messages" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-reminders" className="flex-1 cursor-pointer">
                        Payment reminders
                      </Label>
                      <Switch id="push-reminders" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-slate-200 flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-cyan-500" /> SMS Notifications
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-security" className="flex-1 cursor-pointer">
                        Security alerts
                      </Label>
                      <Switch id="sms-security" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-payments" className="flex-1 cursor-pointer">
                        Payment confirmations
                      </Label>
                      <Switch id="sms-payments" className="data-[state=checked]:bg-cyan-500" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Payment Methods</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your payment methods for investments and subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-md bg-blue-900/30 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200">Visa ending in 4242</div>
                      <div className="text-xs text-slate-400">Expires 12/2025</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500/30">
                    Default
                  </Badge>
                </div>

                <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-md bg-purple-900/30 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200">Mastercard ending in 5678</div>
                      <div className="text-xs text-slate-400">Expires 08/2024</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 border-slate-700 hover:bg-slate-800">
                    Set as Default
                  </Button>
                </div>

                <Button variant="outline" className="w-full border-dashed border-slate-700 hover:bg-slate-800 mt-2">
                  <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Billing Information</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your billing details for invoices and receipts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingName">Billing Name</Label>
                    <Input
                      id="billingName"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      defaultValue="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingEmail">Billing Email</Label>
                    <Input
                      id="billingEmail"
                      type="email"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      defaultValue="john.doe@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Billing Address</Label>
                    <Input
                      id="billingAddress"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      defaultValue="123 Main Street"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingCity">City</Label>
                    <Input
                      id="billingCity"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      defaultValue="Antananarivo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingCountry">Country</Label>
                    <Select defaultValue="madagascar">
                      <SelectTrigger className="bg-slate-800/50 border-slate-700">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="madagascar">Madagascar</SelectItem>
                        <SelectItem value="mauritius">Mauritius</SelectItem>
                        <SelectItem value="seychelles">Seychelles</SelectItem>
                        <SelectItem value="comoros">Comoros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingZip">Postal/Zip Code</Label>
                    <Input
                      id="billingZip"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      defaultValue="101"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID/VAT Number (Optional)</Label>
                  <Input
                    id="taxId"
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                    placeholder="Enter your tax ID or VAT number"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                  Save Billing Information
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Subscription</CardTitle>
                <CardDescription className="text-slate-400">Manage your subscription plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg border border-cyan-500/30 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-cyan-400">Basic Plan</div>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">Current Plan</Badge>
                  </div>
                  <div className="text-xs text-slate-400 mb-4">Access to basic features with standard limits</div>
                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                    Upgrade to Premium
                  </Button>
                </div>

                <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-purple-400">Premium Plan</div>
                    <div className="text-xs text-slate-300 font-mono">250,000 MGA / year</div>
                  </div>
                  <div className="text-xs text-slate-400 mb-4">
                    {userType === "investor"
                      ? "Early access to top projects and personalized investment advice"
                      : "Boost your project visibility and get expert guidance"}
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="text-xs text-slate-300 flex items-center">
                      <CheckCircle2 className="h-3 w-3 text-green-500 mr-2" />
                      {userType === "investor"
                        ? "Personalized investment recommendations"
                        : "Priority project listing and promotion"}
                    </li>
                    <li className="text-xs text-slate-300 flex items-center">
                      <CheckCircle2 className="h-3 w-3 text-green-500 mr-2" />
                      {userType === "investor"
                        ? "Early access to promising projects"
                        : "Expert guidance on project presentation"}
                    </li>
                    <li className="text-xs text-slate-300 flex items-center">
                      <CheckCircle2 className="h-3 w-3 text-green-500 mr-2" />
                      {userType === "investor"
                        ? "Reduced platform fees on investments"
                        : "Dedicated support for funding campaigns"}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}


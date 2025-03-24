"use client"

import type React from "react"

import { useLayoutContext } from "@/components/layout/LayoutContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { userAuth } from "@/lib/auth"
import { BASE_URL } from "@/lib/host"
import { apiClient } from "@/services/api-client"
import { ArrowRight, Github, ChromeIcon as Google, Hexagon, Lock, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

// // Login
export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const { user, updateUser } = useLayoutContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await apiClient.post(`${BASE_URL}/api/auth/login/`, formData)
      if (response.status === 200) {
        const res = response.data;
        userAuth.save(res);
        console.log(res);
        updateUser({
          id: res.user_id,
          username: res.username,
          email: res.email,
          userType: res.role,
          pic: res.pic,
        })
        console.log(user);

        router.push("/dashboard")
      } else {
        // Handle login error
        console.error("Login failed:", response.statusText)
      }
    } catch (error) {
      console.error("An error occurred during login:", error)
    } finally {
      setIsLoading(false)
    }
    setTimeout(() => {
      setIsLoading(false)
      // router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.1),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(128,0,255,0.1),transparent_40%)]"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              INVEST NEXUS
            </span>
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-300">
                      Password
                    </Label>
                    <Link href="/auth/forgot-password" className="text-xs text-cyan-400 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={handleCheckboxChange}
                    className="border-slate-700 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-300"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="h-4 w-4 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Sign In <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                  <Google className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-cyan-400 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}


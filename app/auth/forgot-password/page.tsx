"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Hexagon, Mail, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      if (email.includes("invalid")) {
        setError("We couldn't find an account with that email address.")
      } else {
        setSubmitted(true)
      }
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
            <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
            <CardDescription className="text-center text-slate-400">
              {!submitted
                ? "Enter your email address and we'll send you a link to reset your password"
                : "Check your email for a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <>
                {error && (
                  <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-700/50 text-red-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

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
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="h-4 w-4 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          Send Reset Link <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="space-y-4">
                <Alert className="bg-green-900/20 border-green-700/50 text-green-300">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Email Sent</AlertTitle>
                  <AlertDescription>
                    We've sent a password reset link to <span className="font-medium">{email}</span>. Please check your
                    inbox and follow the instructions.
                  </AlertDescription>
                </Alert>

                <div className="text-sm text-slate-400 space-y-2">
                  <p>The link will expire in 30 minutes.</p>
                  <p>If you don't see the email, check your spam folder or request a new link.</p>
                </div>

                <Button
                  className="w-full bg-slate-800 hover:bg-slate-700 mt-2"
                  onClick={() => {
                    setSubmitted(false)
                    setEmail("")
                  }}
                >
                  Send Another Link
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/auth/login" className="text-sm text-cyan-400 hover:underline flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}


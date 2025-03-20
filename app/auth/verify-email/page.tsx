"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Hexagon, CheckCircle, RefreshCw, ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter, useSearchParams } from "next/navigation"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [verified, setVerified] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Simulate verification if token is present
  useEffect(() => {
    if (token) {
      setIsVerifying(true)

      // Simulate API verification
      const timer = setTimeout(() => {
        setIsVerifying(false)
        setVerified(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [token])

  // Countdown for resend button
  useEffect(() => {
    if (!canResend && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setCanResend(true)
    }
  }, [countdown, canResend])

  const handleResendVerification = () => {
    setIsResending(true)

    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
      setCanResend(false)
      setCountdown(60)
    }, 1500)
  }

  const handleContinue = () => {
    router.push("/dashboard")
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
            <CardTitle className="text-2xl text-center">{verified ? "Email Verified" : "Verify Your Email"}</CardTitle>
            <CardDescription className="text-center text-slate-400">
              {verified ? "Your email has been successfully verified" : "Check your inbox for a verification link"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {isVerifying ? (
              <div className="flex flex-col items-center py-6">
                <div className="h-16 w-16 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-300">Verifying your email...</p>
              </div>
            ) : verified ? (
              <div className="flex flex-col items-center py-6">
                <div className="h-20 w-20 rounded-full bg-green-900/20 flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>

                <Alert className="bg-green-900/20 border-green-700/50 text-green-300 mb-6">
                  <AlertDescription>
                    Your email has been verified successfully. You can now access all features of the platform.
                  </AlertDescription>
                </Alert>

                <Button
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  onClick={handleContinue}
                >
                  <div className="flex items-center">
                    Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Button>
              </div>
            ) : (
              <div className="w-full py-6 space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-20 w-20 rounded-full bg-blue-900/20 flex items-center justify-center mb-4">
                    <Mail className="h-10 w-10 text-blue-500" />
                  </div>
                  <p className="text-slate-300 text-center">
                    We've sent a verification link to your email address. Please check your inbox and click the link to
                    verify your account.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-slate-400">
                    If you don't see the email, check your spam folder or request a new verification link.
                  </p>

                  <Button
                    variant="outline"
                    className="w-full border-slate-700 hover:bg-slate-800"
                    onClick={handleResendVerification}
                    disabled={isResending || !canResend}
                  >
                    {isResending ? (
                      <div className="flex items-center">
                        <div className="h-4 w-4 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : !canResend ? (
                      <div className="flex items-center">
                        <RefreshCw className="mr-2 h-4 w-4" /> Resend in {countdown}s
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <RefreshCw className="mr-2 h-4 w-4" /> Resend Verification Email
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            {!verified && (
              <Link href="/auth/login" className="text-sm text-cyan-400 hover:underline">
                Back to Sign In
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}


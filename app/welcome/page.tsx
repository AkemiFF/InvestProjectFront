import Link from "next/link"
import {
  ArrowRight,
  ChevronRight,
  Hexagon,
  BarChart3,
  Briefcase,
  Users,
  Shield,
  Zap,
  CheckCircle2,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(128,0,255,0.15),transparent_40%)]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20"></div>
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-20"></div>
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-20"></div>

        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              INVEST NEXUS
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-300 hover:text-cyan-400 transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Pricing
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      Connect, Invest, Innovate
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                    The future of investment is here. Connect with visionary projects and smart investors on a single
                    powerful platform.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/auth/register">
                    <Button
                      size="lg"
                      className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 w-full sm:w-auto"
                    >
                      Create Account <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-6 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full sm:w-auto"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-8 text-slate-400 text-sm">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-cyan-500 mr-2" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-cyan-500 mr-2" />
                    <span>Free starter plan</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg opacity-75 blur-lg"></div>
                <div className="relative bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                  <div className="p-1">
                    <img
                      src="/placeholder.svg?height=500&width=600"
                      alt="Platform Dashboard Preview"
                      className="rounded w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-slate-900/50 border-y border-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  $120M+
                </p>
                <p className="text-slate-400 mt-2">Total Investments</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  15,000+
                </p>
                <p className="text-slate-400 mt-2">Active Investors</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  2,500+
                </p>
                <p className="text-slate-400 mt-2">Funded Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  98%
                </p>
                <p className="text-slate-400 mt-2">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Platform Features
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Everything you need to connect projects with investors in one powerful platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-800 transition-colors group">
                <CardContent className="p-8">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-cyan-500/10 mb-6 group-hover:bg-cyan-500/20 transition-colors">
                    <BarChart3 className="h-6 w-6 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Advanced Analytics</h3>
                  <p className="text-slate-300">
                    Track performance with real-time analytics and detailed reports on investments and projects.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-800 transition-colors group">
                <CardContent className="p-8">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-cyan-500/10 mb-6 group-hover:bg-cyan-500/20 transition-colors">
                    <Briefcase className="h-6 w-6 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Project Management</h3>
                  <p className="text-slate-300">
                    Comprehensive tools for project owners to showcase, manage, and update their ventures.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-800 transition-colors group">
                <CardContent className="p-8">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-cyan-500/10 mb-6 group-hover:bg-cyan-500/20 transition-colors">
                    <Users className="h-6 w-6 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Investor Network</h3>
                  <p className="text-slate-300">
                    Connect with a global network of investors looking for the next big opportunity.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-800 transition-colors group">
                <CardContent className="p-8">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-cyan-500/10 mb-6 group-hover:bg-cyan-500/20 transition-colors">
                    <Shield className="h-6 w-6 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Secure Transactions</h3>
                  <p className="text-slate-300">
                    Industry-leading security protocols to ensure all investments and transactions are protected.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-800 transition-colors group">
                <CardContent className="p-8">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-cyan-500/10 mb-6 group-hover:bg-cyan-500/20 transition-colors">
                    <Zap className="h-6 w-6 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Smart Matching</h3>
                  <p className="text-slate-300">
                    AI-powered algorithms match investors with projects that align with their interests and goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-800 transition-colors group">
                <CardContent className="p-8">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-cyan-500/10 mb-6 group-hover:bg-cyan-500/20 transition-colors">
                    <Hexagon className="h-6 w-6 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Integrated Ecosystem</h3>
                  <p className="text-slate-300">
                    A complete suite of tools for communication, payments, and project management in one platform.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                A simple process to connect innovative projects with smart capital
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection lines for desktop */}
              <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

              <div className="relative">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 relative z-10">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center mt-4 text-white">Create Your Account</h3>
                  <p className="text-slate-300 text-center">
                    Sign up as an investor or project owner and complete your profile with your interests and expertise.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 relative z-10">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center mt-4 text-white">Connect & Discover</h3>
                  <p className="text-slate-300 text-center">
                    Browse projects or investors, use our smart matching system, and connect with potential partners.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 relative z-10">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center mt-4 text-white">Invest & Grow</h3>
                  <p className="text-slate-300 text-center">
                    Make secure investments, track performance, and manage your portfolio or project all in one place.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                >
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                What Our Users Say
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Join thousands of satisfied investors and project owners
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6">
                    "Invest Nexus has transformed how I discover and invest in projects. The platform is intuitive,
                    secure, and has connected me with opportunities I wouldn't have found elsewhere."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      JD
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-white">James Davidson</p>
                      <p className="text-sm text-slate-400">Angel Investor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6">
                    "As a startup founder, I was struggling to find the right investors. Invest Nexus not only connected
                    us with aligned investors but also provided tools to showcase our vision effectively."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      SL
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-white">Sarah Lin</p>
                      <p className="text-sm text-slate-400">Tech Entrepreneur</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6">
                    "The analytics and portfolio management tools are exceptional. I can track all my investments in
                    real-time and make data-driven decisions. The platform security gives me peace of mind."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">
                      MR
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-white">Michael Rodriguez</p>
                      <p className="text-sm text-slate-400">Venture Capitalist</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 bg-slate-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Choose the plan that works for your investment or project needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2 text-white">Free</h3>
                  <p className="text-slate-400 mb-6">Perfect for getting started</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">$0</span>
                    <span className="text-slate-400">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-300">Basic project listings</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-300">Limited investor connections</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-300">Basic analytics</span>
                    </li>
                  </ul>
                  <Link href="/auth/register">
                    <Button
                      variant="outline"
                      className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Pro Plan */}
              <Card className="bg-slate-900/50 border-cyan-600 overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-cyan-600 to-blue-600 text-center py-1 text-white text-sm font-medium">
                  Most Popular
                </div>
                <div className="p-8 pt-12">
                  <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
                  <p className="text-slate-400 mb-6">For serious investors & projects</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">$49</span>
                    <span className="text-slate-400">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-300">Featured project listings</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-300">Unlimited investor connections</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-300">Advanced analytics & reporting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-300">Priority support</span>
                    </li>
                  </ul>
                  <Link href="/auth/register">
                    <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Enterprise Plan */}
              <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2 text-white">Enterprise</h3>
                  <p className="text-slate-400 mb-6">For investment firms & large projects</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">$199</span>
                    <span className="text-slate-400">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-300">Premium project showcase</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-300">VIP investor introductions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-300">Custom analytics & API access</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-slate-300">Dedicated account manager</span>
                    </li>
                  </ul>
                  <Link href="/auth/register">
                    <Button
                      variant="outline"
                      className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-2xl p-12 border border-cyan-800/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.2),transparent_50%)]"></div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
                Ready to transform your investment journey?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                Join thousands of investors and project owners already using Invest Nexus to connect, invest, and
                innovate.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 w-full sm:w-auto"
                  >
                    Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 border-cyan-700 text-slate-200 hover:bg-cyan-900/30 w-full sm:w-auto"
                  >
                    Learn More <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/70 border-t border-slate-800 py-12 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Hexagon className="h-6 w-6 text-cyan-500" />
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                INVEST NEXUS
              </span>
            </div>
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Invest Nexus. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


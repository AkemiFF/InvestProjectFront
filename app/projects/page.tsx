"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/dashboard/project-card"
import { Briefcase, Filter, Search, SlidersHorizontal, Star, X } from "lucide-react"

export default function ProjectListingPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedSort, setSelectedSort] = useState("trending")
  const [fundingRange, setFundingRange] = useState([0, 50000000])
  const [showFilters, setShowFilters] = useState(false)
  const [activeProjects, setActiveProjects] = useState(15)

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "Sustainable Aquaculture Farm",
      sector: "Agriculture",
      progress: 42,
      target: 15000000,
      raised: 6300000,
      investors: 18,
      daysLeft: 12,
      featured: false,
    },
    {
      id: 2,
      title: "AI-Powered Healthcare Assistant",
      sector: "Technology",
      progress: 78,
      target: 8000000,
      raised: 6240000,
      investors: 35,
      daysLeft: 5,
      featured: true,
    },
    {
      id: 3,
      title: "Solar Panel Manufacturing",
      sector: "Green Energy",
      progress: 25,
      target: 25000000,
      raised: 6250000,
      investors: 12,
      daysLeft: 21,
      featured: false,
    },
    {
      id: 4,
      title: "Urban Farming Initiative",
      sector: "Agriculture",
      progress: 65,
      target: 12000000,
      raised: 7800000,
      investors: 27,
      daysLeft: 8,
      featured: false,
    },
    {
      id: 5,
      title: "Renewable Energy Plant",
      sector: "Green Energy",
      progress: 28,
      target: 35000000,
      raised: 9800000,
      investors: 15,
      daysLeft: 25,
      featured: false,
    },
    {
      id: 6,
      title: "Educational Platform",
      sector: "Education",
      progress: 92,
      target: 3200000,
      raised: 2944000,
      investors: 42,
      daysLeft: 3,
      featured: false,
    },
    {
      id: 7,
      title: "Medical Supplies Chain",
      sector: "Healthcare",
      progress: 55,
      target: 18000000,
      raised: 9900000,
      investors: 22,
      daysLeft: 15,
      featured: false,
    },
    {
      id: 8,
      title: "Eco-Friendly Packaging",
      sector: "Manufacturing",
      progress: 38,
      target: 7500000,
      raised: 2850000,
      investors: 14,
      daysLeft: 18,
      featured: false,
    },
    {
      id: 9,
      title: "Mobile Banking Solution",
      sector: "Finance",
      progress: 72,
      target: 15000000,
      raised: 10800000,
      investors: 31,
      daysLeft: 7,
      featured: true,
    },
  ]

  // Filter projects based on search query and filters
  const filteredProjects = projects.filter((project) => {
    // Filter by search query
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by sector
    if (selectedSector !== "all" && project.sector.toLowerCase() !== selectedSector) {
      return false
    }

    // Filter by funding range
    if (project.target < fundingRange[0] || project.target > fundingRange[1]) {
      return false
    }

    return true
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (selectedSort) {
      case "trending":
        return b.investors - a.investors
      case "newest":
        return a.daysLeft - b.daysLeft
      case "ending-soon":
        return a.daysLeft - b.daysLeft
      case "most-funded":
        return b.raised - a.raised
      case "highest-target":
        return b.target - a.target
      default:
        return 0
    }
  })

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Investment Opportunities</h1>
            <p className="text-slate-400">Discover and invest in promising projects</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search projects..."
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
          </div>
        </div>

        {showFilters && (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-100 text-base flex items-center">
                  <SlidersHorizontal className="mr-2 h-5 w-5 text-cyan-500" />
                  Filter Projects
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Sector</label>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                      <SelectValue placeholder="All Sectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="green energy">Green Energy</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Sort By</label>
                  <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                      <SelectValue placeholder="Trending" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="ending-soon">Ending Soon</SelectItem>
                      <SelectItem value="most-funded">Most Funded</SelectItem>
                      <SelectItem value="highest-target">Highest Target</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-400">Funding Target</label>
                    <span className="text-xs text-slate-500">
                      {formatCurrency(fundingRange[0])} - {formatCurrency(fundingRange[1])}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 50000000]}
                    max={50000000}
                    step={1000000}
                    value={fundingRange}
                    onValueChange={setFundingRange}
                    className="py-2"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-slate-400">
                  Showing {sortedProjects.length} of {projects.length} projects
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-slate-700 text-slate-300 hover:bg-slate-800"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedSector("all")
                    setSelectedSort("trending")
                    setFundingRange([0, 50000000])
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-slate-800/50 p-1 mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              All Projects
            </TabsTrigger>
            <TabsTrigger
              value="featured"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Featured
            </TabsTrigger>
            <TabsTrigger
              value="ending-soon"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Ending Soon
            </TabsTrigger>
            <TabsTrigger value="new" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              New
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project) => (
                <Link href={`/projects/${project.id}`} key={project.id}>
                  <ProjectCard
                    title={project.title}
                    sector={project.sector}
                    progress={project.progress}
                    target={project.target}
                    raised={project.raised}
                    investors={project.investors}
                    daysLeft={project.daysLeft}
                    featured={project.featured}
                  />
                </Link>
              ))}
            </div>

            {sortedProjects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Briefcase className="h-12 w-12 text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-slate-300 mb-2">No projects found</h3>
                <p className="text-sm text-slate-500 max-w-md mb-6">
                  We couldn't find any projects matching your search criteria. Try adjusting your filters or search
                  query.
                </p>
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedSector("all")
                    setSelectedSort("trending")
                    setFundingRange([0, 50000000])
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {sortedProjects.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-slate-100">
                  Load More Projects
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="featured" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects
                .filter((p) => p.featured)
                .map((project) => (
                  <Link href={`/projects/${project.id}`} key={project.id}>
                    <ProjectCard
                      title={project.title}
                      sector={project.sector}
                      progress={project.progress}
                      target={project.target}
                      raised={project.raised}
                      investors={project.investors}
                      daysLeft={project.daysLeft}
                      featured={project.featured}
                    />
                  </Link>
                ))}
            </div>

            {sortedProjects.filter((p) => p.featured).length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Star className="h-12 w-12 text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-slate-300 mb-2">No featured projects found</h3>
                <p className="text-sm text-slate-500 max-w-md mb-6">
                  We couldn't find any featured projects matching your search criteria.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ending-soon" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects
                .filter((p) => p.daysLeft <= 7)
                .map((project) => (
                  <Link href={`/projects/${project.id}`} key={project.id}>
                    <ProjectCard
                      title={project.title}
                      sector={project.sector}
                      progress={project.progress}
                      target={project.target}
                      raised={project.raised}
                      investors={project.investors}
                      daysLeft={project.daysLeft}
                      featured={project.featured}
                    />
                  </Link>
                ))}
            </div>

            {sortedProjects.filter((p) => p.daysLeft <= 7).length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-medium text-slate-300 mb-2">No projects ending soon</h3>
                <p className="text-sm text-slate-500 max-w-md">
                  There are no projects ending soon that match your search criteria.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects
                .filter((p) => p.daysLeft >= 20)
                .map((project) => (
                  <Link href={`/projects/${project.id}`} key={project.id}>
                    <ProjectCard
                      title={project.title}
                      sector={project.sector}
                      progress={project.progress}
                      target={project.target}
                      raised={project.raised}
                      investors={project.investors}
                      daysLeft={project.daysLeft}
                      featured={project.featured}
                    />
                  </Link>
                ))}
            </div>

            {sortedProjects.filter((p) => p.daysLeft >= 20).length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-medium text-slate-300 mb-2">No new projects found</h3>
                <p className="text-sm text-slate-500 max-w-md">
                  There are no new projects that match your search criteria.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Star className="h-12 w-12 text-slate-600 mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">No favorite projects yet</h3>
              <p className="text-sm text-slate-500 max-w-md mb-6">
                You haven't added any projects to your favorites yet. Browse projects and click the star icon to add
                them to your favorites.
              </p>
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                onClick={() => document.querySelector('[data-value="all"]')?.click()}
              >
                Browse Projects
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}


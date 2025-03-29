"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/dashboard/project-card"
import { Briefcase, Filter, Search, SlidersHorizontal, Star, X, Loader } from "lucide-react"
import { projectsService } from "@/services/projects-service"
import type { Project } from "@/types/projects"

export default function ProjectListingPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedSort, setSelectedSort] = useState("trending")
  const [fundingRange, setFundingRange] = useState([0, 50000000])
  const [showFilters, setShowFilters] = useState(false)
  const [sectors, setSectors] = useState<Array<{ id: string | number; name: string }>>([])

  // API integration states
  const [projects, setProjects] = useState<Project[]>([])
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [endingSoonProjects, setEndingSoonProjects] = useState<Project[]>([])
  const [newProjects, setNewProjects] = useState<Project[]>([])
  const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(false)
  const [isLoadingEndingSoon, setIsLoadingEndingSoon] = useState(false)
  const [isLoadingNew, setIsLoadingNew] = useState(false)
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  // Ajouter un tableau de secteurs par défaut
  const defaultSectors = [
    { id: "technology", name: "Technology" },
    { id: "green energy", name: "Green Energy" },
    { id: "healthcare", name: "Healthcare" },
    { id: "agriculture", name: "Agriculture" },
    { id: "education", name: "Education" },
    { id: "finance", name: "Finance" },
    { id: "manufacturing", name: "Manufacturing" },
  ]

  // Fonction utilitaire pour s'assurer qu'on a toujours un tableau
  const ensureArray = (data: any): any[] => {
    if (!data) return []
    if (Array.isArray(data)) return data
    if (data.results && Array.isArray(data.results)) return data.results
    if (typeof data === "object") return [data] // Si c'est un objet unique, le mettre dans un tableau
    return []
  }

  // Fonction pour générer une clé unique si l'ID n'existe pas
  const generateKey = (item: any, index: number): string => {
    if (item.id) return item.id.toString()
    if (item._id) return item._id.toString()
    if (item.title) return `${item.title}-${index}`
    return `item-${index}`
  }

  // Fetch all projects and sectors on component mount
  useEffect(() => {
    fetchProjects()
    fetchSectors()
    fetchFeaturedProjects()
  }, [])

  // Fetch projects based on active tab
  useEffect(() => {
    switch (activeTab) {
      case "featured":
        fetchFeaturedProjects()
        break
      case "ending-soon":
        fetchEndingSoonProjects()
        break
      case "new":
        fetchNewProjects()
        break
      case "favorites":
        fetchFavoriteProjects()
        break
      default:
        // "all" tab is handled by the initial fetch
        break
    }
  }, [activeTab])

  // Modifier la fonction fetchSectors pour utiliser les secteurs par défaut en cas d'erreur
  const fetchSectors = async () => {
    try {
      const response = await projectsService.getAllSectors()
      const sectorData = response.data.results || response.data
      setSectors(Array.isArray(sectorData) ? sectorData : defaultSectors)
    } catch (err) {
      console.error("Error fetching sectors:", err)
      // Utiliser les secteurs par défaut en cas d'erreur
      setSectors(defaultSectors)
    }
  }

  // Fetch projects from API
  const fetchProjects = async (page = 1, params = {}) => {
    try {
      setIsLoading(true)
      const response = await projectsService.getAllProjects({
        page,
        limit: 9,
        min_amount: fundingRange[0],
        max_amount: fundingRange[1],
        ...params,
      })

      const projectsData = ensureArray(response.data)

      if (page === 1) {
        setProjects(projectsData)
      } else {
        setProjects((prev) => [...prev, ...projectsData])
      }

      // Check if there are more pages
      if (response.data && response.data.next) {
        setHasMore(true)
      } else {
        setHasMore(false)
      }

      setCurrentPage(page)
      setError(null)
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError("Failed to load projects. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch featured projects
  const fetchFeaturedProjects = async () => {
    try {
      setIsLoadingFeatured(true)
      const response = await projectsService.getFeaturedProjects()
      console.log("Featured projects response:", response.data)
      setFeaturedProjects(ensureArray(response.data))
    } catch (err) {
      console.error("Error fetching featured projects:", err)
    } finally {
      setIsLoadingFeatured(false)
    }
  }

  // Fetch ending soon projects
  const fetchEndingSoonProjects = async () => {
    try {
      setIsLoadingEndingSoon(true)
      const response = await projectsService.getEndingSoonProjects()
      setEndingSoonProjects(ensureArray(response.data))
    } catch (err) {
      console.error("Error fetching ending soon projects:", err)
    } finally {
      setIsLoadingEndingSoon(false)
    }
  }

  // Fetch new projects
  const fetchNewProjects = async () => {
    try {
      setIsLoadingNew(true)
      const response = await projectsService.getNewProjects()
      setNewProjects(ensureArray(response.data))
    } catch (err) {
      console.error("Error fetching new projects:", err)
    } finally {
      setIsLoadingNew(false)
    }
  }

  // Fetch favorite projects
  const fetchFavoriteProjects = async () => {
    try {
      setIsLoadingFavorites(true)
      const response = await projectsService.getFavoriteProjects()
      setFavoriteProjects(ensureArray(response.data))
    } catch (err) {
      console.error("Error fetching favorite projects:", err)
    } finally {
      setIsLoadingFavorites(false)
    }
  }

  // Load more projects
  const loadMoreProjects = () => {
    if (!isLoading && hasMore) {
      fetchProjects(currentPage + 1)
    }
  }

  // Search projects
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      fetchProjects()
      return
    }

    try {
      setIsLoading(true)
      const response = await projectsService.searchProjects(searchQuery)
      setProjects(ensureArray(response.data))
      setError(null)
    } catch (err) {
      console.error("Error searching projects:", err)
      setError("Failed to search projects. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Filter projects by category
  const handleCategoryFilter = async (sectorId: string) => {
    if (sectorId === "all") {
      fetchProjects()
      return
    }

    try {
      setIsLoading(true)
      const response = await projectsService.getProjectsByCategory(sectorId)
      setProjects(ensureArray(response.data))
      setError(null)
    } catch (err) {
      console.error("Error filtering projects by category:", err)
      setError("Failed to filter projects. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedSector("all")
    setSelectedSort("trending")
    setFundingRange([0, 50000000])
    fetchProjects()
  }

  // Client-side sorting
  const sortedProjects = [...projects].sort((a, b) => {
    switch (selectedSort) {
      case "trending":
        return (b.participants_count || 0) - (a.participants_count || 0)
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case "ending-soon":
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      case "most-funded":
        return Number.parseFloat(b.amount_raised) - Number.parseFloat(a.amount_raised)
      case "highest-target":
        return Number.parseFloat(b.amount_needed) - Number.parseFloat(a.amount_needed)
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

  // Calculate days left
  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
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
                  <Select
                    value={selectedSector}
                    onValueChange={(value) => {
                      setSelectedSector(value)
                      handleCategoryFilter(value)
                    }}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                      <SelectValue placeholder="All Sectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      {sectors.map((sector, index) => (
                        <SelectItem key={generateKey(sector, index)} value={sector.id.toString()}>
                          {sector.name}
                        </SelectItem>
                      ))}
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
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-700 text-red-200 rounded-md p-4 mb-4">
            <p>{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-red-700 text-red-200 hover:bg-red-900/30"
              onClick={resetFilters}
            >
              Try Again
            </Button>
          </div>
        )}

        <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
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
            {isLoading && projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="h-8 w-8 text-cyan-500 animate-spin mb-4" />
                <p className="text-slate-400">Loading projects...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProjects.map((project, index) => (
                    <Link href={`/projects/${project.id}`} key={generateKey(project, index)}>
                      <ProjectCard
                        title={project.title}
                        sector={project.sector?.name || ""}
                        progress={project.progress || 0}
                        target={Number.parseFloat(project.amount_needed) || 0}
                        raised={Number.parseFloat(project.amount_raised) || 0}
                        investors={project.participants_count || 0}
                        daysLeft={project.days_left || 0}
                        featured={project.is_featured || false}
                      />
                    </Link>
                  ))}
                </div>

                {sortedProjects.length === 0 && !isLoading && (
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
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}

                {sortedProjects.length > 0 && hasMore && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-400 hover:text-slate-100"
                      onClick={loadMoreProjects}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader className="h-4 w-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Load More Projects"
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="featured" className="mt-0">
            {isLoadingFeatured ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="h-8 w-8 text-cyan-500 animate-spin mb-4" />
                <p className="text-slate-400">Loading featured projects...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProjects.map((project, index) => (
                    <Link href={`/projects/${project.id}`} key={generateKey(project, index)}>
                      <ProjectCard
                        title={project.title}
                        sector={project.sector?.name || ""}
                        progress={project.progress || 0}
                        target={Number.parseFloat(project.amount_needed) || 0}
                        raised={Number.parseFloat(project.amount_raised) || 0}
                        investors={project.participants_count || 0}
                        daysLeft={project.days_left || 0}
                        featured={project.is_featured || false}
                      />
                    </Link>
                  ))}
                </div>

                {featuredProjects.length === 0 && !isLoadingFeatured && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Star className="h-12 w-12 text-slate-600 mb-4" />
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No featured projects found</h3>
                    <p className="text-sm text-slate-500 max-w-md mb-6">
                      We couldn't find any featured projects matching your search criteria.
                    </p>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="ending-soon" className="mt-0">
            {isLoadingEndingSoon ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="h-8 w-8 text-cyan-500 animate-spin mb-4" />
                <p className="text-slate-400">Loading projects ending soon...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {endingSoonProjects.map((project, index) => (
                    <Link href={`/projects/${project.id}`} key={generateKey(project, index)}>
                      <ProjectCard
                        title={project.title}
                        sector={project.sector?.name || ""}
                        progress={project.progress || 0}
                        target={Number.parseFloat(project.amount_needed) || 0}
                        raised={Number.parseFloat(project.amount_raised) || 0}
                        investors={project.participants_count || 0}
                        daysLeft={project.days_left || 0}
                        featured={project.is_featured || false}
                      />
                    </Link>
                  ))}
                </div>

                {endingSoonProjects.length === 0 && !isLoadingEndingSoon && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No projects ending soon</h3>
                    <p className="text-sm text-slate-500 max-w-md">
                      There are no projects ending soon that match your search criteria.
                    </p>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            {isLoadingNew ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="h-8 w-8 text-cyan-500 animate-spin mb-4" />
                <p className="text-slate-400">Loading new projects...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newProjects.map((project, index) => (
                    <Link href={`/projects/${project.id}`} key={generateKey(project, index)}>
                      <ProjectCard
                        title={project.title}
                        sector={project.sector?.name || ""}
                        progress={project.progress || 0}
                        target={Number.parseFloat(project.amount_needed) || 0}
                        raised={Number.parseFloat(project.amount_raised) || 0}
                        investors={project.participants_count || 0}
                        daysLeft={project.days_left || 0}
                        featured={project.is_featured || false}
                      />
                    </Link>
                  ))}
                </div>

                {newProjects.length === 0 && !isLoadingNew && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No new projects found</h3>
                    <p className="text-sm text-slate-500 max-w-md">
                      There are no new projects that match your search criteria.
                    </p>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            {isLoadingFavorites ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="h-8 w-8 text-cyan-500 animate-spin mb-4" />
                <p className="text-slate-400">Loading favorite projects...</p>
              </div>
            ) : favoriteProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProjects.map((project, index) => (
                  <Link href={`/projects/${project.id}`} key={generateKey(project, index)}>
                    <ProjectCard
                      title={project.title}
                      sector={project.sector?.name || ""}
                      progress={project.progress || 0}
                      target={Number.parseFloat(project.amount_needed) || 0}
                      raised={Number.parseFloat(project.amount_raised) || 0}
                      investors={project.participants_count || 0}
                      daysLeft={project.days_left || 0}
                      featured={project.is_featured || false}
                    />
                  </Link>
                ))}
              </div>
            ) : (
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
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}


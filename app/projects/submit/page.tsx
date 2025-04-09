"use client"

import type React from "react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import projectsService from "@/services/projects-service"
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  DollarSign,
  FileText,
  ImageIcon,
  ImageIcon as ImageIcon2,
  Info,
  Layers,
  Link,
  MapPin,
  Plus,
  Save,
  Trash2,
  Upload,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Define the team member interface
interface TeamMember {
  name: string
  role: string
  photo?: File
  facebook_url?: string
}

export default function ProjectSubmissionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [sectors, setSectors] = useState<{ id: number; name: string; description: string }[]>([])

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await projectsService.getAllSectors()
        setSectors(response.data.results)
      } catch (error) {
        console.error("Error fetching sectors:", error)
      }
    }

    fetchSectors()
  }, [])
  const [currentTab, setCurrentTab] = useState("basics")
  const [formComplete, setFormComplete] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    sector: "",
    location: "",
    targetAmount: "",
    duration: "",
    fullDescription: "",
    businessModel: "",
    marketAnalysis: "",
    competitiveAdvantage: "",
    useOfFunds: "",
    financialProjections: "",
    risks: "",
    team: [] as TeamMember[],
    milestones: "",
    equity: "",
    minimumInvestment: "",
    maximumInvestment: "",
    expectedReturn: "",
    returnTimeline: "",
    allowPartialFunding: true,
    isPublic: true,
    videoUrl: "",
  })

  // State for new team member form
  const [newTeamMember, setNewTeamMember] = useState<TeamMember>({
    name: "",
    role: "",
  })

  // State for photo preview
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  // Add these state variables for file uploads
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [galleryImages, setGalleryImages] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
  const [documents, setDocuments] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle changes to the new team member form
  const handleTeamMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTeamMember((prev) => ({ ...prev, [name]: value }))
  }

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewTeamMember((prev) => ({ ...prev, photo: file }))

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle cover image upload
  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setCoverImage(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle gallery images upload
  const handleGalleryImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).slice(0, 5 - galleryImages.length) // Limit to 5 images total
      setGalleryImages((prev) => [...prev, ...files])

      // Create preview URLs
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          setGalleryPreviews((prev) => [...prev, event.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  // Handle documents upload
  const handleDocumentsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      setDocuments((prev) => [...prev, ...files])
    }
  }

  // Add a new team member
  const addTeamMember = () => {
    if (newTeamMember.name && newTeamMember.role) {
      setFormData((prev) => ({
        ...prev,
        team: [...prev.team, { ...newTeamMember }],
      }))

      // Reset the form and preview
      setNewTeamMember({ name: "", role: "" })
      setPhotoPreview(null)
    }
  }

  // Remove a team member
  const removeTeamMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index),
    }))
  }

  // Remove a gallery image
  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index))
    setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index))
  }

  // Remove a document
  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Create project data with files
    const projectData = {
      title: formData.title,
      description: formData.fullDescription,
      amount_needed: formData.targetAmount,
      deadline: new Date(Date.now() + Number(formData.duration) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      sector_id: sectors.find((sector) => sector.name === formData.sector)?.id || null, // Map sector name to ID
      funding_type: "equity", // Add funding type (adjust as needed)
      location: formData.location,
      short_description: formData.shortDescription,
      business_model: formData.businessModel,
      market_analysis: formData.marketAnalysis,
      competitive_advantage: formData.competitiveAdvantage,
      use_of_funds: formData.useOfFunds,
      financial_projections: formData.financialProjections,
      risks: formData.risks,
      team: JSON.stringify(
        formData.team.map((member) => ({
          name: member.name,
          role: member.role,
          ...(member.facebook_url ? { facebook_url: member.facebook_url } : {}),
        })),
      ),
      equity: formData.equity,
      minimum_investment: formData.minimumInvestment,
      maximum_investment: formData.maximumInvestment,
      expected_return: formData.expectedReturn as unknown as number,
      return_timeline: formData.returnTimeline,
      allow_partial_funding: formData.allowPartialFunding,
      is_public: formData.isPublic,
      video_url: formData.videoUrl,
      // Add the files
      cover_image: coverImage,
      images: galleryImages,
      documents: documents,
    }

    try {

      await projectsService.createProject(projectData)

      setIsLoading(false)
      setFormComplete(true)

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/projects/manage")
      }, 2000)
    } catch (error) {
      console.error("Error submitting project:", error)
      setIsLoading(false)
      // Handle error (could add error state and display message)
    }
  }

  const handleNextTab = () => {
    if (currentTab === "basics") setCurrentTab("details")
    else if (currentTab === "details") setCurrentTab("financials")
    else if (currentTab === "financials") setCurrentTab("media")
    else if (currentTab === "media") setCurrentTab("review")
  }

  const handlePrevTab = () => {
    if (currentTab === "details") setCurrentTab("basics")
    else if (currentTab === "financials") setCurrentTab("details")
    else if (currentTab === "media") setCurrentTab("financials")
    else if (currentTab === "review") setCurrentTab("media")
  }

  return (
    <DashboardLayout userType="project-owner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Submit New Project</h1>
            <p className="text-slate-400">Create a new project to seek investment</p>
          </div>
        </div>

        {formComplete ? (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="h-20 w-20 rounded-full bg-green-900/20 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-100">Project Submitted Successfully!</h2>
                <p className="text-slate-400 text-center max-w-md">
                  Your project has been submitted for review. Our team will review your submission and get back to you
                  shortly.
                </p>
                <p className="text-slate-500 text-sm">Redirecting to your project management dashboard...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100">Project Information</CardTitle>
              <CardDescription className="text-slate-400">
                Fill in the details about your project to attract potential investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                <TabsList className="grid grid-cols-5 bg-slate-800/50 p-1 mb-6">
                  <TabsTrigger
                    value="basics"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Basics
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="financials"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Financials
                  </TabsTrigger>
                  <TabsTrigger
                    value="media"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Media
                  </TabsTrigger>
                  <TabsTrigger
                    value="review"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Review
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit}>
                  <TabsContent value="basics" className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-slate-300">
                          Project Title
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Enter a concise and descriptive title"
                          className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.title}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shortDescription" className="text-slate-300">
                          Short Description
                        </Label>
                        <Textarea
                          id="shortDescription"
                          name="shortDescription"
                          placeholder="Provide a brief overview of your project (100-150 words)"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.shortDescription}
                          onChange={handleChange}
                          required
                        />
                        <p className="text-xs text-slate-500">
                          This will appear in project listings and is your chance to grab investors' attention.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sector" className="text-slate-300">
                            Sector
                          </Label>
                          <Select
                            value={formData.sector}
                            onValueChange={(value) => handleSelectChange("sector", value)}
                          >
                            <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                              <SelectValue placeholder="Select project sector" />
                            </SelectTrigger>
                            <SelectContent>
                              {sectors.map((sector) => (
                                <SelectItem key={sector.id} value={sector.name}>
                                  {sector.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-slate-300">
                            Project Location
                          </Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                              id="location"
                              name="location"
                              placeholder="City, Country"
                              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                              value={formData.location}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="targetAmount" className="text-slate-300">
                            Target Funding Amount (MGA)
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                              id="targetAmount"
                              name="targetAmount"
                              type="number"
                              placeholder="5000000"
                              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                              value={formData.targetAmount}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="duration" className="text-slate-300">
                            Funding Duration (Days)
                          </Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                              id="duration"
                              name="duration"
                              type="number"
                              placeholder="30"
                              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                              value={formData.duration}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <p className="text-xs text-slate-500">How long your project will be open for investment.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      >
                        Next: Project Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullDescription" className="text-slate-300">
                          Full Project Description
                        </Label>
                        <Textarea
                          id="fullDescription"
                          name="fullDescription"
                          placeholder="Provide a comprehensive description of your project"
                          className="min-h-[150px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.fullDescription}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessModel" className="text-slate-300">
                          Business Model
                        </Label>
                        <Textarea
                          id="businessModel"
                          name="businessModel"
                          placeholder="Explain how your project will generate revenue and become sustainable"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.businessModel}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="marketAnalysis" className="text-slate-300">
                          Market Analysis
                        </Label>
                        <Textarea
                          id="marketAnalysis"
                          name="marketAnalysis"
                          placeholder="Describe your target market, size, and growth potential"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.marketAnalysis}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="competitiveAdvantage" className="text-slate-300">
                          Competitive Advantage
                        </Label>
                        <Textarea
                          id="competitiveAdvantage"
                          name="competitiveAdvantage"
                          placeholder="What makes your project unique compared to competitors?"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.competitiveAdvantage}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Team Information Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-slate-300 text-lg">Team Members</Label>
                          <p className="text-xs text-slate-500">Add key team members to build investor confidence</p>
                        </div>

                        {/* List of existing team members */}
                        {formData.team.length > 0 && (
                          <div className="space-y-4 mb-6">
                            {formData.team.map((member, index) => (
                              <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                                      {member.photo ? (
                                        <div
                                          className="h-full w-full bg-cover bg-center"
                                          style={{
                                            backgroundImage: `url(${URL.createObjectURL(member.photo)})`,
                                          }}
                                        ></div>
                                      ) : (
                                        <User className="h-6 w-6 text-slate-400" />
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-slate-200">{member.name}</h4>
                                      <p className="text-sm text-slate-400">{member.role}</p>
                                    </div>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeTeamMember(index)}
                                    className="text-slate-400 hover:text-red-400 hover:bg-red-900/20"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                {member.facebook_url && (
                                  <div className="flex items-center text-sm text-cyan-400">
                                    <Link className="h-3 w-3 mr-1" />
                                    <a
                                      href={member.facebook_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="truncate"
                                    >
                                      {member.facebook_url}
                                    </a>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add new team member form */}
                        <div className="bg-slate-800/30 border border-dashed border-slate-700 rounded-lg p-4">
                          <h4 className="font-medium text-slate-300 mb-4 flex items-center">
                            <User className="h-4 w-4 mr-2" /> Add Team Member
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="memberName" className="text-slate-300">
                                Name
                              </Label>
                              <Input
                                id="memberName"
                                name="name"
                                placeholder="Full name"
                                className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                                value={newTeamMember.name}
                                onChange={handleTeamMemberChange}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="memberRole" className="text-slate-300">
                                Role
                              </Label>
                              <Input
                                id="memberRole"
                                name="role"
                                placeholder="e.g. CEO, CTO, Marketing Director"
                                className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                                value={newTeamMember.role}
                                onChange={handleTeamMemberChange}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="memberUrl" className="text-slate-300">
                                Profile URL (Optional)
                              </Label>
                              <div className="relative">
                                <Link className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                <Input
                                  id="memberUrl"
                                  name="facebook_url"
                                  placeholder="LinkedIn, personal website, etc."
                                  className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                                  value={newTeamMember.facebook_url || ""}
                                  onChange={handleTeamMemberChange}
                                />
                              </div>
                              <p className="text-xs text-slate-500">Any professional profile link, not just Facebook</p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="memberPhoto" className="text-slate-300">
                                Photo (Optional)
                              </Label>
                              <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700">
                                  {photoPreview ? (
                                    <div
                                      className="h-full w-full bg-cover bg-center"
                                      style={{ backgroundImage: `url(${photoPreview})` }}
                                    ></div>
                                  ) : (
                                    <User className="h-8 w-8 text-slate-500" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <Input
                                    id="memberPhoto"
                                    name="photo"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePhotoUpload}
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById("memberPhoto")?.click()}
                                    className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                                  >
                                    <Upload className="mr-2 h-4 w-4" /> Select Photo
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <Button
                              type="button"
                              onClick={addTeamMember}
                              disabled={!newTeamMember.name || !newTeamMember.role}
                              className="bg-slate-700 hover:bg-slate-600 text-slate-100"
                            >
                              <Plus className="mr-2 h-4 w-4" /> Add Team Member
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevTab}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      >
                        Next: Financial Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="financials" className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="useOfFunds" className="text-slate-300">
                          Use of Funds
                        </Label>
                        <Textarea
                          id="useOfFunds"
                          name="useOfFunds"
                          placeholder="Explain how you plan to use the investment funds"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.useOfFunds}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="financialProjections" className="text-slate-300">
                          Financial Projections
                        </Label>
                        <Textarea
                          id="financialProjections"
                          name="financialProjections"
                          placeholder="Provide revenue and profit projections for the next 3-5 years"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.financialProjections}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="risks" className="text-slate-300">
                          Risks and Challenges
                        </Label>
                        <Textarea
                          id="risks"
                          name="risks"
                          placeholder="Identify potential risks and how you plan to mitigate them"
                          className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          value={formData.risks}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="equity" className="text-slate-300">
                            Equity Offered (%)
                          </Label>
                          <Input
                            id="equity"
                            name="equity"
                            type="number"
                            placeholder="10"
                            className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            value={formData.equity}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="expectedReturn" className="text-slate-300">
                            Expected Return (%)
                          </Label>
                          <Input
                            id="expectedReturn"
                            name="expectedReturn"
                            type="number"
                            placeholder="15"
                            className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            value={formData.expectedReturn}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="minimumInvestment" className="text-slate-300">
                            Minimum Investment (MGA)
                          </Label>
                          <Input
                            id="minimumInvestment"
                            name="minimumInvestment"
                            type="number"
                            placeholder="100000"
                            className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            value={formData.minimumInvestment}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="maximumInvestment" className="text-slate-300">
                            Maximum Investment (MGA)
                          </Label>
                          <Input
                            id="maximumInvestment"
                            name="maximumInvestment"
                            type="number"
                            placeholder="1000000"
                            className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            value={formData.maximumInvestment}
                            onChange={handleChange}
                          />
                          <p className="text-xs text-slate-500">Leave blank for no maximum limit.</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="returnTimeline" className="text-slate-300">
                            Return Timeline (Months)
                          </Label>
                          <Input
                            id="returnTimeline"
                            name="returnTimeline"
                            type="number"
                            placeholder="24"
                            className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                            value={formData.returnTimeline}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="allowPartialFunding" className="text-slate-300">
                              Allow Partial Funding
                            </Label>
                            <p className="text-xs text-slate-500">
                              If enabled, you can receive funds even if the target amount is not reached.
                            </p>
                          </div>
                          <Switch
                            id="allowPartialFunding"
                            checked={formData.allowPartialFunding}
                            onCheckedChange={(checked) => handleSwitchChange("allowPartialFunding", checked)}
                            className="data-[state=checked]:bg-cyan-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevTab}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      >
                        Next: Media & Documents <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Project Cover Image</Label>
                        <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-800/30">
                          {coverImagePreview ? (
                            <div className="mb-4 relative">
                              <img
                                src={coverImagePreview || "/placeholder.svg"}
                                alt="Cover preview"
                                className="h-40 w-auto rounded-md object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2"
                                onClick={() => {
                                  setCoverImage(null)
                                  setCoverImagePreview(null)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <>
                              <ImageIcon className="h-10 w-10 text-slate-500 mb-2" />
                              <p className="text-sm text-slate-400 mb-2">Drag and drop or click to upload</p>
                              <p className="text-xs text-slate-500 mb-4">PNG, JPG or WEBP (Max 5MB)</p>
                            </>
                          )}
                          <Input
                            id="coverImage"
                            name="coverImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCoverImageUpload}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("coverImage")?.click()}
                            className="border-slate-700 hover:bg-slate-800"
                          >
                            <Upload className="mr-2 h-4 w-4" /> {coverImage ? "Change Image" : "Select File"}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-300">Project Gallery (Up to 5 images)</Label>
                        <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-800/30">
                          {galleryPreviews.length > 0 ? (
                            <div className="mb-4 grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
                              {galleryPreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={preview || "/placeholder.svg"}
                                    alt={`Gallery image ${index + 1}`}
                                    className="h-24 w-full rounded-md object-cover"
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute -top-2 -right-2"
                                    onClick={() => removeGalleryImage(index)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <>
                              <ImageIcon2 className="h-10 w-10 text-slate-500 mb-2" />
                              <p className="text-sm text-slate-400 mb-2">Drag and drop or click to upload</p>
                              <p className="text-xs text-slate-500 mb-4">PNG, JPG or WEBP (Max 5MB each)</p>
                            </>
                          )}
                          <Input
                            id="galleryImages"
                            name="galleryImages"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleGalleryImagesUpload}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("galleryImages")?.click()}
                            className="border-slate-700 hover:bg-slate-800"
                            disabled={galleryImages.length >= 5}
                          >
                            <Upload className="mr-2 h-4 w-4" />{" "}
                            {galleryImages.length > 0 ? "Add More Images" : "Select Files"}
                          </Button>
                          {galleryImages.length >= 5 && (
                            <p className="text-xs text-amber-500 mt-2">Maximum of 5 images reached</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-300">Project Video (Optional)</Label>
                        <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-800/30">
                          <p className="text-sm text-slate-400 mb-2">Enter YouTube or Vimeo URL</p>
                          <div className="relative w-full max-w-md">
                            <Link className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                              name="videoUrl"
                              placeholder="https://youtube.com/watch?v=..."
                              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 w-full"
                              value={formData.videoUrl}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-300">Supporting Documents (Optional)</Label>
                        <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-800/30">
                          {documents.length > 0 ? (
                            <div className="mb-4 w-full space-y-2">
                              {documents.map((doc, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between bg-slate-800 p-2 rounded-md"
                                >
                                  <div className="flex items-center">
                                    <FileText className="h-5 w-5 text-slate-400 mr-2" />
                                    <span className="text-sm text-slate-300 truncate max-w-[200px]">{doc.name}</span>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeDocument(index)}
                                    className="text-slate-400 hover:text-red-400 hover:bg-red-900/20"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <>
                              <FileText className="h-10 w-10 text-slate-500 mb-2" />
                              <p className="text-sm text-slate-400 mb-2">
                                Upload business plan, financial models, etc.
                              </p>
                              <p className="text-xs text-slate-500 mb-4">PDF, DOCX, XLSX (Max 10MB each)</p>
                            </>
                          )}
                          <Input
                            id="documents"
                            name="documents"
                            type="file"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                            multiple
                            className="hidden"
                            onChange={handleDocumentsUpload}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("documents")?.click()}
                            className="border-slate-700 hover:bg-slate-800"
                          >
                            <Upload className="mr-2 h-4 w-4" />{" "}
                            {documents.length > 0 ? "Add More Documents" : "Select Documents"}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevTab}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextTab}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      >
                        Next: Review & Submit <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="review" className="space-y-6">
                    <Alert className="bg-blue-900/20 border-blue-700/50 text-blue-300">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Review Your Project</AlertTitle>
                      <AlertDescription>
                        Please review all information carefully before submitting. Once submitted, your project will be
                        reviewed by our team before being published.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-slate-200 mb-2 flex items-center">
                          <Briefcase className="mr-2 h-5 w-5 text-cyan-500" /> Basic Information
                        </h3>
                        <div className="bg-slate-800/30 rounded-lg p-4 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-slate-500">Project Title</p>
                              <p className="text-sm text-slate-300">{formData.title || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Sector</p>
                              <p className="text-sm text-slate-300">{formData.sector || "Not selected"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Location</p>
                              <p className="text-sm text-slate-300">{formData.location || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Target Amount</p>
                              <p className="text-sm text-slate-300">
                                {formData.targetAmount
                                  ? `${Number.parseInt(formData.targetAmount).toLocaleString()} MGA`
                                  : "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Funding Duration</p>
                              <p className="text-sm text-slate-300">
                                {formData.duration ? `${formData.duration} days` : "Not provided"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Short Description</p>
                            <p className="text-sm text-slate-300">{formData.shortDescription || "Not provided"}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-slate-200 mb-2 flex items-center">
                          <Layers className="mr-2 h-5 w-5 text-cyan-500" /> Project Details
                        </h3>
                        <div className="bg-slate-800/30 rounded-lg p-4 space-y-3">
                          <div>
                            <p className="text-xs text-slate-500">Full Description</p>
                            <p className="text-sm text-slate-300">{formData.fullDescription || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Business Model</p>
                            <p className="text-sm text-slate-300">{formData.businessModel || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Market Analysis</p>
                            <p className="text-sm text-slate-300">{formData.marketAnalysis || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Competitive Advantage</p>
                            <p className="text-sm text-slate-300">{formData.competitiveAdvantage || "Not provided"}</p>
                          </div>

                          {/* Team Members Review */}
                          <div>
                            <p className="text-xs text-slate-500">Team Members</p>
                            {formData.team.length > 0 ? (
                              <div className="mt-2 space-y-2">
                                {formData.team.map((member, index) => (
                                  <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                                    <div className="h-6 w-6 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                                      {member.photo ? (
                                        <div
                                          className="h-full w-full bg-cover bg-center"
                                          style={{
                                            backgroundImage: `url(${URL.createObjectURL(member.photo)})`,
                                          }}
                                        ></div>
                                      ) : (
                                        <User className="h-4 w-4 text-slate-400" />
                                      )}
                                    </div>
                                    <span className="font-medium">{member.name}</span>
                                    <span className="text-slate-500">-</span>
                                    <span>{member.role}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-slate-300">No team members added</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-slate-200 mb-2 flex items-center">
                          <DollarSign className="mr-2 h-5 w-5 text-cyan-500" /> Financial Details
                        </h3>
                        <div className="bg-slate-800/30 rounded-lg p-4 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-slate-500">Equity Offered</p>
                              <p className="text-sm text-slate-300">
                                {formData.equity ? `${formData.equity}%` : "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Expected Return</p>
                              <p className="text-sm text-slate-300">
                                {formData.expectedReturn ? `${formData.expectedReturn}%` : "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Minimum Investment</p>
                              <p className="text-sm text-slate-300">
                                {formData.minimumInvestment
                                  ? `${Number.parseInt(formData.minimumInvestment).toLocaleString()} MGA`
                                  : "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Maximum Investment</p>
                              <p className="text-sm text-slate-300">
                                {formData.maximumInvestment
                                  ? `${Number.parseInt(formData.maximumInvestment).toLocaleString()} MGA`
                                  : "No limit"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Return Timeline</p>
                              <p className="text-sm text-slate-300">
                                {formData.returnTimeline ? `${formData.returnTimeline} months` : "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Allow Partial Funding</p>
                              <p className="text-sm text-slate-300">{formData.allowPartialFunding ? "Yes" : "No"}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Use of Funds</p>
                            <p className="text-sm text-slate-300">{formData.useOfFunds || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Financial Projections</p>
                            <p className="text-sm text-slate-300">{formData.financialProjections || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Risks and Challenges</p>
                            <p className="text-sm text-slate-300">{formData.risks || "Not provided"}</p>
                          </div>
                        </div>
                      </div>

                      {/* Media Review Section */}
                      <div>
                        <h3 className="text-lg font-medium text-slate-200 mb-2 flex items-center">
                          <ImageIcon className="mr-2 h-5 w-5 text-cyan-500" /> Media & Documents
                        </h3>
                        <div className="bg-slate-800/30 rounded-lg p-4 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-slate-500">Cover Image</p>
                              <p className="text-sm text-slate-300">{coverImage ? coverImage.name : "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Gallery Images</p>
                              <p className="text-sm text-slate-300">
                                {galleryImages.length > 0
                                  ? `${galleryImages.length} image${galleryImages.length > 1 ? "s" : ""} uploaded`
                                  : "No images uploaded"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Video URL</p>
                              <p className="text-sm text-slate-300">{formData.videoUrl || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Supporting Documents</p>
                              <p className="text-sm text-slate-300">
                                {documents.length > 0
                                  ? `${documents.length} document${documents.length > 1 ? "s" : ""} uploaded`
                                  : "No documents uploaded"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="isPublic"
                            checked={formData.isPublic}
                            onCheckedChange={(checked) => handleSwitchChange("isPublic", checked)}
                            className="data-[state=checked]:bg-cyan-500"
                          />
                          <Label htmlFor="isPublic" className="text-slate-300">
                            Make project public after approval
                          </Label>
                        </div>
                        <p className="text-xs text-slate-500 pl-7">
                          If disabled, your project will be saved as a draft and only visible to you.
                        </p>
                      </div>

                      <div className="pt-4">
                        <div className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handlePrevTab}
                            className="border-slate-700 text-slate-300 hover:bg-slate-800"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center">
                                <div className="h-4 w-4 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-2"></div>
                                Submitting...
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Save className="mr-2 h-4 w-4" /> Submit Project
                              </div>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </form>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

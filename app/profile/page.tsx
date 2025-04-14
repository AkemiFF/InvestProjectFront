"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { User, Mail, MapPin, Globe, Upload, Save, AlertCircle, Lock, CheckCircle2, Loader2 } from "lucide-react"
import { userService, type User as UserType } from "@/services/user-service"

export default function ProfilePage() {
  // État pour stocker les données de l'utilisateur
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState("")

  // État pour les formulaires
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    occupation: "",
    company: "",
    website: "",
  })

  // État pour le formulaire de mot de passe
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // État pour les préférences d'investissement
  const [investmentPreferences, setInvestmentPreferences] = useState({
    riskTolerance: "medium" as "low" | "medium" | "high",
    preferredCategories: [] as string[],
    investmentGoals: [] as string[], // Ajout de cette propriété manquante
    minInvestmentAmount: 5000000,
    maxInvestmentAmount: 20000000,
  })

  // Ajoutez ces états et références
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  // Charger les données de l'utilisateur au chargement du composant
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const userData = await userService.getCurrentUser()
        setUser(userData)

        // Initialiser les formulaires avec les données de l'utilisateur
        setPersonalInfo({
          firstName: userData.first_name || "",
          lastName: userData.last_name || "",
          email: userData.email || "",
          phone: "", // Ce champ n'existe pas dans l'API
          location: userData.location || "",
          bio: userData.bio || "",
          occupation: "", // Ce champ n'existe pas dans l'API
          company: "", // Ce champ n'existe pas dans l'API
          website: userData.website || "",
        })

        // Initialiser les préférences d'investissement
        if (userData.investmentPreferences) {
          setInvestmentPreferences({
            riskTolerance: userData.investmentPreferences.riskTolerance || "medium",
            preferredCategories: userData.investmentPreferences.preferredCategories || [],
            investmentGoals: userData.investmentPreferences.investmentGoals || [], // Ajout de cette ligne
            minInvestmentAmount: userData.investmentPreferences.minInvestmentAmount || 5000000,
            maxInvestmentAmount: userData.investmentPreferences.maxInvestmentAmount || 20000000,
          })
        }
      } catch (err) {
        setError("Erreur lors du chargement des données utilisateur")
        console.error("Erreur lors du chargement des données utilisateur:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Gérer les changements dans le formulaire d'informations personnelles
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  // Gérer les changements dans le formulaire de mot de passe
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  // Gérer les changements dans les préférences d'investissement
  const handleCategoryToggle = (category: string) => {
    setInvestmentPreferences((prev) => {
      const categories = [...prev.preferredCategories]
      if (categories.includes(category)) {
        return { ...prev, preferredCategories: categories.filter((c) => c !== category) }
      } else {
        return { ...prev, preferredCategories: [...categories, category] }
      }
    })
  }

  // Ajoutez ces fonctions pour gérer le téléchargement d'image
  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)

      // Créer un aperçu de l'image
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Ajouter cette fonction dans le composant ProfilePage
  const reloadUserData = async () => {
    try {
      const userData = await userService.getCurrentUser()
      setUser(userData)
      console.log("Données utilisateur rechargées:", userData)
    } catch (err) {
      console.error("Erreur lors du rechargement des données utilisateur:", err)
    }
  }

  // Modifier la fonction handleUploadImage pour utiliser reloadUserData
  const handleUploadImage = async () => {
    if (!selectedImage) return

    try {
      setIsUploadingImage(true)
      await userService.uploadProfileImage(selectedImage)

      // Recharger les données utilisateur pour obtenir l'URL mise à jour de l'image
      await reloadUserData()

      setSuccessMessage("Photo de profil mise à jour avec succès")
      setTimeout(() => setSuccessMessage(""), 3000)

      // Réinitialiser les états
      setSelectedImage(null)
      setImagePreview(null)
    } catch (err) {
      setError("Erreur lors du téléchargement de l'image")
      console.error("Erreur lors du téléchargement de l'image:", err)
    } finally {
      setIsUploadingImage(false)
    }
  }

  // Enregistrer les modifications du profil
  const handleSaveProfile = async () => {
    try {
      setIsUpdating(true)

      // Préparer les données à envoyer à l'API
      const userData: Partial<UserType> = {
        first_name: personalInfo.firstName,
        last_name: personalInfo.lastName,
        bio: personalInfo.bio,
        location: personalInfo.location,
        website: personalInfo.website,
      }

      // Appeler l'API pour mettre à jour le profil
      const updatedUser = await userService.updateProfile(userData)

      // Mettre à jour l'état local avec les nouvelles données
      setUser(updatedUser)

      // Afficher un message de succès
      setSuccessMessage("Profil mis à jour avec succès")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil")
      console.error("Erreur lors de la mise à jour du profil:", err)
    } finally {
      setIsUpdating(false)
    }
  }

  // Enregistrer les modifications des préférences d'investissement
  const handleSaveInvestmentPreferences = async () => {
    try {
      setIsUpdating(true)

      // Appeler l'API pour mettre à jour les préférences d'investissement
      const updatedUser = await userService.updateInvestmentPreferences(investmentPreferences)

      // Mettre à jour l'état local avec les nouvelles données
      setUser(updatedUser)

      // Afficher un message de succès
      setSuccessMessage("Préférences d'investissement mises à jour avec succès")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      setError("Erreur lors de la mise à jour des préférences d'investissement")
      console.error("Erreur lors de la mise à jour des préférences d'investissement:", err)
    } finally {
      setIsUpdating(false)
    }
  }

  // Mettre à jour le mot de passe
  const handleUpdatePassword = async () => {
    // Vérifier que les mots de passe correspondent
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas")
      return
    }

    try {
      setIsUpdating(true)

      // Appeler l'API pour mettre à jour le mot de passe
      await userService.updatePassword(passwordData.currentPassword, passwordData.newPassword)

      // Réinitialiser le formulaire
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // Afficher un message de succès
      setSuccessMessage("Mot de passe mis à jour avec succès")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      setError("Erreur lors de la mise à jour du mot de passe")
      console.error("Erreur lors de la mise à jour du mot de passe:", err)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout userType={user?.role === "investor" ? "investor" : "project-owner"}>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
          <span className="ml-2 text-slate-300">Chargement des données utilisateur...</span>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType={user?.role === "investor" ? "investor" : "project-owner"}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Paramètres du profil</h1>
            <p className="text-slate-400">Gérez vos paramètres de compte et préférences</p>
          </div>

          <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50">
            {user?.role === "investor" ? "Compte Investisseur" : "Compte Porteur de Projet"}
          </Badge>
        </div>

        {error && (
          <Alert className="bg-red-900/20 border-red-700/50 text-red-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="bg-green-900/20 border-green-700/50 text-green-300">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Succès</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="bg-slate-800/50 p-1 mb-6">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Informations Personnelles
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Sécurité
            </TabsTrigger>
            <TabsTrigger
              value="investment"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Préférences d'Investissement
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Photo de Profil</CardTitle>
                <CardDescription className="text-slate-400">
                  Cette image sera affichée sur votre profil et dans les commentaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24 border-2 border-slate-700">
                    {imagePreview ? (
                      // Si nous avons un aperçu d'image (après sélection mais avant téléchargement)
                      <AvatarImage src={imagePreview || "/placeholder.svg"} alt={user?.first_name} />
                    ) : user?.profile_picture ? (
                      // Si l'utilisateur a une image de profil
                      <AvatarImage
                        src={`${user.profile_picture}?t=${new Date().getTime()}`}
                        alt={user?.first_name}
                        onError={(e) => {
                          console.error("Erreur de chargement de l'image:", e)
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=96&width=96"
                        }}
                      />
                    ) : (
                      // Image par défaut
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user?.first_name} />
                    )}
                    <AvatarFallback className="bg-slate-700 text-cyan-500 text-2xl">
                      {user?.first_name?.charAt(0)}
                      {user?.last_name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-4 w-full">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        className="border-slate-700 hover:bg-slate-800"
                        onClick={handleImageClick}
                      >
                        <Upload className="mr-2 h-4 w-4" /> Télécharger une image
                      </Button>
                      {selectedImage && (
                        <Button
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                          onClick={handleUploadImage}
                          disabled={isUploadingImage}
                        >
                          {isUploadingImage ? (
                            <div className="flex items-center">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Téléchargement...
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Save className="mr-2 h-4 w-4" /> Enregistrer l'image
                            </div>
                          )}
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">Formats autorisés: JPG, PNG, GIF. Taille maximale: 2MB.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Informations Personnelles</CardTitle>
                <CardDescription className="text-slate-400">
                  Mettez à jour vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="firstName"
                        name="firstName"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                        value={personalInfo.firstName}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="lastName"
                        name="lastName"
                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                        value={personalInfo.lastName}
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
                        disabled
                      />
                    </div>
                    <p className="text-xs text-slate-500">L'adresse email ne peut pas être modifiée.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Localisation</Label>
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
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100"
                    placeholder="Parlez-nous de vous"
                    value={personalInfo.bio}
                    onChange={handlePersonalInfoChange}
                  />
                  <p className="text-xs text-slate-500">
                    Brève description pour votre profil. Elle sera visible par les autres utilisateurs.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Site Web</Label>
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
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  onClick={handleSaveProfile}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Enregistrement...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Save className="mr-2 h-4 w-4" /> Enregistrer les modifications
                    </div>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Changer le Mot de Passe</CardTitle>
                <CardDescription className="text-slate-400">
                  Mettez à jour votre mot de passe pour sécuriser votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de Passe Actuel</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                      placeholder="••••••••"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau Mot de Passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                      placeholder="••••••••"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le Nouveau Mot de Passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                      placeholder="••••••••"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>

                <Alert className="bg-slate-800/50 border-slate-700">
                  <AlertCircle className="h-4 w-4 text-slate-400" />
                  <AlertDescription className="text-slate-400">
                    Le mot de passe doit contenir au moins 8 caractères et inclure un mélange de lettres, chiffres et
                    caractères spéciaux.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  onClick={handleUpdatePassword}
                  disabled={
                    isUpdating ||
                    !passwordData.currentPassword ||
                    !passwordData.newPassword ||
                    !passwordData.confirmPassword
                  }
                >
                  {isUpdating ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Mise à jour...
                    </div>
                  ) : (
                    "Mettre à jour le mot de passe"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="investment" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Préférences d'Investissement</CardTitle>
                <CardDescription className="text-slate-400">
                  Définissez vos intérêts et préférences d'investissement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Secteurs d'Investissement Préférés</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {["technology", "healthcare", "energy", "real_estate", "agriculture", "education"].map(
                      (category) => (
                        <Button
                          key={category}
                          variant="outline"
                          className={`justify-start ${
                            investmentPreferences.preferredCategories.includes(category)
                              ? "border-cyan-500/30 bg-cyan-900/10 text-cyan-400 hover:bg-cyan-900/20"
                              : "border-slate-700 hover:bg-slate-800"
                          }`}
                          onClick={() => handleCategoryToggle(category)}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ")}
                        </Button>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label>Objectifs d'Investissement</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {["growth", "income", "preservation", "speculation", "retirement", "education"].map((goal) => (
                      <Button
                        key={goal}
                        variant="outline"
                        className={`justify-start ${
                          investmentPreferences.investmentGoals.includes(goal)
                            ? "border-cyan-500/30 bg-cyan-900/10 text-cyan-400 hover:bg-cyan-900/20"
                            : "border-slate-700 hover:bg-slate-800"
                        }`}
                        onClick={() => {
                          setInvestmentPreferences((prev) => {
                            const goals = [...prev.investmentGoals]
                            if (goals.includes(goal)) {
                              return { ...prev, investmentGoals: goals.filter((g) => g !== goal) }
                            } else {
                              return { ...prev, investmentGoals: [...goals, goal] }
                            }
                          })
                        }}
                      >
                        {goal.charAt(0).toUpperCase() + goal.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Sélectionnez vos objectifs d'investissement principaux.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskTolerance">Tolérance au Risque</Label>
                  <Select
                    value={investmentPreferences.riskTolerance}
                    onValueChange={(value) =>
                      setInvestmentPreferences((prev) => ({
                        ...prev,
                        riskTolerance: value as "low" | "medium" | "high",
                      }))
                    }
                  >
                    <SelectTrigger className="bg-slate-800/50 border-slate-700">
                      <SelectValue placeholder="Sélectionnez votre tolérance au risque" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Conservateur</SelectItem>
                      <SelectItem value="medium">Modéré</SelectItem>
                      <SelectItem value="high">Agressif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minInvestmentAmount">Montant Minimum d'Investissement (MGA)</Label>
                    <Input
                      id="minInvestmentAmount"
                      type="number"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      value={investmentPreferences.minInvestmentAmount}
                      onChange={(e) =>
                        setInvestmentPreferences((prev) => ({ ...prev, minInvestmentAmount: Number(e.target.value) }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxInvestmentAmount">Montant Maximum d'Investissement (MGA)</Label>
                    <Input
                      id="maxInvestmentAmount"
                      type="number"
                      className="bg-slate-800/50 border-slate-700 text-slate-100"
                      value={investmentPreferences.maxInvestmentAmount}
                      onChange={(e) =>
                        setInvestmentPreferences((prev) => ({ ...prev, maxInvestmentAmount: Number(e.target.value) }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  onClick={handleSaveInvestmentPreferences}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Enregistrement...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Save className="mr-2 h-4 w-4" /> Enregistrer les préférences
                    </div>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

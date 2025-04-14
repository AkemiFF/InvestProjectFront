import { apiClient } from "@/lib/api-client"

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar: string | null
  profile_picture: string | null // Ajout de cette propriété
  role: "investor" | "project_owner" | "admin"
  isVerified: boolean
  createdAt: string
  lastLogin: string
  bio: string | null
  location: string | null
  website: string | null
  socialLinks: {
    twitter?: string
    linkedin?: string
    facebook?: string
    instagram?: string
  }
  investmentPreferences?: {
    riskTolerance: "low" | "medium" | "high"
    preferredCategories: string[]
    investmentGoals: string[]
    minInvestmentAmount: number
    maxInvestmentAmount: number
  }
}

export interface UserStats {
  projectsCreated: number
  projectsFunded: number
  totalInvested: number
  totalEarned: number
  activeInvestments: number
}

export const userService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>("/api/users/me/")
    console.log("Données utilisateur reçues:", response.data)
    return response.data
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/api/users/${id}/`, {})
    return response.data
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<User>("/api/users/update_profile/", userData)
    return response.data
  },

  uploadProfileImage: async (imageFile: File): Promise<User> => {
    const formData = new FormData()
    formData.append("profile_picture", imageFile)

    try {
      const response = await apiClient.post<User>("/api/users/upload_profile_picture/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Réponse du téléchargement d'image:", response.data)
      return response.data
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image:", error)
      throw error
    }
  },

  updatePassword: async (currentPassword: string, newPassword: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>("/api/users/change_password/", {
      old_password: currentPassword,
      new_password: newPassword,
    })
    return response.data
  },

  getUserStats: async (): Promise<UserStats> => {
    const response = await apiClient.get<UserStats>("/api/users/stats/")
    return response.data
  },

  updateInvestmentPreferences: async (preferences: User["investmentPreferences"]): Promise<User> => {
    const response = await apiClient.patch<User>("/api/investor-profiles/update_profile/", preferences)
    return response.data
  },
}

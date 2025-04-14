import { apiClient } from "../lib/api-client"

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar: string | null
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
    return response.data
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/api/users/${id}/`, {})
    return response.data
  },

  // Utilisons l'endpoint update_profile avec la méthode PATCH comme défini dans le backend
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<User>("/api/users/update_profile/", userData)
    return response.data
  },

  updatePassword: async (currentPassword: string, newPassword: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>("/api/users/change-password/", {
      currentPassword,
      newPassword,
    })
    return response.data
  },

  getUserStats: async (): Promise<UserStats> => {
    const response = await apiClient.get<UserStats>("/api/users/stats/")
    return response.data
  },

  // Utilisons également l'endpoint approprié pour les préférences d'investissement
  updateInvestmentPreferences: async (preferences: User["investmentPreferences"]): Promise<User> => {
    const response = await apiClient.patch<User>("/api/users/investment-preferences/update_profile/", preferences)
    return response.data
  },
}

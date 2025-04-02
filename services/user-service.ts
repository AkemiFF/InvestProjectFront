import { apiRequest } from "@/lib/api-client"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
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
    return apiRequest<User>("/users/me/", {
      cache: "no-store",
    })
  },

  getUserById: async (id: string): Promise<User> => {
    return apiRequest<User>(`/users/${id}/`, {
      cache: "no-store",
    })
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    return apiRequest<User>("/users/me/", {
      method: "PATCH",
      body: userData,
    })
  },

  updatePassword: async (currentPassword: string, newPassword: string): Promise<{ success: boolean }> => {
    return apiRequest<{ success: boolean }>("/users/me/change-password/", {
      method: "POST",
      body: { currentPassword, newPassword },
    })
  },

  getUserStats: async (): Promise<UserStats> => {
    return apiRequest<UserStats>("/users/me/stats/", {
      cache: "no-store",
    })
  },

  updateInvestmentPreferences: async (preferences: User["investmentPreferences"]): Promise<User> => {
    return apiRequest<User>("/users/me/investment-preferences/", {
      method: "PATCH",
      body: preferences,
    })
  },
}


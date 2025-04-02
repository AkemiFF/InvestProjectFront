// services/projects-service.ts
import { apiClient } from "../lib/api-client"
import type { ProjectCreateData, ProjectUpdateData } from "@/types/projects"

export const projectsService = {
  // Récupération des projets
  getAllProjects: (params?: any) => {
    return apiClient.get("/api/projects/projects/", { params })
  },

  getProjectById: (id: number | string) => {
    return apiClient.get(`/api/projects/${id}/`)
  },

  // Utiliser les paramètres de filtrage au lieu d'endpoints spécifiques
  getFeaturedProjects: () => {
    return apiClient.get("/api/projects/", { params: { featured: true } })
  },

  getProjectsByCategory: (sectorId: string | number) => {
    return apiClient.get("/api/projects/", { params: { sector: sectorId } })
  },

  getEndingSoonProjects: () => {
    return apiClient.get("/api/projects/", { params: { ending_soon: true } })
  },

  getNewProjects: () => {
    return apiClient.get("/api/projects/", { params: { new: true } })
  },

  getFavoriteProjects: () => {
    return apiClient.get("/api/projects/", { params: { favorites: true } })
  },

  searchProjects: (query: string) => {
    return apiClient.get("/api/projects/", { params: { search: query } })
  },

  // Gestion des projets
  createProject: (data: ProjectCreateData) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) return

      if (key === "images" && Array.isArray(value)) {
        value.forEach((file) => {
          formData.append("images", file)
        })
      } else if (key === "documents" && Array.isArray(value)) {
        value.forEach((file) => {
          formData.append("documents", file)
        })
      } else if (key === "tags" && Array.isArray(value)) {
        formData.append("tags", JSON.stringify(value))
      } else {
        formData.append(key, value)
      }
    })

    return apiClient.post("/api/projects/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  updateProject: (id: number | string, data: ProjectUpdateData) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) return

      if (key === "tags" && Array.isArray(value)) {
        formData.append("tags", JSON.stringify(value))
      } else {
        formData.append(key, value)
      }
    })

    return apiClient.patch(`/api/projects/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  deleteProject: (id: number | string) => {
    return apiClient.delete(`/api/projects/${id}/`)
  },

  // Médias (images et documents)
  addProjectMedia: (projectId: number | string, file: File, fileType: "image" | "document", title?: string) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("file_type", fileType)

    if (title) {
      formData.append("title", title)
    }

    return apiClient.post(`/api/projects/${projectId}/add_media/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  removeProjectMedia: (projectId: number | string, mediaId: number | string) => {
    return apiClient.delete(`/api/projects/${projectId}/remove_media/`, {
      data: { media_id: mediaId },
    })
  },

  // Actions sur les projets
  toggleFavorite: (projectId: number | string) => {
    return apiClient.post(`/api/projects/${projectId}/toggle_favorite/`)
  },

  submitForReview: (projectId: number | string) => {
    return apiClient.post(`/api/projects/${projectId}/submit_for_review/`)
  },

  // Projets de l'utilisateur
  getUserProjects: () => {
    return apiClient.get("/api/projects/my_projects/")
  },

  // Secteurs
  getAllSectors: () => {
    return apiClient.get("/api/projects/sectors/")
  },

  getSectorById: (id: number | string) => {
    return apiClient.get(`/api/sectors/${id}/`)
  },
}

export default projectsService


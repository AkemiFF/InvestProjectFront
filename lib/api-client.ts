import { getAdminToken, getClientToken } from "@/lib/auth"
import { BASE_URL } from "@/lib/host"
import type { UserRole } from "@/types/base"
import axios from "axios"

// Fonction pour obtenir le cookie CSRF
function getCsrfToken(): string | null {
  if (typeof document === "undefined") return null

  // Recherche du cookie CSRF dans les cookies du navigateur
  const cookies = document.cookie.split(";")
  for (let cookie of cookies) {
    cookie = cookie.trim()
    // Le nom du cookie CSRF peut varier, généralement c'est csrftoken
    if (cookie.startsWith("csrftoken=")) {
      return cookie.substring("csrftoken=".length, cookie.length)
    }
  }
  return null
}

const createApiInstance = (role: UserRole = "user") => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    // Ajouter cette option pour inclure les cookies dans les requêtes
    withCredentials: true,
  })

  instance.interceptors.request.use(async (config) => {
    if (typeof window !== "undefined") {
      const token = role === "admin" ? await getAdminToken() : await getClientToken()
      if (token) config.headers.Authorization = `Bearer ${token}`

      // Ajouter le token CSRF pour les requêtes non-GET
      const method = config.method?.toLowerCase()
      if (method && method !== "get") {
        const csrfToken = getCsrfToken()
        if (csrfToken) {
          config.headers["X-CSRFToken"] = csrfToken
        } else {
          console.warn("CSRF token not found in cookies. This might cause CSRF validation errors.")
        }
      }
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Log détaillé pour le débogage
      if (error.response?.status === 403 && error.response?.data?.detail?.includes("CSRF")) {
        console.error("CSRF Error:", error.response.data)
        console.log("Current cookies:", document.cookie)
        console.log("Request headers:", error.config.headers)
      }

      if (error.response?.status === 401) {
        localStorage.removeItem(role === "admin" ? "admin_auth" : "auth")
        window.location.href = role === "admin" ? "/auth/login/forgot" : "/auth/login"
      }
      return Promise.reject(error)
    },
  )

  return instance
}

export const apiClient = createApiInstance()
export const apiAdmin = createApiInstance("admin")

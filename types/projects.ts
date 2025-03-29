// types/projects.ts
export interface Project {
  id: number
  title: string
  slug: string
  owner: {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    user_type: string
    profile_picture: string | null
    biography: string
    phone_number: string
    email_verified: boolean
    date_joined: string
  }
  sector: {
    id: number
    name: string
    description: string
  }
  amount_needed: string
  amount_raised: string
  status: "draft" | "pending" | "active" | "funded" | "failed" | "cancelled"
  created_at: string
  deadline: string
  is_featured: boolean
  progress: number
  days_left: number
  participants_count: number
  interests_count: number

  // Champs optionnels qui pourraient être présents dans d'autres contextes
  description?: string
  location?: string
  thumbnail?: string
  video_url?: string
  is_verified?: boolean
  updated_at?: string
  tags?: string[]
}

export interface ProjectImage {
  id: number
  project: number
  image: string
  order: number
  created_at: string
}

export interface ProjectDocument {
  id: number
  project: number
  title: string
  document: string
  file_type: string
  file_size: number
  created_at: string
}

export interface ProjectCreateData {
  title: string
  description: string
  sector: number | string // ID du secteur
  amount_needed: number | string
  deadline: string
  location?: string
  thumbnail?: File
  images?: File[]
  video_url?: string
  documents?: File[]
  tags?: string[]
}

export interface ProjectUpdateData {
  title?: string
  description?: string
  sector?: number | string // ID du secteur
  amount_needed?: number | string
  deadline?: string
  location?: string
  thumbnail?: File
  video_url?: string
  tags?: string[]
}

export interface ProjectStats {
  total_participants: number
  total_raised: number
  progress: number
  days_left: number
  recent_participants: Array<{
    user_id: number
    username: string
    amount: number
    date: string
  }>
  funding_history: Array<{
    date: string
    amount: number
  }>
}


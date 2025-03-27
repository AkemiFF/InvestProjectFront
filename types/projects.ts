// types/projects.ts
export interface Project {
  id: number;
  owner: number;
  title: string;
  description: string;
  category: string;
  funding_goal: number;
  funding_current: number;
  funding_percentage: number;
  funding_start_date: string;
  funding_end_date: string;
  location: string;
  thumbnail?: string;
  video_url?: string;
  status: 'draft' | 'pending' | 'active' | 'funded' | 'failed' | 'cancelled';
  is_featured: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  tags: string[];
  backers_count: number;
}

export interface ProjectImage {
  id: number;
  project: number;
  image: string;
  order: number;
  created_at: string;
}

export interface ProjectDocument {
  id: number;
  project: number;
  title: string;
  document: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

export interface ProjectCreateData {
  title: string;
  description: string;
  category: string;
  funding_goal: number;
  funding_end_date: string;
  location: string;
  thumbnail?: File;
  images?: File[];
  video_url?: string;
  documents?: File[];
  tags?: string[];
}

export interface ProjectUpdateData {
  title?: string;
  description?: string;
  category?: string;
  funding_goal?: number;
  funding_end_date?: string;
  location?: string;
  thumbnail?: File;
  video_url?: string;
  tags?: string[];
}

export interface ProjectStats {
  total_backers: number;
  total_raised: number;
  funding_percentage: number;
  days_remaining: number;
  recent_backers: Array<{
    user_id: number;
    username: string;
    amount: number;
    date: string;
  }>;
  funding_history: Array<{
    date: string;
    amount: number;
  }>;
}
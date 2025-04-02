// types/comments.ts
export interface Comment {
  id: number;
  project: number;
  user: number;
  username: string;
  user_profile_picture?: string;
  content: string;
  parent?: number;
  created_at: string;
  updated_at: string;
  likes_count: number;
  replies_count: number;
  is_edited: boolean;
  is_hidden: boolean;
}

export interface CommentCreateData {
  content: string;
  parent_id?: number;
}

export interface CommentReportData {
  reason: string;
}
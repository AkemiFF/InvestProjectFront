// types/admin.ts
export interface DashboardMetrics {
  total_users: number;
  new_users_today: number;
  total_projects: number;
  active_projects: number;
  total_investments: number;
  total_revenue: number;
  pending_projects: number;
  reported_comments: number;
}

export interface UserGrowthData {
  period: string;
  count: number;
}

export interface RevenueData {
  period: string;
  amount: number;
}

export interface AdminLog {
  id: number;
  admin: number;
  ip_address: string;
  admin_username: string;
  action_type: string;
  entity_type: string;
  entity_id: number;
  description: string;
  created_at: string;
  admin_user?: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    user_type: string;
    profile_picture: string | null;
    biography: string;
    phone_number: string;
    email_verified: boolean;
    date_joined: string;
  };
}

export interface SystemSetting {
  id: number;
  key: string;
  value: string;
  description: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  updated_by?: {
    id: number
    username: string
  }
}

export interface UserManagementData {
  user_id: number;
  action: 'activate' | 'deactivate' | 'verify' | 'make_admin' | 'remove_admin' | "update_role";
  reason?: string;
  role?: string;
  user_type?: string;
}

export interface ProjectManagementData {
  project_id: number;
  action: 'active' | 'reject' | 'feature' | 'unfeature' | 'hide' | 'unhide';
  reason?: string;
}

export interface CommentModerationData {
  comment_id: number;
  action: 'approve' | 'reject' | 'hide';
  reason?: string;
}
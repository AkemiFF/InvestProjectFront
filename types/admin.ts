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
  admin_username: string;
  action: string;
  entity_type: string;
  entity_id: number;
  details: string;
  created_at: string;
}

export interface SystemSetting {
  id: number;
  key: string;
  value: string;
  description: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserManagementData {
  user_id: number;
  action: 'activate' | 'deactivate' | 'verify' | 'make_admin' | 'remove_admin';
  reason?: string;
}

export interface ProjectManagementData {
  project_id: number;
  action: 'approve' | 'reject' | 'feature' | 'unfeature' | 'hide' | 'unhide';
  reason?: string;
}

export interface CommentModerationData {
  comment_id: number;
  action: 'approve' | 'reject' | 'hide';
  reason?: string;
}
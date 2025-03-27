// services/admin-service.ts
import { apiAdmin } from './api-client';
import type { 
  UserManagementData, 
  ProjectManagementData, 
  CommentModerationData 
} from '@/types/admin';

const adminService = {
  // Tableau de bord
  getDashboardMetrics: () => {
    return apiAdmin.get('/api/admin/dashboard/metrics/');
  },

  getUserGrowthData: (period: 'day' | 'month' = 'month', limit: number = 12) => {
    return apiAdmin.get(`/api/admin/dashboard/user_growth/?period=${period}&limit=${limit}`);
  },

  getRevenueData: (period: 'day' | 'month' = 'month', limit: number = 12) => {
    return apiAdmin.get(`/api/admin/dashboard/revenue_data/?period=${period}&limit=${limit}`);
  },

  // Journaux d'administration
  getAdminLogs: () => {
    return apiAdmin.get('/api/admin/logs/');
  },

  getAdminLogsByType: (type: string) => {
    return apiAdmin.get(`/api/admin/logs/by_type/?type=${type}`);
  },

  getAdminLogsByUser: (userId: number | string) => {
    return apiAdmin.get(`/api/admin/logs/by_user/?user_id=${userId}`);
  },

  // Paramètres système
  getSystemSettings: () => {
    return apiAdmin.get('/api/admin/settings/');
  },

  getPublicSystemSettings: () => {
    return apiAdmin.get('/api/admin/settings/public/');
  },

  getSystemSettingByKey: (key: string) => {
    return apiAdmin.get(`/api/admin/settings/by_key/?key=${key}`);
  },

  updateSystemSetting: (settingId: number | string, value: string, isPublic?: boolean) => {
    return apiAdmin.patch(`/api/admin/settings/${settingId}/`, {
      value,
      is_public: isPublic,
    });
  },

  createSystemSetting: (key: string, value: string, description: string, isPublic: boolean = false) => {
    return apiAdmin.post('/api/admin/settings/', {
      key,
      value,
      description,
      is_public: isPublic,
    });
  },

  // Statistiques
  getStatistics: () => {
    return apiAdmin.get('/api/admin/statistics/');
  },

  getStatisticsByType: (type: string, limit?: number) => {
    let url = `/api/admin/statistics/by_type/?type=${type}`;
    if (limit) url += `&limit=${limit}`;
    return apiAdmin.get(url);
  },

  getStatisticsByDate: (date: string) => {
    return apiAdmin.get(`/api/admin/statistics/by_date/?date=${date}`);
  },

  updateDailyStatistics: () => {
    return apiAdmin.post('/api/admin/statistics/update_daily/');
  },

  // Gestion des utilisateurs
  listUsers: (params?: any) => {
    return apiAdmin.get('/api/admin/users/list_users/', { params });
  },

  manageUser: (data: UserManagementData) => {
    return apiAdmin.post('/api/admin/users/manage_user/', data);
  },

  // Gestion des projets
  listProjects: (params?: any) => {
    return apiAdmin.get('/api/admin/projects/list_projects/', { params });
  },

  manageProject: (data: ProjectManagementData) => {
    return apiAdmin.post('/api/admin/projects/manage_project/', data);
  },

  // Modération des commentaires
  listReportedComments: (page: number = 1, pageSize: number = 10) => {
    return apiAdmin.get(`/api/admin/comments/list_reported_comments/?page=${page}&page_size=${pageSize}`);
  },

  moderateComment: (data: CommentModerationData) => {
    return apiAdmin.post('/api/admin/comments/moderate_comment/', data);
  },
};

export default adminService;
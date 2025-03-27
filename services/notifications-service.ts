// services/notifications-service.ts
import { apiClient } from './api-client';
import type { NotificationPreferences } from '@/types/notifications';

const notificationsService = {
  // Récupération des notifications
  getAllNotifications: () => {
    return apiClient.get('/api/notifications/');
  },

  getUnreadNotifications: () => {
    return apiClient.get('/api/notifications/unread/');
  },

  // Gestion des notifications
  markAsRead: (notificationId: number | string) => {
    return apiClient.post(`/api/notifications/${notificationId}/mark-read/`);
  },

  markAllAsRead: () => {
    return apiClient.post('/api/notifications/mark-all-read/');
  },

  deleteNotification: (notificationId: number | string) => {
    return apiClient.delete(`/api/notifications/${notificationId}/`);
  },

  // Statistiques
  getUnreadCount: () => {
    return apiClient.get('/api/notifications/unread-count/');
  },

  // Préférences de notification
  getNotificationPreferences: () => {
    return apiClient.get('/api/notifications/preferences/');
  },

  updateNotificationPreferences: (preferences: NotificationPreferences) => {
    return apiClient.patch('/api/notifications/preferences/', preferences);
  },
};

export default notificationsService;
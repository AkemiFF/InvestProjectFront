// types/notifications.ts
export interface Notification {
  id: number;
  user: number;
  type: string;
  title: string;
  message: string;
  data?: any;
  is_read: boolean;
  created_at: string;
}

export interface NotificationPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  project_updates: boolean;
  investment_updates: boolean;
  messages: boolean;
  marketing: boolean;
}
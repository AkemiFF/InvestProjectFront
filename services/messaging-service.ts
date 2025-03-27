// services/messaging-service.ts
import { apiClient } from './api-client';
import type { MessageCreateData, ConversationCreateData } from '@/types/messaging';

const messagingService = {
  // Conversations
  getConversations: () => {
    return apiClient.get('/api/messaging/conversations/');
  },

  getConversationById: (conversationId: number | string) => {
    return apiClient.get(`/api/messaging/conversations/${conversationId}/`);
  },

  createConversation: (data: ConversationCreateData) => {
    return apiClient.post('/api/messaging/conversations/', data);
  },

  deleteConversation: (conversationId: number | string) => {
    return apiClient.delete(`/api/messaging/conversations/${conversationId}/`);
  },

  // Messages
  getMessages: (conversationId: number | string) => {
    return apiClient.get(`/api/messaging/conversations/${conversationId}/messages/`);
  },

  sendMessage: (conversationId: number | string, data: MessageCreateData) => {
    const formData = new FormData();
    formData.append('content', data.content);
    
    if (data.attachments) {
      data.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }
    
    return apiClient.post(`/api/messaging/conversations/${conversationId}/messages/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteMessage: (messageId: number | string) => {
    return apiClient.delete(`/api/messaging/messages/${messageId}/`);
  },

  // Marquage des messages
  markAsRead: (conversationId: number | string) => {
    return apiClient.post(`/api/messaging/conversations/${conversationId}/mark-read/`);
  },

  // Statistiques
  getUnreadCount: () => {
    return apiClient.get('/api/messaging/unread-count/');
  },
};

export default messagingService;
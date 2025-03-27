// services/comments-service.ts
import { apiClient } from './api-client';
import type { CommentCreateData, CommentReportData } from '@/types/comments';

const commentsService = {
  // Récupération des commentaires
  getProjectComments: (projectId: number | string) => {
    return apiClient.get(`/api/comments/project/${projectId}/`);
  },

  getCommentById: (commentId: number | string) => {
    return apiClient.get(`/api/comments/${commentId}/`);
  },

  // Gestion des commentaires
  createComment: (projectId: number | string, data: CommentCreateData) => {
    return apiClient.post(`/api/comments/project/${projectId}/`, data);
  },

  updateComment: (commentId: number | string, content: string) => {
    return apiClient.patch(`/api/comments/${commentId}/`, { content });
  },

  deleteComment: (commentId: number | string) => {
    return apiClient.delete(`/api/comments/${commentId}/`);
  },

  // Réponses aux commentaires
  replyToComment: (commentId: number | string, content: string) => {
    return apiClient.post(`/api/comments/${commentId}/reply/`, { content });
  },

  // Modération des commentaires
  reportComment: (commentId: number | string, data: CommentReportData) => {
    return apiClient.post(`/api/comments/${commentId}/report/`, data);
  },

  // Commentaires de l'utilisateur
  getUserComments: () => {
    return apiClient.get('/api/comments/my-comments/');
  },
};

export default commentsService;
// services/projects-service.ts
import { apiClient } from './api-client';
import type { ProjectCreateData, ProjectUpdateData } from '@/types/projects';

const projectsService = {
  // Récupération des projets
  getAllProjects: (params?: any) => {
    return apiClient.get('/api/projects/', { params });
  },

  getProjectById: (id: number | string) => {
    return apiClient.get(`/api/projects/${id}/`);
  },

  getFeaturedProjects: () => {
    return apiClient.get('/api/projects/featured/');
  },

  getProjectsByCategory: (category: string) => {
    return apiClient.get('/api/projects/by-category/', { params: { category } });
  },

  searchProjects: (query: string) => {
    return apiClient.get('/api/projects/search/', { params: { q: query } });
  },

  // Gestion des projets
  createProject: (data: ProjectCreateData) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) return;
      
      if (key === 'images' && Array.isArray(value)) {
        value.forEach((file) => {
          formData.append('images', file);
        });
      } else if (key === 'documents' && Array.isArray(value)) {
        value.forEach((file) => {
          formData.append('documents', file);
        });
      } else if (key === 'tags' && Array.isArray(value)) {
        formData.append('tags', JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    
    return apiClient.post('/api/projects/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateProject: (id: number | string, data: ProjectUpdateData) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) return;
      
      if (key === 'tags' && Array.isArray(value)) {
        formData.append('tags', JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    
    return apiClient.patch(`/api/projects/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteProject: (id: number | string) => {
    return apiClient.delete(`/api/projects/${id}/`);
  },

  // Images et documents
  addProjectImage: (projectId: number | string, image: File) => {
    const formData = new FormData();
    formData.append('image', image);
    
    return apiClient.post(`/api/projects/${projectId}/images/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteProjectImage: (projectId: number | string, imageId: number | string) => {
    return apiClient.delete(`/api/projects/${projectId}/images/${imageId}/`);
  },

  addProjectDocument: (projectId: number | string, document: File, title: string) => {
    const formData = new FormData();
    formData.append('document', document);
    formData.append('title', title);
    
    return apiClient.post(`/api/projects/${projectId}/documents/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteProjectDocument: (projectId: number | string, documentId: number | string) => {
    return apiClient.delete(`/api/projects/${projectId}/documents/${documentId}/`);
  },

  // Projets de l'utilisateur
  getUserProjects: () => {
    return apiClient.get('/api/projects/my-projects/');
  },

  // Statistiques du projet
  getProjectStats: (projectId: number | string) => {
    return apiClient.get(`/api/projects/${projectId}/stats/`);
  },
};

export default projectsService;
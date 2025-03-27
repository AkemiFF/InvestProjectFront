// services/subscriptions-service.ts
import { apiClient } from './api-client';
import type { 
  SubscriptionCreateData, 
  ProjectBoostData 
} from '@/types/subscriptions';

const subscriptionsService = {
  // Plans d'abonnement
  getSubscriptionPlans: () => {
    return apiClient.get('/api/plans/');
  },

  getPlansByType: (type: string) => {
    return apiClient.get(`/api/plans/by_type/?type=${type}`);
  },

  // Abonnements
  getUserSubscriptions: () => {
    return apiClient.get('/api/subscriptions/');
  },

  getCurrentSubscription: () => {
    return apiClient.get('/api/subscriptions/current/');
  },

  getSubscriptionHistory: () => {
    return apiClient.get('/api/subscriptions/history/');
  },

  getSubscriptionStatus: () => {
    return apiClient.get('/api/subscriptions/status/');
  },

  // Gestion des abonnements
  subscribe: (data: SubscriptionCreateData) => {
    return apiClient.post('/api/subscriptions/subscribe/', data);
  },

  cancelSubscription: (subscriptionId: number | string) => {
    return apiClient.post(`/api/subscriptions/${subscriptionId}/cancel/`);
  },

  renewSubscription: (subscriptionId: number | string, autoRenew: boolean = false) => {
    return apiClient.post(`/api/subscriptions/${subscriptionId}/renew/`, {
      auto_renew: autoRenew,
    });
  },

  // Boosts de projets
  getProjectBoosts: () => {
    return apiClient.get('/api/boosts/');
  },

  getActiveBoosts: () => {
    return apiClient.get('/api/boosts/active/');
  },

  getBoostHistory: () => {
    return apiClient.get('/api/boosts/history/');
  },

  getProjectBoostsByProject: (projectId: number | string) => {
    return apiClient.get(`/api/boosts/project_boosts/?project_id=${projectId}`);
  },

  boostProject: (data: ProjectBoostData) => {
    return apiClient.post('/api/boosts/boost_project/', data);
  },

  cancelBoost: (boostId: number | string) => {
    return apiClient.post(`/api/boosts/${boostId}/cancel/`);
  },
};

export default subscriptionsService;
// services/investments-service.ts
import { apiClient } from './api-client';
import type { 
  InvestmentCreateData, 
  DepositData, 
  WithdrawData 
} from '@/types/investments';

const investmentsService = {
  // Récupération des investissements
  getUserInvestments: () => {
    return apiClient.get('/api/investments/');
  },

  getInvestmentById: (investmentId: number | string) => {
    return apiClient.get(`/api/investments/${investmentId}/`);
  },

  getProjectInvestments: (projectId: number | string) => {
    return apiClient.get(`/api/investments/project/${projectId}/`);
  },

  // Création et gestion des investissements
  createInvestment: (data: InvestmentCreateData) => {
    return apiClient.post('/api/investments/', data);
  },

  cancelInvestment: (investmentId: number | string) => {
    return apiClient.post(`/api/investments/${investmentId}/cancel/`);
  },

  confirmInvestment: (investmentId: number | string, transactionId: string) => {
    return apiClient.post(`/api/investments/${investmentId}/confirm/`, {
      transaction_id: transactionId,
    });
  },

  // Transactions
  getTransactions: () => {
    return apiClient.get('/api/investments/transactions/');
  },

  depositFunds: (data: DepositData) => {
    return apiClient.post('/api/investments/deposit/', data);
  },

  withdrawFunds: (data: WithdrawData) => {
    return apiClient.post('/api/investments/withdraw/', data);
  },

  // Statistiques
  getInvestmentStats: () => {
    return apiClient.get('/api/investments/stats/');
  },

  getWalletBalance: () => {
    return apiClient.get('/api/investments/wallet-balance/');
  },
};

export default investmentsService;
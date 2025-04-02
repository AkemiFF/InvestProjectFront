// services/payments-service.ts
import { apiClient } from './api-client';
import type { 
  PaymentMethodData, 
  PaymentProcessData 
} from '@/types/payments';

const paymentsService = {
  // Méthodes de paiement
  getPaymentMethods: () => {
    return apiClient.get('/api/payments/methods/');
  },

  getDefaultPaymentMethod: () => {
    return apiClient.get('/api/payments/methods/default/');
  },

  addPaymentMethod: (data: PaymentMethodData) => {
    return apiClient.post('/api/payments/methods/', data);
  },

  updatePaymentMethod: (methodId: number | string, data: Partial<PaymentMethodData>) => {
    return apiClient.patch(`/api/payments/methods/${methodId}/`, data);
  },

  deletePaymentMethod: (methodId: number | string) => {
    return apiClient.delete(`/api/payments/methods/${methodId}/`);
  },

  setDefaultPaymentMethod: (methodId: number | string) => {
    return apiClient.post(`/api/payments/methods/${methodId}/set_default/`);
  },

  // Factures
  getInvoices: () => {
    return apiClient.get('/api/payments/invoices/');
  },

  getInvoiceById: (invoiceId: number | string) => {
    return apiClient.get(`/api/payments/invoices/${invoiceId}/`);
  },

  getPendingInvoices: () => {
    return apiClient.get('/api/payments/invoices/pending/');
  },

  getPaidInvoices: () => {
    return apiClient.get('/api/payments/invoices/paid/');
  },

  getInvoiceReceipt: (invoiceId: number | string) => {
    return apiClient.get(`/api/payments/invoices/${invoiceId}/receipt/`);
  },

  // Traitement des paiements
  processPayment: (data: PaymentProcessData) => {
    return apiClient.post('/api/payments/process/process_payment/', data);
  },

  // Transactions
  getTransactionHistory: () => {
    return apiClient.get('/api/payments/process/transactions/');
  },
};

export default paymentsService;
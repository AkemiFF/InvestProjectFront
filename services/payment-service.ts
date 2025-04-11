import { apiClient } from "@/lib/api-client"
import type { ApiResponse } from "@/types/base"

export interface StripePaymentIntent {
  id: string
  client_secret: string
  amount: number
  currency: string
  status: string
  payment_method_types: string[]
}

export interface StripePaymentSession {
  id: string
  url: string
  payment_intent_id: string
  amount: number
  currency: string
  status: string
}

export interface PaymentMethodResponse {
  id: string
  type: string
  card?: {
    brand: string
    last4: string
    exp_month: number
    exp_year: number
  }
}

export const paymentService = {
  // Créer une intention de paiement Stripe
  createPaymentIntent: async (amount: number, currency = "mga", metadata: Record<string, string> = {}) => {
    const { data } = await apiClient.post<ApiResponse<StripePaymentIntent>>("/api/payments/create-intent/", {
      amount,
      currency,
      metadata,
    })
    return data.data
  },

  // Créer une session de paiement Stripe Checkout
  createCheckoutSession: async (
    amount: number,
    currency = "mga",
    metadata: Record<string, string> = {},
    successUrl: string,
    cancelUrl: string,
  ) => {
    const { data } = await apiClient.post<ApiResponse<StripePaymentSession>>("/api/payments/create-checkout-session/", {
      amount,
      currency,
      metadata,
      success_url: successUrl,
      cancel_url: cancelUrl,
    })
    return data.data
  },
  checkSessionStatus: async (sessionId: string) => {
    const { data } = await apiClient.get<ApiResponse<StripePaymentSession>>(`/api/payments/session-status/${sessionId}/`)
    return data.data
  },

  // Confirmer un paiement
  confirmPayment: async (paymentIntentId: string) => {
    const { data } = await apiClient.post<ApiResponse<{ success: boolean }>>(`/api/payments/confirm/${paymentIntentId}/`)
    return data.data
  },

  // Vérifier le statut d'un paiement
  checkPaymentStatus: async (paymentIntentId: string) => {
    const { data } = await apiClient.get<ApiResponse<StripePaymentIntent>>(`/api/payments/status/${paymentIntentId}/`)
    return data.data
  },

  // Récupérer les méthodes de paiement enregistrées
  getSavedPaymentMethods: async () => {
    const { data } = await apiClient.get<ApiResponse<PaymentMethodResponse[]>>("/api/payments/methods/")
    return data.data
  },

  // Enregistrer une nouvelle méthode de paiement
  savePaymentMethod: async (paymentMethodId: string) => {
    const { data } = await apiClient.post<ApiResponse<PaymentMethodResponse>>("/api/payments/methods/save/", {
      payment_method_id: paymentMethodId,
    })
    return data.data
  },

  // Supprimer une méthode de paiement
  deletePaymentMethod: async (paymentMethodId: string) => {
    const { data } = await apiClient.delete<ApiResponse<{ success: boolean }>>(`/api/payments/methods/${paymentMethodId}/`)
    return data.data
  },
}

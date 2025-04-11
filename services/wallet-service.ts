import { apiClient } from "@/lib/api-client"

export interface Wallet {
  id: number
  balance: string
  updated_at: string
}

export interface WalletTransaction {
  id: number
  transaction_type: "deposit" | "withdraw" | "investment"
  amount: string
  created_at: string
}

export interface DepositIntent {
  clientSecret: string
  transaction_id: number
}

export interface InvestmentSummary {
  totalInvested: number
  activeInvestments: number
  totalReturns: number
  pendingInvestments: number
  portfolioValue: number
  portfolioGrowth: number
}

export interface Investment {
  id: number
  project: {
    id: number
    title: string
    sector: {
      id: number
      name: string
    }
  }
  amount: number
  status: "pending" | "completed" | "failed" | "refunded"
  payment_method: "wallet" | "card" | "bank"
  created_at: string
  completed_at: string | null
  returns: number | null
  progress: number
  days_left: number
  return_rate: number
}

export interface InvestmentsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Investment[]
}

export interface Transaction {
  id: number
  transaction_type: "deposit" | "withdrawal" | "investment" | "return"
  amount: number
  status: "pending" | "completed" | "failed"
  created_at: string
  project?: {
    id: number
    title: string
  }
}

export interface TransactionsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Transaction[]
}

class WalletService {
  async getWallet(): Promise<Wallet> {
    const response = await apiClient.get("/api/wallet/wallets/my_wallet/")
    return response.data
  }

  async getWalletTransactions(params?: { page?: number; limit?: number }): Promise<WalletTransaction[]> {
    const response = await apiClient.get("/api/wallet/wallets/transactions/", { params })
    return response.data
  }

  async createDepositIntent(amount: number): Promise<DepositIntent> {
    const response = await apiClient.post("/api/wallet/wallets/create_deposit_intent/", { amount })
    return response.data
  }

  async confirmDeposit(paymentIntentId: string): Promise<{ status: string }> {
    const response = await apiClient.post("/api/wallet/wallets/confirm_deposit/", { payment_intent_id: paymentIntentId })
    return response.data
  }

  async getInvestmentSummary(): Promise<InvestmentSummary> {
    const response = await apiClient.get("/api/investments/statistics/")
    return {
      totalInvested: response.data.total_invested || 0,
      activeInvestments: response.data.projects_supported || 0,
      totalReturns: response.data.total_returns || 0,
      pendingInvestments: response.data.pending_investments || 0,
      portfolioValue: response.data.total_invested + response.data.total_returns || 0,
      portfolioGrowth: response.data.portfolio_growth || 0,
    }
  }

  async getInvestments(params?: { page?: number; limit?: number; status?: string }): Promise<InvestmentsResponse> {
    const response = await apiClient.get("/api/investments/my_investments/", { params })
    return response.data
  }

  async getTransactions(params?: { page?: number; limit?: number; type?: string }): Promise<TransactionsResponse> {
    const response = await apiClient.get("/api/wallet/wallets/transactions/", { params })
    return response.data
  }
}

export const walletService = new WalletService()

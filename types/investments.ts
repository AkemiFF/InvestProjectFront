// types/investments.ts
export interface Investment {
  id: number;
  user: number;
  project: number;
  project_title: string;
  project_thumbnail?: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  transaction_id?: string;
  message?: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  user: number;
  type: 'deposit' | 'withdrawal' | 'investment' | 'refund';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  payment_method?: string;
  transaction_id?: string;
  description?: string;
  created_at: string;
}

export interface InvestmentCreateData {
  project_id: number;
  amount: number;
  payment_method_id?: number;
  message?: string;
}

export interface InvestmentStats {
  total_invested: number;
  active_investments: number;
  completed_investments: number;
  total_returns: number;
  investment_history: Array<{
    date: string;
    amount: number;
  }>;
  investments_by_category: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

export interface WalletBalance {
  available_balance: number;
  pending_balance: number;
  total_balance: number;
}

export interface DepositData {
  amount: number;
  payment_method_id: number;
}

export interface WithdrawData {
  amount: number;
  bank_account_id: number;
}
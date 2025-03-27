// types/payments.ts
export interface PaymentMethod {
  id: number;
  user: number;
  method_type: 'credit_card' | 'bank_account' | 'paypal' | 'other';
  provider: string;
  account_number: string;
  expiry_date?: string;
  is_default: boolean;
  created_at: string;
}

export interface Invoice {
  id: number;
  user: number;
  amount: number;
  description: string;
  status: 'pending' | 'paid' | 'cancelled';
  due_date: string;
  paid_date?: string;
  payment_method?: number;
  transaction_id?: string;
  created_at: string;
}

export interface PaymentMethodData {
  method_type: string;
  provider: string;
  account_number: string;
  expiry_date?: string;
  is_default?: boolean;
}

export interface PaymentProcessData {
  payment_method_id: number;
  invoice_id: number;
}
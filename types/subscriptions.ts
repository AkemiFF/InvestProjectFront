// types/subscriptions.ts
export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  billing_cycle: 'monthly' | 'quarterly' | 'annually';
  features: string[];
  is_active: boolean;
  plan_type: 'investor' | 'project_owner';
  created_at: string;
}

export interface Subscription {
  id: number;
  user: number;
  plan: number;
  plan_name: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled';
  auto_renew: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectBoost {
  id: number;
  user: number;
  project: number;
  project_title: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled';
  created_at: string;
}

export interface SubscriptionCreateData {
  plan_id: number;
  auto_renew: boolean;
}

export interface ProjectBoostData {
  project_id: number;
  days: number;
}
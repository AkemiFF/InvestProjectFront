// types/users.ts
export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  profile_picture?: string;
  date_joined: string;
  is_active: boolean;
  is_verified: boolean;
  is_investor: boolean;
  is_project_owner: boolean;
}

export interface ProfileUpdateData {
  first_name?: string;
  last_name?: string;
  bio?: string;
  phone_number?: string;
  address?: string;
  profile_picture?: File;
}

export interface InvestorProfile {
  id: number;
  user: number;
  investment_preferences: string[];
  risk_tolerance: string;
  investment_goals: string[];
  total_invested: number;
  active_investments: number;
  verified_investor: boolean;
}

export interface ProjectOwnerProfile {
  id: number;
  user: number;
  company_name?: string;
  company_description?: string;
  company_website?: string;
  company_logo?: string;
  verified_owner: boolean;
  total_projects: number;
  active_projects: number;
  total_raised: number;
}

export interface InvestorProfileUpdateData {
  investment_preferences?: string[];
  risk_tolerance?: string;
  investment_goals?: string[];
}

export interface ProjectOwnerProfileUpdateData {
  company_name?: string;
  company_description?: string;
  company_website?: string;
  company_logo?: File;
}
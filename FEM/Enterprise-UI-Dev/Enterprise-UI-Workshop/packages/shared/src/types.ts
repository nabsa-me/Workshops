export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface SummaryStats {
  totalUsers: number;
  activeToday: number;
  revenue: number;
  conversionRate: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface TableRow {
  id: string;
  user: string;
  email: string;
  action: string;
  timestamp: string;
  duration: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface OrgSettings {
  name: string;
  plan: "free" | "pro" | "enterprise";
  features: string[];
}

export type TimeRange = "7d" | "30d" | "90d";

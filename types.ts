export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  company: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface KPI {
  label: string;
  value: string;
  trend: number; // positive or negative percentage
  icon: React.ComponentType<{ className?: string }>;
}
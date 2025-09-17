export type DashboardStats = {
  earnings_today: number;
  pending_orders: number;
  accepted_orders: number;
  rejected_orders: number;
};

export type KpiSummary = {
  accepted_orders: number;
  rejected_orders: number;
  revenue: number;
  lost_revenue: number;
};

export type StatRange = "7d" | "14d" | "30d" | "all";

export type Kpi =
  | "accepted_orders"
  | "revenue"
  | "rejected_orders"
  | "lost_revenue";

export type PaymentMethodFilter = "cash" | "all";

export type Stat = {
  period: string;
  value: number;
  total: number;
  year: number;
};

export type StatsWithFilters = {
  stats: Stat[];
  filters: {
    years: number[];
  };
};

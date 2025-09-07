export type DashboardStat = {
  earnings_today: number;
  accepted_orders: number;
  rejected_orders: number;
};

export type StatRange = "7d" | "14d" | "30d" | "all";

export type Kpi =
  | "accepted_orders"
  | "revenue"
  | "rejected_orders"
  | "lost_revenue";

export type PaymentMethodFilter = "cash" | "all";

import { baseOffsetPaginationDefaults } from "@/lib/query-defaults";

export const dashboardStatsDefaults = {
  earnings_today: 0,
  pending_orders: 0,
  accepted_orders: 0,
  rejected_orders: 0,
};

export const kpiSummaryDefaults = {
  accepted_orders: 0,
  rejected_orders: 0,
  revenue: 0,
  lost_revenue: 0,
};

export const statsDefaults = {
  stats: [],
  filters: {
    years: [],
  },
};

const menuItemsDefaults = baseOffsetPaginationDefaults;

export const menuDefaults = [
  {
    id: "",
    restaurant_id: "",
    name: "",
    description: "",
    order: 0,
    created_at: "",
    updated_at: "",
    menu_items: menuItemsDefaults,
  },
];

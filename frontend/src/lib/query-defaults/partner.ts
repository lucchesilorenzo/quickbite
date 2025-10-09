import { baseOffsetPaginationDefaults } from "./shared";

export const partnerRestaurantDashboardStatsDefaults = {
  earnings_today: 0,
  pending_orders: 0,
  accepted_orders: 0,
  rejected_orders: 0,
};

export const partnerRestaurantKpiSummaryDefaults = {
  accepted_orders: 0,
  rejected_orders: 0,
  revenue: 0,
  lost_revenue: 0,
};

export const partnerRestaurantStatsDefaults = {
  stats: [],
  filters: {
    years: [],
  },
};

export const partnerOrdersDefaults = baseOffsetPaginationDefaults;

const partnerMenuItemsDefaults = baseOffsetPaginationDefaults;

export const partnerMenuDefaults = [
  {
    id: "",
    restaurant_id: "",
    name: "",
    description: "",
    order: 0,
    created_at: "",
    updated_at: "",
    menu_items: partnerMenuItemsDefaults,
  },
];

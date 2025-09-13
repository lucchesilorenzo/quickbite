export const partnerRestaurantsDefaults = {
  pageParams: [],
  pages: [
    {
      restaurants: {
        data: [],
        path: "",
        per_page: 0,
        next_cursor: null,
        next_page_url: null,
        prev_cursor: null,
        prev_page_url: null,
      },
      meta: {
        total: 0,
        mov_counts: {
          all: 0,
          "1000": 0,
          "1500": 0,
        },
        offer_counts: {
          with_discounts: 0,
        },
      },
    },
  ],
};

export const partnerRestaurantDashboardStatsDefaults = {
  earnings_today: 0,
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

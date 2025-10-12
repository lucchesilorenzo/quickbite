export const baseOffsetPaginationDefaults = {
  current_page: 1,
  data: [],
  first_page_url: "",
  from: null,
  last_page: 1,
  last_page_url: "",
  links: [],
  next_page_url: null,
  path: "",
  per_page: 15,
  prev_page_url: null,
  to: null,
  total: 0,
};

export const restaurantsDefaults = {
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

export const userNotificationsDefaults = {
  notifications: baseOffsetPaginationDefaults,
  unread_count: 0,
};

export const offersDefaults = baseOffsetPaginationDefaults;

export const reviewsDefaults = {
  reviews: baseOffsetPaginationDefaults,
  avg_rating: 0,
  count: 0,
};

export const deliverySlotsDefaults = {
  is_asap_available: false,
  delivery_slots: [],
};

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

export const restaurantDefaults = {
  id: "",
  name: "",
  slug: "",
  description: "",
  street_address: "",
  building_number: "",
  postcode: "",
  city: "",
  state: "",
  country: "",
  latitude: 0,
  longitude: 0,
  phone_number: "",
  email: "",
  min_amount: 0,
  delivery_fee: 0,
  service_fee: 0,
  min_delivery_time: 0,
  max_delivery_time: 0,
  logo: "",
  cover: "",
  is_approved: false,
  force_close: false,
  created_at: "",
  updated_at: "",
  full_address: "",
  is_open: false,
  categories: [],
  delivery_days: [],
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

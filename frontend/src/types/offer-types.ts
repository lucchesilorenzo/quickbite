export type Offer = {
  id: string;
  restaurant_id: string;
  discount_rate: number;
  min_discount_amount: number;
  created_at: string;
  updated_at: string;
};

export type OfferWithPagination = {
  current_page: number;
  data: Offer[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

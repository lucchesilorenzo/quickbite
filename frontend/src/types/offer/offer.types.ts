import { BaseOffsetPagination } from "../pagination.types";

export type Offer = {
  id: string;
  restaurant_id: string;
  discount_rate: number;
  min_discount_amount: number;
  created_at: string;
  updated_at: string;
};

export type OfferWithPagination = BaseOffsetPagination & {
  data: Offer[];
};

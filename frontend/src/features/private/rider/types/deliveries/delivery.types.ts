export type Delivery = {
  id: string;
  order_id: string;
  rider_id: string;
  rider_first_name: string;
  rider_last_name: string;
  rider_phone_number: string;
  delivered_at: string | null;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
};

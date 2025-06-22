export type Order = {
  id: string;
  user_id: string;
  restaurant_id: string;
  order_code: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  street_address: string;
  building_number: string;
  postcode: string;
  city: string;
  country: string;
  delivery_time: string;
  notes: string;
  payment_method: string;
  order_items: OrderItem[];
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
};

export type PersonalInfo = Pick<
  Order,
  "first_name" | "last_name" | "phone_number"
>;

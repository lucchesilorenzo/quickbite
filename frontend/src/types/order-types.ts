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
  delivery_time: string;
  notes?: string;
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
  item_total: number;
  created_at: string;
  updated_at: string;
};

export type CreateOrderItem = Omit<
  OrderItem,
  "id" | "created_at" | "updated_at" | "order_id"
>;

export type CreateOrder = Omit<
  Order,
  "id" | "order_code" | "created_at" | "updated_at" | "user_id" | "order_items"
> & {
  order_items: CreateOrderItem[];
};

export type PersonalInfo = Pick<
  Order,
  "first_name" | "last_name" | "phone_number"
>;

export type AddressInfo = Pick<
  Order,
  "street_address" | "building_number" | "postcode" | "city"
>;

export type DeliveryTime = Pick<Order, "delivery_time">;

export type OrderNotes = Pick<Order, "notes">;

export type PaymentMethod = Pick<Order, "payment_method">;

export type CheckoutData = {
  personal_info: PersonalInfo;
  address_info: AddressInfo;
  delivery_time: DeliveryTime | null;
  order_notes: OrderNotes | null;
  payment_method: PaymentMethod | null;
};

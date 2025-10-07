import { BaseOffsetPagination } from "./pagination-types";
import { RestaurantBase } from "./restaurant-types";
import { Review } from "./review-types";

export type Order = {
  id: string;
  restaurant: RestaurantBase & {
    reviews: Review[];
  };
  user_id: string | null;
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
  notes: string | null;
  payment_method: string;
  order_items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  service_fee: number;
  discount_rate: number;
  discount: number;
  total: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export type OrderWithPagination = BaseOffsetPagination & {
  data: Order[];
};

export type OrderStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "preparing"
  | "delivering"
  | "delivered"
  | "cancelled";

export type OrderStatusWithAll = OrderStatus | "all";

export type OrderItem = {
  id: string;
  order_id: string;
  menu_item_id: string;
  name: string;
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
  | "id"
  | "status"
  | "order_code"
  | "created_at"
  | "updated_at"
  | "user_id"
  | "order_items"
  | "restaurant"
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

export type CheckoutData = {
  [restaurantId: string]: {
    personal_info: PersonalInfo;
    address_info: AddressInfo;
    delivery_time: {
      type: "asap" | "schedule" | null;
      value: string;
    };
    notes: string | null;
    payment_method: string | null;
  };
};

// === PARTNER ===

export type PartnerOrder = Omit<Order, "restaurant"> & {
  restaurant: Omit<Order["restaurant"], "reviews">;
};

export type PartnerOrderStatus = Omit<OrderStatus, "pending" | "delivered">;

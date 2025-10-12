import { OrderItem } from "@private/types/order-types";
import { Order } from "@private/types/order-types";

type CreateOrderItem = Omit<
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
  | "country"
> & {
  order_items: CreateOrderItem[];
};

export type PersonalInfo = Pick<
  Order,
  "first_name" | "last_name" | "phone_number"
>;

export type AddressInfo = Pick<
  Order,
  "street_address" | "building_number" | "postcode" | "city" | "state"
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

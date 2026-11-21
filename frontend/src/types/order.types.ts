import { CreateOrderRequest, OrderStatus, PaymentMethod } from "@/api/models";

export type OrderStatusWithAll = OrderStatus | "all";

export type CheckoutData = {
  [restaurantId: string]: {
    personal_info: Pick<
      CreateOrderRequest,
      "first_name" | "last_name" | "phone_number"
    >;
    address_info: Pick<
      CreateOrderRequest,
      "street_address" | "building_number" | "postcode" | "city" | "state"
    >;
    delivery_time: {
      type: "asap" | "schedule" | null;
      value: string;
    };
    notes: string | null;
    payment_method: PaymentMethod | null;
  };
};

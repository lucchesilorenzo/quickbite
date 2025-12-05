import { useCheckout } from "@customer/contexts/CheckoutProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import {
  CreateOrderPayload,
  CreateOrderResponse,
} from "../../types/order/order.api.types";

import { useMultiCart } from "@/contexts/MultiCartProvider";
import { postData } from "@/lib/api-client";

type UseCreateOrderOptions = {
  restaurantId: string;
};

export function useCreateOrder({ restaurantId }: UseCreateOrderOptions) {
  const { emptyCart } = useMultiCart();
  const { emptyCheckoutData } = useCheckout();

  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<CreateOrderResponse, Error, CreateOrderPayload>({
    mutationFn: (data) => postData("/customer/orders", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-orders"] });
      emptyCart(restaurantId);
      emptyCheckoutData(restaurantId);
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "customer-create-order-error",
        severity: "error",
      });
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { useCheckout } from "@/hooks/contexts/useCheckout";
import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { postData } from "@/lib/api-client";
import { CreateOrder } from "@/types/order-types";

export function useCreateOrder(restaurantId: string) {
  const { emptyCart } = useMultiCart();
  const { emptyCheckoutData } = useCheckout();

  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: CreateOrder) => postData("/orders", data),
    onSuccess: () => {
      emptyCart(restaurantId);
      emptyCheckoutData(restaurantId);
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "create-order-error",
        severity: "error",
      });
    },
  });
}

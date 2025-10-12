import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { useCheckout } from "@/contexts/private/customer/CheckoutProvider";
import { useMultiCart } from "@/contexts/public/MultiCartProvider";
import { postData } from "@/lib/api-client";
import { CreateOrder } from "@/types/order-types";

export function useCreateOrder(restaurantId: string) {
  const queryClient = useQueryClient();
  const { emptyCart } = useMultiCart();
  const { emptyCheckoutData } = useCheckout();

  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: CreateOrder) => postData("/customer/orders", data),
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

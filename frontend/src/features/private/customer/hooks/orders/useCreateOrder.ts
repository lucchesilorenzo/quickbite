import { useCheckout } from "@customer/contexts/CheckoutProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { useMultiCart } from "@/contexts/MultiCartProvider";
import { CreateOrder } from "@/features/private/customer/types/order.types";
import { postData } from "@/lib/api-client";

export function useCreateOrder(restaurantId: string) {
  const { emptyCart } = useMultiCart();
  const { emptyCheckoutData } = useCheckout();

  const queryClient = useQueryClient();
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

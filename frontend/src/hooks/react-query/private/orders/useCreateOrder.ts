import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { useCheckout } from "@/hooks/contexts/useCheckout";
import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { postData } from "@/lib/api-client";
import { CreateOrder } from "@/types/order-types";

export function useCreateOrder(restaurantId: string) {
  const { emptyCart } = useMultiCart();
  const { emptyCheckoutData } = useCheckout();

  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateOrder) => postData("/orders", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate("/checkout/success");
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

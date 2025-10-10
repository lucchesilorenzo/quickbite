import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { TAddReviewFormSchema } from "@/validations/private/customer/review-validations";

export function useCreateReview(restaurantSlug: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TAddReviewFormSchema & { order_id: string }) =>
      postData(`/customer/restaurants/${restaurantSlug}/reviews`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["customer-orders"] });

      notifications.show(response.message, {
        key: "customer-create-review-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "customer-create-review-error",
        severity: "error",
      });
    },
  });
}

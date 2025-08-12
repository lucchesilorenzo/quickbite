import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { TReviewFormSchema } from "@/validations/review-validations";

export function useCreateReview(restaurantSlug: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TReviewFormSchema & { order_id: string }) =>
      postData(`/restaurants/${restaurantSlug}/reviews`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      notifications.show(response.message, {
        key: "create-review-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "create-review-error",
        severity: "error",
      });
    },
  });
}

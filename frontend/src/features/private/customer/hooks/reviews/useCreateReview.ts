import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import {
  CreateReviewPayload,
  CreateReviewResponse,
} from "../../types/reviews/review.api.types";

import { postData } from "@/lib/api-client";

type UseCreateReviewOptions = {
  restaurantSlug: string;
  setOpenAddReviewDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useCreateReview({
  restaurantSlug,
  setOpenAddReviewDialog,
}: UseCreateReviewOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<CreateReviewResponse, Error, CreateReviewPayload>({
    mutationFn: (data) =>
      postData(`/customer/restaurants/${restaurantSlug}/reviews`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["customer-orders"] });

      setOpenAddReviewDialog(false);

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

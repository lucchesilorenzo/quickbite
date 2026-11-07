import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getCustomerReviews } from "@/api/endpoints/customer-reviews/customer-reviews";
import { CreateCustomerReview201, CreateReviewRequest } from "@/api/models";
import api from "@/lib/api-client";

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

  return useMutation<CreateCustomerReview201, Error, CreateReviewRequest>({
    mutationFn: async (data) => {
      const response = await getCustomerReviews(api).createCustomerReview(
        restaurantSlug,
        data,
      );

      return response.data;
    },
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

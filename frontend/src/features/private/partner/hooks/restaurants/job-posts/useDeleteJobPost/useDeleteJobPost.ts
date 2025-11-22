import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";

export function useDeleteJobPost(
  restaurantId: string,
  jobPostId: string | null,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: () =>
      deleteData(`/partner/restaurants/${restaurantId}/job-posts/${jobPostId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-job-posts", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-delete-job-post-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-delete-job-post-error",
        severity: "error",
      });
    },
  });
}

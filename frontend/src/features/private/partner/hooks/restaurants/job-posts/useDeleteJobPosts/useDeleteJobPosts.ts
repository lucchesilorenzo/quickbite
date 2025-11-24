import { GridRowId } from "@mui/x-data-grid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";

export function useDeleteJobPosts(
  restaurantId: string,
  jobPostIds?: Set<GridRowId>,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<ApiResponse>({
    mutationFn: () => {
      const params = new URLSearchParams();

      jobPostIds?.forEach((id) => params.append("ids[]", id.toString()));

      return deleteData(
        `/partner/restaurants/${restaurantId}/job-posts?${params.toString()}`,
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-job-posts", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-delete-job-posts-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-delete-job-posts-error",
        severity: "error",
      });
    },
  });
}

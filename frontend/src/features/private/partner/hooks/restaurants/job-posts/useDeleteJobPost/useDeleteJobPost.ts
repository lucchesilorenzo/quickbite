import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-types";

type UseDeleteJobPostOptions = {
  restaurantId: string;
  jobPostId: string | null;
  setOpenDeleteJobPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useDeleteJobPost({
  restaurantId,
  jobPostId,
  setOpenDeleteJobPostDialog,
}: UseDeleteJobPostOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<ApiResponse>({
    mutationFn: () =>
      deleteData(`/partner/restaurants/${restaurantId}/job-posts/${jobPostId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-job-posts", restaurantId],
      });

      setOpenDeleteJobPostDialog(false);

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

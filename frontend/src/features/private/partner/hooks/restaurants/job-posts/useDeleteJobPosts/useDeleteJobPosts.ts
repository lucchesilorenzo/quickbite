import { GridRowId } from "@mui/x-data-grid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerJobPosts } from "@/api/endpoints/partner-job-posts/partner-job-posts";
import {
  DeletePartnerJobPosts200,
  DeletePartnerJobPostsParams,
} from "@/api/models";
import api from "@/lib/api-client";

type UseDeleteJobPostsOptions = {
  restaurantId: string;
  jobPostIds?: Set<GridRowId>;
  setOpenDeleteJobPostsDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useDeleteJobPosts({
  restaurantId,
  jobPostIds,
  setOpenDeleteJobPostsDialog,
}: UseDeleteJobPostsOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<DeletePartnerJobPosts200, Error, void>({
    mutationFn: async () => {
      const params: DeletePartnerJobPostsParams = {
        "ids[]": Array.from(jobPostIds ?? []).map((id) => id.toString()),
      };

      const response = await getPartnerJobPosts(api).deletePartnerJobPosts(
        restaurantId,
        params,
      );

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-job-posts", restaurantId],
      });

      setOpenDeleteJobPostsDialog(false);

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

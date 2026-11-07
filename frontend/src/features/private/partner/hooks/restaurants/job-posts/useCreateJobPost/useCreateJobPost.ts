import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerJobPosts } from "@/api/endpoints/partner-job-posts/partner-job-posts";
import { CreateJobPostRequest, CreatePartnerJobPost201 } from "@/api/models";
import api from "@/lib/api-client";

type UseCreateJobPostOptions = {
  restaurantId: string;
  setOpenAddJobPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useCreateJobPost({
  restaurantId,
  setOpenAddJobPostDialog,
}: UseCreateJobPostOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<CreatePartnerJobPost201, Error, CreateJobPostRequest>({
    mutationFn: async (data) => {
      const response = await getPartnerJobPosts(api).createPartnerJobPost(
        restaurantId,
        data,
      );

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-job-posts", restaurantId],
      });

      setOpenAddJobPostDialog(false);

      notifications.show(response.message, {
        key: "partner-create-job-post-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-create-job-post-error",
        severity: "error",
      });
    },
  });
}

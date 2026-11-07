import { useQuery } from "@tanstack/react-query";

import { getPartnerJobPosts } from "@/api/endpoints/partner-job-posts/partner-job-posts";
import { GetPartnerJobPost200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetJobPostOptions = {
  restaurantId: string;
  jobPostId: string | null;
  enabled: boolean;
};

export function useGetJobPost({
  restaurantId,
  jobPostId,
  enabled,
}: UseGetJobPostOptions) {
  return useQuery<GetPartnerJobPost200>({
    queryKey: ["partner-job-posts", restaurantId, jobPostId],
    queryFn: async () => {
      const response = await getPartnerJobPosts(api).getPartnerJobPost(
        restaurantId,
        jobPostId ?? "",
      );

      return response.data;
    },
    enabled: enabled && !!restaurantId && !!jobPostId,
  });
}

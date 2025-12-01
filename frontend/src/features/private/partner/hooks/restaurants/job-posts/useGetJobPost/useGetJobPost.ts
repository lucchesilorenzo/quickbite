import { GetJobPostResponse } from "@partner/types/job-posts/job-posts.api-types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

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
  return useQuery<GetJobPostResponse>({
    queryKey: ["partner-job-posts", restaurantId, jobPostId],
    queryFn: () =>
      fetchData(`/partner/restaurants/${restaurantId}/job-posts/${jobPostId}`),
    enabled: enabled && !!restaurantId && !!jobPostId,
  });
}

import { GetJobPostsResponse } from "@partner/types/job-posts/job-posts.api-types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export function useGetJobPosts(
  restaurantId: string,
  page: number = 1,
  pageSize: number,
) {
  return useQuery<GetJobPostsResponse>({
    queryKey: ["partner-job-posts", restaurantId, page, pageSize],
    queryFn: () =>
      fetchData(
        `/partner/restaurants/${restaurantId}/job-posts?page=${page}&page_size=${pageSize}`,
      ),
  });
}

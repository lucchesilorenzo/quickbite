import { JobPost } from "@private/shared/types/job-posts/job-post.types";

import { BaseOffsetPagination } from "@/types/pagination.types";
import { BaseRestaurant } from "@/types/restaurants/restaurant.types";

export type JobPostWithRestaurant = JobPost & {
  restaurant: BaseRestaurant;
};

export type JobPostsWithRestaurantAndPagination = BaseOffsetPagination & {
  data: JobPostWithRestaurant[];
};

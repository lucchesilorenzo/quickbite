import {
  EmploymentTypeWithAll,
  JobPost,
} from "@private/shared/types/job-posts/job-post.types";

import { BaseCursorPagination } from "@/types/pagination.types";
import { BaseRestaurant } from "@/types/restaurants/restaurant.types";

export type JobPostWithRestaurantAndAlreadyApplied = JobPost & {
  already_applied: boolean;
  restaurant: BaseRestaurant;
};

export type JobPostsWithRestaurantAndPagination = BaseCursorPagination & {
  data: JobPostWithRestaurantAndAlreadyApplied[];
};

export type JobPostFilters = {
  search: string;
  minSalary: number;
  maxSalary: number;
  salaryEnabled: boolean;
  employmentType: EmploymentTypeWithAll;
};

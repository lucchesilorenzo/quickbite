import {
  EmploymentTypeWithAll,
  JobPost,
} from "@private/shared/types/job-posts/job-post.types";

import { BaseCursorPagination } from "@/types/pagination.types";
import { BaseRestaurant } from "@/types/restaurants/restaurant.types";

export type JobPostWithRestaurant = JobPost & {
  restaurant: BaseRestaurant;
};

export type JobPostsWithRestaurantAndPagination = BaseCursorPagination & {
  data: JobPostWithRestaurant[];
};

export type JobPostFilters = {
  search: string;
  minSalary: number;
  maxSalary: number;
  salaryEnabled: boolean;
  employmentType: EmploymentTypeWithAll;
};

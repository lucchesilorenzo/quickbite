import { GetRiderJobPost200, GetRiderJobPosts200 } from "@/api/models";
import { JobPostFilters } from "@/features/private/shared/types/job-posts/job-post.types";
import { JobPostResource } from "@/api/models";
import {
  MAX_SALARY,
  MIN_SALARY,
} from "@/features/private/shared/lib/data/job-posts.data";

export const jobPostFilters: JobPostFilters = {
  search: "",
  minSalary: MIN_SALARY,
  maxSalary: MAX_SALARY,
  employmentType: "all",
  salaryEnabled: false,
};

export const jobPostsWithRestaurant: JobPostResource[] = [
  {
    id: "019b331e-413e-7206-b795-9898150d6b8d",
    restaurant_id: "019b31bb-06cc-7312-ab22-3a53371330a9",
    title: "Frontend Developer",
    description_html:
      '<p style="text-align: left;"><strong>JOB TEST!</strong></p>',
    description_text: "JOB TEST!",
    employment_type: "full_time",
    vehicle_type: "scooter",
    salary: null,
    status: "open",
    already_applied: false,
    created_at: "2025-12-18T20:19:39.000000Z",
    updated_at: "2025-12-18T20:19:39.000000Z",
    restaurant: {
      id: "019b31bb-06cc-7312-ab22-3a53371330a9",
      name: "Test",
      slug: "test-a09f6d0e-a7dc-4f8a-abbd-0399438c8a8b",
      description: "Test",
      street_address: "Via Roma",
      building_number: "1",
      postcode: "00100",
      city: "Roma",
      state: "Lazio",
      country: "Italy",
      latitude: 25.6862004,
      longitude: 13.5753743,
      phone_number: "+39 367 363 6272",
      email: "test@gmail.com",
      min_amount: 1,
      delivery_fee: 0,
      service_fee: 2,
      min_delivery_time: 1,
      max_delivery_time: 10,
      logo: "restaurants/logos/De8ZYNpxIlpsHzUy5fhHhqK0F7DZlyrQwFE1Jkuw.jpg",
      logo_url:
        "/storage/restaurants/logos/De8ZYNpxIlpsHzUy5fhHhqK0F7DZlyrQwFE1Jkuw.jpg",
      cover: "restaurants/covers/ul2tjR5u7AKGNdCl86Ie5IfvOi2WFzzndYudN0Ie.jpg",
      cover_url:
        "/storage/restaurants/covers/ul2tjR5u7AKGNdCl86Ie5IfvOi2WFzzndYudN0Ie.jpg",
      is_approved: true,
      force_close: false,
      created_at: "2025-12-18T13:51:39.000000Z",
      updated_at: "2025-12-18T13:54:33.000000Z",
      full_address: "Via Roma 1, 00100 Roma, Lazio",
      is_open: false,
    },
  },
];

export const jobPostsResponse: GetRiderJobPosts200 = {
  data: jobPostsWithRestaurant,
  links: {
    first: "http://localhost:8000/api/v1/rider/job-posts",
    last: "http://localhost:8000/api/v1/rider/job-posts",
    prev: null,
    next: "http://localhost:8000/api/v1/rider/job-posts?cursor=abc123",
  },
  meta: {
    path: "http://localhost:8000/api/v1/rider/job-posts",
    per_page: 10,
    next_cursor: "abc123",
    prev_cursor: null,
  },
  success: true,
  message: "Job posts retrieved successfully.",
};

export const jobPostResponse: GetRiderJobPost200 = {
  success: true,
  message: "Job post retrieved successfully.",
  data: jobPostsWithRestaurant[0],
};

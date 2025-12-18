import env from "@/lib/env";
import { http, HttpResponse } from "msw";
import { addJobPostFormResponse } from "../data/private/partner/forms/add-job-post";
import { editJobPostFormResponse } from "../data/private/partner/forms/edit-job-post";
import {
  jobPostResponse,
  jobPostsResponse,
} from "../data/private/partner/job-posts";

export const partnerHandlers = [
  http.get(
    `${env.VITE_BASE_URL}/api/partner/restaurants/:restaurantId/job-posts`,
    async ({ request }) => {
      const url = new URL(request.url);
      const pageParam = url.searchParams.get("page");
      const pageSizeParam = url.searchParams.get("page_size");

      if (!pageParam || !pageSizeParam) {
        return HttpResponse.json(null, { status: 400 });
      }

      return HttpResponse.json(jobPostsResponse);
    },
  ),
  http.get(
    `${env.VITE_BASE_URL}/api/partner/restaurants/:restaurantId/job-posts/:jobPostId`,
    async () => {
      return HttpResponse.json(jobPostResponse);
    },
  ),
  http.post(
    `${env.VITE_BASE_URL}/api/partner/restaurants/:restaurantId/job-posts`,
    async () => {
      return HttpResponse.json(addJobPostFormResponse, { status: 201 });
    },
  ),
  http.patch(
    `${env.VITE_BASE_URL}/api/partner/restaurants/:restaurantId/job-posts/:jobPostId`,
    async () => {
      return HttpResponse.json(editJobPostFormResponse);
    },
  ),
  http.delete(
    `${env.VITE_BASE_URL}/api/partner/restaurants/:restaurantId/job-posts`,
    async ({ request }) => {
      const url = new URL(request.url);
      const ids = url.searchParams.getAll("ids[]");

      if (!ids.length) {
        return HttpResponse.json(null, { status: 400 });
      }

      return HttpResponse.json(
        { success: true, message: "Job posts deleted successfully." },
        { status: 200 },
      );
    },
  ),
  http.delete(
    `${env.VITE_BASE_URL}/api/partner/restaurants/:restaurantId/job-posts/:jobPostId`,
    async () => {
      return HttpResponse.json(
        { success: true, message: "Job post deleted successfully." },
        { status: 200 },
      );
    },
  ),
];

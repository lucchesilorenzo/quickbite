import { restaurantLogoResponse } from "@tests/mocks/data/public/restaurants";
import { http, HttpResponse } from "msw";

import env from "@/lib/env";
import { addJobPostFormResponse } from "@tests/mocks/data/private/partner/forms/add-job-post";
import { address } from "@tests/mocks/data/public/addresses";
import { editJobPostFormResponse } from "./data/private/partner/forms/edit-job-post";
import {
  jobPostResponse,
  jobPostsResponse,
} from "./data/private/partner/job-posts";

export const handlers = [
  http.get(
    "https://eu1.locationiq.com/v1/autocomplete",
    async ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get("q");

      if (!query) {
        return new HttpResponse(null, { status: 400 });
      }

      return HttpResponse.json([address]);
    }
  ),
  http.get(
    `${env.VITE_BASE_URL}/api/restaurants/:restaurantId/base64-logo`,
    async () => {
      return HttpResponse.json(restaurantLogoResponse);
    }
  ),
  http.post(`${env.VITE_BASE_URL}/api/rider/auth/register`, async () => {
    return HttpResponse.json(
      {
        token: "4|tRSZ8D9dtm5itClkkNPVIUWwTtUcBvXd27iStUAB7cf1d1ea",
        message: "Rider registered successfully.",
      },
      { status: 201 }
    );
  }),
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
    }
  ),
  http.get(
    `${env.VITE_BASE_URL}/api/partner/restaurants/:restaurantId/job-posts/:jobPostId`,
    async () => {
      return HttpResponse.json(jobPostResponse);
    }
  ),
  http.post(
    `${env.VITE_BASE_URL}/api/partner/restaurants/:restaurantId/job-posts`,
    async () => {
      return HttpResponse.json(addJobPostFormResponse, { status: 201 });
    }
  ),
  http.patch(
    `${env.VITE_BASE_URL}/api/partner/restaurants/:restaurantId/job-posts/:jobPostId`,
    async () => {
      return HttpResponse.json(editJobPostFormResponse);
    }
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
        { message: "Job posts deleted successfully." },
        { status: 200 }
      );
    }
  ),
  http.delete(
    `${env.VITE_BASE_URL}/api/partner/restaurants/:restaurantId/job-posts/:jobPostId`,
    async () => {
      return HttpResponse.json(
        { message: "Job post deleted successfully." },
        { status: 200 }
      );
    }
  ),
];

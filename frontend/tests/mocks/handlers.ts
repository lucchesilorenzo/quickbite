import { http, HttpResponse } from "msw";
import { restaurantLogo } from "tests/mocks/data/restaurants";

import env from "@/lib/env";
import { address } from "tests/mocks/data/addresses";
import { addJobPostFormResponse } from "tests/mocks/data/forms/partner/add-job-post";

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
  http.get(`${env.VITE_BASE_URL}/api/restaurants/:id/base64-logo`, async () => {
    return HttpResponse.json(restaurantLogo);
  }),
  http.post(`${env.VITE_BASE_URL}/api/rider/auth/register`, async () => {
    return HttpResponse.json(
      {
        token: "4|tRSZ8D9dtm5itClkkNPVIUWwTtUcBvXd27iStUAB7cf1d1ea",
        message: "Rider registered successfully.",
      },
      { status: 201 }
    );
  }),
  http.post(
    `${env.VITE_BASE_URL}/api/partner/restaurants/:id/job-posts`,
    async () => {
      return HttpResponse.json(addJobPostFormResponse, { status: 201 });
    }
  ),
];

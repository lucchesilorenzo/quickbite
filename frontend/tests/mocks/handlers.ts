import { http, HttpResponse } from "msw";
import { restaurantLogo } from "tests/mocks/data/restaurants";

import { address } from "tests/mocks/data/addresses";
import env from "@/lib/env";

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
];

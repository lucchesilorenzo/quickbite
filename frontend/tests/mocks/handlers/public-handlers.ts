import env from "@/lib/env";
import { http, HttpResponse } from "msw";
import { address } from "../data/public/addresses";
import { restaurantLogoResponse } from "../data/public/restaurants";

export const publicHandlers = [
  http.get(
    "https://eu1.locationiq.com/v1/autocomplete",
    async ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get("q");

      if (!query) {
        return new HttpResponse(null, { status: 400 });
      }

      return HttpResponse.json([address]);
    },
  ),
  http.get(
    `${env.VITE_BASE_URL}/api/restaurants/:restaurantId/base64-logo`,
    async () => {
      return HttpResponse.json(restaurantLogoResponse);
    },
  ),
];

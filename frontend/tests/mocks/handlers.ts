import { http, HttpResponse } from "msw";
import { restaurantLogo } from "tests/mocks/data/restaurants";

import env from "@/lib/env";
import { address } from "tests/mocks/data/addresses";
import { user } from "tests/mocks/data/users";

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
        ...user,
        date_of_birth: null,
        roles: [{ ...user.roles[0], name: "rider" }],
      },
      { status: 201 }
    );
  }),
];

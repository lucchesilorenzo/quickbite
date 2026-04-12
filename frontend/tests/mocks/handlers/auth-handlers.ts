import env from "@/lib/env";
import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post(`${env.VITE_BACKEND_URL}/api/rider/auth/register`, async () => {
    return HttpResponse.json(
      {
        success: true,
        message: "Rider registered successfully.",
        access_token: "4|tRSZ8D9dtm5itClkkNPVIUWwTtUcBvXd27iStUAB7cf1d1ea",
        refresh_token: "tRSZ8D9dtm5itClkkNPVIUWwTtUcBvXd27iStUAB7cf1d1ea",
      },
      { status: 201 },
    );
  }),
  http.post(`${env.VITE_BACKEND_URL}/api/rider/auth/login`, async () => {
    return HttpResponse.json(
      {
        success: true,
        message: "Rider logged in successfully.",
        access_token: "4|tRSZ8D9dtm5itClkkNPVIUWwTtUcBvXd27iStUAB7cf1d1ea",
        refresh_token: "tRSZ8D9dtm5itClkkNPVIUWwTtUcBvXd27iStUAB7cf1d1ea",
      },
      { status: 200 },
    );
  }),
  http.post(`${env.VITE_BACKEND_URL}/api/rider/auth/logout`, async () => {
    return HttpResponse.json(
      {
        success: true,
        message: "Rider logged out successfully.",
      },
      { status: 200 },
    );
  }),
];

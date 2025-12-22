import env from "@/lib/env";
import { http, HttpResponse } from "msw";
import { jobPostsResponse } from "../data/private/rider/job-posts";

export const riderHandlers = [
  http.get(`${env.VITE_BASE_URL}/api/rider/job-posts`, async ({ request }) => {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get("page");

    if (!pageParam) {
      return HttpResponse.json(null, { status: 400 });
    }

    return HttpResponse.json(jobPostsResponse);
  }),
];

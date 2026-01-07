import env from "@/lib/env";
import { http, HttpResponse } from "msw";
import {
  jobPostResponse,
  jobPostsResponse,
} from "../data/private/rider/job-posts";
import { jobApplicationWizardFormResponse } from "../data/private/rider/forms/job-application-wizard";

export const riderHandlers = [
  http.get(`${env.VITE_BASE_URL}/api/rider/job-posts`, ({ request }) => {
    const url = new URL(request.url);
    const cursorParam = url.searchParams.get("cursor");

    if (!cursorParam) {
      return HttpResponse.json(jobPostsResponse);
    }

    return HttpResponse.json({
      ...jobPostsResponse,
      job_posts: {
        ...jobPostsResponse.job_posts,
        next_cursor: null,
      },
    });
  }),
  http.get(`${env.VITE_BASE_URL}/api/rider/job-posts/:jobPostId`, () => {
    return HttpResponse.json(jobPostResponse);
  }),
  http.post(
    `${env.VITE_BASE_URL}/api/rider/job-posts/:jobPostId/applications`,
    () => {
      return HttpResponse.json(jobApplicationWizardFormResponse, {
        status: 201,
      });
    },
  ),
];

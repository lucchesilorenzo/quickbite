import { renderHook, waitFor } from "@testing-library/react";
import TestQueryWrapper from "@tests/TestQueryWrapper";
import { jobPostsResponse } from "@tests/mocks/data/private/rider/job-posts";
import { server } from "@tests/mocks/server";
import { simulateError } from "@tests/utils/msw";
import { HttpResponse, http } from "msw";

import { UseGetJobPostsOptions, useGetJobPosts } from "./useGetJobPosts";

import env from "@/lib/env";

describe("useGetJobPosts", () => {
  const options: UseGetJobPostsOptions = {
    search: "",
    minSalary: 10000,
    maxSalary: 100000,
    salaryEnabled: false,
    employmentType: "all",
    sortBy: null,
  };

  it("should fetch data and return it", async () => {
    const { result } = renderHook(() => useGetJobPosts(options), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual({
      pages: [jobPostsResponse],
      pageParams: [null],
    });
  });

  it("should send 'search' query parameter correctly", async () => {
    server.use(
      http.get(`${env.VITE_BACKEND_URL}/api/rider/job-posts`, ({ request }) => {
        const url = new URL(request.url);
        const searchParam = url.searchParams.get("search");

        expect(searchParam).toBe("node");

        return HttpResponse.json(jobPostsResponse);
      }),
    );

    const { result } = renderHook(
      () => useGetJobPosts({ ...options, search: "node" }),
      { wrapper: TestQueryWrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual({
      pages: [jobPostsResponse],
      pageParams: [null],
    });
  });

  it("should send 'min_salary' query parameter correctly", async () => {
    server.use(
      http.get(`${env.VITE_BACKEND_URL}/api/rider/job-posts`, ({ request }) => {
        const url = new URL(request.url);
        const minSalaryParam = url.searchParams.get("min_salary");

        expect(minSalaryParam).toBe("20000");

        return HttpResponse.json(jobPostsResponse);
      }),
    );

    const { result } = renderHook(
      () =>
        useGetJobPosts({ ...options, minSalary: 20000, salaryEnabled: true }),
      { wrapper: TestQueryWrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual({
      pages: [jobPostsResponse],
      pageParams: [null],
    });
  });

  it("should send 'max_salary' query parameter correctly", async () => {
    server.use(
      http.get(`${env.VITE_BACKEND_URL}/api/rider/job-posts`, ({ request }) => {
        const url = new URL(request.url);
        const maxSalaryParam = url.searchParams.get("max_salary");

        expect(maxSalaryParam).toBe("30000");

        return HttpResponse.json(jobPostsResponse);
      }),
    );

    const { result } = renderHook(
      () =>
        useGetJobPosts({ ...options, maxSalary: 30000, salaryEnabled: true }),
      { wrapper: TestQueryWrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual({
      pages: [jobPostsResponse],
      pageParams: [null],
    });
  });

  it("should send 'employment_type' query parameter correctly", async () => {
    server.use(
      http.get(`${env.VITE_BACKEND_URL}/api/rider/job-posts`, ({ request }) => {
        const url = new URL(request.url);
        const employmentTypeParam = url.searchParams.get("employment_type");

        expect(employmentTypeParam).toBe("full_time");

        return HttpResponse.json(jobPostsResponse);
      }),
    );

    const { result } = renderHook(
      () => useGetJobPosts({ ...options, employmentType: "full_time" }),
      { wrapper: TestQueryWrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual({
      pages: [jobPostsResponse],
      pageParams: [null],
    });
  });

  it("should send 'sort_by' query parameter correctly", async () => {
    server.use(
      http.get(`${env.VITE_BACKEND_URL}/api/rider/job-posts`, ({ request }) => {
        const url = new URL(request.url);
        const sortByParam = url.searchParams.get("sort_by");

        expect(sortByParam).toBe("asc");

        return HttpResponse.json(jobPostsResponse);
      }),
    );

    const { result } = renderHook(
      () => useGetJobPosts({ ...options, sortBy: "asc" }),
      { wrapper: TestQueryWrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual({
      pages: [jobPostsResponse],
      pageParams: [null],
    });
  });

  it("should fetch next page when cursor is present", async () => {
    const { result } = renderHook(() => useGetJobPosts(options), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual({
      pages: [jobPostsResponse],
      pageParams: [null],
    });

    await result.current.fetchNextPage();

    await waitFor(() =>
      expect(result.current.data).toEqual({
        pages: [
          jobPostsResponse,
          {
            ...jobPostsResponse,
            job_posts: {
              ...jobPostsResponse.job_posts,
              next_cursor: null,
            },
          },
        ],
        pageParams: [null, "abc123"],
      }),
    );
  });

  it("should fail to fetch data", async () => {
    simulateError(`${env.VITE_BACKEND_URL}/api/rider/job-posts`);

    const { result } = renderHook(() => useGetJobPosts(options), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error).toBeDefined();
  });
});

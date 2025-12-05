import { renderHook, waitFor } from "@testing-library/react";
import TestQueryWrapper from "@tests/TestQueryWrapper";
import { jobPosts } from "@tests/mocks/data/private/partner/job-posts";
import { server } from "@tests/mocks/server";
import { simulateError } from "@tests/utils/msw";
import { HttpResponse, http } from "msw";

import { useGetJobPosts } from "./useGetJobPosts";

import env from "@/lib/env";

describe("useGetJobPosts", () => {
  const options = {
    restaurantId: "1",
    page: 1,
    pageSize: 25,
    sortBy: [],
    filters: { items: [] },
  };

  it("should fetch data and return it", async () => {
    const { result } = renderHook(() => useGetJobPosts(options), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual(jobPosts);
  });

  it("should send 'sort_by' query parameter correctly", async () => {
    server.use(
      http.get(
        `${env.VITE_BASE_URL}/api/partner/restaurants/1/job-posts`,
        ({ request }) => {
          const url = new URL(request.url);
          const sort = url.searchParams.get("sort_by");

          expect(sort).toBe(JSON.stringify({ field: "title", sort: "asc" }));

          return HttpResponse.json(jobPosts);
        },
      ),
    );

    const { result } = renderHook(
      () =>
        useGetJobPosts({
          ...options,
          sortBy: [{ field: "title", sort: "asc" }],
        }),
      { wrapper: TestQueryWrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual(jobPosts);
  });

  it("should send 'filter' query parameter correctly", async () => {
    const filter = {
      field: "title",
      operator: "contains",
      value: "Chef",
    };

    server.use(
      http.get(
        `${env.VITE_BASE_URL}/api/partner/restaurants/1/job-posts`,
        ({ request }) => {
          const url = new URL(request.url);
          const param = url.searchParams.get("filter");

          expect(param).toBe(JSON.stringify(filter));

          return HttpResponse.json(jobPosts);
        },
      ),
    );

    const { result } = renderHook(
      () => useGetJobPosts({ ...options, filters: { items: [filter] } }),
      { wrapper: TestQueryWrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual(jobPosts);
  });

  it("should send 'search' query parameter correctly", async () => {
    server.use(
      http.get(
        `${env.VITE_BASE_URL}/api/partner/restaurants/1/job-posts`,
        ({ request }) => {
          const url = new URL(request.url);
          const search = url.searchParams.get("search");

          expect(search).toBe("pizza");

          return HttpResponse.json(jobPosts);
        },
      ),
    );

    const { result } = renderHook(
      () =>
        useGetJobPosts({
          ...options,
          filters: {
            items: [],
            quickFilterValues: ["pizza"],
          },
        }),
      { wrapper: TestQueryWrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual(jobPosts);
  });

  it("should fail to fetch data", async () => {
    simulateError(`${env.VITE_BASE_URL}/api/partner/restaurants/1/job-posts`);

    const { result } = renderHook(() => useGetJobPosts(options), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error).toBeDefined();
  });
});

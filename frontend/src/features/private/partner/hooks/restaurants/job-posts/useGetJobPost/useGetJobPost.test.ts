import { renderHook, waitFor } from "@testing-library/react";
import TestQueryWrapper from "@tests/TestQueryWrapper";
import { jobPost } from "@tests/mocks/data/private/partner/job-posts";
import { simulateError } from "@tests/utils/msw";

import { useGetJobPost } from "./useGetJobPost";

import env from "@/lib/env";

describe("useGetJobPost", () => {
  const options = {
    restaurantId: "1",
    jobPostId: "1",
  };

  it("should fetch data and return it", async () => {
    const { result } = renderHook(() => useGetJobPost(options), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual(jobPost);
  });

  it("should fail to fetch data", async () => {
    simulateError(`${env.VITE_BASE_URL}/api/partner/restaurants/1/job-posts/1`);

    const { result } = renderHook(() => useGetJobPost(options), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error).toBeDefined();
  });
});

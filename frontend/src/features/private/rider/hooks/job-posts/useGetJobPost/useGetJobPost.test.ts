import { renderHook, waitFor } from "@testing-library/react";
import TestQueryWrapper from "@tests/TestQueryWrapper";
import { jobPostResponse } from "@tests/mocks/data/private/rider/job-posts";
import { simulateError } from "@tests/utils/msw";

import { useGetJobPost } from "./useGetJobPost";

import env from "@/lib/env";

describe("useGetJobPost", () => {
  it("should fetch data and return it", async () => {
    const { result } = renderHook(() => useGetJobPost({ jobPostId: "1" }), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual(jobPostResponse);
  });

  it("should fail to fetch data", async () => {
    simulateError(`${env.VITE_BASE_URL}/api/rider/job-posts/1`);

    const { result } = renderHook(() => useGetJobPost({ jobPostId: "1" }), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error).toBeDefined();
  });
});

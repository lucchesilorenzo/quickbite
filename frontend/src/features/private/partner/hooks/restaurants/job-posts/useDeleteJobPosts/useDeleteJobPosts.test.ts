import { renderHook, waitFor } from "@testing-library/react";
import TestQueryWrapper from "@tests/TestQueryWrapper";
import { jobPostIds } from "@tests/mocks/data/private/partner/job-posts";
import { simulateError } from "@tests/utils/msw";
import { useNotifications } from "@toolpad/core/useNotifications";

import { useDeleteJobPosts } from "./useDeleteJobPosts";

import env from "@/lib/env";

const mockShow = vi.fn();

vi.mocked(useNotifications).mockReturnValue({
  show: mockShow,
  close: vi.fn(),
});

describe("useDeleteJobPosts", () => {
  it("should mutate and return data", async () => {
    const { result } = renderHook(() => useDeleteJobPosts("1", jobPostIds), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual({
      message: "Job posts deleted successfully.",
    });
  });

  it("should show notification on error", async () => {
    simulateError(
      `${env.VITE_BASE_URL}/api/partner/restaurants/1/job-posts`,
      "delete",
    );

    const { result } = renderHook(() => useDeleteJobPosts("1", jobPostIds), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error).toBeDefined();

    expect(mockShow).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        key: "partner-delete-job-posts-error",
        severity: "error",
      }),
    );
  });

  it("should show notification on success", async () => {
    const { result } = renderHook(() => useDeleteJobPosts("1", jobPostIds), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(mockShow).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        key: "partner-delete-job-posts-success",
        severity: "success",
      }),
    );
  });
});

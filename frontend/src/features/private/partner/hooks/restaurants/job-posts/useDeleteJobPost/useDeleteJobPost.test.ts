import { renderHook, waitFor } from "@testing-library/react";
import TestQueryWrapper from "@tests/TestQueryWrapper";
import { simulateError } from "@tests/utils/msw";
import { useNotifications } from "@toolpad/core/useNotifications";

import { useDeleteJobPost } from "./useDeleteJobPost";

import env from "@/lib/env";

const mockShow = vi.fn();

vi.mocked(useNotifications).mockReturnValue({
  show: mockShow,
  close: vi.fn(),
});

describe("useDeleteJobPost", () => {
  it("should mutate and return data", async () => {
    const { result } = renderHook(() => useDeleteJobPost("1", "1"), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual({
      message: "Job post deleted successfully.",
    });
  });

  it("should show notification on error", async () => {
    simulateError(
      `${env.VITE_BASE_URL}/api/partner/restaurants/1/job-posts/1`,
      "delete",
    );

    const { result } = renderHook(() => useDeleteJobPost("1", "1"), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error).toBeDefined();

    expect(mockShow).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        key: "partner-delete-job-post-error",
        severity: "error",
      }),
    );
  });

  it("should show notification on success", async () => {
    const { result } = renderHook(() => useDeleteJobPost("1", "1"), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(mockShow).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        key: "partner-delete-job-post-success",
        severity: "success",
      }),
    );
  });
});

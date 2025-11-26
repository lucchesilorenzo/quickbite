import { renderHook, waitFor } from "@testing-library/react";
import TestQueryWrapper from "@tests/TestQueryWrapper";
import {
  editJobPostForm,
  editJobPostFormResponse,
} from "@tests/mocks/data/private/partner/forms/edit-job-post";
import { simulateError } from "@tests/utils/msw";
import { useNotifications } from "@toolpad/core/useNotifications";

import { useUpdateJobPost } from "./useUpdateJobPost";

import env from "@/lib/env";

const mockSetOpenEditJobPostDialog = vi.fn();
const mockShow = vi.fn();

vi.mocked(useNotifications).mockReturnValue({
  show: mockShow,
  close: vi.fn(),
});

describe("useUpdateJobPost", () => {
  const options = {
    restaurantId: "1",
    jobPostId: "1",
    setOpenEditJobPostDialog: mockSetOpenEditJobPostDialog,
  };

  it("should mutate and return data", async () => {
    const { result } = renderHook(() => useUpdateJobPost(options), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate(editJobPostForm);

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual(editJobPostFormResponse);
  });

  it("should show notification on error", async () => {
    simulateError(
      `${env.VITE_BASE_URL}/api/partner/restaurants/1/job-posts/1`,
      "patch",
    );

    const { result } = renderHook(() => useUpdateJobPost(options), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate(editJobPostForm);

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error).toBeDefined();

    expect(mockShow).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        key: "partner-update-job-post-error",
        severity: "error",
      }),
    );
    expect(mockShow).toHaveBeenCalledTimes(1);
  });

  it("should show notification on success", async () => {
    const { result } = renderHook(() => useUpdateJobPost(options), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutate(editJobPostForm);

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(mockShow).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        key: "partner-update-job-post-success",
        severity: "success",
      }),
    );
    expect(mockShow).toHaveBeenCalledTimes(1);
  });
});

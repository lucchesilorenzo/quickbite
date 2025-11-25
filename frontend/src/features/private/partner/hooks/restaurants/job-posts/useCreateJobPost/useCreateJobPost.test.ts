import { renderHook, waitFor } from "@testing-library/react";
import TestQueryWrapper from "@tests/TestQueryWrapper";
import {
  addJobPostForm,
  addJobPostFormResponse,
} from "@tests/mocks/data/private/partner/forms/add-job-post";
import { simulateError } from "@tests/utils/msw";
import { useNotifications } from "@toolpad/core/useNotifications";

import { useCreateJobPost } from "./useCreateJobPost";

import env from "@/lib/env";

const mockSetOpenAddJobPostDialog = vi.fn();
const mockShow = vi.fn();

vi.mocked(useNotifications).mockReturnValue({
  show: mockShow,
  close: vi.fn(),
});

describe("useCreateJobPost", () => {
  it("should mutate and return data", async () => {
    const { result } = renderHook(
      () => useCreateJobPost("1", mockSetOpenAddJobPostDialog),
      {
        wrapper: TestQueryWrapper,
      },
    );

    result.current.mutate(addJobPostForm);

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual(addJobPostFormResponse);
  });

  it("should show notification on error", async () => {
    simulateError(
      `${env.VITE_BASE_URL}/api/partner/restaurants/1/job-posts`,
      "post",
    );

    const { result } = renderHook(
      () => useCreateJobPost("1", mockSetOpenAddJobPostDialog),
      {
        wrapper: TestQueryWrapper,
      },
    );

    result.current.mutate(addJobPostForm);

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error).toBeDefined();

    expect(mockShow).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        key: "partner-create-job-post-error",
        severity: "error",
      }),
    );
    expect(mockShow).toHaveBeenCalledTimes(1);
  });

  it("should show notification on success", async () => {
    const { result } = renderHook(
      () => useCreateJobPost("1", mockSetOpenAddJobPostDialog),
      {
        wrapper: TestQueryWrapper,
      },
    );

    result.current.mutate(addJobPostForm);

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(mockShow).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        key: "partner-create-job-post-success",
        severity: "success",
      }),
    );
    expect(mockShow).toHaveBeenCalledTimes(1);
  });
});

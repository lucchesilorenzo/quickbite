import { renderHook, waitFor } from "@testing-library/react";
import TestQueryWrapper from "@tests/TestQueryWrapper";
import {
  createJobApplicationFormData,
  jobApplicationWizardFormResponse,
} from "@tests/mocks/data/private/rider/forms/job-application-wizard";
import { simulateError } from "@tests/utils/msw";
import { useNotifications } from "@toolpad/core/useNotifications";

import { useCreateJobApplication } from "./useCreateJobApplication";

import env from "@/lib/env";

const mockShow = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

vi.mocked(useNotifications).mockReturnValue({
  show: mockShow,
  close: vi.fn(),
});

describe("useCreateJobApplication", () => {
  it("should mutate and return data", async () => {
    const { result } = renderHook(
      () => useCreateJobApplication({ jobPostId: "1" }),
      {
        wrapper: TestQueryWrapper,
      },
    );

    result.current.mutate(createJobApplicationFormData());

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual(jobApplicationWizardFormResponse);
  });

  it("should show notification on error", async () => {
    simulateError(
      `${env.VITE_BACKEND_URL}/api/v1/rider/job-posts/1/applications`,
      "post",
    );

    const { result } = renderHook(
      () => useCreateJobApplication({ jobPostId: "1" }),
      {
        wrapper: TestQueryWrapper,
      },
    );

    result.current.mutate(createJobApplicationFormData());

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error).toBeDefined();

    expect(mockShow).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        key: "rider-create-job-application-error",
        severity: "error",
      }),
    );
    expect(mockShow).toHaveBeenCalledTimes(1);
  });

  it("should show notification on success", async () => {
    const { result } = renderHook(
      () => useCreateJobApplication({ jobPostId: "1" }),
      {
        wrapper: TestQueryWrapper,
      },
    );

    result.current.mutate(createJobApplicationFormData());

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(mockShow).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        key: "rider-create-job-application-success",
        severity: "success",
      }),
    );
    expect(mockShow).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/rider/job-posts");
  });
});

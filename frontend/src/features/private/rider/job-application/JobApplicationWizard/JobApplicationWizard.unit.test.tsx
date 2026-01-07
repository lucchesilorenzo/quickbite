import { render, screen } from "@testing-library/react";
import { jobPostResponse } from "@tests/mocks/data/private/rider/job-posts";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { useJobApplication } from "../../contexts/JobApplicationProvider";
import { GetJobPostResponse } from "../../types/job-posts/job-post.api.types";
import JobApplicationWizard from "./JobApplicationWizard";

vi.mock("react-router-dom", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-router-dom")>()),
  useNavigate: vi.fn(),
}));

vi.mock(
  "../../hooks/job-posts/job-applications/useCreateJobApplication",
  () => ({
    useCreateJobApplication: () => ({
      mutate: vi.fn(),
      isPending: false,
    }),
  }),
);

vi.mock("../../contexts/JobApplicationProvider", () => ({
  useJobApplication: vi.fn(),
}));

vi.mock("../Stepper", () => ({
  default: () => <div data-testid="stepper" />,
}));

describe("JobApplicationWizard (unit)", () => {
  function renderComponent(jobPostResponse: GetJobPostResponse) {
    const mockNavigate = vi.fn();
    const mockShow = vi.fn();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useNotifications).mockReturnValue({
      show: mockShow,
      close: vi.fn(),
    });

    vi.mocked(useJobApplication).mockReturnValue({
      jobPostData: jobPostResponse,
      isLoadingJobPost: false,
      jobPostError: null,
    });

    render(<JobApplicationWizard />);

    return {
      mockNavigate,
      mockShow,
    };
  }

  it("should render stepper", () => {
    renderComponent(jobPostResponse);

    expect(screen.getByTestId("stepper")).toBeInTheDocument();
  });

  it("should navigate back to job posts if the rider has already applied", () => {
    const { mockNavigate } = renderComponent({
      ...jobPostResponse,
      job_post: { ...jobPostResponse.job_post, already_applied: true },
    });

    expect(mockNavigate).toHaveBeenCalledWith("/rider/job-posts", {
      replace: true,
    });
  });

  it("should display a toast message if the rider has already applied", () => {
    const { mockShow } = renderComponent({
      ...jobPostResponse,
      job_post: { ...jobPostResponse.job_post, already_applied: true },
    });

    expect(mockShow).toHaveBeenCalledWith(
      "You have already applied for this job.",
      expect.objectContaining({
        key: "rider-job-application-already-applied",
        severity: "error",
      }),
    );
  });

  it("should not navigate back to job posts if the rider has not already applied", () => {
    const { mockNavigate } = renderComponent(jobPostResponse);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should not display a toast message if the rider has not already applied", () => {
    const { mockShow } = renderComponent(jobPostResponse);

    expect(mockShow).not.toHaveBeenCalled();
  });
});

import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { customRender } from "@tests/utils/custom-render";
import { simulateDelay, simulateError } from "@tests/utils/msw";

import JobPostSplitLayout from "./JobPostSplitLayout";

import env from "@/lib/env";

vi.mock("@rider/contexts/JobPostsProvider", () => ({
  useJobPosts: vi.fn(),
}));

vi.mock("@rider/job-posts/JobPostCountAndSort", () => ({
  default: () => <div data-testid="job-post-count-and-sort" />,
}));

vi.mock("@rider/job-posts/JobPostList", () => ({
  default: () => <div data-testid="job-post-list" />,
}));

vi.mock("@rider/job-posts/JobPostDetails", () => ({
  default: () => <div data-testid="job-post-details" />,
}));

describe("JobPostSplitLayout", () => {
  function renderComponent(jobPostId: string | null = null) {
    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: [],
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId,
      handleApplyFilters: vi.fn(),
      handleResetFilters: vi.fn(),
      handleApplySort: vi.fn(),
      handleJobPostChange: vi.fn(),
      fetchNextPage: vi.fn(),
    });

    customRender(<JobPostSplitLayout />);

    return {
      getSpinner: () => screen.queryByRole("progressbar"),
      getErrorText: () => screen.queryByRole("alert"),
    };
  }

  it("should render JobPostCountAndSort and JobPostList correctly", () => {
    renderComponent();

    expect(screen.getByTestId("job-post-count-and-sort")).toBeInTheDocument();
    expect(screen.getByTestId("job-post-list")).toBeInTheDocument();
    expect(screen.queryByTestId("job-post-details")).not.toBeInTheDocument();
  });

  it("should render the spinner when fetching the job post", () => {
    simulateDelay(`${env.VITE_BASE_URL}/api/rider/job-posts/1`);
    const { getSpinner } = renderComponent("1");

    expect(getSpinner()).toBeInTheDocument();
  });

  it("should render the error message if fetching the job post fails", async () => {
    simulateError(`${env.VITE_BASE_URL}/api/rider/job-posts/1`);
    const { getSpinner, getErrorText } = renderComponent("1");

    await waitForElementToBeRemoved(getSpinner);

    expect(getErrorText()).toBeInTheDocument();
  });

  it("should render JobPostDetails if there is a job post id", async () => {
    const { getSpinner } = renderComponent("1");

    await waitForElementToBeRemoved(getSpinner);

    expect(screen.getByTestId("job-post-details")).toBeInTheDocument();
  });

  it("should not render JobPostDetails if there is no job post id", () => {
    renderComponent(null);

    expect(screen.queryByTestId("job-post-details")).not.toBeInTheDocument();
  });
});

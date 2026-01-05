import { JobPostWithRestaurantAndAlreadyApplied } from "@rider/types/job-posts/job-post.types";
import { screen } from "@testing-library/react";
import { jobPostsWithRestaurant } from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";

import JobPostSplitLayout from "./JobPostSplitLayout";

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
  function renderComponent(
    jobPost?: JobPostWithRestaurantAndAlreadyApplied,
    isLoadingJobPost: boolean = false,
    jobPostError: Error | null = null,
  ) {
    customRender(
      <JobPostSplitLayout
        jobPost={jobPost}
        isLoadingJobPost={isLoadingJobPost}
        jobPostError={jobPostError}
      />,
    );

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
    const { getSpinner } = renderComponent(jobPostsWithRestaurant[0], true);

    expect(getSpinner()).toBeInTheDocument();
  });

  it("should render the error message if fetching the job post fails", async () => {
    const { getErrorText } = renderComponent(
      jobPostsWithRestaurant[0],
      false,
      new Error(),
    );

    expect(getErrorText()).toBeInTheDocument();
  });

  it("should render JobPostDetails if there is a job post id", async () => {
    renderComponent(jobPostsWithRestaurant[0]);

    expect(screen.getByTestId("job-post-details")).toBeInTheDocument();
  });

  it("should not render JobPostDetails if there is no job post id", () => {
    renderComponent();

    expect(screen.queryByTestId("job-post-details")).not.toBeInTheDocument();
  });
});

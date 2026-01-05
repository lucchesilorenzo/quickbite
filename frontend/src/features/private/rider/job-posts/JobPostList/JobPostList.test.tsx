import { useMediaQuery } from "@mui/material";
import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { JobPostWithRestaurantAndAlreadyApplied } from "@rider/types/job-posts/job-post.types";
import { screen, waitFor } from "@testing-library/react";
import {
  jobPostFilters,
  jobPostsWithRestaurant,
} from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";
import { useInView } from "react-intersection-observer";

import JobPostList from "./JobPostList";

vi.mock("@mui/material", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@mui/material")>()),
  useMediaQuery: vi.fn(),
}));

vi.mock("@rider/contexts/JobPostsProvider", () => ({
  useJobPosts: vi.fn(),
}));

vi.mock("../JobPostItem", () => ({
  default: () => <div data-testid="job-post-item" />,
}));

vi.mock("../ViewJobPostDetailsDialog", () => ({
  default: () => <div data-testid="view-job-post-details-dialog" />,
}));

describe("JobPostList", () => {
  function renderComponent(
    jobPostPages: JobPostWithRestaurantAndAlreadyApplied[],
    isLoadingJobPosts: boolean = false,
    jobPostsError: Error | null = null,
    isFetchingNextPage: boolean = false,
  ) {
    const mockFetchNextPage = vi.fn();

    vi.mocked(useJobPosts).mockReturnValue({
      filters: jobPostFilters,
      jobPostPages,
      isLoadingJobPosts,
      jobPostsError,
      sortBy: null,
      isFetchingNextPage,
      jobPostId: null,
      handleApplySort: vi.fn(),
      fetchNextPage: mockFetchNextPage,
      handleJobPostChange: vi.fn(),
    });

    customRender(<JobPostList />);

    return {
      getSpinner: () => screen.queryByRole("progressbar"),
      getErrorText: () => screen.queryByRole("alert"),
      mockFetchNextPage,
    };
  }

  it("should render the job post list if job posts exist", () => {
    renderComponent(jobPostsWithRestaurant);

    expect(screen.getAllByTestId("job-post-item")).toHaveLength(
      jobPostsWithRestaurant.length,
    );
  });

  it("should render the spinner when fetching job posts", () => {
    const { getSpinner } = renderComponent([], true, null);

    expect(getSpinner()).toBeInTheDocument();
  });

  it("should render the error message if fetching job posts fails", () => {
    const { getErrorText } = renderComponent([], false, new Error());

    expect(getErrorText()).toBeInTheDocument();
  });

  it("should render the error message if there are no job posts", () => {
    renderComponent([], false, null);

    expect(screen.getByText(/no job posts found/i)).toBeInTheDocument();
  });

  it("should call fetchNextPage when scrolling to the bottom of the page", async () => {
    vi.mocked(useInView).mockReturnValue({
      ref: vi.fn(),
      inView: true,
    } as any);

    const { mockFetchNextPage } = renderComponent(jobPostsWithRestaurant);

    await waitFor(() => expect(mockFetchNextPage).toHaveBeenCalledTimes(1));
  });

  it("should render the spinner when fetching more job posts", () => {
    renderComponent(jobPostsWithRestaurant, false, null, true);

    expect(
      screen.getByRole("progressbar", { name: /fetching more job posts/i }),
    ).toBeInTheDocument();
  });

  it("should render ViewJobPostDetailDialog on mobile", () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);
    renderComponent(jobPostsWithRestaurant);

    expect(
      screen.getByTestId("view-job-post-details-dialog"),
    ).toBeInTheDocument();
  });

  it("should not render ViewJobPostDetailDialog on desktop", () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);
    renderComponent(jobPostsWithRestaurant);

    expect(
      screen.queryByTestId("view-job-post-details-dialog"),
    ).not.toBeInTheDocument();
  });
});

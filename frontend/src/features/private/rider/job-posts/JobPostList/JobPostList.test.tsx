import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { screen, waitFor } from "@testing-library/react";
import { jobPostsWithRestaurant } from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";
import { useInView } from "react-intersection-observer";

import { JobPostWithRestaurant } from "../../types/job-posts/job-post.types";
import JobPostList from "./JobPostList";

import {
  MAX_SALARY,
  MIN_SALARY,
} from "@/features/private/shared/lib/constants/job-posts";

vi.mock("@rider/contexts/JobPostsProvider", () => ({
  useJobPosts: vi.fn(),
}));

vi.mock("../JobPostItem", () => ({
  default: () => <div data-testid="job-post-item" />,
}));

describe("JobPostList", () => {
  function renderComponent(
    jobPostPages: JobPostWithRestaurant[],
    isLoadingJobPosts: boolean = false,
    jobPostsError: Error | null = null,
    isFetchingNextPage: boolean = false,
  ) {
    const mockFetchNextPage = vi.fn();

    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages,
      isLoadingJobPosts,
      jobPostsError,
      searchQuery: "React",
      salaryRange: [MIN_SALARY, MAX_SALARY],
      employmentType: "all",
      sortBy: null,
      isFetchingNextPage,
      setSearchQuery: vi.fn(),
      setSalaryRange: vi.fn(),
      setEmploymentType: vi.fn(),
      handleApplyFilters: vi.fn(),
      handleResetFilters: vi.fn(),
      handleApplySort: vi.fn(),
      fetchNextPage: mockFetchNextPage,
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
});

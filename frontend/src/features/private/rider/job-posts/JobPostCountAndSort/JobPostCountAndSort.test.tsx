import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { JobPostWithRestaurant } from "@rider/types/job-posts/job-post.types";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jobPostsWithRestaurant } from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";

import JobPostCountAndSort from "./JobPostCountAndSort";

const mockHandleApplySort = vi.fn();

vi.mock("@rider/contexts/JobPostsProvider", () => ({
  useJobPosts: vi.fn(),
}));

describe("JobPostCountAndSort", () => {
  const user = userEvent.setup();

  function renderComponent(
    jobPosts: JobPostWithRestaurant[],
    sortBy: "asc" | "desc" | null = null,
  ) {
    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: jobPosts,
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy,
      jobPostId: null,
      isFetchingNextPage: false,
      handleApplyFilters: vi.fn(),
      handleResetFilters: vi.fn(),
      handleApplySort: mockHandleApplySort,
      fetchNextPage: vi.fn(),
      handleJobPostChange: vi.fn(),
    });

    customRender(<JobPostCountAndSort />);

    return {
      user,
      searchResultsHeading: screen.getByRole("heading", {
        name: /search results/i,
      }),
      latestButton: screen.getByRole("button", { name: /latest/i }),
      oldestButton: screen.getByRole("button", { name: /oldest/i }),
      getJobPostCountText: () => screen.queryByText(/job posts/i),
    };
  }

  it("should render the main structure", () => {
    const {
      searchResultsHeading,
      latestButton,
      oldestButton,
      getJobPostCountText,
    } = renderComponent(jobPostsWithRestaurant);

    expect(searchResultsHeading).toBeInTheDocument();
    expect(latestButton).toBeInTheDocument();
    expect(oldestButton).toBeInTheDocument();
    expect(getJobPostCountText()).toBeInTheDocument();
  });

  it("should call handleApplySort('desc') when clicking 'latest'", async () => {
    const { user, latestButton } = renderComponent(
      jobPostsWithRestaurant,
      "desc",
    );

    await user.click(latestButton);

    expect(mockHandleApplySort).toHaveBeenCalledWith("desc");
  });

  it("should call handleApplySort('asc') when clicking 'oldest'", async () => {
    const { user, oldestButton } = renderComponent(
      jobPostsWithRestaurant,
      "asc",
    );

    await user.click(oldestButton);

    expect(mockHandleApplySort).toHaveBeenCalledWith("asc");
  });

  it("should render the correct job post count", () => {
    const { getJobPostCountText } = renderComponent(jobPostsWithRestaurant);

    expect(getJobPostCountText()).toHaveTextContent(
      new RegExp(jobPostsWithRestaurant.length.toString()),
    );
  });

  it("should not render the job post count if there are no job posts", () => {
    const { getJobPostCountText } = renderComponent([]);

    expect(getJobPostCountText()).not.toBeInTheDocument();
  });
});

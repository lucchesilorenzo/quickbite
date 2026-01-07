import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { screen } from "@testing-library/react";
import {
  jobPostFilters,
  jobPostsWithRestaurant,
} from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";

import JobPostsLayoutDesktop from "./JobPostsLayoutDesktop";

vi.mock("@rider/contexts/JobPostsProvider", () => ({
  useJobPosts: vi.fn(),
}));

vi.mock("../JobPostSplitLayout", () => ({
  default: () => <div data-testid="job-post-split-layout" />,
}));

describe("JobPostsLayoutDesktop", () => {
  function renderComponent(jobPostId: string | null = null) {
    vi.mocked(useJobPosts).mockReturnValue({
      filters: jobPostFilters,
      jobPostPages: [],
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId,
      handleApplySort: vi.fn(),
      fetchNextPage: vi.fn(),
      handleJobPostChange: vi.fn(),
    });

    customRender(<JobPostsLayoutDesktop />);
  }

  it("should render JobPostSplitLayout correctly", () => {
    renderComponent(jobPostsWithRestaurant[0].id);

    expect(screen.getByTestId("job-post-split-layout")).toBeInTheDocument();
  });
});

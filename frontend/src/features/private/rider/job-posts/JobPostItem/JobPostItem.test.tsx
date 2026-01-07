import { employmentTypes } from "@private/shared/lib/constants/job-posts";
import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { JobPostWithRestaurantAndAlreadyApplied } from "@rider/types/job-posts/job-post.types";
import { screen } from "@testing-library/react";
import {
  jobPostFilters,
  jobPostsWithRestaurant,
} from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";

import JobPostItem from "./JobPostItem";

vi.mock("@rider/contexts/JobPostsProvider", () => ({
  useJobPosts: vi.fn(),
}));

describe("JobPostItem", () => {
  function renderComponent(jobPost: JobPostWithRestaurantAndAlreadyApplied) {
    customRender(<JobPostItem jobPost={jobPost} />);
  }

  it("should render the main structure", () => {
    const mockHandleApplySort = vi.fn();

    vi.mocked(useJobPosts).mockReturnValue({
      filters: jobPostFilters,
      jobPostPages: [],
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      jobPostId: null,
      isFetchingNextPage: false,
      handleApplySort: mockHandleApplySort,
      fetchNextPage: vi.fn(),
      handleJobPostChange: vi.fn(),
    });

    renderComponent(jobPostsWithRestaurant[0]);

    const employmentType = employmentTypes.find(
      (option) => option.value === jobPostsWithRestaurant[0].employment_type,
    )?.label;

    expect(
      screen.getByText(jobPostsWithRestaurant[0].title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(jobPostsWithRestaurant[0].restaurant.name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${jobPostsWithRestaurant[0].restaurant.postcode} - ${jobPostsWithRestaurant[0].restaurant.city}`,
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/\/ year/i)).not.toBeInTheDocument();
    expect(screen.getByText(employmentType!)).toBeInTheDocument();
  });

  it("should render the salary if it exists", () => {
    renderComponent({ ...jobPostsWithRestaurant[0], salary: 20000 });

    expect(screen.getByText(/\/ year/i)).toBeInTheDocument();
  });
});

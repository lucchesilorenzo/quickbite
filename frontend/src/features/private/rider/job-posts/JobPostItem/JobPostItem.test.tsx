import {
  MAX_SALARY,
  MIN_SALARY,
  employmentTypes,
} from "@private/shared/lib/constants/job-posts";
import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { JobPostWithRestaurant } from "@rider/types/job-posts/job-post.types";
import { screen } from "@testing-library/react";
import { jobPostsWithRestaurant } from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";

import JobPostItem from "./JobPostItem";

vi.mock("@rider/contexts/JobPostsProvider", () => ({
  useJobPosts: vi.fn(),
}));

describe("JobPostItem", () => {
  function renderComponent(jobPost: JobPostWithRestaurant) {
    customRender(<JobPostItem jobPost={jobPost} />);
  }

  it("should render the main structure", () => {
    const mockHandleApplySort = vi.fn();

    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: [],
      isLoadingJobPosts: false,
      jobPostsError: null,
      searchQuery: "",
      salaryRange: [MIN_SALARY, MAX_SALARY],
      employmentType: "all",
      sortBy: null,
      jobPostId: null,
      isFetchingNextPage: false,
      setSearchQuery: vi.fn(),
      setSalaryRange: vi.fn(),
      setEmploymentType: vi.fn(),
      handleApplyFilters: vi.fn(),
      handleResetFilters: vi.fn(),
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

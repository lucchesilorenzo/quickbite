import {
  MAX_SALARY,
  MIN_SALARY,
} from "@private/shared/lib/constants/job-posts";
import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jobPostsWithRestaurant } from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";

import JobPostFilters from "./JobPostFilters";

const mockHandleApplyFilters = vi.fn();
const mockHandleResetFilters = vi.fn();

vi.mock("@rider/contexts/JobPostsProvider", () => ({
  useJobPosts: vi.fn(),
}));

describe("JobPostFilters", () => {
  function renderComponent() {
    const user = userEvent.setup();

    customRender(<JobPostFilters />);

    const salarySliders = screen.getAllByRole("slider");

    return {
      user,
      searchInput: screen.getByPlaceholderText(/title/i),
      minSalarySlider: salarySliders[0],
      maxSalarySlider: salarySliders[1],
      employmentType: screen.getByRole("combobox"),
    };
  }

  it("should render the filters", () => {
    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: jobPostsWithRestaurant,
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId: null,
      handleApplyFilters: mockHandleApplyFilters,
      handleResetFilters: mockHandleResetFilters,
      handleApplySort: vi.fn(),
      handleJobPostChange: vi.fn(),
      fetchNextPage: vi.fn(),
    });

    const { searchInput, minSalarySlider, maxSalarySlider, employmentType } =
      renderComponent();

    expect(searchInput).toBeInTheDocument();
    expect(minSalarySlider).toBeInTheDocument();
    expect(maxSalarySlider).toBeInTheDocument();
    expect(employmentType).toBeInTheDocument();
  });

  it("should render the filters with correct default values", async () => {
    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: jobPostsWithRestaurant,
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId: null,
      handleApplyFilters: mockHandleApplyFilters,
      handleResetFilters: mockHandleResetFilters,
      handleApplySort: vi.fn(),
      handleJobPostChange: vi.fn(),
      fetchNextPage: vi.fn(),
    });

    const { searchInput, minSalarySlider, maxSalarySlider, employmentType } =
      renderComponent();

    expect(searchInput).toHaveValue("");
    expect(minSalarySlider).toHaveValue(MIN_SALARY.toString());
    expect(maxSalarySlider).toHaveValue(MAX_SALARY.toString());
    expect(employmentType).toHaveTextContent(/all/i);
  });

  it("should populate state with correct default values", () => {
    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: jobPostsWithRestaurant,
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId: null,
      handleApplyFilters: mockHandleApplyFilters,
      handleResetFilters: mockHandleResetFilters,
      handleApplySort: vi.fn(),
      handleJobPostChange: vi.fn(),
      fetchNextPage: vi.fn(),
    });

    const { searchInput, minSalarySlider, maxSalarySlider, employmentType } =
      renderComponent();

    expect(searchInput).toHaveValue("");
    expect(minSalarySlider).toHaveValue(MIN_SALARY.toString());
    expect(maxSalarySlider).toHaveValue(MAX_SALARY.toString());
    expect(employmentType).toHaveTextContent(/all/i);
  });

  it("should update 'searchQuery' while typing", async () => {
    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: jobPostsWithRestaurant,
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId: null,
      handleApplyFilters: mockHandleApplyFilters,
      handleResetFilters: mockHandleResetFilters,
      handleApplySort: vi.fn(),
      handleJobPostChange: vi.fn(),
      fetchNextPage: vi.fn(),
    });

    const { user, searchInput } = renderComponent();

    await user.type(searchInput, "React");

    expect(searchInput).toHaveValue("React");
  });

  it("should update 'minSalary' while typing", () => {
    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: jobPostsWithRestaurant,
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId: null,
      handleApplyFilters: mockHandleApplyFilters,
      handleResetFilters: mockHandleResetFilters,
      handleApplySort: vi.fn(),
      handleJobPostChange: vi.fn(),
      fetchNextPage: vi.fn(),
    });

    const { minSalarySlider } = renderComponent();

    fireEvent.change(minSalarySlider, {
      target: { value: "20000" },
    });

    expect(minSalarySlider).toHaveValue("20000");
  });

  it("should update 'maxSalary' while typing", () => {
    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: jobPostsWithRestaurant,
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId: null,
      handleApplyFilters: mockHandleApplyFilters,
      handleResetFilters: mockHandleResetFilters,
      handleApplySort: vi.fn(),
      handleJobPostChange: vi.fn(),
      fetchNextPage: vi.fn(),
    });

    const { maxSalarySlider } = renderComponent();

    fireEvent.change(maxSalarySlider, {
      target: { value: "20000" },
    });

    expect(maxSalarySlider).toHaveValue("20000");
  });

  it("should update 'employmentType' while typing", async () => {
    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: jobPostsWithRestaurant,
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId: null,
      handleApplyFilters: mockHandleApplyFilters,
      handleResetFilters: mockHandleResetFilters,
      handleApplySort: vi.fn(),
      handleJobPostChange: vi.fn(),
      fetchNextPage: vi.fn(),
    });

    const { user, employmentType } = renderComponent();

    await user.click(employmentType);
    await user.click(screen.getByRole("option", { name: /contract/i }));

    expect(employmentType).toHaveTextContent(/contract/i);
  });

  it("should call handleApplyFilters when applying filters", async () => {
    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: jobPostsWithRestaurant,
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId: null,
      handleApplyFilters: mockHandleApplyFilters,
      handleResetFilters: mockHandleResetFilters,
      handleApplySort: vi.fn(),
      handleJobPostChange: vi.fn(),
      fetchNextPage: vi.fn(),
    });

    const { user, searchInput } = renderComponent();

    await user.type(searchInput, "React");
    await user.click(screen.getByRole("button", { name: /apply/i }));

    expect(mockHandleApplyFilters).toHaveBeenCalledTimes(1);
    expect(mockHandleApplyFilters).toHaveBeenCalledWith({
      search: "React",
      minSalary: MIN_SALARY,
      maxSalary: MAX_SALARY,
      employmentType: "all",
    });
  });

  it("should reset filters", async () => {
    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: jobPostsWithRestaurant,
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId: null,
      handleApplyFilters: mockHandleApplyFilters,
      handleResetFilters: mockHandleResetFilters,
      handleApplySort: vi.fn(),
      handleJobPostChange: vi.fn(),
      fetchNextPage: vi.fn(),
    });

    const { user } = renderComponent();

    await user.click(screen.getByRole("button", { name: /reset/i }));

    expect(mockHandleResetFilters).toHaveBeenCalledTimes(1);
  });

  it("should clear the search input when clicking clear icon", async () => {
    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: jobPostsWithRestaurant,
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId: null,
      handleApplyFilters: mockHandleApplyFilters,
      handleResetFilters: mockHandleResetFilters,
      handleApplySort: vi.fn(),
      handleJobPostChange: vi.fn(),
      fetchNextPage: vi.fn(),
    });

    const { user, searchInput } = renderComponent();

    await user.type(searchInput, "Frontend");
    await user.click(screen.getByRole("button", { name: /clear/i }));

    expect(searchInput).toHaveValue("");
  });
});

import {
  MAX_SALARY,
  MIN_SALARY,
} from "@private/shared/lib/constants/job-posts";
import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationDisplay from "@tests/LocationDisplay";
import {
  jobPostFilters,
  jobPostsWithRestaurant,
} from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";
import { MemoryRouter } from "react-router-dom";

import {
  JobPostWithRestaurantAndAlreadyApplied,
  JobPostFilters as TJobPostFilters,
} from "../../types/job-posts/job-post.types";
import JobPostFilters from "./JobPostFilters";

vi.mock("@rider/contexts/JobPostsProvider", () => ({
  useJobPosts: vi.fn(),
}));

describe("JobPostFilters", () => {
  function renderComponent(
    jobPosts: JobPostWithRestaurantAndAlreadyApplied[],
    newFilters?: TJobPostFilters,
  ) {
    vi.mocked(useJobPosts).mockReturnValue({
      filters: { ...jobPostFilters, ...newFilters },
      jobPostPages: jobPosts,
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      isFetchingNextPage: false,
      jobPostId: null,
      handleApplySort: vi.fn(),
      handleJobPostChange: vi.fn(),
      fetchNextPage: vi.fn(),
    });

    const user = userEvent.setup();

    customRender(
      <MemoryRouter initialEntries={["/rider/job-posts"]}>
        <JobPostFilters />
        <LocationDisplay />
      </MemoryRouter>,
    );

    const salarySliders = screen.getAllByRole("slider");

    return {
      user,
      searchInput: screen.getByPlaceholderText(/title/i),
      minSalarySlider: salarySliders[0],
      maxSalarySlider: salarySliders[1],
      salaryEnabledCheckbox: screen.getByRole("checkbox"),
      employmentType: screen.getByRole("combobox"),
    };
  }

  it("should render the filters", () => {
    const {
      searchInput,
      minSalarySlider,
      maxSalarySlider,
      salaryEnabledCheckbox,
      employmentType,
    } = renderComponent(jobPostsWithRestaurant);

    expect(searchInput).toBeInTheDocument();
    expect(minSalarySlider).toBeInTheDocument();
    expect(maxSalarySlider).toBeInTheDocument();
    expect(salaryEnabledCheckbox).toBeInTheDocument();
    expect(employmentType).toBeInTheDocument();
  });

  it("should render the filters with correct values", async () => {
    const {
      searchInput,
      minSalarySlider,
      maxSalarySlider,
      salaryEnabledCheckbox,
      employmentType,
    } = renderComponent(jobPostsWithRestaurant, {
      search: "React",
      minSalary: MIN_SALARY,
      maxSalary: MAX_SALARY,
      salaryEnabled: false,
      employmentType: "all",
    });

    expect(searchInput).toHaveValue("React");
    expect(minSalarySlider).toHaveValue(MIN_SALARY.toString());
    expect(maxSalarySlider).toHaveValue(MAX_SALARY.toString());
    expect(salaryEnabledCheckbox).not.toBeChecked();
    expect(employmentType).toHaveTextContent(/all/i);
  });

  it("should update 'searchQuery' while typing", async () => {
    const { user, searchInput } = renderComponent(jobPostsWithRestaurant);

    await user.type(searchInput, "React");

    expect(searchInput).toHaveValue("React");
  });

  it("should update 'minSalary' while typing", () => {
    const { minSalarySlider } = renderComponent(jobPostsWithRestaurant);

    fireEvent.change(minSalarySlider, {
      target: { value: "20000" },
    });

    expect(minSalarySlider).toHaveValue("20000");
  });

  it("should update 'maxSalary' while typing", () => {
    const { maxSalarySlider } = renderComponent(jobPostsWithRestaurant);

    fireEvent.change(maxSalarySlider, {
      target: { value: "20000" },
    });

    expect(maxSalarySlider).toHaveValue("20000");
  });

  it("should update 'employmentType' while typing", async () => {
    const { user, employmentType } = renderComponent(jobPostsWithRestaurant);

    await user.click(employmentType);
    await user.click(screen.getByRole("option", { name: /contract/i }));

    expect(employmentType).toHaveTextContent(/contract/i);
  });

  it("should call handleApplyFilters when applying filters", async () => {
    const { user, searchInput } = renderComponent(jobPostsWithRestaurant);

    await user.type(searchInput, "React");
    await user.click(screen.getByRole("button", { name: /apply/i }));

    expect(screen.getByTestId("location")).toHaveTextContent("?search=React");
  });

  it("should reset filters", async () => {
    const { user } = renderComponent(jobPostsWithRestaurant);

    await user.click(screen.getByRole("button", { name: /reset/i }));

    expect(screen.getByTestId("location")).toHaveTextContent("");
  });

  it("should clear the search input when clicking clear icon", async () => {
    const { user, searchInput } = renderComponent(jobPostsWithRestaurant);

    await user.type(searchInput, "Frontend");
    await user.click(screen.getByRole("button", { name: /clear/i }));

    expect(searchInput).toHaveValue("");
  });
});

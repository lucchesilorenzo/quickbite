import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationDisplay from "@tests/LocationDisplay";
import { customRender } from "@tests/utils/custom-render";
import { MemoryRouter } from "react-router-dom";

import JobPostsProvider from "./JobPostsProvider";
import { useJobPosts } from "./JobPostsProvider";

function TestConsumer() {
  const {
    searchQuery,
    salaryRange,
    employmentType,
    sortBy,
    setSearchQuery,
    setSalaryRange,
    setEmploymentType,
    handleApplyFilters,
    handleResetFilters,
    handleApplySort,
  } = useJobPosts();

  return (
    <div>
      <div data-testid="search">{searchQuery}</div>
      <div data-testid="min-salary">{salaryRange[0]}</div>
      <div data-testid="max-salary">{salaryRange[1]}</div>
      <div data-testid="employment">{employmentType}</div>
      <div data-testid="sort-by">{sortBy}</div>

      <button onClick={() => setSearchQuery("Frontend")}>Set search</button>
      <button onClick={() => setSalaryRange([20000, 50000])}>Set salary</button>
      <button onClick={() => setEmploymentType("contract")}>
        Set employment
      </button>

      <button onClick={handleApplyFilters}>Apply</button>
      <button onClick={handleResetFilters}>Reset</button>
      <button onClick={() => handleApplySort("asc")}>Sort (asc)</button>
      <button onClick={() => handleApplySort("desc")}>Sort (desc)</button>
    </div>
  );
}

describe("JobPostsProvider", () => {
  function renderComponent(queryParams?: string) {
    const user = userEvent.setup();

    customRender(
      <MemoryRouter initialEntries={[`/rider/job-posts${queryParams}`]}>
        <JobPostsProvider>
          <TestConsumer />
          <LocationDisplay />
        </JobPostsProvider>
      </MemoryRouter>,
    );

    return { user };
  }

  it("should initialize state from search params", () => {
    renderComponent(
      "?search=Frontend&min_salary=20000&max_salary=50000&employment_type=contract&sort_by=asc",
    );

    expect(screen.getByTestId("search")).toHaveTextContent("Frontend");
    expect(screen.getByTestId("min-salary")).toHaveTextContent("20000");
    expect(screen.getByTestId("max-salary")).toHaveTextContent("50000");
    expect(screen.getByTestId("employment")).toHaveTextContent("contract");
    expect(screen.getByTestId("sort-by")).toHaveTextContent("asc");
  });

  it("should apply filters to search params", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole("button", { name: /set search/i }));
    await user.click(screen.getByRole("button", { name: /set salary/i }));
    await user.click(screen.getByRole("button", { name: /set employment/i }));
    await user.click(screen.getByRole("button", { name: /apply/i }));

    expect(screen.getByTestId("location")).toHaveTextContent(
      "?search=Frontend&min_salary=20000&max_salary=50000&employment_type=contract",
    );
  });

  it.each([
    { sort: "asc", expected: "?sort_by=asc" },
    { sort: "desc", expected: "?sort_by=desc" },
  ])("should apply sort to search params", async ({ sort, expected }) => {
    const { user } = renderComponent();

    await user.click(screen.getByRole("button", { name: new RegExp(sort) }));

    expect(screen.getByTestId("location")).toHaveTextContent(expected);
  });

  it("should reset filters and clear search params", async () => {
    const { user } = renderComponent("?search=Frontend");

    await user.click(screen.getByRole("button", { name: /reset/i }));

    expect(screen.getByTestId("search")).toHaveTextContent("");
    expect(screen.getByTestId("location")).toHaveTextContent("");
  });
});

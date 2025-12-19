import {
  MAX_SALARY,
  MIN_SALARY,
} from "@private/shared/lib/constants/job-posts";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationDisplay from "@tests/LocationDisplay";
import { customRender } from "@tests/utils/custom-render";
import { MemoryRouter } from "react-router-dom";

import JobPostFilters from "./JobPostFilters";

describe("JobPostFilters", () => {
  function renderComponent(queryParams?: string) {
    const user = userEvent.setup();

    customRender(
      <MemoryRouter initialEntries={[`/rider/job-posts${queryParams}`]}>
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
      employmentType: screen.getByRole("combobox"),
    };
  }

  it("should render the filters", () => {
    const { searchInput, minSalarySlider, maxSalarySlider, employmentType } =
      renderComponent();

    expect(searchInput).toBeInTheDocument();
    expect(minSalarySlider).toBeInTheDocument();
    expect(maxSalarySlider).toBeInTheDocument();
    expect(employmentType).toBeInTheDocument();
  });

  it("should render the filters with correct default values", async () => {
    const { searchInput, minSalarySlider, maxSalarySlider, employmentType } =
      renderComponent();

    expect(searchInput).toHaveValue("");
    expect(minSalarySlider).toHaveValue(MIN_SALARY.toString());
    expect(maxSalarySlider).toHaveValue(MAX_SALARY.toString());
    expect(employmentType).toHaveTextContent(/all/i);
  });

  it("should populate state from query params", () => {
    const { searchInput, minSalarySlider, maxSalarySlider, employmentType } =
      renderComponent(
        "?search=Frontend&min_salary=20000&max_salary=50000&employment_type=contract",
      );

    expect(searchInput).toHaveValue("Frontend");
    expect(minSalarySlider).toHaveValue("20000");
    expect(maxSalarySlider).toHaveValue("50000");
    expect(employmentType).toHaveTextContent(/contract/i);
  });

  it("should not update query params until 'Apply' is clicked", async () => {
    const {
      user,
      searchInput,
      minSalarySlider,
      maxSalarySlider,
      employmentType,
    } = renderComponent();

    await user.type(searchInput, "React");
    fireEvent.change(minSalarySlider, { target: { value: "30000" } });
    fireEvent.change(maxSalarySlider, { target: { value: "40000" } });
    await user.click(employmentType);
    await user.click(screen.getByRole("option", { name: /contract/i }));

    expect(screen.getByTestId("location")).toHaveTextContent("");
  });

  it("should apply filters to query params when clicking 'Apply'", async () => {
    const {
      user,
      searchInput,
      minSalarySlider,
      maxSalarySlider,
      employmentType,
    } = renderComponent();

    await user.type(searchInput, "React");
    fireEvent.change(minSalarySlider, { target: { value: "30000" } });
    fireEvent.change(maxSalarySlider, { target: { value: "40000" } });
    await user.click(employmentType);
    await user.click(screen.getByRole("option", { name: /contract/i }));
    await user.click(screen.getByRole("button", { name: /apply/i }));

    expect(screen.getByTestId("location")).toHaveTextContent(
      "?search=React&min_salary=30000&max_salary=40000&employment_type=contract",
    );
  });

  it("should reset filters and clear query params", async () => {
    const { user } = renderComponent(
      "?search=Backend&min_salary=30000&max_salary=40000&employment_type=contract",
    );

    await user.click(screen.getByRole("button", { name: /reset/i }));

    expect(screen.getByTestId("location")).toHaveTextContent("");
  });

  it("should clear the search input when clicking clear icon", async () => {
    const { user, searchInput } = renderComponent("?search=Node");

    await user.click(screen.getByRole("button", { name: /clear/i }));

    expect(searchInput).toHaveValue("");
  });
});

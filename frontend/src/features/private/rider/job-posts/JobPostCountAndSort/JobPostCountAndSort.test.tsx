import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationDisplay from "@tests/LocationDisplay";
import { customRender } from "@tests/utils/custom-render";
import { MemoryRouter } from "react-router-dom";

import JobPostCountAndSort from "./JobPostCountAndSort";

describe("JobPostCountAndSort", () => {
  const user = userEvent.setup();

  function renderComponent(queryParams?: string) {
    customRender(
      <MemoryRouter initialEntries={[`/rider/job-posts${queryParams}`]}>
        <JobPostCountAndSort />
        <LocationDisplay />
      </MemoryRouter>,
    );

    return {
      user,
      searchResultsHeading: screen.getByRole("heading", {
        name: /search results/i,
      }),
      latestButton: screen.getByRole("button", { name: /latest/i }),
      oldestButton: screen.getByRole("button", { name: /oldest/i }),
      jobPostCountText: screen.getByText(/job posts/i),
    };
  }

  it("should render the main structure", () => {
    const {
      searchResultsHeading,
      latestButton,
      oldestButton,
      jobPostCountText,
    } = renderComponent();

    expect(searchResultsHeading).toBeInTheDocument();
    expect(latestButton).toBeInTheDocument();
    expect(oldestButton).toBeInTheDocument();
    expect(jobPostCountText).toBeInTheDocument();
  });

  it("should populate search params if they exist", () => {
    renderComponent("?sort_by=asc");

    expect(screen.getByTestId("location")).toHaveTextContent("?sort_by=asc");
  });

  it("should populate 'sort_by=desc' when clicking the 'latest' button", async () => {
    const { user, latestButton } = renderComponent();

    await user.click(latestButton);

    expect(screen.getByTestId("location")).toHaveTextContent("?sort_by=desc");
  });

  it("should populate 'sort_by=asc' when clicking the 'oldest' button", async () => {
    const { user, oldestButton } = renderComponent();

    await user.click(oldestButton);

    expect(screen.getByTestId("location")).toHaveTextContent("?sort_by=asc");
  });

  it("should not update search params when clicking active sort", async () => {
    const { user, latestButton } = renderComponent("?sort_by=desc");

    await user.click(latestButton);

    expect(screen.getByTestId("location")).toHaveTextContent("?sort_by=desc");
  });
});

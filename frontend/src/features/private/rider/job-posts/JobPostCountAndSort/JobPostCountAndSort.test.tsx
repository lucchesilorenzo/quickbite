import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "@tests/utils/custom-render";

import JobPostCountAndSort from "./JobPostCountAndSort";

let sortBy: "asc" | "desc" = "asc";
const mockHandleApplySort = vi.fn();

vi.mock("@rider/contexts/JobPostsProvider", () => ({
  useJobPosts: () => ({ sortBy, handleApplySort: mockHandleApplySort }),
}));

describe("JobPostCountAndSort", () => {
  const user = userEvent.setup();

  function renderComponent() {
    customRender(<JobPostCountAndSort />);

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

  it("should call handleApplySort('desc') when clicking 'latest'", async () => {
    sortBy = "desc";
    const { user, latestButton } = renderComponent();

    await user.click(latestButton);

    expect(mockHandleApplySort).toHaveBeenCalledWith("desc");
  });

  it("should call handleApplySort('asc') when clicking 'oldest'", async () => {
    sortBy = "asc";
    const { user, oldestButton } = renderComponent();

    await user.click(oldestButton);

    expect(mockHandleApplySort).toHaveBeenCalledWith("asc");
  });
});

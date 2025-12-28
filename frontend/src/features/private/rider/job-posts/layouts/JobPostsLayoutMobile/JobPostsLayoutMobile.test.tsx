import { screen } from "@testing-library/react";
import { customRender } from "@tests/utils/custom-render";

import JobPostsLayoutMobile from "./JobPostsLayoutMobile";

vi.mock("../../JobPostCountAndSort", () => ({
  default: () => <div data-testid="job-post-count-and-sort" />,
}));

vi.mock("../../JobPostList", () => ({
  default: () => <div data-testid="job-post-list" />,
}));

describe("JobPostsLayoutMobile", () => {
  function renderComponent() {
    customRender(<JobPostsLayoutMobile />);
  }

  it("should render JobPostCountAndSort and JobPostList correctly", () => {
    renderComponent();

    expect(screen.getByTestId("job-post-count-and-sort")).toBeInTheDocument();
    expect(screen.getByTestId("job-post-list")).toBeInTheDocument();
  });
});

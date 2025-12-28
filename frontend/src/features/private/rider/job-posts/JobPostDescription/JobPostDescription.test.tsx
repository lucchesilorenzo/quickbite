import { screen } from "@testing-library/react";
import { customRender } from "@tests/utils/custom-render";

import JobPostDescription from "./JobPostDescription";

describe("JobPostDescription", () => {
  const description = "Description";

  function renderComponent(description?: string) {
    customRender(<JobPostDescription description={description} />);
  }

  it("should render the description", () => {
    renderComponent(description);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("should not render the description if not present", () => {
    renderComponent();

    expect(screen.queryByText(description)).not.toBeInTheDocument();
  });
});

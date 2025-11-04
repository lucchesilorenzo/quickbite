import { requirements } from "@rider/lib/utils/requirements";
import { render, screen } from "@testing-library/react";

import RequirementCard from "./RequirementCard";

describe("RequirementCard", () => {
  function renderComponent() {
    render(<RequirementCard requirement={requirements[0]} />);
  }

  it("should render the title and description", () => {
    renderComponent();

    expect(screen.getByText(requirements[0].title)).toBeInTheDocument();
    expect(screen.getByText(requirements[0].description)).toBeInTheDocument();
  });
});

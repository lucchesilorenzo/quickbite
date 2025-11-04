import { requirements } from "@rider/lib/utils/requirements";
import { render, screen } from "@testing-library/react";

import RequirementsStep from "./RequirementsStep";

describe("RequirementsStep", () => {
  function renderComponent() {
    render(<RequirementsStep />);
  }

  it("should render the title, description, and requirement cards", () => {
    renderComponent();

    expect(screen.getByText("Requirements")).toBeInTheDocument();
    expect(screen.getByText(/to apply/i)).toBeInTheDocument();
    requirements.forEach(({ title, description }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });
});

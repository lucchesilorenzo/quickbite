import { render, screen } from "@testing-library/react";

import FinishYourRegistrationStep from "./FinishYourRegistrationStep";

describe("FinishYourRegistrationStep", () => {
  function renderComponent() {
    render(<FinishYourRegistrationStep />);
  }

  it("should render the title and description", () => {
    renderComponent();

    expect(screen.getByText(/almost done/i)).toBeInTheDocument();
    expect(screen.getByText(/review the information/i)).toBeInTheDocument();
  });
});

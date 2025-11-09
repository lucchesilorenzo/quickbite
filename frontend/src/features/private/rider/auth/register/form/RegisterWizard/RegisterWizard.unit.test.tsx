import { render, screen } from "@testing-library/react";

import RegisterWizard from "./RegisterWizard";

vi.mock("../Stepper", () => ({
  default: () => <div data-testid="stepper" />,
}));

vi.mock("../mobile/MobileStepper", () => ({
  default: () => <div data-testid="mobile-stepper" />,
}));

describe("RegisterWizard (unit)", () => {
  function renderComponent() {
    render(<RegisterWizard />);
  }

  it("should render stepper and mobile stepper", () => {
    renderComponent();

    expect(screen.getByTestId("stepper")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-stepper")).toBeInTheDocument();
  });
});

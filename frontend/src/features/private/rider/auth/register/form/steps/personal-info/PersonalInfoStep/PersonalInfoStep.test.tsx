import { render, screen } from "@testing-library/react";

import PersonalInfoStep from "./PersonalInfoStep";

vi.mock("../PersonalInfoNameSection", () => ({
  default: () => <div data-testid="personal-info-name" />,
}));

vi.mock("../PersonalInfoContactSection", () => ({
  default: () => <div data-testid="personal-info-contact" />,
}));

describe("PersonalInfoStep", () => {
  function renderComponent() {
    render(<PersonalInfoStep />);
  }

  it("renders both the name and contact sections", () => {
    renderComponent();

    expect(screen.getByTestId("personal-info-name")).toBeInTheDocument();
    expect(screen.getByTestId("personal-info-contact")).toBeInTheDocument();
  });
});

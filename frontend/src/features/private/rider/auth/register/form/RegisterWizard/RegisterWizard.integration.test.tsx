import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RegisterWizard from "./RegisterWizard";

vi.mock("../mobile/MobileStepper", () => ({
  default: () => <div data-testid="mobile-stepper" />,
}));

describe("RegisterWizard (integration)", () => {
  function renderComponent() {
    const user = userEvent.setup();

    render(<RegisterWizard />);

    return {
      user,
      nextButton: screen.getByRole("button", { name: /next/i }),
    };
  }

  it("should display validation errors when 'Next' button is clicked with empty required fields (step 2)", async () => {
    const { user, nextButton } = renderComponent();

    await user.click(nextButton);
    await user.click(nextButton);

    const alerts = screen.getAllByRole("alert");
    expect(alerts[0]).toHaveTextContent(/first name/i);
    expect(alerts[1]).toHaveTextContent(/last name/i);
    expect(alerts[2]).toHaveTextContent(/email address/i);
    expect(alerts[3]).toHaveTextContent(/phone number/i);
  });
});

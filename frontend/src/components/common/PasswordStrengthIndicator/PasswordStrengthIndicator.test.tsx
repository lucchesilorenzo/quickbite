import { render, screen } from "@testing-library/react";

import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

describe("PasswordStrengthIndicator", () => {
  function renderComponent(strength: number) {
    render(<PasswordStrengthIndicator strength={strength} />);
  }

  it.each([
    { strength: 20, label: "Too weak" },
    { strength: 60, label: "Medium" },
    { strength: 90, label: "Strong" },
  ])(
    "should render correct label for strength $strength",
    ({ strength, label }) => {
      renderComponent(strength);

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
      expect(screen.getByText(label)).toBeInTheDocument();
    },
  );
});

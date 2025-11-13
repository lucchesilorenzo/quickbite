import HeroBackground from "@rider/auth/register/HeroBackground";
import { render, screen } from "@testing-library/react";

describe("HeroBackground", () => {
  function renderComponent() {
    render(<HeroBackground />);
  }

  it("should render the hero background", () => {
    renderComponent();

    expect(screen.getByAltText(/background/i)).toBeInTheDocument();
  });
});

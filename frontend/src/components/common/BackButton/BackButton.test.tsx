import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";

import BackButton from "./BackButton";

vi.mock("react-router-dom", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("react-router-dom")>()),
    useNavigate: vi.fn(),
  };
});

describe("BackButton", () => {
  function renderComponent() {
    const user = userEvent.setup();

    render(<BackButton />);

    return {
      user,
      backButton: screen.getByRole("button", { name: /back/i }),
    };
  }

  it("should render the button", () => {
    const { backButton } = renderComponent();

    expect(backButton).toBeInTheDocument();
  });

  it("should go back to the previous page when the button is clicked", async () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    const { user, backButton } = renderComponent();

    await user.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});

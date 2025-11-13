import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { customRender } from "tests/utils/custom-render";
import { mockAuthState } from "tests/utils/mock-auth-state";

import Header from "./Header";

vi.mock("../HeaderDialog", () => ({
  default: () => (
    <button aria-label="menu" data-testid="header-dialog">
      HeaderDialog
    </button>
  ),
}));

vi.mock("@private/customer/header/CustomerHeaderDialog", () => ({
  default: () => (
    <button aria-label="menu" data-testid="customer-header-dialog">
      CustomerHeaderDialog
    </button>
  ),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...original,
    useNavigate: vi.fn(),
  };
});

describe("Header", () => {
  function renderComponent() {
    const user = userEvent.setup();

    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    customRender(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    return {
      user,
      mockNavigate,
    };
  }

  it("should render main header structure", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
    expect(screen.getByText(/quickbite/i)).toBeInTheDocument();
    expect(screen.getByTestId("header-dialog")).toBeInTheDocument();
    expect(
      screen.queryByTestId("customer-header-dialog"),
    ).not.toBeInTheDocument();
  });

  it("should go back to the previous page when the back button is clicked", async () => {
    const { user, mockNavigate } = renderComponent();

    await user.click(screen.getByRole("button", { name: /back/i }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("should render the customer header dialog when user has customer role", () => {
    mockAuthState("customer");
    renderComponent();

    expect(screen.getByTestId("customer-header-dialog")).toBeInTheDocument();
    expect(screen.queryByTestId("header-dialog")).not.toBeInTheDocument();
  });
});

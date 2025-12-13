import AuthHeader from "@rider/auth/AuthHeader";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "@tests/utils/custom-render";
import { MemoryRouter, useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...original,
    useNavigate: vi.fn(),
  };
});

describe("AuthHeader", () => {
  function renderComponent(path: string = "/rider/auth/register") {
    const user = userEvent.setup();

    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    customRender(
      <MemoryRouter initialEntries={[path]}>
        <AuthHeader />
      </MemoryRouter>,
    );

    return {
      user,
      getBackButton: () => screen.queryByRole("button", { name: /back/i }),
      getLoginLink: () => screen.queryByRole("link", { name: /log in/i }),
      mockNavigate,
    };
  }

  it("should render main header structure", () => {
    const { getBackButton } = renderComponent();

    expect(getBackButton()).toBeInTheDocument();
    expect(screen.getByText(/quickbite/i)).toBeInTheDocument();
  });

  it("should render the login link if pathname is '/rider/auth/register'", () => {
    const { getLoginLink } = renderComponent();

    expect(getLoginLink()).toBeInTheDocument();
  });

  it("should not render the login link if pathname is '/rider/auth/login'", () => {
    const { getLoginLink } = renderComponent("/rider/auth/login");

    expect(getLoginLink()).not.toBeInTheDocument();
  });

  it("should go back to the previous page when the back button is clicked", async () => {
    const { user, mockNavigate, getBackButton } = renderComponent();

    await user.click(getBackButton()!);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});

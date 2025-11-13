import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { customRender } from "tests/utils/custom-render";

import HeaderDialog from "./HeaderDialog";

import { headerDialogOptions } from "@/lib/constants/navigation";

describe("HeaderDialog", () => {
  function renderComponent() {
    const user = userEvent.setup();

    customRender(
      <MemoryRouter>
        <HeaderDialog />
      </MemoryRouter>,
    );

    return { user };
  }

  it("should render the menu button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });

  it("should open the dialog and render all its elements", async () => {
    const { user } = renderComponent();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /menu/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /account/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /log in/i })).toHaveAttribute(
      "href",
      "/customer/auth/login",
    );
    expect(screen.getByRole("link", { name: /create/i })).toHaveAttribute(
      "href",
      "/customer/auth/register",
    );

    headerDialogOptions.forEach((option) => {
      expect(screen.getByRole("link", { name: option.label })).toHaveAttribute(
        "href",
        option.href,
      );
    });
  });

  it("should close the dialog when the close button is clicked", async () => {
    const { user } = renderComponent();
    await user.click(screen.getByRole("button", { name: /menu/i }));

    await user.click(screen.getByRole("button", { name: /close/i }));

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });
});

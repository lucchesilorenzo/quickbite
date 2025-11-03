import { useScrollTrigger } from "@mui/material";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NavigateToTopFloatingButton from "./NavigateToTopFloatingButton";

vi.mock("@mui/material", async (importOriginal) => {
  const original = await importOriginal<typeof import("@mui/material")>();

  return {
    ...original,
    useScrollTrigger: vi.fn(),
  };
});

describe("NavigateToTopFloatingButton", () => {
  function renderComponent() {
    render(<NavigateToTopFloatingButton />);

    return {
      user: userEvent.setup(),
      getButton: () => screen.queryByRole("button", { name: /scroll/i }),
    };
  }

  it("should not render the button when trigger is false", () => {
    vi.mocked(useScrollTrigger).mockReturnValue(false);
    const { getButton } = renderComponent();

    expect(getButton()).not.toBeInTheDocument();
  });

  it("should render the button when trigger is true and no dialog is open", () => {
    vi.mocked(useScrollTrigger).mockReturnValue(true);
    const { getButton } = renderComponent();

    expect(getButton()).toBeInTheDocument();
  });

  it("should hide the button when a dialog is open", async () => {
    vi.mocked(useScrollTrigger).mockReturnValue(true);
    const dialog = document.createElement("div");
    dialog.setAttribute("role", "dialog");
    document.body.appendChild(dialog);
    const { getButton } = renderComponent();

    expect(getButton()).not.toBeVisible();
  });

  it("scrolls smoothly to the top anchor when clicked", async () => {
    vi.mocked(useScrollTrigger).mockReturnValue(true);
    const anchor = document.createElement("header");
    anchor.id = "back-to-top";
    anchor.scrollIntoView = vi.fn();
    document.body.appendChild(anchor);
    const { user, getButton } = renderComponent();

    await user.click(getButton()!);

    expect(anchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
    });
  });
});

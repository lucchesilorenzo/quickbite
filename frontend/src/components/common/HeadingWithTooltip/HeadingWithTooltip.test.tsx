import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import HeadingWithTooltip from "./HeadingWithTooltip";

describe("HeadingWithTooltip", () => {
  const headingText = "Product details";
  const tooltipMessage = "More info about this product";
  const placement = "top";

  function renderComponent() {
    render(
      <HeadingWithTooltip
        headingText={headingText}
        tooltipMessage={tooltipMessage}
        placement={placement}
      />,
    );

    return {
      user: userEvent.setup(),
    };
  }

  it("should render the heading and button", () => {
    renderComponent();

    expect(screen.getByText(headingText)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should not render the tooltip initially", () => {
    renderComponent();

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("should show the tooltip on click", async () => {
    const { user } = renderComponent();

    const button = screen.getByRole("button", { name: tooltipMessage });
    await user.click(button);

    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveTextContent(tooltipMessage);
  });

  it("should hide the tooltip on click away", async () => {
    const { user } = renderComponent();
    const button = screen.getByRole("button", { name: tooltipMessage });
    await user.click(button);

    await user.click(document.body);

    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";

import FullPageErrorMessage from "./FullPageErrorMessage";

describe("FullPageErrorMessage", () => {
  const message = "Error message";
  const secondaryMessage = "Secondary message";

  function renderComponent(secondaryMessage?: string) {
    render(
      <FullPageErrorMessage
        message={message}
        secondaryMessage={secondaryMessage}
      />,
    );
  }

  it("should render the error message", () => {
    renderComponent();

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should render the secondary message", () => {
    renderComponent(secondaryMessage);

    expect(screen.getByText(secondaryMessage)).toBeInTheDocument();
  });

  it("should not render the secondary message when not provided", () => {
    renderComponent();

    expect(screen.queryByText(secondaryMessage)).not.toBeInTheDocument();
  });
});

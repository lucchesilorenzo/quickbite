import { render, screen } from "@testing-library/react";

import HeadingBlock from "./HeadingBlock";

vi.mock("../BackButton", () => ({
  default: () => <div data-testid="back-button" />,
}));

describe("HeadingBlock", () => {
  function renderComponent(description?: string, backButton: boolean = false) {
    const title = "Title";

    render(
      <HeadingBlock
        title={title}
        description={description}
        backButton={backButton}
      />,
    );

    return {
      getTitle: () => screen.queryByText(title),
      getBackButton: () => screen.queryByTestId("back-button"),
      getDescription: () =>
        description ? screen.queryByText(description) : null,
    };
  }

  it("should render the title", () => {
    const { getTitle, getBackButton, getDescription } = renderComponent();

    expect(getTitle()).toBeInTheDocument();
    expect(getBackButton()).not.toBeInTheDocument();
    expect(getDescription()).not.toBeInTheDocument();
  });

  it("should render the back button", () => {
    const { getBackButton } = renderComponent(undefined, true);

    expect(getBackButton()).toBeInTheDocument();
  });

  it("should render the description", () => {
    const { getDescription } = renderComponent("Description");

    expect(getDescription()).toBeInTheDocument();
  });
});

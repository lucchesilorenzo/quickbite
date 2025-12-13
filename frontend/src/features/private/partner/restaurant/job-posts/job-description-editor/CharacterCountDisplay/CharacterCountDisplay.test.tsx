import { render, screen } from "@testing-library/react";

import CharacterCountDisplay from "./CharacterCountDisplay";

describe("CharacterCountDisplay", () => {
  const descriptionError = "Description is required.";

  function renderComponent(characterCount: number) {
    render(
      <CharacterCountDisplay
        descriptionError={descriptionError}
        characterCount={characterCount}
      />,
    );
  }

  it("should display description error", () => {
    renderComponent(1);

    expect(screen.getByText(descriptionError)).toBeInTheDocument();
  });

  it("should display character count", () => {
    renderComponent(1);

    expect(screen.getByText("1 / 2000")).toBeInTheDocument();
  });
});

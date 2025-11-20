import React from "react";

import { render, screen } from "@testing-library/react";
import { RichTextEditorRef } from "mui-tiptap";

import CharacterCountDisplay from "./CharacterCountDisplay";

describe("CharacterCountDisplay", () => {
  const descriptionError = "Description is required.";

  function makeMockRef(count: number | null) {
    return {
      current: {
        editor: {
          storage: {
            characterCount: {
              characters: vi.fn(() => count),
            },
          },
        },
      },
    } as any;
  }

  function renderComponent(
    mockRteRef: React.RefObject<RichTextEditorRef | null>,
  ) {
    render(
      <CharacterCountDisplay
        descriptionError={descriptionError}
        rteRef={mockRteRef}
      />,
    );
  }

  it("should display description error", () => {
    renderComponent(makeMockRef(100));

    expect(screen.getByText(descriptionError)).toBeInTheDocument();
  });

  it("should display character count", () => {
    renderComponent(makeMockRef(100));

    expect(screen.getByText("100 / 2000")).toBeInTheDocument();
  });

  it("should display 0 if rteRef is null", () => {
    renderComponent(makeMockRef(null));

    expect(screen.getByText("0 / 2000")).toBeInTheDocument();
  });
});

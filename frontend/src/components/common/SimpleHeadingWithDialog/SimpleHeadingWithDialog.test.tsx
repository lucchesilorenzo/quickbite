import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useSearchParams } from "react-router-dom";

import SimpleHeadingWithDialog from "./SimpleHeadingWithDialog";

vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...original,
    useSearchParams: vi.fn(),
  };
});

describe("SimpleHeadingWithDialog", () => {
  const headingText = "Heading text";
  const title = "Title";
  const content = "Content";
  const actionText = "Action text";

  function renderComponent(hasFilters: boolean) {
    const mockSetSearchParams = vi.fn();

    const mockSearchParams = {
      getAll: vi.fn((name: string) =>
        hasFilters && ["filter", "mov", "sort_by", "q"].includes(name)
          ? ["something"]
          : [],
      ),
    } as unknown as URLSearchParams;

    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    render(
      <MemoryRouter>
        <SimpleHeadingWithDialog
          headingText={headingText}
          title={title}
          content={content}
          actionText={actionText}
        />
      </MemoryRouter>,
    );

    return {
      user: userEvent.setup(),
      infoButton: screen.getByRole("button", { name: /info/i }),
      getCloseButton: () => screen.queryByRole("button", { name: /close/i }),
      getDialog: () => screen.queryByRole("dialog"),
      getClearAllFiltersButton: () =>
        screen.queryByRole("button", { name: /filters/i }),
    };
  }

  describe("Heading", () => {
    it("should render the heading and info button", () => {
      const { infoButton } = renderComponent(false);

      expect(
        screen.getByRole("heading", { name: headingText }),
      ).toBeInTheDocument();
      expect(infoButton).toBeInTheDocument();
    });

    it("should not render the 'Clear all filters' button when there are no filters", () => {
      const { getClearAllFiltersButton } = renderComponent(false);

      expect(getClearAllFiltersButton()).not.toBeInTheDocument();
    });

    it("should render the 'Clear all filters' button when there are filters", () => {
      const { getClearAllFiltersButton } = renderComponent(true);

      expect(getClearAllFiltersButton()).toBeInTheDocument();
    });
  });

  describe("Dialog", () => {
    it("should open the dialog and render all its elements", async () => {
      const { user, infoButton, getCloseButton, getDialog } =
        renderComponent(false);

      expect(getDialog()).not.toBeInTheDocument();

      await user.click(infoButton);

      expect(getDialog()).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
      expect(getCloseButton()).toBeInTheDocument();
      expect(screen.getByText(content)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: actionText })).toHaveAttribute(
        "href",
        "/how-we-rank",
      );
    });

    it("should close the dialog when the close button is clicked", async () => {
      const { user, infoButton, getCloseButton, getDialog } =
        renderComponent(false);
      await user.click(infoButton);

      await user.click(getCloseButton()!);

      await waitForElementToBeRemoved(getDialog);
    });
  });
});

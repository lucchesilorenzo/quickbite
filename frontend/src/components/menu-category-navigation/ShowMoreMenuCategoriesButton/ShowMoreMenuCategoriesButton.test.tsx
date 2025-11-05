import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { menuCategories } from "tests/mocks/data/menu";

import ShowMoreMenuCategoriesButton from "./ShowMoreMenuCategoriesButton";

const mockOpenMenuCategoryNavigationDialog = vi.fn();

vi.mock(
  "@/components/menu-category-navigation/MenuCategoryNavigationDialog",
  () => ({
    default: (props: any) => {
      mockOpenMenuCategoryNavigationDialog(props);

      return props.openMenuCategoryNavigationDialog ? (
        <div data-testid="menu-category-navigation-dialog" />
      ) : null;
    },
  }),
);

describe("ShowMoreMenuCategoriesButton", () => {
  function renderComponent() {
    const user = userEvent.setup();

    const mockOnSlideClick = vi.fn();

    render(
      <ShowMoreMenuCategoriesButton
        menuCategories={menuCategories}
        onSlideClick={mockOnSlideClick}
      />,
    );

    return {
      user,
      mockOnSlideClick,
    };
  }

  it("should open the dialog when clicking the button", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole("button"));

    expect(mockOpenMenuCategoryNavigationDialog).toHaveBeenLastCalledWith(
      expect.objectContaining({ openMenuCategoryNavigationDialog: true }),
    );
    expect(
      screen.getByTestId("menu-category-navigation-dialog"),
    ).toBeInTheDocument();
  });

  it("should not open the dialog when openMenuCategoryNavigationDialog is false", () => {
    renderComponent();

    expect(mockOpenMenuCategoryNavigationDialog).toHaveBeenLastCalledWith(
      expect.objectContaining({ openMenuCategoryNavigationDialog: false }),
    );
    expect(
      screen.queryByTestId("menu-category-navigation-dialog"),
    ).not.toBeInTheDocument();
  });
});

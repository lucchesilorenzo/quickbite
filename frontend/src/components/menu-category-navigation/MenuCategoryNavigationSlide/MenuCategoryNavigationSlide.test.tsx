import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { navigationMenuCategories } from "@tests/mocks/data/public/menu";

import MenuCategoryNavigationSlide from "./MenuCategoryNavigationSlide";

describe("MenuCategoryNavigationSlide", () => {
  function renderComponent() {
    const user = userEvent.setup();

    const mockOnSlideClick = vi.fn();

    render(
      <MenuCategoryNavigationSlide
        menuCategory={navigationMenuCategories[0]}
        selectedMenuCategoryId={navigationMenuCategories[0].id}
        onSlideClick={mockOnSlideClick}
      />,
    );

    return {
      user,
      getSlideButton: () =>
        screen.queryByRole("button", {
          name: navigationMenuCategories[0].name,
        }),
      mockOnSlideClick,
    };
  }

  it("should render the slide button", () => {
    const { getSlideButton } = renderComponent();

    expect(getSlideButton()).toBeInTheDocument();
  });

  it("should call onSlideClick when slide button is clicked", async () => {
    const { user, mockOnSlideClick, getSlideButton } = renderComponent();

    await user.click(getSlideButton()!);

    expect(mockOnSlideClick).toHaveBeenCalledWith(
      navigationMenuCategories[0].id,
    );
    expect(mockOnSlideClick).toHaveBeenCalledTimes(1);
  });
});

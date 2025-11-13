import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { menuCategories } from "tests/mocks/data/menu";
import { mockAuthState } from "tests/utils/mock-auth-state";

import MenuCategoryNavigationItem from "./MenuCategoryNavigationItem";

vi.mock("../MenuItemQuantityInCartBadge", () => ({
  default: () => <div data-testid="cart-badge" />,
}));

describe("MenuCategoryNavigationItem", () => {
  function renderComponent(isLast: boolean) {
    const user = userEvent.setup();

    const mockSetOpenMenuCategoryNavigationDialog = vi.fn();
    const mockOnSlideClick = vi.fn();

    render(
      <MenuCategoryNavigationItem
        menuCategory={menuCategories[0]}
        isLast={isLast}
        setOpenMenuCategoryNavigationDialog={
          mockSetOpenMenuCategoryNavigationDialog
        }
        onSlideClick={mockOnSlideClick}
      />,
    );

    return {
      user,
      getMenuCategoryItemButton: () =>
        screen.queryByRole("button", { name: menuCategories[0].name }),
      getCartBadge: () => screen.queryByTestId("cart-badge"),
      getSeparator: () => screen.queryByRole("separator"),
      mockSetOpenMenuCategoryNavigationDialog,
      mockOnSlideClick,
    };
  }

  it("should render button and separator when isLast is false", () => {
    const { getMenuCategoryItemButton, getSeparator } = renderComponent(false);

    expect(getMenuCategoryItemButton()).toBeInTheDocument();
    expect(getSeparator()).toBeInTheDocument();
  });

  it("should not render separator when isLast is true", () => {
    const { getSeparator } = renderComponent(true);

    expect(getSeparator()).not.toBeInTheDocument();
  });

  it("should call onSlideClick and setOpenMenuCategoryNavigationDialog(false) when button is clicked", async () => {
    const {
      user,
      getMenuCategoryItemButton,
      mockSetOpenMenuCategoryNavigationDialog,
      mockOnSlideClick,
    } = renderComponent(false);

    await user.click(getMenuCategoryItemButton()!);

    expect(mockOnSlideClick).toHaveBeenCalledWith(menuCategories[0].id);
    expect(mockOnSlideClick).toHaveBeenCalledTimes(1);
    expect(mockSetOpenMenuCategoryNavigationDialog).toHaveBeenCalledWith(false);
    expect(mockSetOpenMenuCategoryNavigationDialog).toHaveBeenCalledTimes(1);
  });

  it("should render MenuItemQuantityInCartBadge component if user is null", () => {
    mockAuthState(null);
    const { getCartBadge } = renderComponent(false);

    expect(getCartBadge()).toBeInTheDocument();
  });

  it("should render MenuItemQuantityInCartBadge component if user is a customer", () => {
    mockAuthState("customer");
    const { getCartBadge } = renderComponent(false);

    expect(getCartBadge()).toBeInTheDocument();
  });

  it("should not render MenuItemQuantityInCartBadge component if user is different from customer role", () => {
    mockAuthState("partner");
    const { getCartBadge } = renderComponent(false);

    expect(getCartBadge()).not.toBeInTheDocument();
  });
});

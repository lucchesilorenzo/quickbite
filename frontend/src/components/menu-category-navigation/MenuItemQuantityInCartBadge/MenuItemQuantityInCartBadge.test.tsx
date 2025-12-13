import { render, screen } from "@testing-library/react";
import { cartItem } from "@tests/mocks/data/public/carts";
import { menuCategories, menuItem } from "@tests/mocks/data/public/menu";
import { restaurantData } from "@tests/mocks/data/public/restaurants";

import MenuItemQuantityInCartBadge from "./MenuItemQuantityInCartBadge";

const mockGetItem = vi.fn();

vi.mock("@/contexts/RestaurantProvider", () => ({
  useRestaurant: () => ({ restaurantData }),
}));

vi.mock("@/contexts/MultiCartProvider", () => ({
  useMultiCart: () => ({ getItem: mockGetItem }),
}));

describe("MenuItemQuantityInCartBadge", () => {
  function renderComponent() {
    render(
      <MenuItemQuantityInCartBadge
        type="from-list"
        menuItem={menuItem}
        menuCategory={menuCategories[0]}
      />,
    );

    return {
      getBadge: () => screen.queryByRole("status"),
    };
  }

  it("should render the badge quantity when item is in cart", () => {
    mockGetItem.mockReturnValue(cartItem);
    const { getBadge } = renderComponent();

    expect(getBadge()).toHaveTextContent(cartItem.quantity.toString());
  });

  it("should not render the badge quantity when item is not in cart", () => {
    mockGetItem.mockReturnValue(undefined);
    const { getBadge } = renderComponent();

    expect(getBadge()).not.toHaveTextContent(cartItem.quantity.toString());
  });
});

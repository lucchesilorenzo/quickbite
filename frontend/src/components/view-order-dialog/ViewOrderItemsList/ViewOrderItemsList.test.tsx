import { render, screen } from "@testing-library/react";
import { order } from "@tests/mocks/data/private/orders";

import ViewOrderItemsList from "./ViewOrderItemsList";

describe("ViewOrderItemsList", () => {
  function renderComponent() {
    render(<ViewOrderItemsList order={order} />);
  }

  it("should render the section title and order items", () => {
    renderComponent();

    expect(screen.getByText(/your articles/i)).toBeInTheDocument();
    order.order_items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});

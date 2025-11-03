import { render, screen } from "@testing-library/react";
import { orderItem } from "tests/mocks/data/orders";

import ViewOrderItem from "./ViewOrderItem";

describe("ViewOrderItem", () => {
  function renderComponent(isLast: boolean) {
    render(<ViewOrderItem item={orderItem} isLast={isLast} />);
  }

  it("should render item quantity, name and total", () => {
    renderComponent(false);

    expect(screen.getByText(orderItem.quantity)).toBeInTheDocument();
    expect(screen.getByText(orderItem.name)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(orderItem.item_total.toString(), "i")),
    ).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("should not render separator when isLast is true", () => {
    renderComponent(true);

    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });
});

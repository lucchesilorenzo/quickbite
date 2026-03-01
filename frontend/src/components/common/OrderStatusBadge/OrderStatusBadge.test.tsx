import { OrderStatus } from "@private/shared/types/order.types";
import { render, screen } from "@testing-library/react";

import OrderStatusBadge from "./OrderStatusBadge";

import { orderStatuses } from "@/lib/data/orders.data";

describe("OrderStatusBadge", () => {
  function renderComponent(status: OrderStatus) {
    render(<OrderStatusBadge orderStatus={status} />);
  }

  it.each(Object.values(orderStatuses))(
    "should render correct label for $value status",
    ({ value, label }) => {
      renderComponent(value);

      expect(screen.getByText(label)).toBeInTheDocument();
    },
  );
});

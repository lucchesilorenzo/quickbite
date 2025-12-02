import { render, screen } from "@testing-library/react";

import OrderStatusBadge from "./OrderStatusBadge";

import { OrderStatus } from "@/features/private/types/order.types";
import { orderStatuses } from "@/lib/constants/orders";

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

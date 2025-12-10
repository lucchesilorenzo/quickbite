import { Order } from "@private/shared/types/order.types";
import { render, screen } from "@testing-library/react";
import { order } from "@tests/mocks/data/private/orders";
import { vi } from "vitest";

import ViewOrderFeesAndDiscounts from "./ViewOrderFeesAndDiscounts";

vi.mock("@/lib/utils/formatting", () => ({
  formatCurrency: (value: number) => value.toString(),
}));

describe("ViewOrderFeesAndDiscounts", () => {
  function renderComponent(order: Order) {
    render(<ViewOrderFeesAndDiscounts order={order} />);
  }

  it("should render the section title", () => {
    renderComponent(order);

    expect(screen.getByText(/fees and discounts/i)).toBeInTheDocument();
  });

  it("should render subtotal, delivery fee, service fee, discount and total", () => {
    renderComponent(order);

    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText(order.subtotal)).toBeInTheDocument();
    expect(screen.getByText("Delivery fee")).toBeInTheDocument();
    expect(screen.getByText(order.delivery_fee)).toBeInTheDocument();
    expect(screen.getByText("Service fee")).toBeInTheDocument();
    expect(screen.getByText(order.service_fee)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${order.discount_rate * 100}%`, "i")),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(order.discount.toString(), "i")),
    ).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText(order.total)).toBeInTheDocument();
  });

  it("should render 'Free' when delivery fee is 0", () => {
    renderComponent({ ...order, delivery_fee: 0 });

    expect(screen.queryByText(order.delivery_fee)).not.toBeInTheDocument();
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("should not render service fee section when service_fee is 0", () => {
    renderComponent({ ...order, service_fee: 0 });

    expect(screen.queryByTestId("service-fee-section")).not.toBeInTheDocument();
  });

  it("should not render discount section when discount is 0", () => {
    renderComponent({ ...order, discount: 0 });

    expect(screen.queryByTestId("discount-section")).not.toBeInTheDocument();
  });
});

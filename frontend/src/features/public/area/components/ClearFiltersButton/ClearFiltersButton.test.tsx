import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ClearFiltersButton from "./ClearFiltersButton";

describe("ClearFiltersButton", () => {
  function renderComponent() {
    const user = userEvent.setup();

    const mockOnHandleClick = vi.fn();

    render(
      <ClearFiltersButton type="sidebar" onHandleClick={mockOnHandleClick}>
        Clear all filters
      </ClearFiltersButton>,
    );

    return {
      user,
      clearFiltersButton: screen.getByRole("button", { name: /clear/i }),
      mockOnHandleClick,
    };
  }

  it("should render the button", () => {
    const { clearFiltersButton } = renderComponent();

    expect(clearFiltersButton).toBeInTheDocument();
  });

  it("should call onHandleClick when the button is clicked", async () => {
    const { user, clearFiltersButton, mockOnHandleClick } = renderComponent();

    await user.click(clearFiltersButton);

    expect(mockOnHandleClick).toHaveBeenCalledTimes(1);
  });
});

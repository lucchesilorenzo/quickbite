import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "tests/utils/custom-render";

import ServiceFeeDialog from "./ServiceFeeDialog";

describe("ServiceFeeDialog", () => {
  function renderComponent(open: boolean) {
    const mockSetOpenServiceFeeDialog = vi.fn();

    customRender(
      <ServiceFeeDialog
        openServiceFeeDialog={open}
        setOpenServiceFeeDialog={mockSetOpenServiceFeeDialog}
      />,
    );

    return {
      user: userEvent.setup(),
      mockSetOpenServiceFeeDialog,
    };
  }

  it("should render the dialog when openServiceFeeDialog is true", () => {
    renderComponent(true);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should render main dialog structure", () => {
    renderComponent(true);

    expect(
      screen.getByRole("heading", { name: /service fee/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    expect(screen.getByText(/improve our overall/i)).toBeInTheDocument();
  });

  it("should call setOpenServiceFeeDialog(false) when clicking close button", async () => {
    const { user, mockSetOpenServiceFeeDialog } = renderComponent(true);

    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(mockSetOpenServiceFeeDialog).toHaveBeenCalledWith(false);
  });

  it("should not render when openServiceFeeDialog is false", () => {
    renderComponent(false);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

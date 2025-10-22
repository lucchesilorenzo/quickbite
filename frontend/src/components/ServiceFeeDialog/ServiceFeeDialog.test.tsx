import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "tests/utils/custom-render";

import ServiceFeeDialog from "./ServiceFeeDialog";

describe("ServiceFeeDialog", () => {
  function renderComponent(open: boolean) {
    const setOpenServiceFeeDialog = vi.fn();

    customRender(
      <ServiceFeeDialog
        openServiceFeeDialog={open}
        setOpenServiceFeeDialog={setOpenServiceFeeDialog}
      />,
    );

    return {
      user: userEvent.setup(),
      setOpenServiceFeeDialog,
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
    const { user, setOpenServiceFeeDialog } = renderComponent(true);

    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(setOpenServiceFeeDialog).toHaveBeenCalledWith(false);
  });

  it("should not render when openServiceFeeDialog is false", () => {
    renderComponent(false);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

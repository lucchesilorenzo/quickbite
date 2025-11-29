import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { address } from "@tests/mocks/data/public/addresses";
import { customRender } from "@tests/utils/custom-render";

import EditLocationDialog from "./EditLocationDialog";

import { useAddress } from "@/contexts/AddressProvider";
import { Address } from "@/types/address-types";

vi.mock("@/contexts/AddressProvider", () => ({
  useAddress: vi.fn(),
}));

vi.mock("../EditLocationForm", () => ({
  default: () => <div data-testid="edit-location-form" />,
}));

describe("EditLocationDialog", () => {
  function renderComponent(open: boolean, address?: Address) {
    const user = userEvent.setup();

    const mockOnCloseDialogs = vi.fn();

    vi.mocked(useAddress).mockReturnValue({
      currentAddress: address ?? null,
      setCurrentAddress: vi.fn(),
    });

    customRender(
      <EditLocationDialog
        openEditLocationDialog={open}
        onCloseDialogs={mockOnCloseDialogs}
      />,
    );

    return {
      user,
      getDialog: () => screen.queryByRole("dialog"),
      getCloseButton: () => screen.queryByRole("button", { name: /close/i }),
      mockOnCloseDialogs,
    };
  }

  it("should render the dialog when openEditLocationDialog is true", () => {
    const { getDialog } = renderComponent(true);

    expect(getDialog()).toBeInTheDocument();
  });

  it("should render the main dialog structure", () => {
    const { getCloseButton } = renderComponent(true, address);

    expect(screen.getByRole("heading", { name: /help/i })).toBeInTheDocument();
    expect(getCloseButton()).toBeInTheDocument();
    expect(screen.getByText(/accurate/i)).toBeInTheDocument();
    expect(screen.getByTestId("edit-location-form")).toBeInTheDocument();
  });

  it("should display the current address display name when available", () => {
    renderComponent(true, address);

    expect(
      screen.getByText(new RegExp(address.display_name, "i")),
    ).toBeInTheDocument();
  });

  it("should call onCloseDialogs when clicking close button", async () => {
    const { user, getCloseButton, mockOnCloseDialogs } = renderComponent(true);

    await user.click(getCloseButton()!);

    expect(mockOnCloseDialogs).toHaveBeenCalledTimes(1);
  });

  it("should not render the dialog when openEditLocationDialog is false", () => {
    const { getDialog } = renderComponent(false);

    expect(getDialog()).not.toBeInTheDocument();
  });
});

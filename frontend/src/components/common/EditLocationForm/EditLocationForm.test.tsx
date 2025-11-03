import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";
import { address } from "tests/mocks/data/addresses";
import { simulateError, simulateInfiniteLoading } from "tests/utils/msw";

import EditLocationForm from "./EditLocationForm";

import { useAddress } from "@/contexts/AddressProvider";
import { generateSlug } from "@/lib/utils/formatting";
import { Address } from "@/types/address-types";
import { TEditLocationFormSchema } from "@/validations/location-validations";

vi.mock("@/contexts/AddressProvider", () => ({
  useAddress: vi.fn(),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...original,
    useNavigate: vi.fn(),
  };
});

describe("EditLocationForm", () => {
  function renderComponent(address?: Address) {
    const user = userEvent.setup();

    const mockOnCloseDialogs = vi.fn();
    const mockSetCurrentAddress = vi.fn();
    const mockShow = vi.fn();
    const mockNavigate = vi.fn();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useNotifications).mockReturnValue({
      show: mockShow,
      close: vi.fn(),
    });
    vi.mocked(useAddress).mockReturnValue({
      currentAddress: address ?? null,
      setCurrentAddress: mockSetCurrentAddress,
    });

    render(<EditLocationForm onCloseDialogs={mockOnCloseDialogs} />);

    return {
      expectErrorToBeInTheDocument: (errorMessage: RegExp) => {
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
      },
      waitForFormToLoad: async () => {
        const houseNumberInput = screen.getByLabelText(/house/i);
        const submitButton = screen.getByRole("button", { name: /confirm/i });

        type FormData = {
          [K in keyof TEditLocationFormSchema]: any;
        };

        const validData: FormData = {
          house_number: 1,
        };

        async function fill(data: FormData) {
          if (data.house_number !== undefined) {
            await user.type(houseNumberInput, data.house_number.toString());
          }

          await user.click(submitButton);
        }

        return {
          houseNumberInput,
          submitButton,
          validData,
          fill,
        };
      },
      mockOnCloseDialogs,
      mockSetCurrentAddress,
      mockShow,
      mockNavigate,
    };
  }

  it("should render the main form structure", async () => {
    const { waitForFormToLoad } = renderComponent();

    const { houseNumberInput, submitButton } = await waitForFormToLoad();
    expect(houseNumberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it.each([
    {
      scenario: "not a number",
      house_number: "a",
      errorMessage: /must be a number/i,
    },
    {
      scenario: "negative number",
      house_number: -1,
      errorMessage: /must be a positive number/i,
    },
    {
      scenario: "not an integer",
      house_number: 1.1,
      errorMessage: /must be an integer/i,
    },
  ])(
    "should display an error if house_number is $scenario",
    async ({ house_number, errorMessage }) => {
      const { waitForFormToLoad, expectErrorToBeInTheDocument } =
        renderComponent();

      const form = await waitForFormToLoad();
      await form.fill({ ...form.validData, house_number });

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it("should call navigate and onCloseDialogs if call to eu1.locationiq.com/v1/autocomplete is successful", async () => {
    const {
      waitForFormToLoad,
      mockSetCurrentAddress,
      mockOnCloseDialogs,
      mockNavigate,
    } = renderComponent(address);
    const form = await waitForFormToLoad();
    await form.fill(form.validData);

    expect(mockSetCurrentAddress).toHaveBeenCalledWith(address);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/area/${generateSlug(address.display_name)}?lat=${address.lat}&lon=${address.lon}`,
    );
    expect(mockOnCloseDialogs).toHaveBeenCalled();
  });

  it("should render a toast if call to eu1.locationiq.com/v1/autocomplete fails", async () => {
    simulateError("https://eu1.locationiq.com/v1/autocomplete");
    const { waitForFormToLoad, mockShow } = renderComponent(address);
    const form = await waitForFormToLoad();
    await form.fill(form.validData);

    expect(mockShow).toHaveBeenCalledWith(
      "There was an error fetching your location.",
      expect.objectContaining({
        key: "geolocation-error",
        severity: "error",
      }),
    );
  });

  it("should render the loading indicator upon submission", async () => {
    simulateInfiniteLoading("https://eu1.locationiq.com/v1/autocomplete");
    const { waitForFormToLoad } = renderComponent(address);

    const form = await waitForFormToLoad();
    await form.fill(form.validData);

    expect(form.submitButton).toHaveTextContent(/confirming/i);
  });

  it("should not render the loading indicator after submission", async () => {
    const { waitForFormToLoad } = renderComponent(address);

    const form = await waitForFormToLoad();
    await form.fill(form.validData);

    expect(form.submitButton).not.toHaveTextContent(/confirming/i);
  });

  it("should not render the loading indicator if submission fails", async () => {
    simulateError("https://eu1.locationiq.com/v1/autocomplete");
    const { waitForFormToLoad } = renderComponent(address);

    const form = await waitForFormToLoad();
    await form.fill(form.validData);

    expect(form.submitButton).not.toHaveTextContent(/confirming/i);
  });
});

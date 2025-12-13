import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { order } from "@tests/mocks/data/private/orders";
import { customRender } from "@tests/utils/custom-render";
import { simulateDelay, simulateError } from "@tests/utils/msw";

import ViewOrderReceipt from "./ViewOrderReceipt";

import env from "@/lib/env";

let mockLoading = false;
let mockError: Error | null = null;

vi.mock("@react-pdf/renderer", async (importOriginal) => {
  const original = await importOriginal<typeof import("@react-pdf/renderer")>();

  return {
    ...original,
    PDFDownloadLink: ({ children }: any) =>
      children({ loading: mockLoading, error: mockError }),
  };
});

beforeEach(() => {
  mockLoading = false;
  mockError = null;
});

describe("ViewOrderReceipt", () => {
  function renderComponent() {
    customRender(<ViewOrderReceipt order={order} />);

    return {
      getLoadingText: () => screen.queryByRole("progressbar"),
    };
  }

  it("should render the 'View receipt' button", async () => {
    renderComponent();

    expect(
      await screen.findByRole("button", { name: /view/i }),
    ).toBeInTheDocument();
  });

  it("should show loading state when saving", async () => {
    mockLoading = true;
    renderComponent();

    expect(
      await screen.findByRole("button", { name: /loading/i }),
    ).toBeInTheDocument();
  });

  it("should show error message if saving fails", async () => {
    mockError = new Error();
    renderComponent();

    expect(
      await screen.findByRole("button", { name: /error/i }),
    ).toBeInTheDocument();
  });

  it("should render the loading indicator when fetching the logo", async () => {
    simulateDelay(
      `${env.VITE_BASE_URL}/api/restaurants/${order.restaurant.id}/base64-logo`,
    );
    const { getLoadingText } = renderComponent();

    expect(getLoadingText()).toBeInTheDocument();
  });

  it("should not render the loading indicator after fetching the logo", async () => {
    const { getLoadingText } = renderComponent();

    await waitForElementToBeRemoved(getLoadingText);
  });

  it("should not render the loading indicator if fetching the logo fails", async () => {
    simulateError(
      `${env.VITE_BASE_URL}/api/restaurants/${order.restaurant.id}/base64-logo`,
    );
    const { getLoadingText } = renderComponent();

    await waitForElementToBeRemoved(getLoadingText);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});

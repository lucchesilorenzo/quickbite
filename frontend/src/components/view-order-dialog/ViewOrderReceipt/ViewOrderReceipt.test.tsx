import { screen } from "@testing-library/react";
import { order } from "tests/mocks/data/orders";
import { customRender } from "tests/utils/custom-render";

import ViewOrderReceipt from "./ViewOrderReceipt";

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
    return customRender(<ViewOrderReceipt order={order} />);
  }

  it("should render the 'View receipt' button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: /view/i })).toBeInTheDocument();
  });

  it("should show loading state when saving", () => {
    mockLoading = true;
    renderComponent();

    expect(screen.getByRole("button", { name: /saving/i })).toBeInTheDocument();
  });

  it("should show error message if saving fails", () => {
    mockError = new Error();
    renderComponent();

    expect(screen.getByRole("button", { name: /error/i })).toBeInTheDocument();
  });
});

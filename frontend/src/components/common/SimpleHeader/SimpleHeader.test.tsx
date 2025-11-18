import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "@tests/utils/custom-render";
import { MemoryRouter, useNavigate } from "react-router-dom";

import SimpleHeader from "./SimpleHeader";

vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...original,
    useNavigate: vi.fn(),
  };
});

describe("SimpleHeader", () => {
  function renderComponent() {
    const user = userEvent.setup();

    customRender(
      <MemoryRouter>
        <SimpleHeader />
      </MemoryRouter>,
    );

    return { user };
  }

  it("should render main header structure", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
    expect(screen.getByText(/quickbite/i)).toBeInTheDocument();
  });

  it("should go back to the previous page when the back button is clicked", async () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    const { user } = renderComponent();

    await user.click(screen.getByRole("button", { name: /back/i }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});

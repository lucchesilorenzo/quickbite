import { render, screen } from "@testing-library/react";

import FormHelperTextError from "./FormHelperTextError";

describe("FormHelperTextError", () => {
  it("should render the error message", () => {
    render(<FormHelperTextError message="Error message" />);

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";

import FormHelperTextError from "./FormHelperTextError";

describe("FormHelperTextError", () => {
  const errorMessage = "Error message";

  it("should render the error message", () => {
    render(<FormHelperTextError message={errorMessage} />);

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });
});

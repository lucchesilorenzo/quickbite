import { render, screen } from "@testing-library/react";

import Spinner from "./Spinner";

describe("Spinner", () => {
  it("should render the spinner", () => {
    render(<Spinner />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";

import FullPageSpinner from "./FullPageSpinner";

describe("FullPageSpinner", () => {
  it("should render the spinner", () => {
    render(<FullPageSpinner />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});

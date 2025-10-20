import { screen } from "@testing-library/react";
import { customRender } from "tests/utils/custom-render";

import SectionHeader from "./SectionHeader";

describe("SectionHeader", () => {
  const title = "Title";
  const subtitle = "Subtitle";

  function renderComponent() {
    customRender(<SectionHeader title={title} subtitle={subtitle} />);
  }

  it("should render the title and subtitle", () => {
    renderComponent();

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: subtitle })).toBeInTheDocument();
  });
});

import { SvgIconComponent } from "@mui/icons-material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { render, screen } from "@testing-library/react";

import CardHeading from "./CardHeading";

describe("CardHeading", () => {
  const title = "Title";

  function renderComponent(description?: string, icon?: SvgIconComponent) {
    const { container } = render(
      <CardHeading title={title} description={description} icon={icon} />,
    );

    return {
      container,
      getTitle: () => screen.queryByText(title),
      getDescription: () =>
        description ? screen.queryByText(description) : null,
      getIcon: () => container.querySelector("svg"),
    };
  }

  it("should render the title", () => {
    const { getTitle, getDescription, getIcon } = renderComponent();

    expect(getTitle()).toBeInTheDocument();
    expect(getDescription()).not.toBeInTheDocument();
    expect(getIcon()).not.toBeInTheDocument();
  });

  it("should render the icon", () => {
    const { getIcon } = renderComponent(undefined, AcUnitIcon);

    expect(getIcon()).toBeInTheDocument();
  });

  it("should render the description", () => {
    const { getDescription } = renderComponent("Description");

    expect(getDescription()).toBeInTheDocument();
  });
});

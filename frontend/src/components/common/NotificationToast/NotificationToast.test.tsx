import { render, screen } from "@testing-library/react";

import NotificationToast from "./NotificationToast";

describe("NotificationToast", () => {
  const title = "Title";
  const description = "Description";

  function renderComponent() {
    render(<NotificationToast title={title} description={description} />);
  }

  it("should render the title and description", () => {
    renderComponent();

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormWrapper from "@tests/FormWrapper";

import VehicleStep from "./VehicleStep";

import { registerFormSchema } from "@/features/private/rider/schemas/auth.schema";

describe("VehicleStep", () => {
  function renderComponent() {
    const user = userEvent.setup();

    render(
      <FormWrapper
        schema={registerFormSchema}
        defaultValues={{ vehicle_type: undefined }}
        formOptions={{ mode: "onChange" }}
      >
        <VehicleStep />
      </FormWrapper>,
    );

    return {
      user,
      scooterButton: screen.getByRole("button", { name: /scooter/i }),
      carButton: screen.getByRole("button", { name: /car/i }),
    };
  }

  it("should render the title, vehicle buttons, and informative text", () => {
    const { scooterButton, carButton } = renderComponent();

    expect(screen.getByText(/choose the vehicle/i)).toBeInTheDocument();
    expect(scooterButton).toBeInTheDocument();
    expect(carButton).toBeInTheDocument();
    expect(screen.getByText(/vehicles/i)).toBeInTheDocument();
    expect(screen.getByText(/vehicle does not appear/i)).toBeInTheDocument();
    expect(
      screen.getByText(/your safety is the top priority/i),
    ).toBeInTheDocument();
  });

  it("should mark the scooter button as selected when clicked", async () => {
    const { user, scooterButton } = renderComponent();

    await user.click(scooterButton);

    expect(scooterButton).toHaveAttribute("aria-pressed", "true");
  });

  it("should mark the car button as selected when clicked", async () => {
    const { user, carButton } = renderComponent();

    await user.click(carButton);

    expect(carButton).toHaveAttribute("aria-pressed", "true");
  });

  it("should unselect the other vehicle when one is selected", async () => {
    const { user, scooterButton, carButton } = renderComponent();

    await user.click(scooterButton);
    expect(scooterButton).toHaveAttribute("aria-pressed", "true");
    expect(carButton).toHaveAttribute("aria-pressed", "false");

    await user.click(carButton);
    expect(carButton).toHaveAttribute("aria-pressed", "true");
    expect(scooterButton).toHaveAttribute("aria-pressed", "false");
  });
});

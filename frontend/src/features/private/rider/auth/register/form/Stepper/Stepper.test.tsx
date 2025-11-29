import { steps } from "@rider/lib/constants/register-wizard/steps";
import { registerFormSchema } from "@rider/validations/auth-validations";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormWrapper from "@tests/FormWrapper";

import Stepper from "./Stepper";

vi.mock("../steps/requirements/RequirementsStep", () => ({
  default: () => <div data-testid="requirements-step" />,
}));

vi.mock("../steps/personal-info/PersonalInfoStep", () => ({
  default: () => <div data-testid="personal-info-step" />,
}));

vi.mock("../steps/location/LocationStep", () => ({
  default: () => <div data-testid="location-step" />,
}));

vi.mock("../steps/vehicle/VehicleStep", () => ({
  default: () => <div data-testid="vehicle-step" />,
}));

vi.mock("../steps/account-security/AccountSecurityStep", () => ({
  default: () => <div data-testid="account-security-step" />,
}));

vi.mock("../steps/finish-your-registration/FinishYourRegistrationStep", () => ({
  default: () => <div data-testid="finish-your-registration-step" />,
}));

describe("Stepper", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function renderComponent(
    activeStep: number = 0,
    defaultValues = {},
    isRegistering = false,
  ) {
    const user = userEvent.setup();

    const mockOnNext = vi.fn();
    const mockOnBack = vi.fn();
    const mockOnSubmit = vi.fn();

    render(
      <FormWrapper
        schema={registerFormSchema}
        defaultValues={defaultValues}
        formOptions={{ mode: "onChange" }}
      >
        <Stepper
          activeStep={activeStep}
          isRegistering={isRegistering}
          onNext={mockOnNext}
          onBack={mockOnBack}
          onSubmit={mockOnSubmit}
        />
      </FormWrapper>,
    );

    return {
      user,
      mockOnNext,
      mockOnBack,
      mockOnSubmit,
      getBackButton: () => screen.queryByRole("button", { name: /previous/i }),
      getNextButton: () => screen.queryByRole("button", { name: /next/i }),
      getSubmitButton: () => screen.queryByRole("button", { name: /submit/i }),
    };
  }

  it("should render stepper steps", () => {
    renderComponent();

    steps.forEach(({ title, subtitle }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(subtitle)).toBeInTheDocument();
    });
  });

  it("should render the active step", () => {
    renderComponent(4, { password: "", password_confirmation: "" });

    expect(screen.getByTestId("account-security-step")).toBeInTheDocument();
  });

  it("should not render the inactive steps", () => {
    renderComponent(1);

    expect(screen.queryByTestId("requirements-step")).not.toBeInTheDocument();
    expect(screen.queryByTestId("location-step")).not.toBeInTheDocument();
    expect(screen.queryByTestId("vehicle-step")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("account-security-step"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("finish-your-registration-step"),
    ).not.toBeInTheDocument();
  });

  it("should render the pagination buttons", () => {
    const { getBackButton, getNextButton } = renderComponent();

    expect(getBackButton()).toBeInTheDocument();
    expect(getNextButton()).toBeInTheDocument();
  });

  it("should render the submit button when the last step is active", () => {
    const { getSubmitButton } = renderComponent(5);

    expect(getSubmitButton()).toBeInTheDocument();
  });

  it("should not render the submit button when the last step is not active", () => {
    const { getSubmitButton } = renderComponent(1);

    expect(getSubmitButton()).not.toBeInTheDocument();
  });

  it("should call onNext when the next button is clicked", async () => {
    const { user, mockOnNext, getNextButton } = renderComponent();

    await user.click(getNextButton()!);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it("should call onBack when the previous button is clicked", async () => {
    const { user, mockOnBack, getBackButton } = renderComponent(1);

    await user.click(getBackButton()!);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("should call onSubmit when the submit button is clicked", async () => {
    const { user, mockOnSubmit, getSubmitButton } = renderComponent(5, {
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@gmail.com",
      phone_number: "+39 373 332 3323",
      street_address: "Via Roma",
      building_number: "1",
      postcode: "00100",
      city: "Roma",
      state: "Lazio",
      vehicle_type: "scooter",
      password: "JohnDoe1111!",
      password_confirmation: "JohnDoe1111!",
    });

    await user.click(getSubmitButton()!);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("should not call onSubmit when the submit button is clicked and the form is invalid", async () => {
    const { user, mockOnSubmit, getSubmitButton } = renderComponent(5);

    await user.click(getSubmitButton()!);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should call onNext when the next button is clicked and the form is invalid", async () => {
    const { user, mockOnNext, getNextButton } = renderComponent(4, {
      password: "",
      password_confirmation: "",
    });
    await user.click(getNextButton()!);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it("should render the loading indicator upon submission", async () => {
    const { getSubmitButton } = renderComponent(5, {}, true);

    expect(getSubmitButton()).toHaveTextContent(/submitting/i);
  });

  it("should not render the loading indicator after submission", () => {
    const { getSubmitButton } = renderComponent(5);

    expect(getSubmitButton()).not.toHaveTextContent(/submitting/i);
  });

  it("should not render the loading indicator if submission fails", () => {
    const { getSubmitButton } = renderComponent(5);

    expect(getSubmitButton()).not.toHaveTextContent(/submitting/i);
  });
});

import { registerFormSchema } from "@rider/validations/auth-validations";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormWrapper from "tests/FormWrapper";

import PersonalInfoContactSection from "./PersonalInfoContactSection";

describe("PersonalInfoContactSection", () => {
  function renderComponent() {
    const user = userEvent.setup();

    render(
      <FormWrapper
        schema={registerFormSchema}
        defaultValues={{ email: "", phone_number: "" }}
        formOptions={{ mode: "onChange" }}
      >
        <PersonalInfoContactSection />
      </FormWrapper>,
    );

    return {
      user,
      emailInput: screen.getByLabelText(/email/i),
      phoneNumberInput: screen.getByLabelText(/phone/i),
      expectErrorToBeInTheDocument: (errorMessage: RegExp) => {
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
      },
    };
  }

  it("should render the title and input fields", () => {
    const { emailInput, phoneNumberInput } = renderComponent();

    expect(screen.getByText(/contact information/i)).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneNumberInput).toBeInTheDocument();
  });

  it.each([
    {
      scenario: "invalid email",
      email: "johndoe",
      errorMessage: /enter a valid email/i,
    },
  ])(
    "should display an error if email is $scenario",
    async ({ email, errorMessage }) => {
      const { user, emailInput, expectErrorToBeInTheDocument } =
        renderComponent();

      await user.type(emailInput, email);

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it.each([
    {
      scenario: "missing",
      errorMessage: /fill out your phone number/i,
    },
    {
      scenario: "not a valid IT phone number",
      phone_number: "123456789",
      errorMessage: /valid phone number/i,
    },
  ])(
    "should display an error if phone_number is $scenario",
    async ({ phone_number, errorMessage }) => {
      const { user, phoneNumberInput, expectErrorToBeInTheDocument } =
        renderComponent();

      if (phone_number !== undefined) {
        await user.type(phoneNumberInput, phone_number);
      } else {
        await user.type(phoneNumberInput, "1");
        await user.clear(phoneNumberInput);
      }

      expectErrorToBeInTheDocument(errorMessage);
    },
  );
});

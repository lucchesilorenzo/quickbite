import { registerFormSchema } from "@rider/validations/auth-validations";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormWrapper from "@tests/FormWrapper";

import AccountSecurityStep from "./AccountSecurityStep";

describe("AccountSecurityStep", () => {
  function renderComponent() {
    const user = userEvent.setup();

    render(
      <FormWrapper
        schema={registerFormSchema}
        defaultValues={{ password: "", password_confirmation: "" }}
        formOptions={{ mode: "onChange" }}
      >
        <AccountSecurityStep />
      </FormWrapper>,
    );

    return {
      user,
      passwordInput: screen.getByLabelText(/^password/i),
      passwordConfirmationInput: screen.getByLabelText(/^confirm/i),
      expectErrorToBeInTheDocument: (errorMessage: RegExp) => {
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
      },
    };
  }

  it("should render the title and input fields", () => {
    const { passwordInput, passwordConfirmationInput } = renderComponent();

    expect(
      screen.getByText(/choose a password to secure your account/i),
    ).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmationInput).toBeInTheDocument();
  });

  it.each([
    {
      scenario: "shorter than 8 characters",
      password: "a".repeat(7),
      errorMessage: /at least 8 characters/i,
    },
    {
      scenario: "longer than 50 characters",
      password: "a".repeat(51),
      errorMessage: /password is too long/i,
    },
    {
      scenario: "missing uppercase letter",
      password: "john123!",
      errorMessage: /uppercase/i,
    },
    {
      scenario: "missing lowercase letter",
      password: "JOHN123!",
      errorMessage: /lowercase/i,
    },
    {
      scenario: "missing number",
      password: "JohnDoe!",
      errorMessage: /one number/i,
    },
    {
      scenario: "missing special character",
      password: "JohnDoe1111",
      errorMessage: /special character/i,
    },
  ])(
    "should show an error if password is $scenario",
    async ({ password, errorMessage }) => {
      const { user, passwordInput, expectErrorToBeInTheDocument } =
        renderComponent();

      await user.type(passwordInput, password);

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it.each([
    {
      scenario: "shorter than 8 characters",
      password_confirmation: "a".repeat(7),
      errorMessage: /at least 8 characters/i,
    },
    {
      scenario: "longer than 50 characters",
      password_confirmation: "a".repeat(51),
      errorMessage: /password is too long/i,
    },
    {
      scenario: "missing uppercase letter",
      password_confirmation: "john123!",
      errorMessage: /uppercase/i,
    },
    {
      scenario: "missing lowercase letter",
      password_confirmation: "JOHN123!",
      errorMessage: /lowercase/i,
    },
    {
      scenario: "missing number",
      password_confirmation: "JohnDoe!",
      errorMessage: /one number/i,
    },
    {
      scenario: "missing special character",
      password_confirmation: "JohnDoe1111",
      errorMessage: /special character/i,
    },
  ])(
    "should show an error if password_confirmation is $scenario",
    async ({ password_confirmation, errorMessage }) => {
      const { user, passwordConfirmationInput, expectErrorToBeInTheDocument } =
        renderComponent();

      await user.type(passwordConfirmationInput, password_confirmation);

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it("should not display any validation errors when all fields are valid", async () => {
    const { user, passwordInput, passwordConfirmationInput } =
      renderComponent();

    await user.type(passwordInput, "JohnDoe1111!");
    await user.type(passwordConfirmationInput, "JohnDoe1111!");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

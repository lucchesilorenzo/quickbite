import { registerFormSchema } from "@rider/validations/auth-validations";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormWrapper from "tests/FormWrapper";

import PersonalInfoNameSection from "./PersonalInfoNameSection";

describe("PersonalInfoNameSection", () => {
  function renderComponent() {
    const user = userEvent.setup();

    render(
      <FormWrapper
        schema={registerFormSchema}
        defaultValues={{ first_name: "", last_name: "" }}
        formOptions={{ mode: "onChange" }}
      >
        <PersonalInfoNameSection />
      </FormWrapper>,
    );

    return {
      user,
      firstNameInput: screen.getByLabelText(/first name/i),
      lastNameInput: screen.getByLabelText(/last name/i),
      expectErrorToBeInTheDocument: (errorMessage: RegExp) => {
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
      },
    };
  }

  it("should render the title and input fields", () => {
    const { firstNameInput, lastNameInput } = renderComponent();

    expect(screen.getByText(/your name/i)).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
  });

  it.each([
    {
      scenario: "missing",
      first_name: "",
      errorMessage: /fill out your first name/i,
    },
    {
      scenario: "longer than 50 characters",
      first_name: "a".repeat(51),
      errorMessage: /first name is too long/i,
    },
  ])(
    "should display an error if first_name is $scenario",
    async ({ first_name, errorMessage }) => {
      const { user, firstNameInput, expectErrorToBeInTheDocument } =
        renderComponent();

      if (first_name) {
        await user.type(firstNameInput, first_name);
      } else {
        await user.type(firstNameInput, "a");
        await user.clear(firstNameInput);
      }

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it.each([
    {
      scenario: "missing",
      last_name: "",
      errorMessage: /fill out your last name/i,
    },
    {
      scenario: "longer than 50 characters",
      last_name: "a".repeat(51),
      errorMessage: /last name is too long/i,
    },
  ])(
    "should display an error if last_name is $scenario",
    async ({ last_name, errorMessage }) => {
      const { user, lastNameInput, expectErrorToBeInTheDocument } =
        renderComponent();

      if (last_name) {
        await user.type(lastNameInput, last_name);
      } else {
        await user.type(lastNameInput, "a");
        await user.clear(lastNameInput);
      }

      expectErrorToBeInTheDocument(errorMessage);
    },
  );
});

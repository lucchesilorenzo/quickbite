import { jobPostApplicationFormSchema } from "@rider/schemas/job-post-applications.schema";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormWrapper from "@tests/FormWrapper";

import ContactInfoStep from ".";

describe("ContactInfoStep", () => {
  function renderComponent() {
    const user = userEvent.setup();

    render(
      <FormWrapper
        schema={jobPostApplicationFormSchema}
        defaultValues={{
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
        }}
        formOptions={{ mode: "onChange" }}
      >
        <ContactInfoStep />
      </FormWrapper>,
    );

    return {
      user,
      firstNameInput: screen.getByLabelText(/^first name/i),
      lastNameInput: screen.getByLabelText(/^last name/i),
      emailInput: screen.getByLabelText(/email/i),
      phoneNumberInput: screen.getByLabelText(/phone number/i),
      expectErrorToBeInTheDocument: (errorMessage: RegExp) => {
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
      },
    };
  }

  it("should render the title and input fields", () => {
    const { firstNameInput, lastNameInput, emailInput, phoneNumberInput } =
      renderComponent();

    expect(screen.getByText(/contact information/i)).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneNumberInput).toBeInTheDocument();
  });

  it.each([
    {
      scenario: "missing",
      errorMessage: /fill out your first name/i,
    },
    {
      scenario: "longer than 50 characters",
      first_name: "a".repeat(51),
      errorMessage: /first name is too long/i,
    },
  ])(
    "should show an error if first_name is $scenario",
    async ({ first_name, errorMessage }) => {
      const { user, firstNameInput, expectErrorToBeInTheDocument } =
        renderComponent();

      if (first_name !== undefined) {
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
      errorMessage: /fill out your last name/i,
    },
    {
      scenario: "longer than 50 characters",
      last_name: "a".repeat(51),
      errorMessage: /last name is too long/i,
    },
  ])(
    "should show an error if last_name is $scenario",
    async ({ last_name, errorMessage }) => {
      const { user, lastNameInput, expectErrorToBeInTheDocument } =
        renderComponent();

      if (last_name !== undefined) {
        await user.type(lastNameInput, last_name);
      } else {
        await user.type(lastNameInput, "a");
        await user.clear(lastNameInput);
      }

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it.each([
    {
      scenario: "invalid email",
      email: "johndoe",
      errorMessage: /enter a valid email/i,
    },
  ])(
    "should show an error if email is $scenario",
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

  it("should not display any validation errors when all fields are valid", async () => {
    const {
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneNumberInput,
    } = renderComponent();

    await user.type(firstNameInput, "JohnDoe1111!");
    await user.type(lastNameInput, "JohnDoe1111!");
    await user.type(emailInput, "johndoe@gmail.com");
    await user.type(phoneNumberInput, "+39 373 332 3323");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

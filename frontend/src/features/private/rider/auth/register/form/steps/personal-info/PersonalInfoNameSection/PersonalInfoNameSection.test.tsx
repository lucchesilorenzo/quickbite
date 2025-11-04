import { registerFormSchema } from "@rider/validations/auth-validations";
import { render, screen } from "@testing-library/react";
import FormWrapper from "tests/FormWrapper";

import PersonalInfoNameSection from "./PersonalInfoNameSection";

describe("PersonalInfoNameSection", () => {
  function renderComponent() {
    render(
      <FormWrapper
        schema={registerFormSchema}
        defaultValues={{ first_name: "", last_name: "" }}
      >
        <PersonalInfoNameSection />
      </FormWrapper>,
    );
  }

  it("should render the title and input fields", () => {
    renderComponent();

    expect(screen.getByText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
  });
});

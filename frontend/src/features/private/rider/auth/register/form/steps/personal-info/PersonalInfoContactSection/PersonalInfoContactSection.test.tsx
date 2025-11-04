import { registerFormSchema } from "@rider/validations/auth-validations";
import { render, screen } from "@testing-library/react";
import FormWrapper from "tests/FormWrapper";

import PersonalInfoContactSection from "./PersonalInfoContactSection";

describe("PersonalInfoContactSection", () => {
  function renderComponent() {
    render(
      <FormWrapper
        schema={registerFormSchema}
        defaultValues={{ email: "", phone_number: "" }}
      >
        <PersonalInfoContactSection />
      </FormWrapper>,
    );
  }

  it("should render the title and input fields", () => {
    renderComponent();

    expect(screen.getByText(/contact information/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });
});

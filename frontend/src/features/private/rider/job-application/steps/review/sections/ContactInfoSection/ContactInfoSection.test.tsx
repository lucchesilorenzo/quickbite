import { jobApplicationFormSchema } from "@rider/schemas/job-applications.schema";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormWrapper from "@tests/FormWrapper";
import { customRender } from "@tests/utils/custom-render";

import ContactInfoSection from "./ContactInfoSection";

describe("ContactInfoSection", () => {
  function renderComponent() {
    const user = userEvent.setup();
    const mockOnBack = vi.fn();

    customRender(
      <FormWrapper
        schema={jobApplicationFormSchema}
        defaultValues={{
          first_name: "Mario",
          last_name: "Rossi",
          email: "mario.rossi@example.com",
          phone_number: "+39 333 123 4567",
        }}
        formOptions={{ mode: "onChange" }}
      >
        <ContactInfoSection onBack={mockOnBack} />
      </FormWrapper>,
    );

    return {
      user,
      editButton: screen.getByRole("button", { name: /edit/i }),
      mockOnBack,
    };
  }

  it("should title and edit button", () => {
    const { editButton } = renderComponent();

    expect(screen.getByText(/contact information/i)).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  it("should render contact information from form values", () => {
    renderComponent();

    expect(screen.getByText(/mario rossi/i)).toBeInTheDocument();
    expect(screen.getByText(/mario.rossi@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/39 333 123 4567/i)).toBeInTheDocument();
  });

  it("should call onBack with step 2 when clicking the 'Edit' button", async () => {
    const { user, editButton, mockOnBack } = renderComponent();

    await user.click(editButton);

    expect(mockOnBack).toHaveBeenCalledWith(2);
  });
});

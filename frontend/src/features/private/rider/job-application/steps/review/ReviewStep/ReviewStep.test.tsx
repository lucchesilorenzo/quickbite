import { jobApplicationFormSchema } from "@rider/schemas/job-applications.schema";
import { screen } from "@testing-library/react";
import FormWrapper from "@tests/FormWrapper";
import { customRender } from "@tests/utils/custom-render";

import ReviewStep from "./ReviewStep";

vi.mock("../sections/ContactInfoSection", () => ({
  default: () => <div data-testid="contact-info-section" />,
}));

vi.mock("../sections/ResumeSection", () => ({
  default: () => <div data-testid="resume-section" />,
}));

describe("ReviewStep", () => {
  function renderComponent() {
    customRender(
      <FormWrapper
        schema={jobApplicationFormSchema}
        defaultValues={{ declaration_accepted_at: false }}
        formOptions={{ mode: "onChange" }}
      >
        <ReviewStep onBack={vi.fn()} />
      </FormWrapper>,
    );
  }

  it("should render the title, subtitle, sections and checkbox", () => {
    renderComponent();

    expect(screen.getByText(/review your application/i)).toBeInTheDocument();
    expect(
      screen.getByText(/you can't edit your application once you submit/i),
    ).toBeInTheDocument();
    expect(screen.getByTestId("contact-info-section")).toBeInTheDocument();
    expect(screen.getByTestId("resume-section")).toBeInTheDocument();
    expect(screen.getByLabelText(/declare/i)).toBeInTheDocument();
  });
});

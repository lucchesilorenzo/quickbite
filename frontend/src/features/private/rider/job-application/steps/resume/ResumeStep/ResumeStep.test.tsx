import { jobApplicationFormSchema } from "@rider/schemas/job-applications.schema";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormWrapper from "@tests/FormWrapper";

import ResumeStep from "./ResumeStep";

vi.mock("../ResumePreview", () => ({
  default: () => <div data-testid="resume-preview" />,
}));

describe("ResumeStep", () => {
  function renderComponent() {
    const user = userEvent.setup();

    render(
      <FormWrapper
        schema={jobApplicationFormSchema}
        defaultValues={{ resume: "" }}
        formOptions={{ mode: "onChange" }}
      >
        <ResumeStep />
      </FormWrapper>,
    );

    return {
      user,
      resumeInput: screen.getByLabelText(/upload resume/i),
      expectErrorToBeInTheDocument: (errorMessage: RegExp) => {
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
      },
    };
  }

  it("should render the title and resume field", () => {
    const { resumeInput } = renderComponent();

    expect(screen.getByText(/add your resume/i)).toBeInTheDocument();
    expect(resumeInput).toBeInTheDocument();
  });

  it("should trigger a validation error if resume is not a PDF", async () => {
    const { resumeInput, expectErrorToBeInTheDocument } = renderComponent();

    const file = new File(["dummy content"], "resume.png", {
      type: "image/png",
    });

    fireEvent.change(resumeInput, {
      target: { files: [file] },
    });

    await waitFor(() => expectErrorToBeInTheDocument(/only pdf/i));
  });

  it("should not display any validation errors when resume is uploaded", async () => {
    const { user, resumeInput } = renderComponent();

    const file = new File(["dummy content"], "resume.pdf", {
      type: "application/pdf",
    });

    await user.upload(resumeInput, file);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should change label to 'Upload a new file' if resume is uploaded", async () => {
    const { user, resumeInput } = renderComponent();

    const file = new File(["dummy content"], "resume.pdf", {
      type: "application/pdf",
    });

    await user.upload(resumeInput, file);

    expect(screen.getByRole("button")).toHaveTextContent(/upload a new file/i);
  });
});

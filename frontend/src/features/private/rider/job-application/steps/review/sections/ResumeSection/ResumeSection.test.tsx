import { jobApplicationFormSchema } from "@rider/schemas/job-applications.schema";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormWrapper from "@tests/FormWrapper";
import { customRender } from "@tests/utils/custom-render";
import { createMockFileList } from "@tests/utils/mock-file-list";

import ResumeSection from "./ResumeSection";

vi.mock("@rider/job-application/steps/resume/ResumePreview", () => ({
  default: () => <div data-testid="resume-preview" />,
}));

describe("ResumeSection", () => {
  function renderComponent(resume: FileList | string = "") {
    const user = userEvent.setup();
    const mockOnBack = vi.fn();

    customRender(
      <FormWrapper
        schema={jobApplicationFormSchema}
        defaultValues={{ resume }}
        formOptions={{ mode: "onChange" }}
      >
        <ResumeSection onBack={mockOnBack} />
      </FormWrapper>,
    );

    return {
      user,
      downloadButton: screen.getByRole("button", { name: /download/i }),
      editButton: screen.getByRole("button", { name: /edit/i }),
      getFileName: () => screen.queryByText("resume.pdf"),
      getResumePreview: () => screen.queryByTestId("resume-preview"),
      mockOnBack,
    };
  }

  it("should title and buttons", () => {
    const { downloadButton, editButton } = renderComponent();

    expect(screen.getByText(/resume/i)).toBeInTheDocument();
    expect(downloadButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  it("should render file name when resume is present", () => {
    const file = new File(["x"], "resume.pdf", {
      type: "application/pdf",
    });

    const resume = createMockFileList([file]);

    const { getFileName, getResumePreview } = renderComponent(resume);

    expect(getFileName()).toBeInTheDocument();
    expect(getResumePreview()).toBeInTheDocument();
  });

  it("should not render file name when resume is not present", () => {
    const { getFileName, getResumePreview } = renderComponent();

    expect(getFileName()).not.toBeInTheDocument();
    expect(getResumePreview()).not.toBeInTheDocument();
  });

  it("should call onBack with step 1 when clicking the 'Edit' button", async () => {
    const { user, editButton, mockOnBack } = renderComponent();

    await user.click(editButton);

    expect(mockOnBack).toHaveBeenCalledWith(1);
  });
});

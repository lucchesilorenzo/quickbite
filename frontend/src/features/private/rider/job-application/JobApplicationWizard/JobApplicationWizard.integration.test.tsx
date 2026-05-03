import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jobPostResponse } from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";
import { simulateInfiniteLoading } from "@tests/utils/msw";
import { BrowserRouter } from "react-router-dom";

import JobApplicationWizard from "./JobApplicationWizard";

import env from "@/lib/env";

vi.mock("@rider/job-application/steps/resume/ResumePreview", () => ({
  default: () => <div data-testid="resume-preview" />,
}));

vi.mock("../../contexts/JobApplicationProvider", () => ({
  useJobApplication: vi.fn().mockReturnValue({
    jobPostData: jobPostResponse,
    isLoadingJobPost: false,
    jobPostError: null,
  }),
}));

describe("JobApplicationWizard (integration)", () => {
  function renderComponent() {
    const user = userEvent.setup();

    customRender(
      <BrowserRouter>
        <JobApplicationWizard />
      </BrowserRouter>,
    );

    return {
      user,
      getFirstNameInput: () => screen.queryByLabelText(/first name/i),
      getLastNameInput: () => screen.queryByLabelText(/last name/i),
      getEmailInput: () => screen.queryByLabelText(/email/i),
      getPhoneNumberInput: () => screen.queryByLabelText(/phone number/i),
      getResumeInput: () => screen.queryByLabelText(/upload/i),
      getDeclarationCheckbox: () => screen.queryByRole("checkbox"),
      nextButton: screen.getByRole("button", { name: /next/i }),
      getSubmitButton: () => screen.queryByRole("button", { name: /submit/i }),
    };
  }

  it("should display error messages in step 1", async () => {
    const errors = [/first name/i, /last name/i, /email/i, /phone number/i];
    const { user, nextButton } = renderComponent();

    await user.click(nextButton);

    const alerts = screen.getAllByRole("alert");
    alerts.forEach((alert, index) => {
      expect(alert).toHaveTextContent(errors[index]);
    });
  });

  it("should display error messages in step 2", async () => {
    const errors = [/resume/i];
    const {
      user,
      getFirstNameInput,
      getLastNameInput,
      getEmailInput,
      getPhoneNumberInput,
      nextButton,
    } = renderComponent();

    await user.type(getFirstNameInput()!, "John");
    await user.type(getLastNameInput()!, "Doe");
    await user.type(getEmailInput()!, "johndoe@gmail.com");
    await user.type(getPhoneNumberInput()!, "+39 373 332 3323");
    await user.click(nextButton);

    await user.click(nextButton);

    const alerts = screen.getAllByRole("alert");
    alerts.forEach((alert, index) => {
      expect(alert).toHaveTextContent(errors[index]);
    });
  });

  it("should display error messages in step 3", async () => {
    const errors = [/declaration/i];
    const {
      user,
      getFirstNameInput,
      getLastNameInput,
      getEmailInput,
      getPhoneNumberInput,
      getResumeInput,
      nextButton,
      getSubmitButton,
    } = renderComponent();

    await user.type(getFirstNameInput()!, "John");
    await user.type(getLastNameInput()!, "Doe");
    await user.type(getEmailInput()!, "johndoe@gmail.com");
    await user.type(getPhoneNumberInput()!, "+39 373 332 3323");
    await user.click(nextButton);
    await user.upload(
      getResumeInput()!,
      new File(["resume"], "resume.pdf", { type: "application/pdf" }),
    );
    await user.click(nextButton);

    await user.click(getSubmitButton()!);

    const alerts = screen.getAllByRole("alert");
    alerts.forEach((alert, index) => {
      expect(alert).toHaveTextContent(errors[index]);
    });
  });

  it("should render the loading indicator upon submission", async () => {
    simulateInfiniteLoading(
      `${env.VITE_BACKEND_URL}/api/v1/rider/job-posts/${jobPostResponse.job_post.id}/applications`,
      "post",
    );
    const {
      user,
      getFirstNameInput,
      getLastNameInput,
      getEmailInput,
      getPhoneNumberInput,
      getResumeInput,
      getDeclarationCheckbox,
      nextButton,
      getSubmitButton,
    } = renderComponent();

    await user.type(getFirstNameInput()!, "John");
    await user.type(getLastNameInput()!, "Doe");
    await user.type(getEmailInput()!, "johndoe@gmail.com");
    await user.type(getPhoneNumberInput()!, "+39 373 332 3323");
    await user.click(nextButton);
    await user.upload(
      getResumeInput()!,
      new File(["resume"], "resume.pdf", { type: "application/pdf" }),
    );
    await user.click(nextButton);
    await user.click(getDeclarationCheckbox()!);

    await user.click(getSubmitButton()!);

    await waitFor(() => {
      expect(getSubmitButton()!).toHaveTextContent(/submitting/i);
    });
  });

  it("should not render the loading indicator after submission", async () => {
    const {
      user,
      getFirstNameInput,
      getLastNameInput,
      getEmailInput,
      getPhoneNumberInput,
      getResumeInput,
      getDeclarationCheckbox,
      nextButton,
      getSubmitButton,
    } = renderComponent();

    await user.type(getFirstNameInput()!, "John");
    await user.type(getLastNameInput()!, "Doe");
    await user.type(getEmailInput()!, "johndoe@gmail.com");
    await user.type(getPhoneNumberInput()!, "+39 373 332 3323");
    await user.click(nextButton);
    await user.upload(
      getResumeInput()!,
      new File(["resume"], "resume.pdf", { type: "application/pdf" }),
    );
    await user.click(nextButton);
    await user.click(getDeclarationCheckbox()!);

    await user.click(getSubmitButton()!);

    await waitFor(() => {
      expect(getSubmitButton()).not.toHaveTextContent(/submitting/i);
    });
  });
});

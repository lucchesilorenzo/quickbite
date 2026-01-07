import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormWrapper from "@tests/FormWrapper";
import { customRender } from "@tests/utils/custom-render";
import { createMockFileList } from "@tests/utils/mock-file-list";

import { jobApplicationFormSchema } from "../../schemas/job-applications.schema";
import Stepper from "./Stepper";

vi.mock("../RestaurantInfoPanel", () => ({
  default: () => <div data-testid="restaurant-info-panel" />,
}));

vi.mock("../steps/contact-info/ContactInfoStep", () => ({
  default: () => <div data-testid="contact-info-step" />,
}));

vi.mock("../steps/resume/ResumeStep", () => ({
  default: () => <div data-testid="resume-step" />,
}));

vi.mock("../steps/review/ReviewStep", () => ({
  default: () => <div data-testid="review-step" />,
}));

describe("Stepper", () => {
  function renderComponent(
    activeStep: number = 0,
    defaultValues = {},
    isApplying = false,
  ) {
    const user = userEvent.setup();

    const mockOnNext = vi.fn();
    const mockOnBack = vi.fn();
    const mockOnSubmit = vi.fn();

    customRender(
      <FormWrapper
        schema={jobApplicationFormSchema}
        defaultValues={defaultValues}
        formOptions={{ mode: "onChange" }}
      >
        <Stepper
          activeStep={activeStep}
          isApplying={isApplying}
          onNext={mockOnNext}
          onBack={mockOnBack}
          onSubmit={mockOnSubmit}
        />
      </FormWrapper>,
    );

    return {
      user,
      mockOnNext,
      mockOnBack,
      mockOnSubmit,
      getBackButton: () => screen.queryByRole("button", { name: /back/i }),
      getNextButton: () => screen.queryByRole("button", { name: /next/i }),
      getSubmitButton: () => screen.queryByRole("button", { name: /submit/i }),
    };
  }

  it("should render the restaurant info panel", () => {
    renderComponent();

    expect(screen.getByTestId("restaurant-info-panel")).toBeInTheDocument();
  });

  it("should render the active step", () => {
    renderComponent(0, {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    });

    expect(screen.getByTestId("contact-info-step")).toBeInTheDocument();
  });

  it("should not render the inactive steps", () => {
    renderComponent(0);

    expect(screen.queryByTestId("resume-step")).not.toBeInTheDocument();
    expect(screen.queryByTestId("review-step")).not.toBeInTheDocument();
  });

  it("should render the pagination buttons", () => {
    const { getBackButton, getNextButton } = renderComponent();

    expect(getBackButton()).toBeInTheDocument();
    expect(getNextButton()).toBeInTheDocument();
  });

  it("should render the submit button when the last step is active", () => {
    const { getSubmitButton } = renderComponent(2);

    expect(getSubmitButton()).toBeInTheDocument();
  });

  it("should not render the submit button when the last step is not active", () => {
    const { getSubmitButton } = renderComponent(0);

    expect(getSubmitButton()).not.toBeInTheDocument();
  });

  it("should call onNext when the next button is clicked", async () => {
    const { user, mockOnNext, getNextButton } = renderComponent();

    await user.click(getNextButton()!);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it("should call onBack when the previous button is clicked", async () => {
    const { user, mockOnBack, getBackButton } = renderComponent(1);

    await user.click(getBackButton()!);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("should call onSubmit when the submit button is clicked", async () => {
    const { user, mockOnSubmit, getSubmitButton } = renderComponent(2, {
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@gmail.com",
      phone_number: "+39 373 332 3323",
      resume: createMockFileList([
        new File(["dummy content"], "resume.pdf", {
          type: "application/pdf",
        }),
      ]),
      declaration_accepted_at: true,
    });

    await user.click(getSubmitButton()!);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("should not call onSubmit when the submit button is clicked and the form is invalid", async () => {
    const { user, mockOnSubmit, getSubmitButton } = renderComponent(2);

    await user.click(getSubmitButton()!);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should call onNext when the next button is clicked and the form is invalid", async () => {
    const { user, mockOnNext, getNextButton } = renderComponent(0, {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    });
    await user.click(getNextButton()!);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it("should render the loading indicator upon submission", async () => {
    const { getSubmitButton } = renderComponent(2, {}, true);

    expect(getSubmitButton()).toHaveTextContent(/submitting/i);
  });

  it("should not render the loading indicator after submission", () => {
    const { getSubmitButton } = renderComponent(2);

    expect(getSubmitButton()).not.toHaveTextContent(/submitting/i);
  });

  it("should not render the loading indicator if submission fails", () => {
    const { getSubmitButton } = renderComponent(2);

    expect(getSubmitButton()).not.toHaveTextContent(/submitting/i);
  });
});

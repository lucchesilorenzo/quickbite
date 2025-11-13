import { TRegisterFormSchema } from "@rider/validations/auth-validations";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { registerFormWithoutPasswordAndConfirmation } from "tests/mocks/data/forms/rider/register";
import { customRender } from "tests/utils/custom-render";
import { simulateInfiniteLoading } from "tests/utils/msw";

import RegisterWizard from "./RegisterWizard";

import env from "@/lib/env";

vi.mock("../mobile/MobileStepper", () => ({
  default: () => <div data-testid="mobile-stepper" />,
}));

describe("RegisterWizard (integration)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function renderComponent(baseData?: Partial<TRegisterFormSchema>) {
    const user = userEvent.setup();

    if (baseData) {
      localStorage.setItem("rider_registration_data", JSON.stringify(baseData));
    }

    customRender(
      <BrowserRouter>
        <RegisterWizard />
      </BrowserRouter>,
    );

    const nextButton = screen.getByRole("button", { name: /next/i });

    async function navigateToStep(step: number) {
      for (let i = 1; i < step; i++) {
        await user.click(nextButton);
      }
    }

    async function completeFormAndGoToSubmit() {
      await navigateToStep(5);
      await user.type(screen.getByLabelText(/^password/i), "JohnDoe111!");
      await user.type(screen.getByLabelText(/^confirm/i), "JohnDoe111!");
      await user.click(nextButton);
    }

    return {
      user,
      nextButton: screen.getByRole("button", { name: /next/i }),
      getSubmitButton: () => screen.queryByRole("button", { name: /submit/i }),
      navigateToStep,
      completeFormAndGoToSubmit,
    };
  }

  it.each<{
    step: number;
    errors: RegExp[];
    prefill: Partial<TRegisterFormSchema>;
  }>([
    {
      step: 2,
      errors: [/first name/i, /last name/i, /email address/i, /phone number/i],
      prefill: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
      },
    },
    {
      step: 3,
      errors: [
        /street address/i,
        /building number/i,
        /postcode/i,
        /city/i,
        /state/i,
      ],
      prefill: {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        phone_number: "+39 373 332 3323",
        street_address: "",
        building_number: "",
        postcode: "",
        city: "",
        state: "",
      },
    },
    {
      step: 4,
      errors: [/valid vehicle/i],
      prefill: {
        ...registerFormWithoutPasswordAndConfirmation,
        vehicle_type: undefined,
      },
    },
    {
      step: 5,
      errors: [/your password/i, /your password/i],
      prefill: {
        ...registerFormWithoutPasswordAndConfirmation,
        password: "",
        password_confirmation: "",
      },
    },
  ])(
    "should show validation errors for step $step when required fields are empty",
    async ({ step, errors, prefill }) => {
      const { user, nextButton, navigateToStep } = renderComponent(prefill);

      await navigateToStep(step);
      await user.click(nextButton);

      const alerts = screen.getAllByRole("alert");
      alerts.forEach((alert, index) => {
        expect(alert).toHaveTextContent(errors[index]);
      });
    },
  );

  it.each<{
    step: number;
    fields: (keyof TRegisterFormSchema)[];
    prefill: Partial<TRegisterFormSchema>;
  }>([
    {
      step: 2,
      fields: ["first_name", "last_name", "email", "phone_number"],
      prefill: {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        phone_number: "+39 373 332 3323",
      },
    },
    {
      step: 3,
      fields: [
        "street_address",
        "building_number",
        "postcode",
        "city",
        "state",
      ],
      prefill: {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        phone_number: "+39 373 332 3323",
        street_address: "Via Roma",
        building_number: "12",
        postcode: "00100",
        city: "Roma",
        state: "Lazio",
      },
    },
    {
      step: 4,
      fields: ["vehicle_type"],
      prefill: registerFormWithoutPasswordAndConfirmation,
    },
  ])(
    "should prefill form fields from localStorage for step $step",
    async ({ step, fields, prefill }) => {
      const { navigateToStep } = renderComponent(prefill);

      await navigateToStep(step);

      for (const field of fields) {
        if (field === "vehicle_type") {
          expect(
            screen.getByRole("button", { name: /own scooter/i }),
          ).toHaveAttribute("aria-pressed", "true");

          continue;
        }

        const input = screen.getByLabelText(
          new RegExp(field.replace(/_/g, " "), "i"),
        );

        if (field === "phone_number") {
          expect(input).toHaveValue("373 332 3323");
        } else {
          expect(input).toHaveValue(prefill[field]);
        }
      }
    },
  );

  it("should render the loading indicator upon submission", async () => {
    simulateInfiniteLoading(
      `${env.VITE_BASE_URL}/api/rider/auth/register`,
      "post",
    );
    const { user, getSubmitButton, navigateToStep, completeFormAndGoToSubmit } =
      renderComponent(registerFormWithoutPasswordAndConfirmation);

    await navigateToStep(5);
    await completeFormAndGoToSubmit();
    await user.click(getSubmitButton()!);

    expect(getSubmitButton()!).toHaveTextContent(/submitting/i);
  });

  it("should not render the loading indicator after submission", async () => {
    const { user, getSubmitButton, navigateToStep, completeFormAndGoToSubmit } =
      renderComponent(registerFormWithoutPasswordAndConfirmation);

    await navigateToStep(5);
    await completeFormAndGoToSubmit();
    await user.click(getSubmitButton()!);

    expect(getSubmitButton()).not.toHaveTextContent(/submitting/i);
  });

  it("should remove rider registration data from localStorage after submission", async () => {
    const { user, getSubmitButton, completeFormAndGoToSubmit } =
      renderComponent(registerFormWithoutPasswordAndConfirmation);

    await completeFormAndGoToSubmit();
    await user.click(getSubmitButton()!);

    expect(localStorage.getItem("rider_registration_data")).toBeNull();
  });

  it("should set rider registration data in localStorage when clicking the 'Next' button", async () => {
    const personalInfoStep = {
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@gmail.com",
      phone_number: "+39 373 332 3323",
      street_address: "",
      building_number: "",
      postcode: "",
      city: "",
      state: "",
    };
    const { user, nextButton } = renderComponent();

    await user.click(nextButton);
    await user.type(screen.getByLabelText(/first name/i), "John");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/email/i), "johndoe@gmail.com");
    await user.type(screen.getByLabelText(/phone number/i), "373 332 3323");
    await user.click(nextButton);

    expect(localStorage.getItem("rider_registration_data")).toBe(
      JSON.stringify(personalInfoStep),
    );
  });
});

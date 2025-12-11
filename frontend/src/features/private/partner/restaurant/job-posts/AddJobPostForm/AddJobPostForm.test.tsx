import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { employmentTypes } from "@partner/lib/constants/job-posts";
import { TAddJobPostFormSchema } from "@partner/schemas/job-posts.schema";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addJobPostForm } from "@tests/mocks/data/private/partner/forms/add-job-post";
import { restaurantResponse } from "@tests/mocks/data/private/partner/restaurants";
import { customRender } from "@tests/utils/custom-render";
import { simulateError, simulateInfiniteLoading } from "@tests/utils/msw";

import AddJobPostForm from "./AddJobPostForm";

import env from "@/lib/env";
import { notificationsDefaults } from "@/lib/query-defaults";

vi.mock("@partner/contexts/RestaurantProvider", () => ({
  useRestaurant: vi.fn(),
}));

vi.mock("../job-description-editor/JobPostEditor", () => ({
  default: ({ value, onChange, setValue, descriptionError }: any) => (
    <div>
      <textarea
        aria-label="description"
        role="textbox"
        value={value || ""}
        onChange={(e) => {
          onChange(e.target.value);
          setValue("description_text", e.target.value);
        }}
      />

      {descriptionError && <div role="alert">{descriptionError}</div>}
    </div>
  ),
}));

describe("AddJobPostForm", () => {
  function renderComponent() {
    const user = userEvent.setup({ delay: null });

    const mockSetOpenAddJobPostDialog = vi.fn();

    vi.mocked(useRestaurant).mockReturnValue({
      restaurantData: restaurantResponse,
      notificationsData: {
        success: false,
        message: "",
        notifications: notificationsDefaults,
        unread_count: 0,
      },
      notificationsError: null,
      page: 1,
      setPage: vi.fn(),
    });

    customRender(
      <AddJobPostForm setOpenAddJobPostDialog={mockSetOpenAddJobPostDialog} />,
    );

    return {
      expectErrorToBeInTheDocument: (errorMessage: RegExp) => {
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
      },
      getForm: async () => {
        const title = screen.getByLabelText(/title/i);
        const description = screen.getByRole("textbox", {
          name: /description/i,
        });
        const employmentType = screen.getByRole("combobox", {
          name: /employment type/i,
        });
        const salary = screen.getByLabelText(/salary/i);
        const submitButton = screen.getByRole("button", {
          name: /add job post/i,
        });

        type FormData = {
          [K in keyof TAddJobPostFormSchema]: any;
        };

        async function fill(data: FormData) {
          if (data.title !== undefined) {
            await user.type(title, data.title.toString());
          }

          if (data.description_text !== undefined) {
            await user.type(description, data.description_text.toString());
          }

          if (data.employment_type !== undefined) {
            const employmentTypeLabel = employmentTypes.find(
              (option) => option.value === data.employment_type,
            )?.label;

            await user.click(employmentType);

            if (employmentTypeLabel) {
              await user.click(
                screen.getByRole("option", { name: employmentTypeLabel }),
              );
            }
          }

          if (data.salary !== undefined) {
            await user.type(salary, data.salary.toString());
          }

          await user.click(submitButton);
        }

        return {
          title,
          description,
          employmentType,
          salary,
          submitButton,
          fill,
        };
      },
      user,
    };
  }

  it("should render the main form structure", async () => {
    const { getForm } = renderComponent();

    const { title, employmentType, description, salary, submitButton } =
      await getForm();

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(employmentType).toBeInTheDocument();
    expect(salary).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should render the correct select options", async () => {
    const { user, getForm } = renderComponent();
    const { employmentType } = await getForm();

    await user.click(employmentType);

    employmentTypes.forEach(({ label }) => {
      expect(screen.getByRole("option", { name: label })).toBeInTheDocument();
    });
  });

  it.each([
    {
      scenario: "required",
      errorMessage: /fill out your job post title/i,
    },
    {
      scenario: "too long",
      title: "a".repeat(51),
      errorMessage: /too long/i,
    },
  ])(
    "should display an error if title is $scenario",
    async ({ title, errorMessage }) => {
      const { getForm, expectErrorToBeInTheDocument } = renderComponent();

      const form = await getForm();
      await form.fill({ ...addJobPostForm, title });

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it.each([
    {
      scenario: "required",
      errorMessage: /fill out your job post description/i,
    },
    {
      scenario: "too long",
      description_text: "a".repeat(2001),
      errorMessage: /too long/i,
    },
  ])(
    "should display an error if description_text is $scenario",
    async ({ description_text, errorMessage }) => {
      const { getForm, expectErrorToBeInTheDocument } = renderComponent();

      const form = await getForm();
      await form.fill({ ...addJobPostForm, description_text });

      expectErrorToBeInTheDocument(errorMessage);
    },
    20000,
  );

  it.each([
    {
      scenario: "required",
      employment_type: undefined,
      errorMessage: /select an employment type/i,
    },
  ])(
    "should display an error if employment_type is $scenario",
    async ({ employment_type, errorMessage }) => {
      const { getForm, expectErrorToBeInTheDocument } = renderComponent();

      const form = await getForm();
      await form.fill({ ...addJobPostForm, employment_type });

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it.each([
    {
      scenario: "not a number",
      salary: "abc",
      errorMessage: /valid number/i,
    },
    {
      scenario: "zero",
      salary: 0,
      errorMessage: /valid number/i,
    },
    {
      scenario: "negative number",
      salary: -100,
      errorMessage: /valid number/i,
    },
    {
      scenario: "below minimum",
      salary: 9999,
      errorMessage: /between €10,000 and €100,000/i,
    },
    {
      scenario: "above maximum",
      salary: 100001,
      errorMessage: /between €10,000 and €100,000/i,
    },
  ])(
    "should display an error if salary is $scenario",
    async ({ errorMessage, salary }) => {
      const { getForm, expectErrorToBeInTheDocument } = renderComponent();

      const form = await getForm();
      await form.fill({ ...addJobPostForm, salary });

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it("should render the loading indicator upon submission", async () => {
    simulateInfiniteLoading(
      `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurantResponse.restaurant.id}/job-posts`,
      "post",
    );
    const { getForm } = renderComponent();

    const form = await getForm();
    await form.fill(addJobPostForm);

    expect(form.submitButton).toHaveTextContent(/adding/i);
  });

  it("should not render the loading indicator after submission", async () => {
    const { getForm } = renderComponent();

    const form = await getForm();
    await form.fill(addJobPostForm);

    expect(form.submitButton).not.toHaveTextContent(/adding/i);
  });

  it("should not render the loading indicator if submission fails", async () => {
    simulateError(
      `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurantResponse.restaurant.id}/job-posts`,
      "post",
    );
    const { getForm } = renderComponent();

    const form = await getForm();
    await form.fill(addJobPostForm);

    expect(form.submitButton).not.toHaveTextContent(/adding/i);
  });
});

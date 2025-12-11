import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { restaurant } from "@tests/mocks/data/private/partner/restaurants";
import { customRender } from "@tests/utils/custom-render";
import { simulateDelay, simulateError } from "@tests/utils/msw";

import EditJobPostDialog from "./EditJobPostDialog";

import env from "@/lib/env";
import { notificationsDefaults } from "@/lib/query-defaults";

vi.mock("@partner/contexts/RestaurantProvider", () => ({
  useRestaurant: vi.fn(),
}));

vi.mock("../EditJobPostForm", () => ({
  default: () => <div data-testid="edit-job-post-form" />,
}));

describe("EditJobPostDialog", () => {
  function renderComponent(open: boolean) {
    const user = userEvent.setup();

    const mockSetOpenJobPostDialog = vi.fn();

    vi.mocked(useRestaurant).mockReturnValue({
      restaurant,
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
      <EditJobPostDialog
        jobPostId="1"
        openEditJobPostDialog={open}
        setOpenEditJobPostDialog={mockSetOpenJobPostDialog}
      />,
    );

    return {
      user,
      getLoadingText: () => screen.queryByRole("progressbar"),
      getDialog: () => screen.queryByRole("dialog"),
      getCloseButton: () => screen.queryByRole("button", { name: /close/i }),
      mockSetOpenJobPostDialog,
    };
  }

  it("should render the dialog when openEditJobPostDialog is true", () => {
    const { getDialog } = renderComponent(true);

    expect(getDialog()).toBeInTheDocument();
  });

  it("should render the main dialog structure", () => {
    const { getCloseButton } = renderComponent(true);

    expect(
      screen.getByRole("heading", { name: /edit job post/i }),
    ).toBeInTheDocument();
    expect(getCloseButton()).toBeInTheDocument();
  });

  it("should render the spinner when fetching job post", () => {
    simulateDelay(
      `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurant.id}/job-posts/1`,
    );
    const { getLoadingText } = renderComponent(true);

    expect(getLoadingText()).toBeInTheDocument();
  });

  it("should render the edit job post form", async () => {
    const { getLoadingText } = renderComponent(true);

    await waitForElementToBeRemoved(getLoadingText);

    expect(screen.getByTestId("edit-job-post-form")).toBeInTheDocument();
  });

  it("should display a toast if job post fetching fails", async () => {
    simulateError(
      `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurant.id}/job-posts/1`,
    );

    const { getLoadingText } = renderComponent(true);

    await waitForElementToBeRemoved(getLoadingText);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should call setOpenEditJobPostDialog(false) when clicking close button", async () => {
    const { user, getCloseButton, mockSetOpenJobPostDialog } =
      renderComponent(true);

    await user.click(getCloseButton()!);

    expect(mockSetOpenJobPostDialog).toHaveBeenCalledWith(false);
    expect(mockSetOpenJobPostDialog).toHaveBeenCalledTimes(1);
  });

  it("should not render the dialog when openEditJobPostDialog is false", () => {
    const { getDialog } = renderComponent(false);

    expect(getDialog()).not.toBeInTheDocument();
  });
});

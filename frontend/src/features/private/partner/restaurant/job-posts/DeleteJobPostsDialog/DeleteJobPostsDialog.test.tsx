import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jobPostIds } from "@tests/mocks/data/private/partner/job-posts";
import { restaurant } from "@tests/mocks/data/private/partner/restaurants";
import { customRender } from "@tests/utils/custom-render";
import { simulateError, simulateInfiniteLoading } from "@tests/utils/msw";

import DeleteJobPostsDialog from "./DeleteJobPostsDialog";

import env from "@/lib/env";
import { notificationsDefaults } from "@/lib/query-defaults";

vi.mock("@partner/contexts/RestaurantProvider", () => ({
  useRestaurant: vi.fn(),
}));

describe("DeleteJobPostsDialog", () => {
  function renderComponent(open: boolean) {
    const user = userEvent.setup();

    const mockSetOpenDeleteJobPostsDialog = vi.fn();

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
      <DeleteJobPostsDialog
        jobPostIds={jobPostIds}
        openDeleteJobPostsDialog={open}
        setOpenDeleteJobPostsDialog={mockSetOpenDeleteJobPostsDialog}
      />,
    );

    return {
      user,
      getDialog: () => screen.queryByRole("dialog"),
      getCloseButton: () => screen.queryByRole("button", { name: /close/i }),
      getCancelButton: () => screen.queryByRole("button", { name: /cancel/i }),
      getConfirmButton: () =>
        screen.queryByRole("button", { name: /confirm/i }),
      mockSetOpenDeleteJobPostsDialog,
    };
  }

  it("should render the dialog when openDeleteJobPostsDialog is true", () => {
    const { getDialog } = renderComponent(true);

    expect(getDialog()).toBeInTheDocument();
  });

  it("should render the main dialog structure", () => {
    const { getCloseButton, getCancelButton, getConfirmButton } =
      renderComponent(true);

    expect(
      screen.getByRole("heading", { name: /delete job posts/i }),
    ).toBeInTheDocument();
    expect(getCloseButton()).toBeInTheDocument();
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    expect(getCancelButton()).toBeInTheDocument();
    expect(getConfirmButton()).toBeInTheDocument();
  });

  it("should call setOpenDeleteJobPostsDialog(false) when clicking close button", async () => {
    const { user, getCloseButton, mockSetOpenDeleteJobPostsDialog } =
      renderComponent(true);

    await user.click(getCloseButton()!);

    expect(mockSetOpenDeleteJobPostsDialog).toHaveBeenCalledWith(false);
    expect(mockSetOpenDeleteJobPostsDialog).toHaveBeenCalledTimes(1);
  });

  it("should not render the dialog when openDeleteJobPostsDialog is false", () => {
    const { getDialog } = renderComponent(false);

    expect(getDialog()).not.toBeInTheDocument();
  });

  it("should render the loading indicator upon deletion", async () => {
    simulateInfiniteLoading(
      `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurant.id}/job-posts`,
      "delete",
    );
    const { user, getConfirmButton } = renderComponent(true);

    await user.click(getConfirmButton()!);

    expect(getConfirmButton()).toHaveTextContent(/deleting/i);
  });

  it("should not render the loading indicator after deletion", async () => {
    const { getConfirmButton } = renderComponent(true);

    expect(getConfirmButton()).not.toHaveTextContent(/deleting/i);
  });

  it("should not render the loading indicator if deletion fails", async () => {
    simulateError(
      `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurant.id}/job-posts`,
      "delete",
    );
    const { getConfirmButton } = renderComponent(true);

    expect(getConfirmButton()).not.toHaveTextContent(/deleting/i);
  });
});

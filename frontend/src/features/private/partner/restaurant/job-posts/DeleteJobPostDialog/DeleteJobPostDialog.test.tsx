import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { restaurant } from "@tests/mocks/data/private/partner/restaurants";
import { customRender } from "@tests/utils/custom-render";
import { simulateError, simulateInfiniteLoading } from "@tests/utils/msw";

import DeleteJobPostDialog from "./DeleteJobPostDialog";

import env from "@/lib/env";
import { baseOffsetPaginationDefaults } from "@/lib/query-defaults";

vi.mock("@partner/contexts/RestaurantProvider", () => ({
  useRestaurant: vi.fn(),
}));

describe("DeleteJobPostDialog", () => {
  function renderComponent(open: boolean) {
    const user = userEvent.setup();

    const mockSetOpenDeleteJobPostDialog = vi.fn();

    vi.mocked(useRestaurant).mockReturnValue({
      restaurant,
      partnerNotifications: {
        notifications: baseOffsetPaginationDefaults,
        unread_count: 0,
      },
      page: 1,
      setPage: vi.fn(),
    });

    customRender(
      <DeleteJobPostDialog
        jobPostId="1"
        openDeleteJobPostDialog={open}
        setOpenDeleteJobPostDialog={mockSetOpenDeleteJobPostDialog}
      />,
    );

    return {
      user,
      getDialog: () => screen.queryByRole("dialog"),
      getCloseButton: () => screen.queryByRole("button", { name: /close/i }),
      getCancelButton: () => screen.queryByRole("button", { name: /cancel/i }),
      getConfirmButton: () =>
        screen.queryByRole("button", { name: /confirm/i }),
      mockSetOpenDeleteJobPostDialog,
    };
  }

  it("should render the dialog when openDeleteJobPostDialog is true", () => {
    const { getDialog } = renderComponent(true);

    expect(getDialog()).toBeInTheDocument();
  });

  it("should render the main dialog structure", () => {
    const { getCloseButton, getCancelButton, getConfirmButton } =
      renderComponent(true);

    expect(
      screen.getByRole("heading", { name: /delete job post/i }),
    ).toBeInTheDocument();
    expect(getCloseButton()).toBeInTheDocument();
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    expect(getCancelButton()).toBeInTheDocument();
    expect(getConfirmButton()).toBeInTheDocument();
  });

  it("should call setOpenDeleteJobPostDialog(false) when clicking close button", async () => {
    const { user, getCloseButton, mockSetOpenDeleteJobPostDialog } =
      renderComponent(true);

    await user.click(getCloseButton()!);

    expect(mockSetOpenDeleteJobPostDialog).toHaveBeenCalledWith(false);
    expect(mockSetOpenDeleteJobPostDialog).toHaveBeenCalledTimes(1);
  });

  it("should not render the dialog when openDeleteJobPostDialog is false", () => {
    const { getDialog } = renderComponent(false);

    expect(getDialog()).not.toBeInTheDocument();
  });

  it("should render the loading indicator upon deletion", async () => {
    simulateInfiniteLoading(
      `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurant.id}/job-posts/1`,
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
      `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurant.id}/job-posts/1`,
      "delete",
    );
    const { getConfirmButton } = renderComponent(true);

    expect(getConfirmButton()).not.toHaveTextContent(/deleting/i);
  });
});

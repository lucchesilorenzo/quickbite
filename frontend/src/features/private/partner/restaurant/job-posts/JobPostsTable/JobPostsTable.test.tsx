import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jobPostsResponse } from "@tests/mocks/data/private/partner/job-posts";
import { restaurant } from "@tests/mocks/data/private/partner/restaurants";
import { server } from "@tests/mocks/server";
import { customRender } from "@tests/utils/custom-render";
import { simulateError } from "@tests/utils/msw";
import { useNotifications } from "@toolpad/core/useNotifications";
import { HttpResponse, http } from "msw";

import JobPostsTable from "./JobPostsTable";

import env from "@/lib/env";
import { notificationsDefaults } from "@/lib/query-defaults";

vi.mock("@partner/contexts/RestaurantProvider", () => ({
  useRestaurant: vi.fn(),
}));

vi.mock("../AddJobPostDialog", () => ({
  default: ({ openAddJobPostDialog }: any) =>
    openAddJobPostDialog ? <div data-testid="add-job-post-dialog" /> : null,
}));

vi.mock("../EditJobPostDialog", () => ({
  default: ({ openEditJobPostDialog }: any) =>
    openEditJobPostDialog ? <div data-testid="edit-job-post-dialog" /> : null,
}));

vi.mock("../DeleteJobPostDialog", () => ({
  default: ({ openDeleteJobPostDialog }: any) =>
    openDeleteJobPostDialog ? (
      <div data-testid="delete-job-post-dialog" />
    ) : null,
}));

vi.mock("../DeleteJobPostsDialog", () => ({
  default: ({ openDeleteJobPostsDialog }: any) =>
    openDeleteJobPostsDialog ? (
      <div data-testid="delete-job-posts-dialog" />
    ) : null,
}));

describe("JobPostsTable", () => {
  function renderComponent() {
    const user = userEvent.setup();

    const mockShow = vi.fn();

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

    vi.mocked(useNotifications).mockReturnValue({
      show: mockShow,
      close: vi.fn(),
    });

    customRender(<JobPostsTable />);

    return {
      user,
      getAddJobPostButton: () =>
        screen.queryByRole("button", { name: /add job post/i }),
      getEditJobPostButtons: async () =>
        screen.findAllByRole("button", { name: "edit" }),
      getDeleteJobPostButtons: async () =>
        screen.findAllByRole("button", { name: "delete" }),
      getDeleteJobPostsButton: async () =>
        screen.findByRole("button", { name: /delete job posts/i }),
      mockShow,
    };
  }

  it("should render the table", () => {
    renderComponent();

    expect(screen.getByLabelText("job-posts-table")).toBeInTheDocument();
  });

  it("should render the 'Add job post' button", () => {
    const { getAddJobPostButton } = renderComponent();

    expect(getAddJobPostButton()).toBeInTheDocument();
  });

  it("should open the AddJobPostDialog when clicking the 'Add job post' button", async () => {
    const { user, getAddJobPostButton } = renderComponent();

    expect(screen.queryByTestId("add-job-post-dialog")).not.toBeInTheDocument();

    await user.click(getAddJobPostButton()!);

    expect(screen.getByTestId("add-job-post-dialog")).toBeInTheDocument();
  });

  it("should open the EditJobPostDialog when clicking the edit button", async () => {
    server.use(
      http.get(
        `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurant.id}/job-posts`,
        async () => HttpResponse.json(jobPostsResponse),
      ),
    );
    const { user, getEditJobPostButtons } = renderComponent();

    expect(
      screen.queryByTestId("edit-job-post-dialog"),
    ).not.toBeInTheDocument();

    const editButtons = await getEditJobPostButtons();
    await user.click(editButtons[0]);

    expect(screen.getByTestId("edit-job-post-dialog")).toBeInTheDocument();
  });

  it("should open the DeleteJobPostDialog when clicking the delete button", async () => {
    server.use(
      http.get(
        `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurant.id}/job-posts`,
        async () => HttpResponse.json(jobPostsResponse),
      ),
    );
    const { user, getDeleteJobPostButtons } = renderComponent();

    expect(
      screen.queryByTestId("delete-job-post-dialog"),
    ).not.toBeInTheDocument();

    const deleteButtons = await getDeleteJobPostButtons();
    await user.click(deleteButtons[0]);

    expect(screen.getByTestId("delete-job-post-dialog")).toBeInTheDocument();
  });

  it("should show 'Delete job posts' button when selecting multiple rows", async () => {
    server.use(
      http.get(
        `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurant.id}/job-posts`,
        () => HttpResponse.json(jobPostsResponse),
      ),
    );
    const { user, getDeleteJobPostsButton } = renderComponent();

    await screen.findByLabelText("job-posts-table");
    const checkboxes = await screen.findAllByLabelText(/select row/i);
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);

    expect(await getDeleteJobPostsButton()).toBeInTheDocument();
  });

  it("should open the DeleteJobPostsDialog when clicking the 'Delete job posts' button", async () => {
    server.use(
      http.get(
        `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurant.id}/job-posts`,
        () => HttpResponse.json(jobPostsResponse),
      ),
    );
    const { user, getDeleteJobPostsButton } = renderComponent();

    await screen.findByLabelText("job-posts-table");
    const checkboxes = await screen.findAllByLabelText(/select row/i);
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(await getDeleteJobPostsButton());

    expect(screen.getByTestId("delete-job-posts-dialog")).toBeInTheDocument();
  });

  it("should render a toast when there are no job posts", async () => {
    simulateError(
      `${env.VITE_BASE_URL}/api/partner/restaurants/${restaurant.id}/job-posts`,
    );
    const { mockShow } = renderComponent();

    await waitFor(() => {
      expect(mockShow).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          key: "partner-get-job-posts-error",
          severity: "error",
        }),
      );
    });
    expect(mockShow).toHaveBeenCalledTimes(1);
  });
});

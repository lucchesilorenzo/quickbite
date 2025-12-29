import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jobPostsWithRestaurant } from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";
import { simulateError } from "@tests/utils/msw";

import { useJobPosts } from "../../contexts/JobPostsProvider";
import ViewJobPostDetailsDialog from "./ViewJobPostDetailsDialog";

import env from "@/lib/env";

vi.mock("@rider/contexts/JobPostsProvider", () => ({
  useJobPosts: vi.fn(),
}));

vi.mock("../JobPostDetails", () => ({
  default: () => <div data-testid="job-post-details" />,
}));

describe("ViewJobPostDetailsDialog", () => {
  function renderComponent(jobPostId: string | null = null) {
    const mockHandleJobPostChange = vi.fn();

    vi.mocked(useJobPosts).mockReturnValue({
      jobPostPages: [],
      isLoadingJobPosts: false,
      jobPostsError: null,
      sortBy: null,
      jobPostId,
      isFetchingNextPage: false,
      handleApplyFilters: vi.fn(),
      handleResetFilters: vi.fn(),
      handleApplySort: vi.fn(),
      fetchNextPage: vi.fn(),
      handleJobPostChange: mockHandleJobPostChange,
    });

    const user = userEvent.setup();

    customRender(<ViewJobPostDetailsDialog />);

    return {
      user,
      findDialog: () => screen.findByRole("dialog"),
      getDialog: () => screen.queryByRole("dialog"),
      getCloseButton: () => screen.queryByRole("button", { name: /close/i }),
      getSpinner: () => screen.queryByRole("progressbar"),
      getErrorText: () => screen.queryByRole("alert"),
      mockHandleJobPostChange,
    };
  }

  it("should render the dialog if there is a job post", async () => {
    const { findDialog } = renderComponent(jobPostsWithRestaurant[0].id);

    expect(await findDialog()).toBeInTheDocument();
  });

  it("should not render the dialog when there is no job post", () => {
    const { getDialog } = renderComponent();

    expect(getDialog()).not.toBeInTheDocument();
  });

  it("should render the main dialog structure", async () => {
    const { findDialog, getCloseButton } = renderComponent(
      jobPostsWithRestaurant[0].id,
    );
    expect(await findDialog()).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /job post details/i }),
    ).toBeInTheDocument();
    expect(getCloseButton()).toBeInTheDocument();
  });

  it("should call handleJobPostChange when clicking close button", async () => {
    const { user, findDialog, getCloseButton, mockHandleJobPostChange } =
      renderComponent(jobPostsWithRestaurant[0].id);
    expect(await findDialog()).toBeInTheDocument();

    await user.click(getCloseButton()!);

    expect(mockHandleJobPostChange).toHaveBeenCalledWith(null);
    expect(mockHandleJobPostChange).toHaveBeenCalledTimes(1);
  });

  it("should render the spinner when fetching the job post", () => {
    const { getSpinner } = renderComponent(jobPostsWithRestaurant[0].id);

    expect(getSpinner()).toBeInTheDocument();
  });

  it("should render the error message if fetching the job post fails", async () => {
    simulateError(
      `${env.VITE_BASE_URL}/api/rider/job-posts/${jobPostsWithRestaurant[0].id}`,
    );
    const { getSpinner, getErrorText } = renderComponent(
      jobPostsWithRestaurant[0].id,
    );

    await waitForElementToBeRemoved(getSpinner);

    expect(getErrorText()).toBeInTheDocument();
  });

  it("should render the job post details", async () => {
    const { getSpinner } = renderComponent(jobPostsWithRestaurant[0].id);

    await waitForElementToBeRemoved(getSpinner);

    expect(screen.getByTestId("job-post-details")).toBeInTheDocument();
  });
});

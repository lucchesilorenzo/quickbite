import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "tests/utils/custom-render";

import AddJobPostDialog from "./AddJobPostDialog";

vi.mock("../AddJobPostForm", () => ({
  default: () => <div data-testid="add-job-post-form" />,
}));

describe("AddJobPostDialog", () => {
  function renderComponent(open: boolean) {
    const user = userEvent.setup();

    const mockSetOpenJobPostDialog = vi.fn();

    customRender(
      <AddJobPostDialog
        openAddJobPostDialog={open}
        setOpenAddJobPostDialog={mockSetOpenJobPostDialog}
      />,
    );

    return {
      user,
      getDialog: () => screen.queryByRole("dialog"),
      getCloseButton: () => screen.queryByRole("button", { name: /close/i }),
      mockSetOpenJobPostDialog,
    };
  }

  it("should render the dialog when openAddJobPostDialog is true", () => {
    const { getDialog } = renderComponent(true);

    expect(getDialog()).toBeInTheDocument();
  });

  it("should render the main dialog structure", () => {
    const { getCloseButton } = renderComponent(true);

    expect(
      screen.getByRole("heading", { name: /add job post/i }),
    ).toBeInTheDocument();
    expect(getCloseButton()).toBeInTheDocument();
    expect(screen.getByTestId("add-job-post-form")).toBeInTheDocument();
  });

  it("should call setOpenAddJobPostDialog(false) when clicking close button", async () => {
    const { user, getCloseButton, mockSetOpenJobPostDialog } =
      renderComponent(true);

    await user.click(getCloseButton()!);

    expect(mockSetOpenJobPostDialog).toHaveBeenCalledWith(false);
    expect(mockSetOpenJobPostDialog).toHaveBeenCalledTimes(1);
  });

  it("should not render the dialog when openAddJobPostDialog is false", () => {
    const { getDialog } = renderComponent(false);

    expect(getDialog()).not.toBeInTheDocument();
  });
});

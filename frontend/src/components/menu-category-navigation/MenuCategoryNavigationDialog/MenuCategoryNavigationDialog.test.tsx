import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { menuCategories } from "tests/mocks/data/menu";
import { customRender } from "tests/utils/custom-render";

import MenuCategoryNavigationDialog from "./MenuCategoryNavigationDialog";

describe("MenuCategoryNavigationDialog", () => {
  function renderComponent(openMenuCategoryNavigationDialog: boolean) {
    const title = "Categories";
    const mockSetOpenMenuCategoryNavigationDialog = vi.fn();
    const mockOnSlideClick = vi.fn();

    customRender(
      <MenuCategoryNavigationDialog
        menuCategories={menuCategories}
        openMenuCategoryNavigationDialog={openMenuCategoryNavigationDialog}
        title={title}
        setOpenMenuCategoryNavigationDialog={
          mockSetOpenMenuCategoryNavigationDialog
        }
        onSlideClick={mockOnSlideClick}
      />,
    );

    return {
      user: userEvent.setup(),
      getCloseButton: () => screen.queryByRole("button", { name: /close/i }),
      title,
      mockSetOpenMenuCategoryNavigationDialog,
    };
  }

  it("should render the dialog when openMenuCategoryNavigationDialog is true", () => {
    const { title, getCloseButton } = renderComponent(true);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(getCloseButton()).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(menuCategories.length);
    menuCategories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it("should close the dialog when the close button is clicked", async () => {
    const { user, getCloseButton } = renderComponent(true);

    await user.click(getCloseButton()!);

    await waitFor(() => {
      screen.queryByRole("dialog");
    });
  });

  it("should not render the dialog when openMenuCategoryNavigationDialog is false", () => {
    renderComponent(false);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should call setOpenMenuCategoryNavigationDialog(false) when clicking close button", async () => {
    const { user, mockSetOpenMenuCategoryNavigationDialog, getCloseButton } =
      renderComponent(true);

    await user.click(getCloseButton()!);

    expect(mockSetOpenMenuCategoryNavigationDialog).toHaveBeenCalledWith(false);
    expect(mockSetOpenMenuCategoryNavigationDialog).toHaveBeenCalledTimes(1);
  });
});

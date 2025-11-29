import { OrderStatusWithAll } from "@private/types/order-types";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "@tests/utils/custom-render";
import { useSearchParams } from "react-router-dom";

import CustomPagination from "./CustomPagination";

import { PaginationContext } from "@/types/pagination-types";

vi.mock("react-router-dom", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...original,
    useSearchParams: vi.fn(),
  };
});

describe("CustomPagination", () => {
  const contexts = [
    "page",
    "orders_page",
    "reviews_page",
    "offers_page",
  ] as const;

  const queryParams: {
    status: OrderStatusWithAll;
    menu_category_id?: string;
  }[] = [
    { status: "pending", menu_category_id: "1" },
    { status: "all", menu_category_id: "2" },
    { status: "all", menu_category_id: undefined },
  ];

  function renderComponent(
    page: number,
    totalPages: number,
    context: PaginationContext = "page",
    status?: OrderStatusWithAll,
    menuCategoryId?: string,
  ) {
    const user = userEvent.setup();

    const mockSetPage = vi.fn();
    const mockSetSearchParams = vi.fn();

    const params: Record<string, string> = {
      [context]: page.toString(),
    };

    if (status) params.status = status;
    if (menuCategoryId) params.menu_category_id = menuCategoryId;

    const fakeParams = new URLSearchParams(params);

    vi.mocked(useSearchParams).mockReturnValue([
      fakeParams,
      mockSetSearchParams,
    ]);

    customRender(
      <CustomPagination
        page={page}
        totalPages={totalPages}
        context={context}
        status={status}
        menuCategoryId={menuCategoryId}
        setPage={mockSetPage}
      />,
    );

    return {
      user,
      mockSetPage,
      mockSetSearchParams,
    };
  }

  it("should render pagination component", () => {
    renderComponent(1, 1);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should render correct pages", () => {
    renderComponent(1, 5);

    expect(screen.getByRole("button", { name: /page 1/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /page 5/i })).toBeInTheDocument();
  });

  it("should set page from search params on mount", () => {
    const { mockSetPage } = renderComponent(3, 5);

    expect(mockSetPage).toHaveBeenCalledWith(3);
  });

  it("should not set page if page is greater than total pages", () => {
    const { mockSetPage } = renderComponent(5, 3);

    expect(mockSetPage).not.toHaveBeenCalled();
  });

  it.each(contexts)(
    "should increase %s context when navigating to next page",
    async (context) => {
      const { user, mockSetPage, mockSetSearchParams } = renderComponent(
        1,
        4,
        context,
      );

      await user.click(screen.getByRole("button", { name: /next page/i }));

      expect(mockSetPage).toHaveBeenCalledWith(2);
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        expect.objectContaining({ [context]: "2" }),
        expect.objectContaining({ replace: true }),
      );
    },
  );

  it.each(contexts)(
    "should decrease %s context when navigating to previous page",
    async (context) => {
      const { user, mockSetPage, mockSetSearchParams } = renderComponent(
        3,
        4,
        context,
      );

      await user.click(screen.getByRole("button", { name: /previous page/i }));

      expect(mockSetPage).toHaveBeenCalledWith(2);
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        expect.objectContaining({ [context]: "2" }),
        expect.objectContaining({ replace: true }),
      );
    },
  );

  it.each(contexts)(
    "removes %s context when returning to page 1",
    async (context) => {
      const { user, mockSetPage, mockSetSearchParams } = renderComponent(
        2,
        4,
        context,
      );

      await user.click(screen.getByRole("button", { name: /previous page/i }));

      expect(mockSetPage).toHaveBeenCalledWith(1);
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        expect.objectContaining({ [context]: [] }),
        expect.objectContaining({ replace: true }),
      );
    },
  );

  it.each(queryParams)(
    "should include %s query params when page changes",
    async ({ status, menu_category_id }) => {
      const { user, mockSetSearchParams } = renderComponent(
        1,
        4,
        "page",
        status,
        menu_category_id,
      );

      await user.click(screen.getByRole("button", { name: /next page/i }));

      expect(mockSetSearchParams).toHaveBeenCalledWith(
        expect.objectContaining({
          page: "2",
          status: status === "all" ? [] : status,
          menu_category_id: menu_category_id || [],
        }),
        expect.objectContaining({ replace: true }),
      );
    },
  );

  it.each(contexts)(
    "should navigate to specific page when clicking page number",
    async (context) => {
      const { user, mockSetPage, mockSetSearchParams } = renderComponent(
        1,
        5,
        context,
      );

      await user.click(screen.getByRole("button", { name: /page 3/i }));

      expect(mockSetPage).toHaveBeenCalledWith(3);
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        expect.objectContaining({ [context]: "3" }),
        expect.objectContaining({ replace: true }),
      );
    },
  );

  it("should preserve existing search params when updating page", async () => {
    const { user, mockSetSearchParams } = renderComponent(
      1,
      4,
      "page",
      "pending",
      "1",
    );

    await user.click(screen.getByRole("button", { name: /next page/i }));

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.objectContaining({
        page: "2",
        menu_category_id: "1",
        status: "pending",
      }),
      expect.objectContaining({ replace: true }),
    );
  });
});

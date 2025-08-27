import { useEffect } from "react";

import { Pagination, useMediaQuery } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { OrderStatusWithAll } from "@/types";

type CustomPaginationProps = {
  page: number;
  totalPages: number;
  status?: OrderStatusWithAll;
  menuCategoryId?: string;
  context?: "ordersPage" | "reviewsPage" | "offersPage" | "page";
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function CustomPagination({
  page,
  totalPages,
  status,
  menuCategoryId,
  context = "page",
  setPage,
}: CustomPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const pageParam = Number(searchParams.get(context));

    if (pageParam <= totalPages) {
      setPage(pageParam || 1);
    }
  }, [searchParams, totalPages, context, setPage]);

  function handlePageChange(_e: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
    setSearchParams(
      {
        ...Object.fromEntries(searchParams),
        status: status && status !== "all" ? status : [],
        menu_category_id: menuCategoryId || [],
        [context]: page !== 1 ? page.toString() : [],
      },
      {
        replace: true,
      },
    );
  }

  return (
    <Pagination
      size={isMobile ? "small" : "medium"}
      color="primary"
      count={totalPages}
      page={page}
      onChange={(_e, page) => handlePageChange(_e, page)}
    />
  );
}

import { useEffect } from "react";

import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { usePartnerRestaurantOrders } from "@/hooks/contexts/usePartnerRestaurantOrders";

type CustomPaginationProps = {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function CustomPagination({
  page,
  totalPages,
  setPage,
}: CustomPaginationProps) {
  const { status } = usePartnerRestaurantOrders();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = Number(searchParams.get("page"));

    if (page <= totalPages) {
      setPage(page || 1);
    }
  }, [searchParams, totalPages, setPage]);

  function handlePageChange(_e: React.ChangeEvent<unknown>, page: number) {
    setPage(page);

    setSearchParams({
      status: status !== "all" ? status : [],
      page: page !== 1 ? page.toString() : [],
    });
  }

  return (
    <Pagination
      color="primary"
      count={totalPages}
      page={page}
      onChange={(_e, page) => handlePageChange(_e, page)}
    />
  );
}

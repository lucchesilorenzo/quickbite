import { useEffect, useMemo, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import PartnerOrdersFilters from "./PartnerOrdersFilters";
import PartnerOrdersItem from "./PartnerOrdersItem";

import CustomPagination from "@/components/common/CustomPagination";
import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { usePartnerRestaurantOrders } from "@/hooks/contexts/usePartnerRestaurantOrders";
import { useGetPartnerRestaurantOrders } from "@/hooks/react-query/private/partners/restaurants/orders/useGetPartnerRestaurantOrders";
import { orderStatuses } from "@/lib/data";

export default function PartnerOrdersList() {
  const { restaurant } = usePartnerRestaurant();
  const { status, setStatus } = usePartnerRestaurantOrders();

  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const { data: ordersWithPagination, isLoading: isLoadingOrders } =
    useGetPartnerRestaurantOrders(restaurant.id, page);

  const orders = ordersWithPagination?.data;
  const totalPages = ordersWithPagination?.last_page || 1;

  const filteredOrders = useMemo(() => {
    if (status === "all") return orders;
    return orders?.filter((order) => order.status === status);
  }, [orders, status]);

  useEffect(() => {
    const status = searchParams.get("status");

    if (status) {
      const matchedStatus = Object.values(orderStatuses).find(
        ({ value }) => value === status,
      );

      setStatus(matchedStatus?.value || "all");
    }
  }, [searchParams, setStatus]);

  if (isLoadingOrders) return <Spinner />;

  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      <PartnerOrdersFilters setPage={setPage} />

      {!filteredOrders?.length ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No orders with the selected status yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {filteredOrders.map((order) => (
            <PartnerOrdersItem key={order.id} order={order} />
          ))}

          <Box sx={{ alignSelf: "center" }}>
            <CustomPagination
              page={page}
              totalPages={totalPages}
              status={status}
              setPage={setPage}
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

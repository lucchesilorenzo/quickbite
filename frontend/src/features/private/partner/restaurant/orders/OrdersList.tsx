import { useEffect, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { useOrders } from "@partner/contexts/OrdersProvider";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useGetOrders } from "@partner/hooks/restaurants/orders/useGetOrders";
import { useSearchParams } from "react-router-dom";

import OrderItem from "./OrderItem";
import OrdersFilters from "./OrdersFilters";

import CustomPagination from "@/components/common/CustomPagination";
import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";
import Spinner from "@/components/common/Spinner";
import { orderStatuses } from "@/lib/data/orders.data";

export default function OrdersList() {
  const { restaurantData } = useRestaurant();
  const { status, setStatus } = useOrders();

  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const {
    data: ordersData,
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useGetOrders({
    restaurantId: restaurantData.data.id,
    status,
    page,
  });

  useEffect(() => {
    const status = searchParams.get("status");

    if (status) {
      const matchedStatus = Object.values(orderStatuses).find(
        ({ value }) => value === status,
      );

      setStatus(matchedStatus?.value || "all");
    }
  }, [searchParams, setStatus]);

  if (isLoadingOrders) {
    return <Spinner />;
  }

  if (ordersError) {
    return <FullPageErrorMessage message={ordersError.message} />;
  }

  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      {ordersData?.data && ordersData.data.length > 0 && (
        <OrdersFilters setPage={setPage} />
      )}

      {!ordersData?.data.length ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No orders with the selected status yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {ordersData.data.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}

          <Box sx={{ alignSelf: "center" }}>
            <CustomPagination
              page={page}
              totalPages={ordersData.meta.last_page}
              status={status}
              setPage={setPage}
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

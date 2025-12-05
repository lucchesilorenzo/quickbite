import { useEffect, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { useOrders } from "@partner/contexts/OrdersProvider";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useGetOrders } from "@partner/hooks/restaurants/orders/useGetOrders";
import { ordersDefaults } from "@private/lib/query-defaults";
import { useSearchParams } from "react-router-dom";

import OrderItem from "./OrderItem";
import OrdersFilters from "./OrdersFilters";

import CustomPagination from "@/components/common/CustomPagination";
import Spinner from "@/components/common/Spinner";
import { orderStatuses } from "@/lib/constants/orders";

export default function OrdersList() {
  const { restaurant } = useRestaurant();
  const { status, setStatus } = useOrders();

  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const { data: ordersData = ordersDefaults, isLoading: isLoadingOrders } =
    useGetOrders({
      restaurantId: restaurant.id,
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

  if (isLoadingOrders) return <Spinner />;

  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      {ordersData.data.length > 0 && <OrdersFilters setPage={setPage} />}

      {!ordersData.data.length ? (
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
              totalPages={ordersData.last_page}
              status={status}
              setPage={setPage}
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

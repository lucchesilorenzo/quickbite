import { useEffect, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import OrderItem from "./OrderItem";
import OrdersFilters from "./OrdersFilters";

import CustomPagination from "@/components/common/CustomPagination";
import Spinner from "@/components/common/Spinner";
import { usePartnerOrders } from "@/hooks/contexts/private/partner/usePartnerOrders";
import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
import { useGetPartnerRestaurantOrders } from "@/hooks/react-query/private/partner/restaurants/orders/useGetPartnerRestaurantOrders";
import { orderStatuses } from "@/lib/data";
import { partnerOrdersDefaults } from "@/lib/query-defaults";

export default function OrdersList() {
  const { restaurant } = usePartnerRestaurant();
  const { status, setStatus } = usePartnerOrders();

  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const {
    data: ordersData = partnerOrdersDefaults,
    isLoading: isLoadingOrders,
  } = useGetPartnerRestaurantOrders({
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

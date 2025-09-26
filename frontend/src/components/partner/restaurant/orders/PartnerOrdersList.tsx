import { useEffect, useState } from "react";

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
import { partnerOrdersDefaults } from "@/lib/query-defaults";

export default function PartnerOrdersList() {
  const { restaurant } = usePartnerRestaurant();
  const { status, setStatus } = usePartnerRestaurantOrders();

  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const {
    data: ordersWithPagination = partnerOrdersDefaults,
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
      {ordersWithPagination.data.length > 0 && (
        <PartnerOrdersFilters setPage={setPage} />
      )}

      {!ordersWithPagination.data.length ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No orders with the selected status yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {ordersWithPagination.data.map((order) => (
            <PartnerOrdersItem key={order.id} order={order} />
          ))}

          <Box sx={{ alignSelf: "center" }}>
            <CustomPagination
              page={page}
              totalPages={ordersWithPagination.last_page}
              status={status}
              setPage={setPage}
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

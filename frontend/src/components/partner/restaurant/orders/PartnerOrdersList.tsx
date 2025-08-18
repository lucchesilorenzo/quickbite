import { useEffect, useMemo } from "react";

import { Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import PartnerOrdersFilters from "./PartnerOrdersFilters";
import PartnerOrdersItem from "./PartnerOrdersItem";

import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { usePartnerRestaurantOrders } from "@/hooks/contexts/usePartnerRestaurantOrders";
import { useGetPartnerRestaurantOrders } from "@/hooks/react-query/private/partners/restaurants/useGetPartnerRestaurantOrders";
import { orderStatuses } from "@/lib/data";

export default function PartnerOrdersList() {
  const { restaurant } = usePartnerRestaurant();
  const { status, setStatus } = usePartnerRestaurantOrders();

  const { data: orders = [], isLoading: isLoadingOrders } =
    useGetPartnerRestaurantOrders(restaurant.id);

  const [searchParams] = useSearchParams();

  const filteredOrders = useMemo(() => {
    if (status === "all") return orders;
    return orders.filter((order) => order.status === status);
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
    <Stack spacing={2} sx={{ my: 4 }}>
      <PartnerOrdersFilters />

      {!filteredOrders.length ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No orders with the selected status yet.
        </Typography>
      ) : (
        filteredOrders.map((order) => (
          <PartnerOrdersItem key={order.id} order={order} />
        ))
      )}
    </Stack>
  );
}

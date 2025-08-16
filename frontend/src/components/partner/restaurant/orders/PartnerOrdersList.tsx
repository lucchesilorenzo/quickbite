import { Stack } from "@mui/material";

import PartnerOrdersItem from "./PartnerOrdersItem";

import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { useGetPartnerRestaurantOrders } from "@/hooks/react-query/private/partners/restaurants/useGetPartnerRestaurantOrders";

export default function PartnerOrdersList() {
  const { restaurant } = usePartnerRestaurant();

  const { data: orders = [], isLoading: isLoadingOrders } =
    useGetPartnerRestaurantOrders(restaurant.id);

  if (isLoadingOrders) return <Spinner />;

  return (
    <Stack spacing={2} sx={{ my: 4 }}>
      {orders.map((order) => (
        <PartnerOrdersItem key={order.id} order={order} />
      ))}
    </Stack>
  );
}

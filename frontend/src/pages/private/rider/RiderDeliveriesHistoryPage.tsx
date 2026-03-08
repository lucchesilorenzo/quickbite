import { useEffect } from "react";

import { Container } from "@mui/material";
import { useRestaurant } from "@rider/contexts/RestaurantProvider";
import DeliveriesList from "@rider/my-restaurant/DeliveriesList";

import HeadingBlock from "@/components/common/HeadingBlock";

export default function RiderDeliveriesHistoryPage() {
  const { restaurantData } = useRestaurant();

  useEffect(() => {
    document.title = "Delivery history | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ my: 3 }}>
      <HeadingBlock
        title={restaurantData?.restaurant?.name || "My restaurant"}
        description="View your delivery history"
        backButton
      />

      <DeliveriesList />
    </Container>
  );
}

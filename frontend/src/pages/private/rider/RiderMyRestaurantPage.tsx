import { useEffect } from "react";

import { Alert, Container } from "@mui/material";
import { useRestaurant } from "@rider/contexts/RestaurantProvider";
import DeliveriesList from "@rider/my-restaurant/DeliveriesList";

import HeadingBlock from "@/components/common/HeadingBlock";

export default function RiderMyRestaurantPage() {
  const { restaurantData, restaurantError } = useRestaurant();

  useEffect(() => {
    document.title = "My restaurant | QuickBite";
  }, []);

  if (restaurantError) {
    return (
      <Container component="main" maxWidth="md" sx={{ my: 3 }}>
        <Alert severity="error">{restaurantError.message}</Alert>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md" sx={{ my: 3 }}>
      <HeadingBlock
        title={restaurantData?.restaurant?.name || "My restaurant"}
        description="View and manage your deliveries"
      />

      <DeliveriesList />
    </Container>
  );
}

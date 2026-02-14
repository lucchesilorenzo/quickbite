import { useEffect } from "react";

import { Alert, Container } from "@mui/material";
import { useRestaurant } from "@rider/contexts/RestaurantProvider";

import HeadingBlock from "@/components/common/HeadingBlock";
import Spinner from "@/components/common/Spinner";

export default function RiderMyRestaurantPage() {
  const { isLoadingRestaurant, restaurantError } = useRestaurant();

  useEffect(() => {
    document.title = "My restaurant | QuickBite";
  }, []);

  if (isLoadingRestaurant) {
    return <Spinner />;
  }

  if (restaurantError) {
    return <Alert severity="error">{restaurantError.message}</Alert>;
  }

  return (
    <Container component="main" maxWidth="md" sx={{ my: 3 }}>
      <HeadingBlock
        title="My restaurant"
        description="View and manage your deliveries"
      />
    </Container>
  );
}

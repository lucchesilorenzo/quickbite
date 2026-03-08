import { useEffect } from "react";

import HistoryIcon from "@mui/icons-material/History";
import { Button, Container } from "@mui/material";
import { useRestaurant } from "@rider/contexts/RestaurantProvider";
import { Link } from "react-router-dom";

import HeadingBlock from "@/components/common/HeadingBlock";
import ActiveDeliveryContainer from "@/features/private/rider/my-restaurant/ActiveDeliveryContainer";

export default function RiderMyRestaurantPage() {
  const { restaurantData } = useRestaurant();

  useEffect(() => {
    document.title = "My restaurant | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ my: 3 }}>
      <HeadingBlock
        title={restaurantData?.restaurant?.name || "My restaurant"}
        description="View your active delivery"
      />

      <Button
        component={Link}
        to="/rider/my-restaurant/deliveries/history"
        variant="contained"
        startIcon={<HistoryIcon />}
        sx={{ mb: 2 }}
      >
        History
      </Button>

      <ActiveDeliveryContainer />
    </Container>
  );
}

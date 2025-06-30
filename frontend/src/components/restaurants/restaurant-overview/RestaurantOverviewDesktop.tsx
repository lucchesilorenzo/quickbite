import { Box, Container } from "@mui/material";

import RestaurantOfferButton from "../common/RestaurantOfferButton";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantHeaderRow from "./RestaurantHeaderRow";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RestaurantOverviewDesktop() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Container
      component="section"
      maxWidth="md"
      sx={{ display: { xs: "none", lg: "block" } }}
    >
      <RestaurantHeader />
      <RestaurantHeaderRow />
      {restaurant.discount > 0 && restaurant.min_discount_amount > 0 && (
        <Box sx={{ mb: 2 }}>
          <RestaurantOfferButton />
        </Box>
      )}
    </Container>
  );
}

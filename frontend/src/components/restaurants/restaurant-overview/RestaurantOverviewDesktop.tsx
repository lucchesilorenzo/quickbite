import { Container } from "@mui/material";

import RestaurantOffersList from "../common/RestaurantOffersList";
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
      {restaurant.offers.length > 0 && <RestaurantOffersList />}
    </Container>
  );
}

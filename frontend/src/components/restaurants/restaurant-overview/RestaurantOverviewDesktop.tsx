import { Container } from "@mui/material";

import RestaurantOffersList from "../common/RestaurantOffersList";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantHeaderRow from "./RestaurantHeaderRow";

import { useRestaurantOffer } from "@/hooks/contexts/useRestaurantOffer";

export default function RestaurantOverviewDesktop() {
  const { offersData } = useRestaurantOffer();

  const offers = offersData?.data || [];

  return (
    <Container
      component="section"
      maxWidth="md"
      sx={{ display: { xs: "none", lg: "block" } }}
    >
      <RestaurantHeader />
      <RestaurantHeaderRow />
      {offers.length > 0 && <RestaurantOffersList />}
    </Container>
  );
}

import { Container } from "@mui/material";

import RestaurantOffersList from "../common/RestaurantOffersList";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantHeaderRow from "./RestaurantHeaderRow";

import { useRestaurantOffer } from "@/hooks/contexts/useRestaurantOffer";

export default function RestaurantOverviewDesktop() {
  const { offersData } = useRestaurantOffer();

  return (
    <Container
      component="section"
      maxWidth="md"
      sx={{ display: { xs: "none", lg: "block" } }}
    >
      <RestaurantHeader />
      <RestaurantHeaderRow />
      {offersData.data.length > 0 && <RestaurantOffersList />}
    </Container>
  );
}

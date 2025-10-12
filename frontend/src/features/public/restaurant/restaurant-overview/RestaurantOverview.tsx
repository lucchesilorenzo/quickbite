import { Box, Container } from "@mui/material";

import RestaurantOffersList from "../components/RestaurantOffersList";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantHeaderRow from "./RestaurantHeaderRow";

import { useOffers } from "@/contexts/OffersProvider";

export default function RestaurantOverview() {
  const { offersData } = useOffers();

  return (
    <>
      <Container
        component="section"
        maxWidth="md"
        sx={{ display: { xs: "none", lg: "block" } }}
      >
        <RestaurantHeader />
        <RestaurantHeaderRow />
        {offersData.data.length > 0 && <RestaurantOffersList />}
      </Container>

      <Box
        component="section"
        sx={{ display: { xs: "block", lg: "none" }, mt: 1, px: 2 }}
      >
        <RestaurantHeader />
        <RestaurantHeaderRow />
        {offersData.data.length > 0 && <RestaurantOffersList />}
      </Box>
    </>
  );
}

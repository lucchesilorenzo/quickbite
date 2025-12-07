import { Box, Container } from "@mui/material";

import RestaurantOffersList from "../components/RestaurantOffersList";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantHeaderRow from "./RestaurantHeaderRow";

export default function RestaurantOverview() {
  return (
    <>
      <Container
        component="section"
        maxWidth="md"
        sx={{ display: { xs: "none", lg: "block" } }}
      >
        <RestaurantHeader />
        <RestaurantHeaderRow />
        <RestaurantOffersList />
      </Container>

      <Box
        component="section"
        sx={{ display: { xs: "block", lg: "none" }, mt: 1, px: 2 }}
      >
        <RestaurantHeader />
        <RestaurantHeaderRow />
        <RestaurantOffersList />
      </Box>
    </>
  );
}

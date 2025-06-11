import { Container } from "@mui/material";

import RestaurantHeader from "./RestaurantHeader";
import RestaurantHeaderRow from "./RestaurantHeaderRow";

export default function RestaurantOverviewDesktop() {
  return (
    <Container
      component="section"
      maxWidth="md"
      sx={{ display: { xs: "none", lg: "block" } }}
    >
      <RestaurantHeader />
      <RestaurantHeaderRow />
    </Container>
  );
}

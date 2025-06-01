import { Container } from "@mui/material";

import RestaurantHeader from "./RestaurantHeader";
import RestaurantHeaderRow from "./RestaurantHeaderRow";

export default function RestaurantOverview() {
  return (
    <Container component="section" maxWidth="md">
      <RestaurantHeader />
      <RestaurantHeaderRow />
    </Container>
  );
}

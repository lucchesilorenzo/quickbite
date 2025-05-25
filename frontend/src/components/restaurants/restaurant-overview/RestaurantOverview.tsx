import { Container } from "@mui/material";

import RestaurantHeader from "./RestaurantHeader";
import RestaurantHeaderRow from "./RestaurantHeaderRow";

import { RestaurantDetail } from "@/types";

type RestaurantOverviewProps = {
  restaurant: RestaurantDetail;
};

export default function RestaurantOverview({
  restaurant,
}: RestaurantOverviewProps) {
  console.log(restaurant);

  return (
    <Container component="section" maxWidth="md">
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantHeaderRow restaurant={restaurant} />
    </Container>
  );
}

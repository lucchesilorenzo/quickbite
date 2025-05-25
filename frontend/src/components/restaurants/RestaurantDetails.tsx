import { Box } from "@mui/material";

import RestaurantCoverImage from "./RestaurantCoverImage";
import RestaurantOverview from "./restaurant-overview/RestaurantOverview";

import { RestaurantDetail } from "@/types";

type RestaurantDetailsProps = {
  restaurant: RestaurantDetail;
};

export default function RestaurantDetails({
  restaurant,
}: RestaurantDetailsProps) {
  return (
    <Box component="section">
      <RestaurantCoverImage restaurant={restaurant} />
      <RestaurantOverview restaurant={restaurant} />
    </Box>
  );
}

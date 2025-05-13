import { Box, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import RestaurantCardImage from "../content/list/restaurant-card/RestaurantCardImage";
import RestaurantCardTextMobile from "./RestaurantCardTextMobile";

import { RestaurantListItem } from "@/types";

type RestaurantCardMobileProps = {
  restaurant: RestaurantListItem;
};

export default function RestaurantCardMobile({
  restaurant,
}: RestaurantCardMobileProps) {
  return (
    <Paper component="li">
      <Box
        component={Link}
        to={`/restaurants/${restaurant.slug}`}
        sx={{ textDecoration: "none" }}
      >
        <Stack>
          <RestaurantCardImage restaurant={restaurant} />
          <RestaurantCardTextMobile restaurant={restaurant} />
        </Stack>
      </Box>
    </Paper>
  );
}

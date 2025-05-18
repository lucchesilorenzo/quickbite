import { Box, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import RestaurantCardImage from "../content/list/restaurant-card/RestaurantCardImage";
import RestaurantCardTextMobile from "./RestaurantCardTextMobile";

import { RestaurantListItem } from "@/types";

type RestaurantCardMobileProps = {
  restaurant: RestaurantListItem;
  type: "list" | "map";
};

export default function RestaurantCardMobile({
  restaurant,
  type,
}: RestaurantCardMobileProps) {
  if (type === "map") {
    return (
      <Paper
        sx={{
          position: "absolute",
          bottom: 30,
          left: 10,
          zIndex: 1000,
          width: 350,
        }}
      >
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

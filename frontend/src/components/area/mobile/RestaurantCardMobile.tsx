import { Box, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import RestaurantAvailability from "../common/RestaurantAvailability";
import RestaurantCardImage from "../content/list/restaurant-card/RestaurantCardImage";
import RestaurantCardTextMobile from "./RestaurantCardTextMobile";

import { isRestaurantOpen } from "@/lib/utils";
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
          left: 10,
          bottom: 20,
          zIndex: 1000,
          width: 350,
        }}
        variant="outlined"
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
    <Box>
      {!isRestaurantOpen(restaurant) && (
        <RestaurantAvailability restaurant={restaurant} />
      )}

      <Paper component="li" variant="outlined">
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
    </Box>
  );
}

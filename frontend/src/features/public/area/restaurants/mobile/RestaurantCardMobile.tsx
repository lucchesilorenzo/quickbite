import { Box, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import RestaurantAvailability from "../../components/RestaurantAvailability";
import RestaurantCardImage from "../RestaurantCardImage";
import RestaurantCardTextMobile from "./RestaurantCardTextMobile";

import { RestaurantListItem } from "@/types/restaurant/restaurant.types";

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
      {!restaurant.is_open && (
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

import { Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

import RestaurantCardImage from "./RestaurantCardImage";
import RestaurantCardText from "./RestaurantCardText";

import { RestaurantListItem } from "@/types";

type RestaurantCardProps = {
  restaurant: RestaurantListItem;
  type: "list" | "map";
};

export default function RestaurantCard({
  restaurant,
  type,
}: RestaurantCardProps) {
  if (type === "map") {
    return (
      <Paper
        sx={{
          position: "absolute",
          left: 80,
          right: 80,
          bottom: 20,
          zIndex: 1000,
        }}
        variant="outlined"
      >
        <Box
          component={Link}
          to={`/restaurants/${restaurant.slug}`}
          sx={{ textDecoration: "none" }}
        >
          <Grid container>
            <Grid size={4}>
              <RestaurantCardImage restaurant={restaurant} />
            </Grid>

            <Grid size={8}>
              <RestaurantCardText restaurant={restaurant} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper component="li" variant="outlined">
      <Box
        component={Link}
        to={`/restaurants/${restaurant.slug}`}
        sx={{ textDecoration: "none" }}
      >
        <Grid container>
          <Grid size={4}>
            <RestaurantCardImage restaurant={restaurant} />
          </Grid>

          <Grid size={8}>
            <RestaurantCardText restaurant={restaurant} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

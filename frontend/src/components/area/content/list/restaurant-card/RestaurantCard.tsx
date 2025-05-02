import { Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

import RestaurantCardImage from "./RestaurantCardImage";

import { RestaurantListItem } from "@/types";

type RestaurantCardProps = {
  restaurant: RestaurantListItem;
};

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Paper component="li">
      <Box
        component={Link}
        to={`/restaurants/${restaurant.slug}`}
        sx={{ textDecoration: "none", color: "inherit" }}
      >
        <Grid container>
          <Grid size={4}>
            <RestaurantCardImage restaurant={restaurant} />
          </Grid>

          <Grid size={8}>Content</Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

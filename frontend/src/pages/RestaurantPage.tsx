import { Box, Grid } from "@mui/material";

import RestaurantDetails from "@/components/restaurants/RestaurantDetails";
import SingleRestaurantProvider from "@/contexts/SingleRestaurantProvider";

export default function RestaurantPage() {
  return (
    <SingleRestaurantProvider>
      <Box component="main">
        <Grid container>
          <Grid size={10}>
            <RestaurantDetails />
          </Grid>

          <Grid size={2}></Grid>
        </Grid>
      </Box>
    </SingleRestaurantProvider>
  );
}

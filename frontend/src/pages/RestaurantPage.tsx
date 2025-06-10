import { Box, Grid } from "@mui/material";

import RestaurantDetails from "@/components/restaurants/RestaurantDetails";
import RestaurantCart from "@/components/restaurants/restaurant-cart/RestaurantCart";
import MultiCartProvider from "@/contexts/MultiCartProvider";
import SingleRestaurantProvider from "@/contexts/SingleRestaurantProvider";

export default function RestaurantPage() {
  return (
    <SingleRestaurantProvider>
      <MultiCartProvider>
        <Box component="main">
          <Grid container>
            <Grid size={10}>
              <RestaurantDetails />
            </Grid>

            <Grid size={2}>
              <RestaurantCart />
            </Grid>
          </Grid>
        </Box>
      </MultiCartProvider>
    </SingleRestaurantProvider>
  );
}

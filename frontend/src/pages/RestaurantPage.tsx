import { Box, Grid } from "@mui/material";
import { CartProvider } from "react-use-cart";

import RestaurantDetails from "@/components/restaurants/RestaurantDetails";
import RestaurantCart from "@/components/restaurants/restaurant-cart/RestaurantCart";
import SingleRestaurantProvider from "@/contexts/SingleRestaurantProvider";

export default function RestaurantPage() {
  return (
    <SingleRestaurantProvider>
      <CartProvider>
        <Box component="main">
          <Grid container>
            <Grid size={10}>
              <RestaurantDetails />
            </Grid>

            <Grid size={2} sx={{ position: "relative", zIndex: -1000 }}>
              <RestaurantCart />
            </Grid>
          </Grid>
        </Box>
      </CartProvider>
    </SingleRestaurantProvider>
  );
}

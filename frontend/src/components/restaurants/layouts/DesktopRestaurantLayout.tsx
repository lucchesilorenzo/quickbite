import { Box, Grid } from "@mui/material";

import RestaurantDetails from "../RestaurantDetails";
import RestaurantCart from "../restaurant-cart/RestaurantCart";

export default function DesktopRestaurantLayout() {
  return (
    <Box
      component="main"
      sx={{ display: { xs: "none", lg: "block" }, bgcolor: "#FCFCFC" }}
    >
      <Grid container>
        <Grid size={10}>
          <RestaurantDetails />
        </Grid>

        <Grid size={2}>
          <RestaurantCart />
        </Grid>
      </Grid>
    </Box>
  );
}

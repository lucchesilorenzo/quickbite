import { Box, Paper, Typography } from "@mui/material";

import EmptyRestaurantCart from "./EmptyRestaurantCart";
import RestaurantCartFooter from "./RestaurantCartFooter";
import RestaurantCartList from "./RestaurantCartList";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RestaurantCart() {
  const { restaurant } = useSingleRestaurant();
  const { isEmpty } = useMultiCart();

  return (
    <Paper sx={{ minHeight: "100%" }} elevation={3}>
      <Box component="section" sx={{ p: 2 }}>
        <Typography
          component="h2"
          variant="h5"
          sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
        >
          Cart
        </Typography>

        {!isEmpty(restaurant.id) ? (
          <>
            <RestaurantCartList />
            <RestaurantCartFooter />
          </>
        ) : (
          <EmptyRestaurantCart />
        )}
      </Box>
    </Paper>
  );
}

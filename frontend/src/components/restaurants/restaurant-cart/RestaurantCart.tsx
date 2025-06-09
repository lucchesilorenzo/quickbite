import { Paper, Stack, Typography } from "@mui/material";

import EmptyRestaurantCart from "./EmptyRestaurantCart";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RestaurantCart() {
  const { restaurant } = useSingleRestaurant();
  const { isEmpty } = useMultiCart();

  return (
    <Paper sx={{ position: "absolute", inset: 0 }} elevation={3}>
      <Stack component="section" sx={{ alignItems: "center", px: 1, py: 2 }}>
        <Typography component="h2" variant="h5" sx={{ fontWeight: 700 }}>
          Cart
        </Typography>

        {isEmpty(restaurant.id) && <EmptyRestaurantCart />}
      </Stack>
    </Paper>
  );
}

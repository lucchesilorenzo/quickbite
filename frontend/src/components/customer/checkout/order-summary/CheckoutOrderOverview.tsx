import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

import OrderItemsDialog from "./OrderItemsDialog";

import { useCheckout } from "@/hooks/contexts/useCheckout";
import env from "@/lib/env";

export default function CheckoutOrderOverview() {
  const { cart } = useCheckout();

  const [openOrderItemsDialog, setOpenOrderItemsDialog] = useState(false);

  const restaurantCart = Object.values(cart)[0];

  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {restaurantCart.restaurant.name}
        </Typography>

        <Typography
          role="button"
          variant="body1"
          sx={{
            cursor: "pointer",
            textDecoration: "underline",
            "&:hover": { textDecoration: "none" },
          }}
          onClick={() => setOpenOrderItemsDialog(true)}
        >
          Show {restaurantCart.total_items} articles
        </Typography>
      </Box>

      <Box
        component="img"
        src={`${env.VITE_BASE_URL}${restaurantCart.restaurant.logo}`}
        alt={restaurantCart.restaurant.name}
        sx={{
          objectFit: "cover",
          width: 50,
          height: 50,
          border: "2px solid #fff",
          borderRadius: 2,
        }}
      />

      <OrderItemsDialog
        openOrderItemsDialog={openOrderItemsDialog}
        setOpenOrderItemsDialog={setOpenOrderItemsDialog}
      />
    </Stack>
  );
}

import ReceiptIcon from "@mui/icons-material/Receipt";
import { Box, Card, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { formatCurrency } from "@/lib/utils";

export default function RestaurantDeliveryFee() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
        <ReceiptIcon />

        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Delivery fee
        </Typography>
      </Stack>

      <Card variant="outlined" sx={{ bgcolor: grey[100], p: 2 }}>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="body1" component="div">
            Delivery fee
          </Typography>

          <Typography variant="body1">
            {restaurant.shipping_cost === 0
              ? "Free"
              : formatCurrency(restaurant.shipping_cost)}
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}

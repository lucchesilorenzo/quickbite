import { Box, Divider, Stack, Typography } from "@mui/material";

import { formatCurrency } from "@/lib/utils/formatting";
import { CartItem } from "@/types/cart.types";

type OrderItemProps = {
  item: CartItem;
  isLast: boolean;
};

export default function OrderItem({ item, isLast }: OrderItemProps) {
  return (
    <>
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="body1" component="span" sx={{ mr: 0.5 }}>
            {item.quantity}
          </Typography>

          <Typography variant="body1" component="span">
            {item.name}
          </Typography>
        </Box>

        <Typography variant="body1">
          {formatCurrency(item.item_total)}
        </Typography>
      </Stack>

      {!isLast && <Divider sx={{ my: 2 }} />}
    </>
  );
}

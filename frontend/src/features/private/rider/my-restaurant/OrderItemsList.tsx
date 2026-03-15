import { Box, Stack, Typography } from "@mui/material";

import { Delivery } from "../types/deliveries/delivery.types";
import OrderItem from "./OrderItem";

type OrderItemsListProps = {
  delivery: Delivery;
};

export default function OrderItemsList({ delivery }: OrderItemsListProps) {
  return (
    <Box sx={{ my: 1, minWidth: 300 }}>
      <Typography
        variant="body1"
        sx={{ px: 2, py: 1, fontWeight: 700 }}
        gutterBottom
      >
        Items
      </Typography>

      <Stack spacing={1} sx={{ px: 2, maxHeight: 300, overflowY: "auto" }}>
        {delivery.order.order_items.map((item, index) => (
          <OrderItem
            item={item}
            isLast={index === delivery.order.order_items.length - 1}
          />
        ))}
      </Stack>
    </Box>
  );
}

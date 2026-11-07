import { Box, Stack, Typography } from "@mui/material";

import OrderItem from "./OrderItem";

import { DeliveryResource } from "@/api/models";

type OrderItemsListProps = {
  delivery: DeliveryResource;
};

export default function OrderItemsList({ delivery }: OrderItemsListProps) {
  const orderItems = delivery.order?.order_items ?? [];

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
        {orderItems.map((item, index) => (
          <OrderItem
            key={item.id}
            item={item}
            isLast={index === orderItems.length - 1}
          />
        ))}
      </Stack>
    </Box>
  );
}

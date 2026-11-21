import { Box, Typography } from "@mui/material";

import ViewOrderItem from "../ViewOrderItem";

import { OrderResource } from "@/api/models";

type ViewOrderItemsListProps = {
  order: OrderResource;
};

export default function ViewOrderItemsList({ order }: ViewOrderItemsListProps) {
  const orderItems = order.order_items ?? [];

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Your items
      </Typography>

      {orderItems.map((item, index) => (
        <ViewOrderItem
          key={item.id}
          item={item}
          isLast={index === orderItems.length - 1}
        />
      ))}
    </Box>
  );
}

import { Box, Typography } from "@mui/material";

import ViewOrderItem from "./ViewOrderItem";

import { Order, PartnerOrder } from "@/types/order-types";

type ViewOrderItemsListProps = {
  order: Order | PartnerOrder;
};

export default function ViewOrderItemsList({ order }: ViewOrderItemsListProps) {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Your articles
      </Typography>

      {order.order_items.map((item, index) => (
        <ViewOrderItem
          key={item.id}
          item={item}
          isLast={index === order.order_items.length - 1}
        />
      ))}
    </Box>
  );
}

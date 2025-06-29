import { Box } from "@mui/material";

import ViewOrderItem from "./ViewOrderItem";

import { Order } from "@/types/order-types";

type ViewOrderItemsListProps = {
  order: Order;
};

export default function ViewOrderItemsList({ order }: ViewOrderItemsListProps) {
  return (
    <Box>
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

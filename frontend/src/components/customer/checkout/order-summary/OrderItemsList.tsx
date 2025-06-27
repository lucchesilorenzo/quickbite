import { Box } from "@mui/material";

import OrderItem from "./OrderItem";

import { useCheckout } from "@/hooks/contexts/useCheckout";

export default function OrderItemsList() {
  const { cart } = useCheckout();

  return (
    <Box>
      {cart.items.map((item, index) => (
        <OrderItem
          key={item.id}
          item={item}
          isLast={index === cart.items.length - 1}
        />
      ))}
    </Box>
  );
}

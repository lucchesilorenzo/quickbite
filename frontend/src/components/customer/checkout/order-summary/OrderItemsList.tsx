import { Box } from "@mui/material";

import OrderItem from "./OrderItem";

import { useCheckout } from "@/hooks/contexts/useCheckout";

export default function OrderItemsList() {
  const { cart } = useCheckout();

  const restaurantCart = Object.values(cart)[0];

  return (
    <Box>
      {restaurantCart.items.map((item, index) => (
        <OrderItem
          key={item.id}
          item={item}
          isLast={index === restaurantCart.items.length - 1}
        />
      ))}
    </Box>
  );
}

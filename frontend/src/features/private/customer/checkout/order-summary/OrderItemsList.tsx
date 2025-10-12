import { Box } from "@mui/material";

import OrderItem from "./OrderItem";

import { useCheckout } from "@/features/private/customer/contexts/CheckoutProvider";

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

import { Box } from "@mui/material";

import OrderItem from "./OrderItem";

import { useCustomerCheckout } from "@/hooks/contexts/private/customer/useCustomerCheckout";

export default function OrderItemsList() {
  const { cart } = useCustomerCheckout();

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

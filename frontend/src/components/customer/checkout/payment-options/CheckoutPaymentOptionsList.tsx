import { List } from "@mui/material";

import PaymentMethodItem from "./payment-method/PaymentMethodItem";

export default function CheckoutPaymentOptionsList() {
  return (
    <List disablePadding>
      <PaymentMethodItem />
    </List>
  );
}

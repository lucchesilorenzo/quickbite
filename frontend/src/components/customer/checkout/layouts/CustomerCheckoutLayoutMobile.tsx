import { Stack } from "@mui/material";

import CheckoutOrderDetails from "../order-details/CheckoutOrderDetails";
import CheckoutOrderSummary from "../order-summary/CheckoutOrderSummary";
import CheckoutPaymentOptions from "../payment-options/CheckoutPaymentOptions";

export default function CustomerCheckoutLayoutMobile() {
  return (
    <Stack spacing={2} sx={{ display: { xs: "flex", lg: "none" } }}>
      <CheckoutOrderDetails />
      <CheckoutPaymentOptions />
      <CheckoutOrderSummary />
    </Stack>
  );
}

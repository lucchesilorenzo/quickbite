import { Paper, Typography } from "@mui/material";

import CheckoutPaymentOptionsList from "./CheckoutPaymentOptionsList";

export default function CheckoutPaymentOptions() {
  return (
    <Paper variant="outlined">
      <Typography variant="h6" sx={{ fontWeight: 700, p: 2 }}>
        Payment options
      </Typography>

      <CheckoutPaymentOptionsList />
    </Paper>
  );
}

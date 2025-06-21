import { Paper, Typography } from "@mui/material";

import CheckoutOrderDetailsList from "./CheckoutOrderDetailsList";

export default function CheckoutOrderDetails() {
  return (
    <Paper variant="outlined">
      <Typography variant="h6" sx={{ fontWeight: 700, p: 2 }}>
        Order details
      </Typography>

      <CheckoutOrderDetailsList />
    </Paper>
  );
}

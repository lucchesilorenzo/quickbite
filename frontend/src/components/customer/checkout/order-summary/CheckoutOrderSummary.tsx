import { Paper, Typography } from "@mui/material";

import CheckoutOrderOverview from "./CheckoutOrderOverview";

export default function CheckoutOrderSummary() {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Order summary
      </Typography>

      <CheckoutOrderOverview />
    </Paper>
  );
}

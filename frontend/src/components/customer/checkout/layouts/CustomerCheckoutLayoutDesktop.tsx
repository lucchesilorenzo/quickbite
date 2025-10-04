import { Box, Container, Grid, Stack } from "@mui/material";

import CheckoutBackground from "../CheckoutBackground";
import CheckoutOrderDetails from "../order-details/CheckoutOrderDetails";
import CheckoutOrderSummary from "../order-summary/CheckoutOrderSummary";
import CheckoutPaymentOptions from "../payment-options/CheckoutPaymentOptions";

export default function CustomerCheckoutLayoutDesktop() {
  return (
    <Box sx={{ display: { xs: "none", lg: "flex" }, my: 6 }}>
      <CheckoutBackground />

      <Container component="main" maxWidth="md" disableGutters>
        <Grid container spacing={4}>
          <Grid size={7}>
            <Stack spacing={4}>
              <CheckoutOrderDetails />
              <CheckoutPaymentOptions />
            </Stack>
          </Grid>

          <Grid size={5}>
            <CheckoutOrderSummary />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

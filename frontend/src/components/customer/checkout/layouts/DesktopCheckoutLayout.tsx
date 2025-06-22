import { Box, Container, Grid } from "@mui/material";

import CheckoutBackground from "../CheckoutBackground";
import CheckoutOrderDetails from "../CheckoutOrderDetails";

export default function DesktopCheckoutLayout() {
  return (
    <Box sx={{ display: { xs: "none", lg: "flex" }, my: 6 }}>
      <CheckoutBackground />

      <Container component="main" maxWidth="md" disableGutters>
        <Grid container spacing={2}>
          <Grid size={8}>
            <CheckoutOrderDetails />
          </Grid>

          <Grid size={4}></Grid>
        </Grid>
      </Container>
    </Box>
  );
}

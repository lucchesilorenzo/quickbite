import { Container, Grid, Stack, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

import PartnerProfileSidebar from "@/components/partner/profile/PartnerProfileSidebar";
import PartnerHeader from "@/components/partner/restaurants/PartnerHeader";

export default function PartnerProfileLayout() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: grey[100] }}>
      <PartnerHeader />

      <Container component="main" maxWidth="md" sx={{ my: 3 }}>
        {!isMobile ? (
          <Grid container>
            <Grid
              size={4}
              sx={{ borderRight: 1, borderColor: "divider", pr: 4 }}
            >
              <PartnerProfileSidebar />
            </Grid>

            <Grid size={8} sx={{ pl: 4 }}>
              <Outlet />
            </Grid>
          </Grid>
        ) : (
          <Outlet />
        )}
      </Container>
    </Stack>
  );
}

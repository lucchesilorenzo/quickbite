import { Container, Grid, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

import PartnerProfileSidebar from "@/components/partner/profile/PartnerProfileSidebar";
import PartnerHeader from "@/components/partner/restaurants/PartnerHeader";

export default function PartnerProfileLayout() {
  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: grey[100] }}>
      <PartnerHeader />

      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <Grid container>
          <Grid size={4} sx={{ borderRight: 1, borderColor: "divider", pr: 2 }}>
            <PartnerProfileSidebar />
          </Grid>

          <Grid size={8} sx={{ pl: 2 }}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}

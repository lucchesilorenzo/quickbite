import { Container, Grid, Stack, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import ProfileSidebar from "@partner/profile/ProfileSidebar";
import RestaurantsHeader from "@partner/restaurants/RestaurantsHeader";
import { Outlet } from "react-router-dom";

export default function PartnerProfileLayout() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: grey[100] }}>
      <RestaurantsHeader />

      <Container component="main" maxWidth="md" sx={{ my: 3 }}>
        {!isMobile ? (
          <Grid container>
            <Grid
              size={4}
              sx={{ borderRight: 1, borderColor: "divider", pr: 4 }}
            >
              <ProfileSidebar />
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

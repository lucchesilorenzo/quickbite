import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";

import LocationSearch from "@/components/common/LocationSearch";

export default function Hero() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Grid container component="section">
      <Grid
        size={{ xs: 12, lg: 6 }}
        sx={{ bgcolor: grey[200], px: { xs: 2, md: 10 }, py: 6 }}
      >
        <Stack spacing={1} sx={{ justifyContent: "center", height: "100%" }}>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h1"
            sx={{ fontWeight: "700" }}
          >
            Order food and more
          </Typography>

          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h2"
            sx={{ fontWeight: "700" }}
          >
            Restaurants and grocery stores delivering near you
          </Typography>

          <LocationSearch />
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, lg: 6 }} sx={{ bgcolor: "primary.light" }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "300px", md: "100%" },
          }}
        >
          <Box
            component="img"
            src="/quickbite-hero.png"
            alt="QuickBite Hero"
            sx={{
              height: { xs: "300px", md: "100%" },
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

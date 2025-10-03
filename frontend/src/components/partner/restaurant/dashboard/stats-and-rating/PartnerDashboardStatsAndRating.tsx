import { Grid, Stack } from "@mui/material";

import PartnerRatingDisplayCard from "../../common/PartnerRatingDisplayCard";
import PartnerDashboardStatsCard from "./stats/PartnerDashboardStatsCard";

export default function PartnerDashboardStatsAndRating() {
  return (
    <>
      <Grid
        container
        component="section"
        spacing={4}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Grid size={7}>
          <PartnerDashboardStatsCard />
        </Grid>

        <Grid size={5}>
          <PartnerRatingDisplayCard type="dashboard" />
        </Grid>
      </Grid>

      <Stack
        component="section"
        spacing={2}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <PartnerDashboardStatsCard />
        <PartnerRatingDisplayCard type="dashboard" />
      </Stack>
    </>
  );
}

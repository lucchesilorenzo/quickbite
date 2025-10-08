import { Grid, Stack } from "@mui/material";

import RatingDisplayCard from "../../common/RatingDisplayCard";
import DashboardStatsCard from "./stats/DashboardStatsCard";

export default function DashboardStatsAndRating() {
  return (
    <>
      <Grid
        container
        component="section"
        spacing={4}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Grid size={7}>
          <DashboardStatsCard />
        </Grid>

        <Grid size={5}>
          <RatingDisplayCard type="dashboard" />
        </Grid>
      </Grid>

      <Stack
        component="section"
        spacing={2}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <DashboardStatsCard />
        <RatingDisplayCard type="dashboard" />
      </Stack>
    </>
  );
}

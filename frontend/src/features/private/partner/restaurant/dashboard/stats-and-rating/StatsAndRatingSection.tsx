import { Grid, Stack } from "@mui/material";

import RatingDisplayCard from "../../components/RatingDisplayCard";
import StatsCard from "./StatsCard";

export default function StatsAndRatingSection() {
  return (
    <>
      <Grid
        container
        component="section"
        spacing={4}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Grid size={7}>
          <StatsCard />
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
        <StatsCard />
        <RatingDisplayCard type="dashboard" />
      </Stack>
    </>
  );
}

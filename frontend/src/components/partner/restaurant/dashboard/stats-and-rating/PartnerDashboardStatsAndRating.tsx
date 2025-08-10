import { Grid } from "@mui/material";

import PartnerRatingDisplayCard from "../../common/PartnerRatingDisplayCard";
import PartnerDashboardStatsCard from "./stats/PartnerDashboardStatsCard";

export default function PartnerDashboardStatsAndRating() {
  return (
    <Grid container component="section" spacing={4}>
      <Grid size={7}>
        <PartnerDashboardStatsCard />
      </Grid>

      <Grid size={5}>
        <PartnerRatingDisplayCard type="dashboard" />
      </Grid>
    </Grid>
  );
}

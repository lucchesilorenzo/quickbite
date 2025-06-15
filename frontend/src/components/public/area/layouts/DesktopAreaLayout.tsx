import { Grid } from "@mui/material";

import RestaurantMain from "../content/RestaurantMain";
import RestaurantSidebar from "../sidebar/RestaurantSidebar";

type DesktopAreaLayoutProps = {
  isLoading: boolean;
  hasNoResults: boolean | Error | null;
};

export default function DesktopAreaLayout({
  isLoading,
  hasNoResults,
}: DesktopAreaLayoutProps) {
  return (
    <Grid container spacing={4} sx={{ display: { xs: "none", lg: "flex" } }}>
      <Grid size={3}>
        <RestaurantSidebar />
      </Grid>

      <Grid size={9}>
        <RestaurantMain isLoading={isLoading} hasNoResults={hasNoResults} />
      </Grid>
    </Grid>
  );
}

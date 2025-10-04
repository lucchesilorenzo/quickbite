import { Box, Grid } from "@mui/material";

import PartnerLoginFormContainer from "../PartnerLoginFormContainer";
import PartnerLoginImage from "../PartnerLoginImage";

export default function PartnerLoginLayoutDesktop() {
  return (
    <Box component="main" sx={{ display: { xs: "none", lg: "block" } }}>
      <Grid container>
        <Grid size={6}>
          <PartnerLoginImage />
        </Grid>

        <Grid size={6}>
          <PartnerLoginFormContainer />
        </Grid>
      </Grid>
    </Box>
  );
}

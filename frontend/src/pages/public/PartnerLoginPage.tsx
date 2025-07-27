import { useEffect } from "react";

import { Box, Grid } from "@mui/material";

import PartnerLoginFormContainer from "@/components/partner/auth/login/PartnerLoginFormContainer";
import PartnerLoginImage from "@/components/partner/auth/login/PartnerLoginImage";

export default function PartnerLoginPage() {
  useEffect(() => {
    document.title = "Partner login | QuickBite";
  }, []);

  return (
    <Box component="main">
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

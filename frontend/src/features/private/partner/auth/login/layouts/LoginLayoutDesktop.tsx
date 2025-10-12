import { Box, Grid } from "@mui/material";

import LoginFormContainer from "../LoginFormContainer";
import LoginImage from "../LoginImage";

export default function LoginLayoutDesktop() {
  return (
    <Box component="main" sx={{ display: { xs: "none", lg: "block" } }}>
      <Grid container>
        <Grid size={6}>
          <LoginImage />
        </Grid>

        <Grid size={6}>
          <LoginFormContainer />
        </Grid>
      </Grid>
    </Box>
  );
}

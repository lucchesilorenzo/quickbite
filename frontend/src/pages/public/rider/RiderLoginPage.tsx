import { useEffect } from "react";

import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import LoginFormContainer from "@rider/auth/login/LoginFormContainer";

export default function RiderLoginPage() {
  useEffect(() => {
    document.title = "Rider login | QuickBite";
  }, []);

  return (
    <Box component="main" sx={{ bgcolor: grey[100] }}>
      <LoginFormContainer />
    </Box>
  );
}

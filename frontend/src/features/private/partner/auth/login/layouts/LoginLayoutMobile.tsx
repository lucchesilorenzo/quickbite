import { Box } from "@mui/material";

import LoginFormContainer from "../LoginFormContainer";

export default function LoginLayoutMobile() {
  return (
    <Box sx={{ display: { xs: "block", lg: "none" } }}>
      <LoginFormContainer />
    </Box>
  );
}

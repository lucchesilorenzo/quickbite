import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import CustomerRegisterForm from "./CustomerRegisterForm";

export default function CustomerRegisterFormCardDesktop() {
  return (
    <Paper elevation={3} sx={{ display: { xs: "none", lg: "block" }, p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
        Create account
      </Typography>

      <CustomerRegisterForm />

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body2" component="div">
          Already have an account?{" "}
          <Typography
            component={Link}
            to="/customer/auth/login"
            variant="body2"
            color="inherit"
            sx={{ "&:hover": { textDecoration: "none" } }}
          >
            Log in
          </Typography>
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="caption" component="div">
          By creating an account, you agree to our{" "}
          <Typography
            component={Link}
            to="/terms-and-conditions"
            variant="caption"
            color="inherit"
            sx={{ fontWeight: 500, "&:hover": { textDecoration: "none" } }}
          >
            Terms of Service
          </Typography>{" "}
          and{" "}
          <Typography
            component={Link}
            to="/privacy-policy"
            variant="caption"
            color="inherit"
            sx={{ fontWeight: 500, "&:hover": { textDecoration: "none" } }}
          >
            Privacy Statement
          </Typography>
          .
        </Typography>
      </Box>
    </Paper>
  );
}

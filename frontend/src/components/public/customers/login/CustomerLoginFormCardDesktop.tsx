import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import CustomerLoginForm from "./CustomerLoginForm";

export default function CustomerLoginFormCardDesktop() {
  return (
    <Paper sx={{ display: { xs: "none", lg: "block" }, p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
        Log in
      </Typography>

      <CustomerLoginForm />

      <Divider>Not registered yet?</Divider>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          color="inherit"
          fullWidth
          sx={{ border: "1px solid #dbd9d7" }}
        >
          Create an account
        </Button>
      </Box>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="caption" component="div">
          By logging in, you agree to our{" "}
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

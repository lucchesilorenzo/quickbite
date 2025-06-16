import { Box, Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import CustomerLoginForm from "./CustomerLoginForm";

export default function CustomerLoginFormCardMobile() {
  return (
    <Box sx={{ display: { xs: "block", lg: "none" }, p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
        Log in
      </Typography>

      <CustomerLoginForm />

      <Divider sx={{ my: 4 }}>Not registered yet?</Divider>

      <Box sx={{ mt: 4 }}>
        <Button
          component={Link}
          to="/auth/customer/register"
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
    </Box>
  );
}

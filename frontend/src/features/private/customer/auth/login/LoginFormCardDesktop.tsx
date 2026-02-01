import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import SocialButtonGroup from "../components/SocialButtonGroup";
import LoginForm from "./LoginForm";

export default function LoginFormCardDesktop() {
  return (
    <Paper elevation={3} sx={{ display: { xs: "none", lg: "block" }, p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
        Log in
      </Typography>

      <LoginForm />

      <Box sx={{ mt: 4 }}>
        <Divider sx={{ my: 2 }}>Not registered yet?</Divider>

        <Button
          component={Link}
          to="/customer/auth/register"
          variant="outlined"
          color="inherit"
          fullWidth
          sx={{ border: "1px solid #dbd9d7", fontWeight: 700 }}
        >
          Create an account
        </Button>
      </Box>

      <SocialButtonGroup />

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

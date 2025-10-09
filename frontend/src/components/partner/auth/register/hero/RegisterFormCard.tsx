import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

import RegisterForm from "./RegisterForm";

export default function RegisterFormCard() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Paper elevation={3} sx={{ p: 3, width: { lg: 600 } }}>
      <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 700 }}>
        Grow your orders, your customers and your brand
      </Typography>

      <Box sx={{ my: 2 }}>
        <Typography variant="body2" component="div">
          Already have an account?{" "}
          <Typography
            component={Link}
            to="/partner/auth/login"
            variant="body2"
            color="info"
            sx={{ fontWeight: 500, "&:hover": { textDecoration: "none" } }}
          >
            Log in
          </Typography>
        </Typography>
      </Box>

      <RegisterForm />
    </Paper>
  );
}

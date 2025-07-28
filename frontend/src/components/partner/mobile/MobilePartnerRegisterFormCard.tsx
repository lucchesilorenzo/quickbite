import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import MobilePartnerRegisterForm from "./MobilePartnerRegisterForm";

export default function MobilePartnerRegisterFormCard() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
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

      <MobilePartnerRegisterForm />
    </Paper>
  );
}

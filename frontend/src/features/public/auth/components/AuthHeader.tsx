import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import AuthHeaderDialog from "./AuthHeaderDialog";

import HeaderDialog from "@/components/common/HeaderDialog";
import { useAuth } from "@/contexts/AuthProvider";

export default function AuthHeader() {
  const { user } = useAuth();

  return (
    <AppBar position="relative" id="back-to-top" color="inherit" elevation={3}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack
          direction="row"
          spacing={1}
          component={Link}
          to="/"
          sx={{ alignItems: "center", textDecoration: "none" }}
        >
          <RestaurantMenuIcon color="primary" />

          <Typography
            variant="h6"
            component="span"
            color="primary"
            sx={{ fontWeight: 700, display: { xs: "none", md: "block" } }}
          >
            QuickBite
          </Typography>
        </Stack>

        {user ? <AuthHeaderDialog /> : <HeaderDialog />}
      </Toolbar>
    </AppBar>
  );
}

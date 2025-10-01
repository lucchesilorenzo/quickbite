import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import PartnerProfileDrawer from "../profile/PartnerProfileDrawer";
import PartnerProfileMenu from "../profile/PartnerProfileMenu";

export default function PartnerHeader() {
  const { pathname } = useLocation();

  const isProfileRoute = pathname.includes("profile");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <AppBar position="relative" color="inherit" elevation={3}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing={1}>
          {isProfileRoute && isMobile && <PartnerProfileDrawer />}

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
              sx={{ display: { xs: "none", md: "block" } }}
            >
              QuickBite
            </Typography>
          </Stack>
        </Stack>

        <PartnerProfileMenu />
      </Toolbar>
    </AppBar>
  );
}

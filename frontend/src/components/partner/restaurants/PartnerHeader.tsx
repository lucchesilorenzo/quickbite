import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

import PartnerProfileMenu from "./PartnerProfileMenu";

import { useLogoutPartner } from "@/hooks/react-query/private/partners/auth/useLogoutPartner";

export default function PartnerHeader() {
  const { mutateAsync: logoutPartner } = useLogoutPartner();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  async function handleLogoutPartner() {
    await logoutPartner();
  }

  return (
    <AppBar position="relative" color="inherit" elevation={3}>
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
            sx={{ display: { xs: "none", md: "block" } }}
          >
            QuickBite
          </Typography>
        </Stack>

        {isMobile ? (
          <IconButton color="primary" onClick={handleLogoutPartner}>
            <LogoutOutlinedIcon />
          </IconButton>
        ) : (
          <PartnerProfileMenu />
        )}
      </Toolbar>
    </AppBar>
  );
}

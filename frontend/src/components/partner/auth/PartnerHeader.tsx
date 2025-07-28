import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { useLogoutPartner } from "@/hooks/react-query/private/partners/auth/useLogoutPartner";

export default function PartnerHeader() {
  const { mutateAsync: logoutPartner } = useLogoutPartner();

  const navigate = useNavigate();

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
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardArrowLeftIcon color="primary" />
          </IconButton>

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

        <Button
          variant="contained"
          color="primary"
          sx={{ fontWeight: 700 }}
          onClick={handleLogoutPartner}
        >
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

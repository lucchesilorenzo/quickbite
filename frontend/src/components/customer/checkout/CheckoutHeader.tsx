import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import CustomerHeaderDialog from "../header/CustomerHeaderDialog";

import HeaderDialog from "@/components/common/HeaderDialog";
import { useAuth } from "@/hooks/contexts/public/useAuth";
import { isCustomer } from "@/lib/utils/auth";

export default function CheckoutHeader() {
  const { user } = useAuth();

  const navigate = useNavigate();

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
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardArrowLeftIcon color="primary" />
          </IconButton>

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

        <Typography variant="body2" component="div" sx={{ fontWeight: 700 }}>
          Checkout
        </Typography>

        {isCustomer(user) ? <CustomerHeaderDialog /> : <HeaderDialog />}
      </Toolbar>
    </AppBar>
  );
}

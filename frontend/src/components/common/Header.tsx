import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

import HeaderDialogCustomer from "../customer/header/CustomerHeaderDialog";
import HeaderDialog from "./HeaderDialog";

import { useAuth } from "@/hooks/contexts/public/useAuth";
import { isCustomer } from "@/lib/utils";

export default function Header() {
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

        {!isCustomer(user) ? (
          <HeaderDialog />
        ) : (
          <HeaderDialogCustomer customer={user} />
        )}
      </Toolbar>
    </AppBar>
  );
}

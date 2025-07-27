import PersonIcon from "@mui/icons-material/Person";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import HeaderDialogCustomer from "../customer/header/HeaderDialogCustomer";

import HeaderDialog from "@/components/common/HeaderDialog";
import { useAuth } from "@/hooks/contexts/useAuth";
import { routes } from "@/lib/data";
import { isCustomer } from "@/lib/utils";

export default function HomeHeader() {
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
            sx={{ fontWeight: 700 }}
          >
            QuickBite
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={{ md: 4 }}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {!user &&
            routes.map((route) => (
              <Button
                key={route.href}
                color="inherit"
                startIcon={<route.icon />}
                component={Link}
                to={route.href}
              >
                {route.label}
              </Button>
            ))}

          {!isCustomer(user) && (
            <Button
              color="inherit"
              startIcon={<PersonIcon />}
              component={Link}
              to="/customer/auth/login"
            >
              Log in
            </Button>
          )}

          {!isCustomer(user) ? (
            <HeaderDialog />
          ) : (
            <HeaderDialogCustomer customer={user} />
          )}
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          {!isCustomer(user) && (
            <Button
              color="inherit"
              startIcon={<PersonIcon />}
              component={Link}
              to="/customer/auth/login"
            >
              Log in
            </Button>
          )}

          {!isCustomer(user) ? (
            <HeaderDialog />
          ) : (
            <HeaderDialogCustomer customer={user} />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

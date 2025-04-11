import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import HeaderDialog from "./HeaderDialog";

import { routes } from "@/lib/data";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack
          direction="row"
          spacing={1}
          component={Link}
          to="/"
          sx={{
            alignItems: "center",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <RestaurantMenuIcon />

          <Typography variant="h6" component="span" sx={{ fontWeight: "bold" }}>
            QuickBite
          </Typography>
        </Stack>

        <Stack direction="row" spacing={{ md: 4 }}>
          {routes.map((route) => (
            <Button
              key={route.href}
              color="inherit"
              startIcon={<route.icon />}
              component={Link}
              to={route.href}
              sx={{
                ...(route.href !== "/auth/login" && {
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }),
              }}
            >
              {route.label}
            </Button>
          ))}

          <HeaderDialog />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

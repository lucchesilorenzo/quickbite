import NotificationsIcon from "@mui/icons-material/Notifications";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {
  AppBar,
  Badge,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { Link } from "react-router-dom";

import ProfileMenu from "../profile/ProfileMenu";
import RestaurantDrawer from "./RestaurantDrawer";
import RestaurantNavigation from "./RestaurantNavigation";

export default function RestaurantHeader() {
  const { notificationsData, restaurantData } = useRestaurant();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <AppBar position="relative" color="inherit" elevation={3}>
      <Toolbar sx={{ justifyContent: "space-between", gap: 1 }}>
        <Stack direction="row" spacing={1}>
          {isMobile && <RestaurantDrawer />}

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

        {!isMobile && <RestaurantNavigation />}

        <Stack
          direction="row"
          spacing={isMobile ? 1 : 2}
          sx={{ alignItems: "center" }}
        >
          <Tooltip title="Notifications">
            <Link
              to={`/partner/restaurants/${restaurantData.restaurant.id}/notifications`}
            >
              <IconButton aria-label="notifications">
                <Badge
                  badgeContent={notificationsData.unread_count}
                  color="error"
                  max={20}
                >
                  <NotificationsIcon color="action" />
                </Badge>
              </IconButton>
            </Link>
          </Tooltip>

          <ProfileMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

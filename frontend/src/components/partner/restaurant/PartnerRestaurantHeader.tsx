import { useEchoNotification } from "@laravel/echo-react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { Link, useLocation } from "react-router-dom";

import PartnerNavigation from "./PartnerNavigation";

import NotificationToast from "@/components/common/NotificationToast";
import { useAuth } from "@/hooks/contexts/useAuth";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { useLogoutPartner } from "@/hooks/react-query/private/partners/auth/useLogoutPartner";
import { NewOrderReceived } from "@/types";

export default function PartnerRestaurantHeader() {
  const { user, userNotifications } = useAuth();
  const { restaurant } = usePartnerRestaurant();
  const { mutateAsync: logoutPartner } = useLogoutPartner();

  const { pathname } = useLocation();
  const notifications = useNotifications();
  const queryClient = useQueryClient();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  async function handleLogoutPartner() {
    await logoutPartner();
  }

  useEchoNotification<NewOrderReceived>(
    `App.Models.User.${user?.id}`,
    (notification) => {
      notifications.show(
        <NotificationToast
          title={notification.title}
          description={notification.description}
        />,
        {
          severity: "info",
        },
      );

      queryClient.invalidateQueries({ queryKey: ["user-notifications"] });

      if (pathname.includes("orders")) {
        queryClient.invalidateQueries({
          queryKey: ["partner-orders", restaurant.id, 1],
        });
      }

      if (pathname.includes("dashboard")) {
        queryClient.invalidateQueries({
          queryKey: ["partner-dashboard-stats", restaurant.id],
        });
      }
    },
    "new-order-received",
  );

  return (
    <AppBar position="relative" color="inherit" elevation={3}>
      <Toolbar sx={{ justifyContent: "space-between", gap: 1 }}>
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

        <PartnerNavigation />

        <Stack
          direction="row"
          spacing={isMobile ? 1 : 4}
          sx={{ alignItems: "center" }}
        >
          <Tooltip title="Notifications">
          <Link to={`/partner/restaurants/${restaurant.id}/notifications`}>
            <IconButton aria-label="notifications">
              <Badge
                badgeContent={userNotifications.unread_count}
                color="error"
              >
                <NotificationsIcon color="action" />
              </Badge>
            </IconButton>
          </Link>
          </Tooltip>

          {isMobile ? (
            <IconButton color="primary" onClick={handleLogoutPartner}>
              <LogoutOutlinedIcon />
            </IconButton>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{ fontWeight: 700 }}
              onClick={handleLogoutPartner}
            >
              Log out
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

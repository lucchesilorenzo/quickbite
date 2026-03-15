import { useEffect } from "react";

import { useEchoNotification } from "@laravel/echo-react";
import { Stack } from "@mui/material";
import JobPostsProvider from "@rider/contexts/JobPostsProvider";
import NotificationsProvider from "@rider/contexts/NotificationsProvider";
import RestaurantProvider from "@rider/contexts/RestaurantProvider";
import Header from "@rider/header/Header";
import { NewDeliveryReceivedToBroadcast } from "@rider/types/notifications/notification.types";
import { useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { Outlet } from "react-router-dom";

import NotificationToast from "@/components/common/NotificationToast";
import { useAuth } from "@/contexts/AuthProvider";

export default function RiderLayout() {
  const { user } = useAuth();

  const notifications = useNotifications();
  const queryClient = useQueryClient();

  const { leave: leaveDelivery } =
    useEchoNotification<NewDeliveryReceivedToBroadcast>(
      user?.id ? `App.Models.User.${user.id}` : "",
      (notification) => {
        notifications.show(
          <NotificationToast
            title={notification.title}
            description={notification.description}
          />,
          { severity: "info" },
        );

        queryClient.invalidateQueries({
          queryKey: ["rider-notifications", user?.id, 1],
        });
      },
      "new.delivery.received",
    );

  useEffect(() => {
    return () => {
      leaveDelivery();
    };
  }, [leaveDelivery]);

  return (
    <NotificationsProvider>
      <JobPostsProvider>
        <RestaurantProvider>
          <Stack sx={{ minHeight: "100vh" }}>
            <Header />

            <Outlet />
          </Stack>
        </RestaurantProvider>
      </JobPostsProvider>
    </NotificationsProvider>
  );
}

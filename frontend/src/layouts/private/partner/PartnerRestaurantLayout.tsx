import { useEffect } from "react";

import { useEchoNotification } from "@laravel/echo-react";
import { Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import RestaurantProvider from "@partner/contexts/RestaurantProvider";
import RestaurantHeader from "@partner/restaurant/RestaurantHeader";
import {
  NewOrderReceivedToBroadcast,
  NewReviewReceivedToBroadcast,
} from "@partner/types/notification-types";
import { useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { Outlet, useLocation, useParams } from "react-router-dom";

import NotificationToast from "@/components/NotificationToast";
import { useAuth } from "@/contexts/AuthProvider";

export default function PartnerRestaurantLayout() {
  const { user } = useAuth();
  const { restaurantId } = useParams();
  const { pathname } = useLocation();

  const notifications = useNotifications();
  const queryClient = useQueryClient();

  const { leave: leaveOrder } =
    useEchoNotification<NewOrderReceivedToBroadcast>(
      `App.Models.User.${user?.id}.Restaurant.${restaurantId}`,
      (notification) => {
        notifications.show(
          <NotificationToast
            title={notification.title}
            description={notification.description}
          />,
          { severity: "info" },
        );

        queryClient.invalidateQueries({
          queryKey: ["partner-notifications", restaurantId, 1],
        });

        if (pathname.includes("orders")) {
          queryClient.invalidateQueries({
            queryKey: ["partner-orders", restaurantId, 1],
          });
        }

        if (pathname.includes("dashboard")) {
          queryClient.invalidateQueries({
            queryKey: ["partner-dashboard-stats", restaurantId],
          });
        }
      },
      "new.order.received",
    );

  const { leave: leaveReview } =
    useEchoNotification<NewReviewReceivedToBroadcast>(
      `App.Models.User.${user?.id}.Restaurant.${restaurantId}`,
      (notification) => {
        notifications.show(
          <NotificationToast
            title={notification.title}
            description={notification.description}
          />,
          { severity: "info" },
        );

        queryClient.invalidateQueries({
          queryKey: ["partner-notifications", restaurantId, 1],
        });

        if (pathname.includes("reviews") || pathname.includes("dashboard")) {
          queryClient.invalidateQueries({
            queryKey: ["partner-reviews", restaurantId, 1],
          });
        }
      },
      "new.review.received",
    );

  useEffect(() => {
    return () => {
      leaveOrder();
      leaveReview();
    };

    // When logging out, the component unmounts, and so we don't need to add user.id to the dependency array
  }, [restaurantId, leaveOrder, leaveReview]);

  return (
    <RestaurantProvider restaurantId={restaurantId}>
      <Stack sx={{ minHeight: "100vh", bgcolor: grey[100] }}>
        <RestaurantHeader />

        <Outlet />
      </Stack>
    </RestaurantProvider>
  );
}

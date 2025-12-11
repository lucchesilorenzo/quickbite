import { useEffect } from "react";

import { Container } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import NotificationsActionBar from "@partner/restaurant/notifications/NotificationsActionBar";
import NotificationsList from "@partner/restaurant/notifications/NotificationsList";

import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";

export default function PartnerNotificationsPage() {
  const { notificationsError } = useRestaurant();

  useEffect(() => {
    document.title = "Notifications | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <HeadingBlock
        title="Notifications"
        description="View and manage your notifications"
      />

      {notificationsError ? (
        <FullPageErrorMessage message={notificationsError.message} />
      ) : (
        <>
          <NotificationsActionBar />
          <NotificationsList />
        </>
      )}
    </Container>
  );
}

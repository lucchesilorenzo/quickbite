import { useEffect } from "react";

import { Container } from "@mui/material";

import HeadingBlock from "@/components/partner/restaurant/common/HeadingBlock";
import NotificationsActionBar from "@/components/partner/restaurant/notifications/NotificationsActionBar";
import NotificationsList from "@/components/partner/restaurant/notifications/NotificationsList";

export default function PartnerRestaurantNotificationsPage() {
  useEffect(() => {
    document.title = "Notifications | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <HeadingBlock
        title="Notifications"
        description="View and manage your notifications"
      />

      <NotificationsActionBar />
      <NotificationsList />
    </Container>
  );
}

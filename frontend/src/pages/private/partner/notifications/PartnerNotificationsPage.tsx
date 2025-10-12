import { useEffect } from "react";

import { Container } from "@mui/material";

import HeadingBlock from "@/features/private/partner/components/HeadingBlock";
import NotificationsActionBar from "@/features/private/partner/restaurant/notifications/NotificationsActionBar";
import NotificationsList from "@/features/private/partner/restaurant/notifications/NotificationsList";

export default function PartnerNotificationsPage() {
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

import { useEffect } from "react";

import { Container } from "@mui/material";
import { useNotifications } from "@rider/contexts/NotificationsProvider";
import NotificationsActionBar from "@rider/notifications/NotificationsActionBar";
import NotificationsList from "@rider/notifications/NotificationsList";

import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";
import HeadingBlock from "@/components/common/HeadingBlock";

export default function RiderNotificationsPage() {
  const { notificationsError } = useNotifications();

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

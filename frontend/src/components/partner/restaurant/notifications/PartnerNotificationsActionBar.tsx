import { useState } from "react";

import { Button, Stack } from "@mui/material";

import PartnerNotificationsMarkAsReadDialog from "./PartnerNotificationsMarkAsReadDialog";

import { useAuth } from "@/hooks/contexts/useAuth";

export default function PartnerNotificationsActionBar() {
  const { userNotifications } = useAuth();

  const [openMarkUserNotificationsAsRead, setOpenMarkUserNotificationsAsRead] =
    useState(false);

  return (
    <Stack direction="row">
      {userNotifications.unread_count > 0 && (
        <Button
          sx={{ ml: "auto" }}
          onClick={() => setOpenMarkUserNotificationsAsRead(true)}
        >
          Mark all as read
        </Button>
      )}

      <PartnerNotificationsMarkAsReadDialog
        openMarkUserNotificationsAsRead={openMarkUserNotificationsAsRead}
        setOpenMarkUserNotificationsAsRead={setOpenMarkUserNotificationsAsRead}
      />
    </Stack>
  );
}

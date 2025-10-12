import { useState } from "react";

import { Button, Stack } from "@mui/material";
import { usePartnerRestaurant } from "@partner/contexts/PartnerRestaurantProvider";

import NotificationsMarkAsReadDialog from "./NotificationsMarkAsReadDialog";

export default function NotificationsActionBar() {
  const { partnerNotifications } = usePartnerRestaurant();

  const [openMarkUserNotificationsAsRead, setOpenMarkUserNotificationsAsRead] =
    useState(false);

  return (
    <Stack direction="row">
      {partnerNotifications.unread_count > 0 && (
        <Button
          sx={{ ml: "auto" }}
          onClick={() => setOpenMarkUserNotificationsAsRead(true)}
        >
          Mark all as read
        </Button>
      )}

      <NotificationsMarkAsReadDialog
        openMarkUserNotificationsAsRead={openMarkUserNotificationsAsRead}
        setOpenMarkUserNotificationsAsRead={setOpenMarkUserNotificationsAsRead}
      />
    </Stack>
  );
}

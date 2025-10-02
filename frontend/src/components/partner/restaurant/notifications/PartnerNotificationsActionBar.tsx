import { useState } from "react";

import { Button, Stack } from "@mui/material";

import PartnerNotificationsMarkAsReadDialog from "./PartnerNotificationsMarkAsReadDialog";

import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";

export default function PartnerNotificationsActionBar() {
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

      <PartnerNotificationsMarkAsReadDialog
        openMarkUserNotificationsAsRead={openMarkUserNotificationsAsRead}
        setOpenMarkUserNotificationsAsRead={setOpenMarkUserNotificationsAsRead}
      />
    </Stack>
  );
}

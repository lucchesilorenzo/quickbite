import { useState } from "react";

import { Button, Stack } from "@mui/material";

import PartnerNotificationsMarkAsReadDialog from "./PartnerNotificationsMarkAsReadDialog";

export default function PartnerNotificationsActionBar() {
  const [openMarkUserNotificationsAsRead, setOpenMarkUserNotificationsAsRead] =
    useState(false);

  return (
    <Stack direction="row">
      <Button
        sx={{ ml: "auto" }}
        onClick={() => setOpenMarkUserNotificationsAsRead(true)}
      >
        Mark all as read
      </Button>

      <PartnerNotificationsMarkAsReadDialog
        openMarkUserNotificationsAsRead={openMarkUserNotificationsAsRead}
        setOpenMarkUserNotificationsAsRead={setOpenMarkUserNotificationsAsRead}
      />
    </Stack>
  );
}

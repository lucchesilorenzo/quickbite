import { useState } from "react";

import { Button, Stack } from "@mui/material";

import { useNotifications } from "../contexts/NotificationsProvider";
import MarkNotificationsAsReadDialog from "./MarkNotificationsAsReadDialog";

export default function NotificationsActionBar() {
  const { notificationsData } = useNotifications();

  const [
    openMarkNotificationsAsReadDialog,
    setOpenMarkNotificationsAsReadDialog,
  ] = useState(false);

  return (
    <Stack direction="row">
      {notificationsData && notificationsData.unread_count > 0 && (
        <Button
          sx={{ ml: "auto" }}
          onClick={() => setOpenMarkNotificationsAsReadDialog(true)}
        >
          Mark all as read
        </Button>
      )}

      <MarkNotificationsAsReadDialog
        openMarkNotificationsAsReadDialog={openMarkNotificationsAsReadDialog}
        setOpenMarkNotificationsAsReadDialog={
          setOpenMarkNotificationsAsReadDialog
        }
      />
    </Stack>
  );
}

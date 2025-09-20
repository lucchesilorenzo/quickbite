import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Alert, AlertTitle, Stack, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

import { UserNotification } from "@/types";

type PartnerNotificationItemProps = {
  notification: UserNotification;
};

export default function PartnerNotificationsItem({
  notification,
}: PartnerNotificationItemProps) {
  return (
    <Alert
      variant="outlined"
      severity="info"
      icon={<NotificationsActiveIcon color="action" />}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        color: "inherit",
      }}
    >
      <AlertTitle sx={{ fontWeight: 600 }}>
        {notification.data.title}
      </AlertTitle>

      <Stack spacing={1}>
        <Typography variant="body2">{notification.data.description}</Typography>

        <Typography variant="body2">
          {formatDistanceToNow(notification.created_at, {
            addSuffix: true,
          })}
        </Typography>
      </Stack>
    </Alert>
  );
}

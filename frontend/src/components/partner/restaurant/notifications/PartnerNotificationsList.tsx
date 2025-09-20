import { Box, Stack, Typography } from "@mui/material";

import PartnerNotificationsItem from "./PartnerNotificationsItem";

import CustomPagination from "@/components/common/CustomPagination";
import { useAuth } from "@/hooks/contexts/useAuth";

export default function PartnerNotificationsList() {
  const { userNotifications, page, setPage } = useAuth();

  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      {!userNotifications.notifications.data.length ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No notifications yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {userNotifications.notifications.data.map((notification) => (
            <PartnerNotificationsItem
              key={notification.id}
              notification={notification}
            />
          ))}

          <Box sx={{ alignSelf: "center" }}>
            <CustomPagination
              page={page}
              totalPages={userNotifications.notifications.last_page}
              setPage={setPage}
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

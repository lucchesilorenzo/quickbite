import { Box, Stack, Typography } from "@mui/material";

import PartnerNotificationsItem from "./PartnerNotificationsItem";

import CustomPagination from "@/components/common/CustomPagination";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";

export default function PartnerNotificationsList() {
  const { partnerNotifications, page, setPage } = usePartnerRestaurant();

  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      {!partnerNotifications.notifications.data.length ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No notifications yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {partnerNotifications.notifications.data.map((notification) => (
            <PartnerNotificationsItem
              key={notification.id}
              notification={notification}
            />
          ))}

          <Box sx={{ alignSelf: "center" }}>
            <CustomPagination
              page={page}
              totalPages={partnerNotifications.notifications.last_page}
              setPage={setPage}
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

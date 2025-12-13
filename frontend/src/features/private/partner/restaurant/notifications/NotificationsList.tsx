import { Box, Stack, Typography } from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";

import NotificationItem from "./NotificationItem";

import CustomPagination from "@/components/common/CustomPagination";

export default function NotificationsList() {
  const { notificationsData, page, setPage } = useRestaurant();

  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      {!notificationsData.notifications.data.length ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No notifications yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {notificationsData.notifications.data.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}

          <Box sx={{ alignSelf: "center" }}>
            <CustomPagination
              page={page}
              totalPages={notificationsData.notifications.last_page}
              setPage={setPage}
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

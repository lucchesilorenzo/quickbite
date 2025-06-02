import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Card, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { capitalize } from "@/lib/utils";

export default function RestaurantDeliveryTimes() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
        <ScheduleIcon />

        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Delivery times
        </Typography>
      </Stack>

      <Card variant="outlined" sx={{ bgcolor: grey[100], p: 2 }}>
        {restaurant.delivery_days.map((d) => {
          function formatTime(time: string | null) {
            return time?.slice(0, 5) ?? null;
          }

          const formattedStart = formatTime(d.start_time);
          const formattedEnd = formatTime(d.end_time);

          return (
            <Stack
              key={d.id}
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography variant="body1" component="div">
                {capitalize(d.day)}
              </Typography>

              <Typography variant="body1" component="div">
                {formattedStart && formattedEnd
                  ? `${formattedStart} - ${formattedEnd}`
                  : "Closed"}
              </Typography>
            </Stack>
          );
        })}
      </Card>
    </Box>
  );
}

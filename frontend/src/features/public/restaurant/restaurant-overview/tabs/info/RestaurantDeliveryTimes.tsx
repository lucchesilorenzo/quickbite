import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Card, Stack, Typography, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";

import { useRestaurant } from "@/contexts/RestaurantProvider";
import { capitalize } from "@/lib/utils/formatting";

export default function RestaurantDeliveryTimes() {
  const { restaurantData } = useRestaurant();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
        <ScheduleIcon />

        <Typography
          variant={isMobile ? "body1" : "h6"}
          component="div"
          sx={{ fontWeight: 700 }}
        >
          Delivery times
        </Typography>
      </Stack>

      <Card variant="outlined" sx={{ bgcolor: grey[100], p: 2 }}>
        {restaurantData.restaurant.delivery_days.map((d) => (
          <Stack
            key={d.id}
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography variant={isMobile ? "body2" : "body1"} component="div">
              {capitalize(d.day)}
            </Typography>

            <Typography
              variant={isMobile ? "body2" : "body1"}
              color="text"
              component="div"
            >
              {d.start_time && d.end_time
                ? `${d.start_time.slice(0, 5)} - ${d.end_time.slice(0, 5)}`
                : "Closed"}
            </Typography>
          </Stack>
        ))}
      </Card>
    </Box>
  );
}

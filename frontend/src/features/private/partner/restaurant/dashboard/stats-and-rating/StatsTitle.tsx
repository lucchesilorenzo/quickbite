import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { Link as MuiLink, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import { usePartnerRestaurant } from "@/features/private/partner/contexts/PartnerRestaurantProvider";

export default function StatsTitle() {
  const { restaurant } = usePartnerRestaurant();

  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Today
        </Typography>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <CalendarTodayOutlinedIcon fontSize="inherit" color="inherit" />
          <Typography variant="body2">
            {format(new Date(), "EEEE MMMM d")}
          </Typography>
        </Stack>
      </Stack>

      <MuiLink
        component={Link}
        variant="body2"
        to={`/partner/restaurants/${restaurant.id}/stats`}
        underline="always"
        color="inherit"
        sx={{
          fontWeight: 400,
          "&:hover": { textDecoration: "none" },
        }}
      >
        More stats
      </MuiLink>
    </Stack>
  );
}

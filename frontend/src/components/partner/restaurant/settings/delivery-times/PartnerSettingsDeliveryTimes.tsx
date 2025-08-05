import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { capitalize } from "@/lib/utils";

export default function PartnerSettingsDeliveryTimes() {
  const { restaurant } = usePartnerRestaurant();

  return (
    <Grid container spacing={2}>
      {restaurant.delivery_days.map((d, i) => {
        function formatTime(time: string | null) {
          return time?.slice(0, 5) ?? null;
        }

        const formattedStart = formatTime(d.start_time);
        const formattedEnd = formatTime(d.end_time);

        return (
          <>
            <Grid size={2}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontWeight: 500 }}
              >
                {capitalize(d.day)}
              </Typography>
            </Grid>

            <Grid size={8}>
              <Typography
                variant="body1"
                color="text"
                component="div"
                sx={{ fontWeight: 300, minWidth: 400, textAlign: "center" }}
              >
                {formattedStart && formattedEnd
                  ? `${formattedStart} - ${formattedEnd}`
                  : "Closed"}
              </Typography>
            </Grid>

            <Grid size={2}>
              {i === 0 && (
                <Button
                  component={Link}
                  to={`/restaurants/${restaurant.id}/settings/delivery-times/edit`}
                  variant="contained"
                  startIcon={<EditIcon />}
                  sx={{ alignSelf: "flex-start" }}
                >
                  Edit
                </Button>
              )}
            </Grid>
          </>
        );
      })}
    </Grid>
  );
}

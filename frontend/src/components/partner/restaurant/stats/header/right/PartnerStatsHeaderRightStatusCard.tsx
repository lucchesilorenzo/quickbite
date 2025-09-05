import { Cancel, CheckCircle } from "@mui/icons-material";
import { Card, Chip, Stack, Typography } from "@mui/material";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";

export default function PartnerStatsHeaderRightStatusCard() {
  const { restaurant } = usePartnerRestaurant();

  const status = restaurant.is_open
    ? {
        label: "Open",
        color: "success" as const,
        icon: <CheckCircle fontSize="small" />,
      }
    : {
        label: "Closed",
        color: "error" as const,
        icon: <Cancel fontSize="small" />,
      };

  return (
    <Card variant="outlined" sx={{ width: 220, p: 2 }}>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="body1">Status online</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">You are currently</Typography>

          <Typography
            variant="body2"
            color={restaurant.is_open ? "success" : "error"}
          >
            {status.label}
          </Typography>
        </Stack>

        <Chip
          icon={status.icon}
          label={`${status.label} for today`}
          color={status.color}
          sx={{ fontWeight: 500, width: 1 }}
        />
      </Stack>
    </Card>
  );
}

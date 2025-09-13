import {
  Box,
  ButtonBase,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSearchParams } from "react-router-dom";

import { usePartnerRestaurantStats } from "@/hooks/contexts/usePartnerRestaurantStats";
import { Kpi } from "@/types";

type PartnerStatsKpiCardProps = {
  card: {
    key: Kpi;
    value: string;
    title: string;
    color: string;
  };
  shouldHideDivider: boolean;
  isActive: boolean;
  isLast: boolean;
};

export default function PartnerStatsKpiCard({
  card,
  shouldHideDivider,
  isActive,
  isLast,
}: PartnerStatsKpiCardProps) {
  const { setActiveKpi } = usePartnerRestaurantStats();

  const [searchParams, setSearchParams] = useSearchParams();

  function handleKpiClick() {
    setActiveKpi(card.key);

    setSearchParams({
      ...Object.fromEntries(searchParams),
      kpi: card.key,
    });
  }

  return (
    <Grid size={3}>
      <Stack
        direction="row"
        sx={{
          py: 2,
          bgcolor: isActive ? "white" : grey[100],
          "&:hover": { bgcolor: !isActive ? grey[50] : "" },
        }}
      >
        <ButtonBase
          onClick={handleKpiClick}
          sx={{ flex: 1, textAlign: "center" }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600 }}
              color={card.color}
              gutterBottom
            >
              {card.value}
            </Typography>

            <Typography variant="body2">{card.title}</Typography>
          </Box>
        </ButtonBase>

        {!isLast && !shouldHideDivider && (
          <Divider orientation="vertical" flexItem />
        )}
      </Stack>
    </Grid>
  );
}

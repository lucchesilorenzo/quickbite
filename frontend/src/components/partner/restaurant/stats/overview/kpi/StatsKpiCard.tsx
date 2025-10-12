import {
  Box,
  ButtonBase,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSearchParams } from "react-router-dom";

import { usePartnerStats } from "@/contexts/private/partner/PartnerStatsProvider";
import { Kpi } from "@/types";

type StatsKpiCardProps = {
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

export default function StatsKpiCard({
  card,
  shouldHideDivider,
  isActive,
  isLast,
}: StatsKpiCardProps) {
  const { isLoadingKpiSummary, setActiveKpi } = usePartnerStats();

  const [searchParams, setSearchParams] = useSearchParams();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  function handleKpiClick() {
    setActiveKpi(card.key);

    setSearchParams({
      ...Object.fromEntries(searchParams),
      kpi: card.key,
    });
  }

  return (
    <Grid size={{ xs: 6, md: 3 }}>
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
              {isLoadingKpiSummary ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                card.value
              )}
            </Typography>

            <Typography variant="body2">{card.title}</Typography>
          </Box>
        </ButtonBase>

        {!isLast && !shouldHideDivider && !isMobile && (
          <Divider orientation="vertical" flexItem />
        )}
      </Stack>
    </Grid>
  );
}

import { Box, Stack, Typography } from "@mui/material";

import PartnerBackButton from "../../common/PartnerBackButton";

export default function PartnerSettingsPromotionsHeader() {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Box>
        <PartnerBackButton />

        <Typography variant="h5" sx={{ fontWeight: 600, my: 1 }}>
          Promotions
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Create and manage your promotions.
        </Typography>
      </Box>
    </Stack>
  );
}

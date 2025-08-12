import { Box, Typography } from "@mui/material";

import PartnerBackButton from "../../common/PartnerBackButton";

export default function PartnerMenuEditHeader() {
  return (
    <Box>
      <PartnerBackButton />

      <Typography variant="h5" sx={{ fontWeight: 600, mt: 1, mb: 2 }}>
        Menu categories
      </Typography>

      <Typography variant="body2">
        Review each menu category and manage your menu items: add new ones, edit
        existing items, or delete those you no longer need.
      </Typography>
    </Box>
  );
}

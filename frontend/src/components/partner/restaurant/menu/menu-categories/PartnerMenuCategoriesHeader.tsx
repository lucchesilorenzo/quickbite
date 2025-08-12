import { Box, Typography } from "@mui/material";

import PartnerBackButton from "../../common/PartnerBackButton";

export default function PartnerMenuCategoriesHeader() {
  return (
    <Box>
      <PartnerBackButton />

      <Typography variant="h5" sx={{ fontWeight: 600, mt: 1, mb: 2 }}>
        Menu categories
      </Typography>
    </Box>
  );
}

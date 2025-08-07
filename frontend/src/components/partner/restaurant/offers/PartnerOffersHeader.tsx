import { Box, Stack, Typography } from "@mui/material";

export default function PartnerOffersHeader() {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, my: 1 }}>
          Offers
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Create and manage your offers.
        </Typography>
      </Box>
    </Stack>
  );
}

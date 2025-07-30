import { Box, Typography } from "@mui/material";

import { useAuth } from "@/hooks/contexts/useAuth";

export default function PartnerRestaurantsWelcome() {
  const { user } = useAuth();

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Welcome back,
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {user?.first_name} {user?.last_name}
      </Typography>
    </Box>
  );
}

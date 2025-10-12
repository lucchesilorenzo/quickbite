import { Box, Typography } from "@mui/material";

import { useAuth } from "@/contexts/AuthProvider";

export default function RestaurantsWelcome() {
  const { user } = useAuth();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Welcome back,
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {user?.first_name} {user?.last_name}
      </Typography>
    </Box>
  );
}

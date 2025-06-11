import StorefrontIcon from "@mui/icons-material/Storefront";
import { Box, Card, Stack, Typography, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RestaurantDescription() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { restaurant } = useSingleRestaurant();

  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
        <StorefrontIcon />

        <Typography
          variant={isMobile ? "body1" : "h6"}
          component="div"
          sx={{ fontWeight: 700 }}
        >
          A little bit about us
        </Typography>
      </Stack>

      <Card variant="outlined" sx={{ bgcolor: grey[100] }}>
        <Typography variant={isMobile ? "body2" : "body1"} sx={{ p: 2 }}>
          {restaurant.description}
        </Typography>
      </Card>
    </Box>
  );
}

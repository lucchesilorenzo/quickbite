import SellIcon from "@mui/icons-material/Sell";
import { Box, Stack, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";

import env from "@/lib/env";
import { formatCurrency } from "@/lib/utils/formatting";
import { RestaurantListItem } from "@/types/restaurant.types";

type RestaurantCardImageProps = {
  restaurant: RestaurantListItem;
};

export default function RestaurantCardImage({
  restaurant,
}: RestaurantCardImageProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        component="img"
        src={`${env.VITE_BASE_URL}${restaurant.cover}`}
        alt={restaurant.name}
        sx={{
          objectFit: "cover",
          width: 1,
          height: 140,
          display: "block",
        }}
      />

      <Box
        component="img"
        src={`${env.VITE_BASE_URL}${restaurant.logo}`}
        alt={restaurant.name}
        sx={{
          objectFit: "cover",
          width: 40,
          height: 40,
          position: "absolute",
          bottom: 10,
          left: 10,
          border: "2px solid #fff",
          borderRadius: 2,
        }}
      />

      {restaurant.offers.length > 0 && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            top: 10,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            px: 1,
            py: 0.5,
            alignItems: "center",
            bgcolor: yellow[200],
          }}
        >
          <SellIcon fontSize="small" color="primary" />

          <Typography
            variant="caption"
            component="span"
            sx={{ fontWeight: 600 }}
            color="textPrimary"
          >
            {restaurant.offers[0].discount_rate * 100}% off - Minimum order{" "}
            {formatCurrency(restaurant.offers[0].min_discount_amount)}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

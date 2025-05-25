import { Box } from "@mui/material";

import env from "@/lib/env";
import { RestaurantDetail } from "@/types";

type RestaurantCoverImageProps = {
  restaurant: RestaurantDetail;
};

export default function RestaurantCoverImage({
  restaurant,
}: RestaurantCoverImageProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        component="img"
        src={`${env.VITE_BASE_URL}${restaurant.cover}`}
        alt={restaurant.name}
        sx={{
          objectFit: "cover",
          width: 1,
          height: 450,
        }}
      />

      <Box
        component="img"
        src={`${env.VITE_BASE_URL}${restaurant.logo}`}
        alt={restaurant.name}
        sx={{
          objectFit: "cover",
          width: 80,
          height: 80,
          position: "absolute",
          bottom: 20,
          left: 300,
          border: "2px solid #fff",
          borderRadius: 2,
        }}
      />
    </Box>
  );
}

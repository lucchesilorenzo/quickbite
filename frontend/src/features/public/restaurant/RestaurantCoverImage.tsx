import { Box, Container } from "@mui/material";

import { useRestaurant } from "@/contexts/RestaurantProvider";
import env from "@/lib/env";

export default function RestaurantCoverImage() {
  const { restaurantData } = useRestaurant();

  return (
    <Box
      sx={{
        position: "relative",
        mb: { xs: 0, lg: 2 },
        pt: { xs: 2, lg: 0 },
        px: { xs: 2, lg: 0 },
      }}
    >
      <Box
        component="img"
        src={`${env.VITE_BASE_URL}${restaurantData.restaurant.cover}`}
        alt={restaurantData.restaurant.name}
        sx={{
          objectFit: "cover",
          width: 1,
          height: { xs: 300, lg: 450 },
          borderRadius: { xs: 4, lg: 0 },
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          display: { xs: "none", lg: "block" },
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 0,
        }}
      >
        <Box
          component="img"
          src={`${env.VITE_BASE_URL}${restaurantData.restaurant.logo}`}
          alt={restaurantData.restaurant.name}
          sx={{
            objectFit: "cover",
            width: 80,
            height: 80,
            border: "2px solid #fff",
            borderRadius: 2,
          }}
        />
      </Container>

      <Box
        sx={{
          display: { xs: "block", lg: "none" },
          position: "absolute",
          bottom: 30,
          left: 30,
          right: 0,
        }}
      >
        <Box
          component="img"
          src={`${env.VITE_BASE_URL}${restaurantData.restaurant.logo}`}
          alt={restaurantData.restaurant.name}
          sx={{
            objectFit: "cover",
            width: 60,
            height: 60,
            border: "2px solid #fff",
            borderRadius: 2,
          }}
        />
      </Box>
    </Box>
  );
}

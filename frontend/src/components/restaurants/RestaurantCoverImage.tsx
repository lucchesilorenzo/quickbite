import { Box, Container } from "@mui/material";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import env from "@/lib/env";

export default function RestaurantCoverImage() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Box sx={{ position: "relative", mb: 2, p: { xs: 2, lg: 0 } }}>
      <Box
        component="img"
        src={`${env.VITE_BASE_URL}${restaurant.cover}`}
        alt={restaurant.name}
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
          position: "absolute",
          bottom: { xs: 30, lg: 20 },
          left: { xs: 10, lg: 20 },
          right: 0,
        }}
      >
        <Box
          component="img"
          src={`${env.VITE_BASE_URL}${restaurant.logo}`}
          alt={restaurant.name}
          sx={{
            objectFit: "cover",
            width: { xs: 60, lg: 80 },
            height: { xs: 60, lg: 80 },
            border: "2px solid #fff",
            borderRadius: 2,
          }}
        />
      </Container>
    </Box>
  );
}

import { Box, Container } from "@mui/material";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import env from "@/lib/env";

export default function RestaurantCoverImage() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Box sx={{ position: "relative", mb: 2 }}>
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

      <Container
        maxWidth="md"
        sx={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
        }}
      >
        <Box
          component="img"
          src={`${env.VITE_BASE_URL}${restaurant.logo}`}
          alt={restaurant.name}
          sx={{
            objectFit: "cover",
            width: 80,
            height: 80,
            border: "2px solid #fff",
            borderRadius: 2,
          }}
        />
      </Container>
    </Box>
  );
}

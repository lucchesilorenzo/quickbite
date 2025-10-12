import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useRestaurant } from "@/contexts/public/RestaurantProvider";

export default function RestaurantInfo() {
  const { restaurant } = useRestaurant();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Container
      component="section"
      maxWidth={isMobile ? "lg" : "md"}
      sx={{ my: 4 }}
    >
      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
        <ApartmentOutlinedIcon />

        <Typography component="h3" variant="h6" sx={{ fontWeight: 700 }}>
          Restaurant details
        </Typography>
      </Stack>

      <Box sx={{ mt: 1 }}>
        <Typography
          variant={isMobile ? "body2" : "body1"}
          color="textSecondary"
        >
          {restaurant.name}
        </Typography>

        <Typography
          variant={isMobile ? "body2" : "body1"}
          color="textSecondary"
        >
          {restaurant.street_address}, {restaurant.building_number}
        </Typography>

        <Typography
          variant={isMobile ? "body2" : "body1"}
          color="textSecondary"
        >
          {restaurant.postcode} {restaurant.city}
        </Typography>
      </Box>
    </Container>
  );
}

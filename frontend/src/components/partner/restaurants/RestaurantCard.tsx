import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { PartnerRestaurantBase } from "@/types";

type RestaurantCardProps = {
  restaurant: PartnerRestaurantBase;
};

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card elevation={3} variant="outlined">
      <CardActionArea
        component={Link}
        to={`/partner/restaurants/${restaurant.id}/dashboard`}
        sx={{ p: 2, height: 100 }}
      >
        <Stack direction="row" spacing={1}>
          <StorefrontOutlinedIcon fontSize="small" />

          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {restaurant.name}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

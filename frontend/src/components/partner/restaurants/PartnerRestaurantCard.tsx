import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { RestaurantDetail } from "@/types";

type PartnerRestaurantCardProps = {
  restaurant: RestaurantDetail;
};

export default function PartnerRestaurantCard({
  restaurant,
}: PartnerRestaurantCardProps) {
  return (
    <Card elevation={3} variant="outlined">
      <CardActionArea
        component={Link}
        to={`/partner/restaurants/${restaurant.id}/dashboard`}
        sx={{ p: 2 }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <StorefrontOutlinedIcon fontSize="small" />

          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {restaurant.name}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

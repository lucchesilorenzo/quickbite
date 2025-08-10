import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Card,
  CardContent,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";

type PartnerRatingDisplayCardProps = {
  type: "dashboard" | "reviews";
};

export default function PartnerRatingDisplayCard({
  type,
}: PartnerRatingDisplayCardProps) {
  const { restaurant } = usePartnerRestaurant();

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Your overall rating
          </Typography>

          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                {restaurant.reviews_avg_rating?.toFixed(1) || "N/A"}
              </Typography>

              <Rating
                value={restaurant.reviews_avg_rating || 0}
                icon={<StarIcon color="primary" fontSize="large" />}
                emptyIcon={<StarBorderIcon color="primary" fontSize="large" />}
                readOnly
              />
            </Stack>

            {type === "dashboard" && (
              <IconButton
                component={Link}
                to={`/partner/restaurants/${restaurant.id}/reviews`}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </Stack>

          <Typography variant="body2">
            Based on {restaurant.reviews_count} reviews
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

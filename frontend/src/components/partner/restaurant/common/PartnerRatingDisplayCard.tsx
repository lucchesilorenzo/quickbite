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

import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
import { usePartnerRestaurantReviews } from "@/hooks/contexts/private/partner/usePartnerRestaurantReviews";

type PartnerRatingDisplayCardProps = {
  type: "dashboard" | "reviews";
};

export default function PartnerRatingDisplayCard({
  type,
}: PartnerRatingDisplayCardProps) {
  const { restaurant } = usePartnerRestaurant();
  const { reviewsData } = usePartnerRestaurantReviews();

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
                {reviewsData.avg_rating?.toLocaleString("it-IT", {
                  maximumFractionDigits: 1,
                }) || "N/A"}
              </Typography>

              <Rating
                value={reviewsData.avg_rating}
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
            Based on {reviewsData.count} reviews
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

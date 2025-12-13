import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useReviews } from "@partner/contexts/ReviewsProvider";
import { Link } from "react-router-dom";

type RatingDisplayCardProps = {
  type: "dashboard" | "reviews";
};

export default function RatingDisplayCard({ type }: RatingDisplayCardProps) {
  const { restaurantData } = useRestaurant();
  const { reviewsData, isLoadingReviews, reviewsError } = useReviews();

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Your overall rating
          </Typography>

          {isLoadingReviews && (
            <CircularProgress
              color="primary"
              size={25}
              sx={{ alignSelf: "center" }}
            />
          )}

          {!isLoadingReviews && reviewsError && (
            <Alert severity="error">{reviewsError.message}</Alert>
          )}

          {!isLoadingReviews && !reviewsError && (
            <Box>
              <Stack
                direction="row"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 700 }}
                  >
                    {reviewsData.avg_rating?.toLocaleString("it-IT", {
                      maximumFractionDigits: 1,
                    }) || "N/A"}
                  </Typography>

                  <Rating
                    value={reviewsData.avg_rating}
                    icon={<StarIcon color="primary" fontSize="large" />}
                    emptyIcon={
                      <StarBorderIcon color="primary" fontSize="large" />
                    }
                    readOnly
                  />
                </Stack>

                {type === "dashboard" && (
                  <IconButton
                    component={Link}
                    to={`/partner/restaurants/${restaurantData.restaurant.id}/reviews`}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                )}
              </Stack>

              <Typography variant="body2" sx={{ mt: 1 }}>
                Based on {reviewsData.count} reviews
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

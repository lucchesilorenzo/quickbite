import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Card, CardContent, Rating, Typography } from "@mui/material";
import { format } from "date-fns";

import { RestaurantDetail } from "@/types";

type ReviewProps = {
  review: RestaurantDetail["reviews"][number];
};

export default function Review({ review }: ReviewProps) {
  return (
    <Box>
      <Typography
        component="h2"
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" component="div">
              {review.customer.first_name}
            </Typography>

            <Typography variant="body2" sx={{ fontWeight: 500, mb: 2 }}>
              {format(review.created_at, "EEEE dd MMM yyyy")}
            </Typography>

            <Rating
              value={review.rating}
              icon={<StarIcon color="primary" />}
              emptyIcon={<StarBorderIcon color="primary" />}
              readOnly
              sx={{ mb: 2 }}
            />

            {review.comment && (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontWeight: 600 }}
              >
                {review.comment}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Typography>
    </Box>
  );
}

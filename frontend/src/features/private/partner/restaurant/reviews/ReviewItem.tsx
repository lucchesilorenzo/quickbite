import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { format } from "date-fns";

import { ReviewsWithPagination } from "@/types/review/review.types";

type ReviewItemProps = {
  review: ReviewsWithPagination["data"][number];
};

export default function ReviewItem({ review }: ReviewItemProps) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6" component="div">
            {review.customer.first_name}
          </Typography>

          <Typography variant="body2" component="div" sx={{ fontWeight: 300 }}>
            {format(review.created_at, "dd MMM yyyy")}
          </Typography>
        </Stack>

        <Stack direction="row" sx={{ justifyContent: "space-between", mb: 1 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {review.rating}
            </Typography>

            <Rating
              value={review.rating}
              icon={<StarIcon color="primary" />}
              emptyIcon={<StarBorderIcon color="primary" />}
              readOnly
              sx={{ mb: 2 }}
            />
          </Stack>

          <Box>
            <Typography
              variant="body2"
              sx={{ color: blue[700], fontWeight: 500 }}
            >
              Order # {review.order.order_code}
            </Typography>
          </Box>
        </Stack>

        {review.comment && (
          <Typography variant="body2">{review.comment}</Typography>
        )}
      </CardContent>
    </Card>
  );
}

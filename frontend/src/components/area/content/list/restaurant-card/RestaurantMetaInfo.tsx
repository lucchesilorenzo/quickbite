import StarIcon from "@mui/icons-material/Star";
import { Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { differenceInDays } from "date-fns";

import { RestaurantListItem } from "@/types";

type RestaurantMetaInfoProps = {
  restaurant: RestaurantListItem;
};

export default function RestaurantMetaInfo({
  restaurant,
}: RestaurantMetaInfoProps) {
  const categories = restaurant.categories.map((c) => c.name).join(", ");
  const rating = Number(restaurant.reviews_avg_rating).toFixed(1);
  const isNew = differenceInDays(new Date(), restaurant.created_at) <= 30;

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        {isNew && (
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography
              variant="body2"
              component="span"
              sx={{ bgcolor: blueGrey[50], p: 0.5, borderRadius: 1 }}
              color="textPrimary"
            >
              New
            </Typography>

            <Typography variant="body2" component="span" color="textSecondary">
              &bull;
            </Typography>
          </Stack>
        )}

        {restaurant.reviews_avg_rating && (
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <StarIcon fontSize="small" color="primary" />

            <Typography
              variant="body2"
              component="span"
              sx={{ fontWeight: "700" }}
              color="textPrimary"
            >
              {rating}
            </Typography>

            <Typography variant="body2" component="span" color="textPrimary">
              ({restaurant.reviews_count})
            </Typography>

            <Typography
              variant="body2"
              component="span"
              color="textSecondary"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              &bull;
            </Typography>
          </Stack>
        )}

        <Typography
          variant="body2"
          component="span"
          color="textPrimary"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {categories}
        </Typography>
      </Stack>

      <Typography
        variant="body2"
        component="span"
        color="textPrimary"
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {categories}
      </Typography>
    </>
  );
}

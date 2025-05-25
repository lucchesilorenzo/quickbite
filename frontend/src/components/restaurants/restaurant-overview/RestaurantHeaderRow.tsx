import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import StarIcon from "@mui/icons-material/Star";
import { IconButton, Link, Stack, Typography } from "@mui/material";

import { formatCurrency } from "@/lib/utils";
import { RestaurantDetail } from "@/types";

type RestaurantHeaderRowProps = {
  restaurant: RestaurantDetail;
};

export default function RestaurantHeaderRow({
  restaurant,
}: RestaurantHeaderRowProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <StarIcon fontSize="small" color="primary" />

        <Link
          color="inherit"
          underline="always"
          sx={{ "&:hover": { textDecoration: "none" } }}
        >
          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
            sx={{ fontWeight: 500, mr: 0.5 }}
          >
            {restaurant.reviews_avg_rating}
          </Typography>

          <Typography component="span" variant="body2" color="textPrimary">
            ({restaurant.reviews_count})
          </Typography>
        </Link>
      </Stack>

      <Typography component="span">&bull;</Typography>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <DeliveryDiningIcon fontSize="small" color="inherit" />

        <Typography component="span" variant="body2" color="textPrimary">
          {formatCurrency(restaurant.shipping_cost)}
        </Typography>

        <IconButton
          color="inherit"
          size="small"
          sx={{ "&:hover": { bgcolor: "transparent" }, p: 0 }}
          onClick={() => {}}
        >
          <InfoOutlineIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
}

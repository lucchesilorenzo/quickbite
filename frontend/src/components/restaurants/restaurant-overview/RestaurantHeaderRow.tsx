import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StarIcon from "@mui/icons-material/Star";
import { IconButton, Link, Stack, Typography } from "@mui/material";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { formatCurrency } from "@/lib/utils";

export default function RestaurantHeaderRow() {
  const { restaurant, setOpenRestaurantAboutDialog } = useSingleRestaurant();

  console.log(restaurant);

  function handleOpenDialogAndScroll() {
    setTimeout(() => {
      const anchor = document.querySelector("#delivery-fee");

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 300);

    setOpenRestaurantAboutDialog(true);
  }

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
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
            {restaurant.reviews_avg_rating.toFixed(2)}
          </Typography>

          <Typography component="span" variant="body2" color="textPrimary">
            ({restaurant.reviews_count})
          </Typography>
        </Link>
      </Stack>

      {restaurant.min_amount && (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography component="span">&bull;</Typography>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <ShoppingBagOutlinedIcon fontSize="small" />

            <Typography component="span" variant="body2" color="textPrimary">
              Min. {formatCurrency(restaurant.min_amount)}
            </Typography>
          </Stack>
        </Stack>
      )}

      <Typography component="span">&bull;</Typography>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <DeliveryDiningOutlinedIcon fontSize="small" color="inherit" />

        <Typography component="span" variant="body2" color="textPrimary">
          {formatCurrency(restaurant.shipping_cost)}
        </Typography>

        <IconButton
          color="inherit"
          size="small"
          sx={{ "&:hover": { bgcolor: "transparent" }, p: 0 }}
          onClick={handleOpenDialogAndScroll}
        >
          <InfoOutlineIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
}

import { useState } from "react";

import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StarIcon from "@mui/icons-material/Star";
import { IconButton, Link, Stack, Typography } from "@mui/material";

import ServiceFeeDialog from "@/components/common/ServiceFeeDialog";
import Spinner from "@/components/common/Spinner";
import { useRestaurant } from "@/contexts/RestaurantProvider";
import { useReviews } from "@/contexts/ReviewsProvider";
import { formatCurrency } from "@/lib/utils/formatting";

export default function RestaurantHeaderRow() {
  const {
    restaurantData,
    setOpenRestaurantAboutDialog,
    setTabToOpen,
    setScrollToDeliveryFee,
  } = useRestaurant();
  const { reviewsData, isLoadingReviews } = useReviews();

  const [openServiceFeeDialog, setOpenServiceFeeDialog] = useState(false);

  const isDeliveryFeeFree = restaurantData.restaurant.delivery_fee === 0;

  function handleOpenDialogAndScroll() {
    setTabToOpen("info");
    setScrollToDeliveryFee(true);
    setOpenRestaurantAboutDialog(true);
  }

  if (isLoadingReviews) return <Spinner />;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: "center", mb: 2, flexWrap: "wrap" }}
    >
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
            {reviewsData.avg_rating?.toLocaleString("it-IT", {
              maximumFractionDigits: 1,
            }) || "N/A"}
          </Typography>

          {reviewsData.count > 0 && (
            <Typography component="span" variant="body2" color="textPrimary">
              ({reviewsData.count})
            </Typography>
          )}
        </Link>
      </Stack>

      {restaurantData.restaurant.min_amount > 0 && (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography component="span">&bull;</Typography>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <ShoppingBagOutlinedIcon fontSize="small" />

            <Typography component="span" variant="body2" color="textPrimary">
              Min. {formatCurrency(restaurantData.restaurant.min_amount)}
            </Typography>
          </Stack>
        </Stack>
      )}

      <Typography component="span">&bull;</Typography>

      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
        <DeliveryDiningOutlinedIcon fontSize="small" color="inherit" />

        <Typography component="span" variant="body2" color="textPrimary">
          {!isDeliveryFeeFree
            ? formatCurrency(restaurantData.restaurant.delivery_fee)
            : "Free"}
        </Typography>

        <IconButton
          color="inherit"
          size="small"
          sx={{ "&:hover": { bgcolor: "transparent" }, p: 0 }}
          onClick={handleOpenDialogAndScroll}
        >
          <InfoOutlineIcon fontSize="inherit" />
        </IconButton>
      </Stack>

      {restaurantData.restaurant.service_fee > 0 && (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography component="span">&bull;</Typography>

          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
            <Typography component="span" variant="body2" color="textPrimary">
              Service fee
            </Typography>

            <Typography component="span" variant="body2" color="textPrimary">
              {formatCurrency(restaurantData.restaurant.service_fee)}
            </Typography>

            <IconButton
              color="inherit"
              size="small"
              sx={{ "&:hover": { bgcolor: "transparent" }, p: 0 }}
              onClick={() => setOpenServiceFeeDialog(true)}
            >
              <InfoOutlineIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Stack>
      )}

      <ServiceFeeDialog
        openServiceFeeDialog={openServiceFeeDialog}
        setOpenServiceFeeDialog={setOpenServiceFeeDialog}
      />
    </Stack>
  );
}

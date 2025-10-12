import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import { useRestaurant } from "@/contexts/public/RestaurantProvider";
import { formatCurrency } from "@/lib/utils/formatting";

type RestaurantCartDeliveryFeeDialogProps = {
  openDeliveryFeeDialog: boolean;
  setOpenDeliveryFeeDialog: (openDeliveryFeeDialog: boolean) => void;
};

export default function RestaurantCartDeliveryFeeDialog({
  openDeliveryFeeDialog,
  setOpenDeliveryFeeDialog,
}: RestaurantCartDeliveryFeeDialogProps) {
  const { restaurant } = useRestaurant();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isDeliveryFeeFree = restaurant.delivery_fee === 0;

  return (
    <Dialog
      open={openDeliveryFeeDialog}
      onClose={() => setOpenDeliveryFeeDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Delivery fee</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenDeliveryFeeDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Typography sx={{ mb: 2 }}>
            This contributes to the costs of delivery to you. It can vary
            depending on e.g. your distance from the store, selected store,
            order value and, sometimes, time of day.
          </Typography>

          <Box sx={{ bgcolor: grey[100], p: 2, borderRadius: 3 }}>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography variant="body2">Delivery fee</Typography>

              <Typography variant="body2">
                {!isDeliveryFeeFree
                  ? formatCurrency(restaurant.delivery_fee)
                  : "Free"}
              </Typography>
            </Stack>
          </Box>
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { getRestaurantOpeningTime } from "@/lib/utils";

type RestaurantClosedDialogProps = {
  openRestaurantClosedDialog: boolean;
  setOpenRestaurantClosedDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RestaurantClosedDialog({
  openRestaurantClosedDialog,
  setOpenRestaurantClosedDialog,
}: RestaurantClosedDialogProps) {
  const { restaurant } = useSingleRestaurant();

  const openingTime = getRestaurantOpeningTime(restaurant);

  const availabilityTitle = openingTime
    ? `${restaurant.name} starts delivering at ${openingTime}`
    : `${restaurant.name} is closed for delivery`;

  const availabilityContent = openingTime
    ? `Delivery from ${openingTime}`
    : "Closed for delivery.";

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openRestaurantClosedDialog}
      onClose={() => setOpenRestaurantClosedDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <DialogTitle sx={{ p: 0, fontWeight: 700, maxWidth: "80%" }}>
            {availabilityTitle}
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenRestaurantClosedDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Typography sx={{ mb: 2 }}>{availabilityContent}</Typography>
        </DialogContent>

        <DialogActions sx={{ p: 0 }}>
          <Button
            component={Link}
            to="/"
            variant="text"
            size="large"
            color="inherit"
            sx={{
              fontWeight: 700,
              justifyContent: "flex-end",
              borderRadius: 5,
            }}
          >
            See other places
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}

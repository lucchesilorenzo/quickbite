import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
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

import { useLeaveRestaurant } from "../hooks/restaurant/useLeaveRestaurant";

type LeaveRestaurantDialogProps = {
  openLeaveRestaurantDialog: boolean;
  setOpenLeaveRestaurantDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LeaveRestaurantDialog({
  openLeaveRestaurantDialog,
  setOpenLeaveRestaurantDialog,
}: LeaveRestaurantDialogProps) {
  const { mutate: leaveRestaurant, isPending: isLeaving } =
    useLeaveRestaurant();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleLeaveRestaurant() {
    leaveRestaurant();
  }

  return (
    <Dialog
      open={openLeaveRestaurantDialog}
      onClose={() => setOpenLeaveRestaurantDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Leave restaurant
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenLeaveRestaurantDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Typography variant="body1">
            In order to leave the restaurant, you must not have an active
            delivery.
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              If you are sure, click{" "}
              <Typography
                component="span"
                variant="body1"
                sx={{ fontWeight: 700 }}
              >
                Confirm
              </Typography>
              .
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenLeaveRestaurantDialog(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleLeaveRestaurant}
            disabled={isLeaving}
            loading={isLeaving}
            loadingIndicator="Leaving..."
          >
            Confirm
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}

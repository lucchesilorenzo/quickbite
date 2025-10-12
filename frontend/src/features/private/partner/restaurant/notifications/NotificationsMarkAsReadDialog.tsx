import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { usePartnerRestaurant } from "@partner/contexts/PartnerRestaurantProvider";
import { useMarkNotificationsAsRead } from "@partner/hooks/notifications/useMarkNotificationsAsRead";

type NotificationsMarkAsReadDialogProps = {
  openMarkUserNotificationsAsRead: boolean;
  setOpenMarkUserNotificationsAsRead: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function NotificationsMarkAsReadDialog({
  openMarkUserNotificationsAsRead,
  setOpenMarkUserNotificationsAsRead,
}: NotificationsMarkAsReadDialogProps) {
  const { restaurant } = usePartnerRestaurant();

  const { mutateAsync: markUserNotificationsAsRead, isPending: isMarking } =
    useMarkNotificationsAsRead(restaurant.id);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  async function handleDeleteOffer() {
    await markUserNotificationsAsRead();
    setOpenMarkUserNotificationsAsRead(false);
  }

  return (
    <Dialog
      open={openMarkUserNotificationsAsRead}
      onClose={() => setOpenMarkUserNotificationsAsRead(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Mark all as read
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenMarkUserNotificationsAsRead(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          Are you sure you want to mark all notifications as read?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenMarkUserNotificationsAsRead(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleDeleteOffer}
            disabled={isMarking}
            loading={isMarking}
            loadingIndicator="Marking..."
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}

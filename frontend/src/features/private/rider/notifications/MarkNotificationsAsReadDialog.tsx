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
import { useMarkNotificationsAsRead } from "@rider/hooks/notifications/useMarkNotificationsAsRead";

type MarkNotificationsAsReadDialogProps = {
  openMarkNotificationsAsReadDialog: boolean;
  setOpenMarkNotificationsAsReadDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function MarkNotificationsAsReadDialog({
  openMarkNotificationsAsReadDialog,
  setOpenMarkNotificationsAsReadDialog,
}: MarkNotificationsAsReadDialogProps) {
  const { mutate: markNotificationsAsRead, isPending: isMarking } =
    useMarkNotificationsAsRead({ setOpenMarkNotificationsAsReadDialog });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleDeleteOffer() {
    markNotificationsAsRead();
  }

  return (
    <Dialog
      open={openMarkNotificationsAsReadDialog}
      onClose={() => setOpenMarkNotificationsAsReadDialog(false)}
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
            onClick={() => setOpenMarkNotificationsAsReadDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          Are you sure you want to mark all notifications as read?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenMarkNotificationsAsReadDialog(false)}>
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

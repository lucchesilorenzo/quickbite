import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import LocationSearchArea from "./LocationSearchArea";

type LocationSearchDialogProps = {
  openDialog: boolean;
  onCloseDialog: () => void;
};

export default function LocationSearchDialog({
  openDialog,
  onCloseDialog,
}: LocationSearchDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Dialog
      open={openDialog}
      onClose={onCloseDialog}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: "bold" }}>
            Enter your location
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={onCloseDialog}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <LocationSearchArea
            openDialog={openDialog}
            onCloseDialog={onCloseDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}
